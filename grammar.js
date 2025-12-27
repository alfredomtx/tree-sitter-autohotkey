module.exports = grammar({
  name: 'autohotkey',

  word: $ => $.identifier,

  extras: $ => [
    /\s/,
  ],

  conflicts: $ => [
    [$.parameter, $._expression],
    [$.variable_ref, $.operator],
    [$.variable_ref, $._expression],   // %var% in expressions
    [$.loop_statement, $._statement],  // loop identifier: count vs braceless body
    [$.catch_clause, $._statement],    // catch identifier: exception vs braceless body
    [$.else_clause, $._statement],     // else if_statement: else body vs separate statement
    [$._if_directive_condition, $._expression],  // parenthesized_expression in both
  ],

  rules: {
    source_file: $ => repeat($._statement),

    _statement: $ => choice(
      $.comment,
      $.doc_comment,
      $.block_comment,
      $.if_directive,      // Before directive - conditional #if
      $.if_win_directive,  // Before directive - conditional #IfWin*
      $.directive,
      $.hotkey,
      $.hotstring_definition,
      $.gui_action,   // Before label - matches "GuiName:SubCommand" patterns like "MyGui:Add"
      $.gui_options,  // Before label - matches "GuiName:+/-Option" patterns like "MyGui:-Caption"
      $.gui_target,   // Before label - matches "GuiName:," to prevent false labels in injection
      $.label,
      $.class_definition,
      $.function_definition,
      // Control flow statements (before keyword!)
      $.if_statement,
      $.while_statement,
      $.loop_statement,
      $.for_statement,
      $.try_statement,
      $.switch_statement,
      // Expressions that can appear at statement level
      $.assignment_expression,
      $.method_call,
      $.member_expression,
      $.index_expression,
      $.function_call,
      $.command,
      $.array_literal,
      $.string,
      $.number,
      $.boolean,
      // NOTE: parenthesized_expression removed from _statement to reduce state count
      // It's still in _expression for conditions
      $.keyword,
      prec(2, $.gui_option_flag),
      $.operator,
      prec(4, $.variable_ref),
      $.identifier,
      $._punctuation,
    ),

    comment: $ => seq(
      ';',
      /.*/
    ),

    block_comment: $ => seq(
      '/*',
      /[^*]*\*+([^/*][^*]*\*+)*/,
      '/'
    ),

    doc_comment: $ => seq(
      '/**',
      /[^*]*\*+([^/*][^*]*\*+)*/,
      '/'
    ),

    // Generic directive: #Name args (for #Include, #SingleInstance, etc.)
    // Conditional directives (#if, #ifWin*) have dedicated rules with higher precedence
    directive: $ => seq(
      '#',
      field('name', $.identifier),
      optional(field('arguments', $.directive_arguments))
    ),

    // Directive arguments - captures text after directive name up to ; or EOL
    // Handles both space syntax (#Include path) and comma syntax (#SingleInstance, Force)
    // token.immediate prevents whitespace (including newlines from extras) between name and args
    directive_arguments: $ => token.immediate(/[, \t]+[^\s;][^;\n]*/),

    // #if directive with expression parsing for proper syntax highlighting
    // prec.right ensures condition is consumed greedily (not left empty)
    if_directive: $ => prec.right(5, seq(
      '#',
      token.immediate(/if/i),
      optional(field('condition', $._if_directive_condition))
    )),

    // Condition expression for #if - supports logical operators between expressions
    // prec.left ensures left-to-right associativity for chained conditions
    _if_directive_condition: $ => prec.left(choice(
      // Chained parenthesized expressions: (expr) && (expr) OR (expr)
      seq(
        $.parenthesized_expression,
        repeat(seq(choice('&&', '||', /and/i, /or/i), $.parenthesized_expression))
      ),
      // Single function call: WinActive("...")
      $.function_call,
      // Other expressions
      $._expression
    )),

    // #IfWinActive, #IfWinExist, #IfWinNotActive, #IfWinNotExist
    // prec.right ensures title/text are consumed greedily
    if_win_directive: $ => prec.right(5, seq(
      '#',
      field('type', alias($._if_win_directive_type, $.if_win_type)),
      optional(field('title', alias($._if_win_title, $.if_win_title))),
      optional(seq(',', field('text', alias($._if_win_text, $.if_win_text))))
    )),

    _if_win_directive_type: $ => token.immediate(/IfWin(Not)?(Active|Exist)/i),
    // Title can be a quoted string or unquoted text (not starting with quote)
    // Exclude leading space so extras can consume whitespace first
    _if_win_title: $ => choice($.string, /[^,\r\n"' \t][^,\r\n]*/),
    _if_win_text: $ => choice($.string, /[^\r\n"' \t][^\r\n]*/),

    // Hotkey: modifiers + key + ::
    // Higher precedence than gui_option_flag to ensure +a:: parses as hotkey, not gui_option_flag + ERROR
    hotkey: $ => token(prec(5, seq(
      optional(/[#!^+<>*~$]+/),
      /[a-zA-Z0-9]+/,
      '::'
    ))),

    // Hotstring: :options:trigger::replacement
    hotstring_definition: $ => seq(
      ':',
      optional(field('options', $.hotstring_options)),
      ':',
      field('trigger', $.hotstring_trigger),
      '::',
      optional(field('replacement', $.hotstring_replacement))
    ),

    hotstring_options: $ => token(/[*?CORZTXB0-9SIEPK]+/i),
    hotstring_trigger: $ => token(/[^:\r\n]+/),
    hotstring_replacement: $ => token.immediate(/[^\r\n]+/),

    // Label: identifier followed by single colon
    label: $ => seq(
      field('name', $.identifier),
      token.immediate(':')
    ),

    // GUI action (like MyGui:Add or MyGui:Show) - higher precedence than label
    // to prevent "MyGui:Add" from being parsed as label + identifier during injection
    // Captures GUI name and sub-command as separate fields for highlighting
    // Both : and action must be immediate (no whitespace) to distinguish from label + newline + code
    gui_action: $ => prec(10, seq(
      field('gui_name', $.identifier),
      token.immediate(':'),
      field('action', alias(token.immediate(/[a-zA-Z_][a-zA-Z0-9_]*/), $.identifier))
    )),

    // GUI options (like MyGui:-Caption or MyGui:+Border) - for window options
    // Single token to ensure it matches before label can complete
    gui_options: $ => token(prec(11, /[a-zA-Z_][a-zA-Z0-9_]*:[+-]/)),

    // GUI target reference (like "MyGui:," in GuiControl, MyGui:, Control)
    // Matches identifier + colon + comma as a unit with higher precedence than label
    // This prevents "MyGui:," from being parsed as a label during injection
    gui_target: $ => prec(10, seq(
      field('gui_name', $.identifier),
      token.immediate(':'),
      token.immediate(',')
    )),

    // GUI option flag (like +Caption or -Border) - standalone options in command arguments
    // Single token with high precedence to win over operator + identifier
    // Highlighted with #match? to validate known option names
    gui_option_flag: $ => token(prec(3, /[+-][a-zA-Z_][a-zA-Z0-9_]*/)),

    block: $ => repeat1($._statement),

    // Parenthesized expression for conditions
    parenthesized_expression: $ => seq('(', $._expression, ')'),

    // Statement block (braces + optional statements) for control flow
    statement_block: $ => seq('{', optional($.block), '}'),

    // Control flow statements - support both braced blocks and single statements
    if_statement: $ => prec.right(seq(
      'if',
      field('condition', seq(
        $.parenthesized_expression,
        repeat(seq(choice('&&', '||', 'and', 'or'), $.parenthesized_expression))
      )),
      field('consequence', choice($.statement_block, $._statement)),
      optional(field('alternative', $.else_clause))
    )),

    else_clause: $ => seq(
      'else',
      choice($.if_statement, $.statement_block, $._statement)
    ),

    while_statement: $ => seq(
      'while',
      field('condition', $.parenthesized_expression),
      field('body', choice($.statement_block, $._statement))
    ),

    loop_statement: $ => prec.right(seq(
      'loop',
      optional(choice(
        // Comma-style variant: loop, parse, ...
        seq(
          ',',
          field('type', $.loop_type),
          optional(field('arguments', $.loop_arguments))
        ),
        // Count-based: loop 10 or loop count
        field('count', choice($.number, $.identifier))
      )),
      field('body', choice($.statement_block, $._statement))
    )),

    loop_type: $ => choice('parse', 'files', 'read', 'reg'),

    loop_arguments: $ => /[^\r\n{]+/,

    for_statement: $ => seq(
      'for',
      field('key', $.identifier),
      optional(seq(',', field('value', $.identifier))),
      'in',
      field('collection', $._expression),
      field('body', choice($.statement_block, $._statement))
    ),

    try_statement: $ => prec.right(seq(
      'try',
      field('body', choice($.statement_block, $._statement)),
      optional($.catch_clause),
      optional($.finally_clause)
    )),

    catch_clause: $ => seq(
      'catch',
      optional(field('exception', $.identifier)),
      field('body', choice($.statement_block, $._statement))
    ),

    finally_clause: $ => seq(
      'finally',
      field('body', choice($.statement_block, $._statement))
    ),

    switch_statement: $ => seq(
      'switch',
      field('value', $._expression),
      '{',
      repeat($.case_clause),
      optional($.default_clause),
      '}'
    ),

    case_clause: $ => seq(
      'case',
      field('values', seq($._expression, repeat(seq(',', $._expression)))),
      ':',
      optional($.block)
    ),

    default_clause: $ => seq(
      'default',
      ':',
      optional($.block)
    ),

    function_definition: $ => prec.dynamic(10, seq(
      field('name', $.identifier),
      token.immediate('('),
      optional($.parameter_list),
      ')',
      '{',
      optional(field('body', $.block)),
      '}'
    )),

    class_definition: $ => prec.dynamic(10, seq(
      'class',
      field('name', $.identifier),
      optional(seq('extends', field('parent', $.identifier))),
      '{',
      repeat($.class_member),
      '}'
    )),

    class_member: $ => choice(
      $.comment,
      $.doc_comment,
      $.block_comment,
      $.class_definition,
      $.method_definition,
      $.class_property,
    ),

    method_definition: $ => prec.dynamic(10, seq(
      optional('static'),
      field('name', $.identifier),
      token.immediate('('),
      optional($.parameter_list),
      ')',
      '{',
      optional(field('body', $.block)),
      '}'
    )),

    class_property: $ => seq(
      optional('static'),
      field('name', $.identifier),
      optional(seq(':=', field('value', $._expression)))
    ),

    function_call: $ => prec(2, seq(
      field('name', $.identifier),
      token.immediate('('),
      optional($.argument_list),
      ')'
    )),

    member_expression: $ => prec.left(1, seq(
      field('object', choice($.identifier, $.member_expression, $.this_expression, $.base_expression)),
      token.immediate('.'),
      field('property', $.identifier)
    )),

    method_call: $ => prec(3, prec.left(2, seq(
      field('object', choice($.identifier, $.member_expression, $.this_expression, $.base_expression)),
      token.immediate('.'),
      field('method', $.identifier),
      token.immediate('('),
      optional($.argument_list),
      ')'
    ))),

    // Commands use comma syntax: MsgBox, args
    // Function calls use parens: MsgBox("args")
    // The comma after the name distinguishes command from function call
    // Command names are highlighted via #match? in highlights.scm
    command: $ => prec(2, seq(
      field('name', $.identifier),
      ',',
      optional($.command_arguments)
    )),

    // Single-line token to prevent commands from spanning lines
    // prec(15) ensures this wins over _colon_pair (prec 10) for patterns like "Gui, MyGui:Add"
    // Variable refs (%var%) are highlighted via injection in injections.scm
    command_arguments: $ => token(prec(15, /[^\r\n]+/)),

    variable_ref: $ => seq('%', $.identifier, '%'),

    parameter_list: $ => seq(
      $.parameter,
      repeat(seq(',', $.parameter))
    ),

    parameter: $ => seq(
      $.identifier,
      optional(prec(5, seq(':=', $._expression)))
    ),

    argument_list: $ => seq(
      $._expression,
      repeat(seq(',', $._expression))
    ),

    _expression: $ => choice(
      $.ternary_expression,
      $.binary_expression,
      $.unary_expression,
      $.assignment_expression,
      $.this_expression,
      $.base_expression,
      $.string,
      $.number,
      $.boolean,
      $.variable_ref,  // %var% syntax
      $.array_literal,
      $.object_literal,
      $.index_expression,
      $.member_expression,
      $.method_call,
      $.identifier,
      $.function_call,
      $.parenthesized_expression,
    ),

    // Ternary expression: condition ? consequence : alternative
    ternary_expression: $ => prec.right(1, seq(
      field('condition', $._expression),
      '?',
      field('consequence', $._expression),
      ':',
      field('alternative', $._expression)
    )),

    // Binary expressions with operator precedence
    binary_expression: $ => choice(
      // Logical OR (precedence 2) - case-insensitive for AutoHotkey
      prec.left(2, seq(field('left', $._expression), choice('||', /or/i), field('right', $._expression))),
      // Logical AND (precedence 3) - case-insensitive for AutoHotkey
      prec.left(3, seq(field('left', $._expression), choice('&&', /and/i), field('right', $._expression))),
      // Bitwise OR (precedence 4)
      prec.left(4, seq(field('left', $._expression), '|', field('right', $._expression))),
      // Bitwise XOR (precedence 5)
      prec.left(5, seq(field('left', $._expression), '^', field('right', $._expression))),
      // Bitwise AND (precedence 6)
      prec.left(6, seq(field('left', $._expression), '&', field('right', $._expression))),
      // Equality (precedence 7)
      prec.left(7, seq(field('left', $._expression), choice('=', '==', '!=', '<>'), field('right', $._expression))),
      // Comparison (precedence 8)
      prec.left(8, seq(field('left', $._expression), choice('<', '>', '<=', '>='), field('right', $._expression))),
      // Bitwise shift (precedence 9)
      prec.left(9, seq(field('left', $._expression), choice('<<', '>>'), field('right', $._expression))),
      // Addition/Subtraction (precedence 10)
      prec.left(10, seq(field('left', $._expression), choice('+', '-'), field('right', $._expression))),
      // Multiplication/Division (precedence 11)
      prec.left(11, seq(field('left', $._expression), choice('*', '/', '//', '%'), field('right', $._expression))),
      // Concatenation (precedence 10)
      prec.left(10, seq(field('left', $._expression), '.', field('right', $._expression))),
      // Power (precedence 12, RIGHT associative)
      prec.right(12, seq(field('left', $._expression), '**', field('right', $._expression))),
    ),

    // Unary expressions
    unary_expression: $ => prec(13, choice(
      seq('!', $._expression),
      seq(/not/i, $._expression),
      seq('~', $._expression),
      seq('-', $._expression),
    )),

    // Assignment expression - prec(1) ensures higher precedence than identifier's prec(-1)
    // continuation_section first in choice to match multiline parens before parenthesized_expression
    assignment_expression: $ => prec.right(1, seq(
      field('left', choice($.identifier, $.member_expression, $.index_expression)),
      field('operator', choice(':=', '+=', '-=', '*=', '/=', '.=')),
      field('right', choice($.continuation_section, $._expression))
    )),

    this_expression: $ => 'this',
    base_expression: $ => 'base',

    boolean: $ => choice('true', 'false'),

    array_literal: $ => prec(2, seq(
      '[',
      optional(seq(
        $._expression,
        repeat(seq(',', $._expression))
      )),
      ']'
    )),

    object_literal: $ => prec(2, seq(
      '{',
      optional(seq(
        $.object_property,
        repeat(seq(',', $.object_property))
      )),
      '}'
    )),

    object_property: $ => choice(
      seq(
        field('key', choice($.identifier, $.string, $.number)),
        ':',
        field('value', $._expression)
      ),
      field('key', $.identifier)
    ),

    index_expression: $ => prec.left(1, seq(
      field('object', choice($.identifier, $.member_expression, $.index_expression)),
      token.immediate('['),
      field('index', $._expression),
      ']'
    )),

    string: $ => choice(
      seq('"', repeat(choice($.escape_sequence, /[^"`]+/)), '"'),
      seq("'", repeat(choice($.escape_sequence, /[^'`]+/)), "'"),
    ),

    escape_sequence: $ => token(seq(
      '`',
      choice('n', 't', 'r', '`', '"', "'")
    )),

    number: $ => choice(
      /0[xX][0-9a-fA-F]+/,
      /\d+\.\d+/,
      /\d+/,
    ),

    keyword: $ => choice(
      // Control flow keywords (if, else, while, loop, for) now have dedicated rules
      // Class keywords (class, extends) now have dedicated rules
      // Logical keywords (and, or, not) now handled in binary/unary expressions
      // Case-insensitive because AutoHotkey is case-insensitive
      /return/i, /break/i, /continue/i, /goto/i, /gosub/i,
      /global/i, /local/i, /static/i,
      /throw/i,
      /new/i,
    ),

    operator: $ => choice(
      // Assignment
      ':=', '+=', '-=', '*=', '/=', '.=',
      // Comparison
      '=', '==', '!=', '<>', '>=', '<=', '>', '<',
      // Arithmetic
      '//', '**', '+', '-', '*', '/', '%',
      // Logical
      '&&', '||', '!',
      // Bitwise
      '>>', '<<', '&', '|', '^', '~',
      // Ternary (only ?, colon conflicts with labels)
      '?',
    ),

    identifier: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,

    // Remaining punctuation - NOT parens/brackets/braces which have semantic meaning
    _punctuation: $ => /[.,@$\\]+/,

    // Continuation section: multiline content in parens
    // Pattern matches lines that are NOT just "whitespace + )" (the closing line)
    // Line types matched by the repeat:
    //   - Content lines: whitespace + non-whitespace-non-) + rest of line + newline
    //   - Empty lines: just whitespace + newline (or just newline)
    // The closing ) must be on its own line (whitespace + ))
    continuation_section: $ => token(/\((?:[ \t]*[^ \t)\n][^\n]*\n|[ \t]*\n)+[ \t]*\)/),
  }
});

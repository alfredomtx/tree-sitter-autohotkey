module.exports = grammar({
  name: 'autohotkey',

  extras: $ => [
    /\s/,
  ],

  conflicts: $ => [
    [$.parameter, $._expression],
    [$.command],
  ],

  rules: {
    source_file: $ => repeat($._statement),

    _statement: $ => choice(
      $.comment,
      $.doc_comment,
      $.block_comment,
      $.directive,
      $.hotkey,
      $.label,
      $.class_definition,
      $.function_definition,
      // Control flow statements (before keyword!)
      $.if_statement,
      $.while_statement,
      $.loop_statement,
      $.for_statement,
      $.try_statement,
      $.method_call,
      $.member_expression,
      $.index_expression,
      $.function_call,
      $.command,
      $.array_literal,
      $.string,
      $.number,
      // NOTE: parenthesized_expression removed from _statement to reduce state count
      // It's still in _expression for conditions
      $.keyword,
      $.operator,
      prec(3, $.builtin_variable),
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

    directive: $ => seq(
      '#',
      $.identifier,
      optional(/[^\n]*/)
    ),

    // Hotkey: modifiers + key + ::
    hotkey: $ => token(seq(
      optional(/[#!^+<>*~$]+/),
      /[a-zA-Z0-9]+/,
      '::'
    )),

    // Label: identifier followed by single colon at end of meaningful content
    label: $ => seq(
      field('name', $.identifier),
      token.immediate(':')
    ),

    block: $ => repeat1($._statement),

    // Parenthesized expression for conditions
    parenthesized_expression: $ => seq('(', $._expression, ')'),

    // Statement block (braces + optional statements) for control flow
    statement_block: $ => seq('{', optional($.block), '}'),

    // Control flow statements
    if_statement: $ => prec.right(seq(
      'if',
      field('condition', $.parenthesized_expression),
      field('consequence', $.statement_block),
      optional(field('alternative', $.else_clause))
    )),

    else_clause: $ => seq(
      'else',
      choice($.if_statement, $.statement_block)
    ),

    while_statement: $ => seq(
      'while',
      field('condition', $.parenthesized_expression),
      field('body', $.statement_block)
    ),

    loop_statement: $ => seq(
      'loop',
      optional(field('count', choice($.number, $.identifier))),
      field('body', $.statement_block)
    ),

    for_statement: $ => seq(
      'for',
      field('key', $.identifier),
      optional(seq(',', field('value', $.identifier))),
      'in',
      field('collection', $._expression),
      field('body', $.statement_block)
    ),

    try_statement: $ => seq(
      'try',
      field('body', $.statement_block),
      optional($.catch_clause),
      optional($.finally_clause)
    ),

    catch_clause: $ => seq(
      'catch',
      optional(field('exception', $.identifier)),
      field('body', $.statement_block)
    ),

    finally_clause: $ => seq(
      'finally',
      field('body', $.statement_block)
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
      field('body', $.class_body)
    )),

    class_body: $ => seq(
      '{',
      repeat($.class_member),
      '}'
    ),

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
    command: $ => prec(2, seq(
      field('name', alias($._command_name_pattern, $.command_name)),
      ',',
      optional($.command_arguments)
    )),

    // Internal pattern for command names - only used within command rule
    _command_name_pattern: $ => token(choice(
      /MsgBox|InputBox|ToolTip|TrayTip/,
      /Send|SendInput|SendRaw|SendEvent|SendPlay/,
      /Sleep|SetTimer|Pause|Suspend/,
      /Run|RunWait|Reload|ExitApp/,
      /WinActivate|WinWait|WinClose|WinMinimize|WinMaximize/,
      /FileRead|FileAppend|FileDelete|FileCopy|FileMove/,
      /RegRead|RegWrite|RegDelete/,
      /IniRead|IniWrite/,
      /Gui|GuiControl/,
      /SetWorkingDir|CoordMode|SetFormat|SetBatchLines/,
      /SetDefaultMouseSpeed|SetWinDelay|SetControlDelay/,
      /Gosub|Goto/,
    )),

    command_arguments: $ => prec.left(1, repeat1(choice(
      $.variable_ref,
      $.string,
      alias(token(prec(3, /\d+\.?\d*|0[xX][0-9a-fA-F]+/)), $.number),  // Inline number with high precedence
      ',',
      /[^\s,\n%"'0-9][^\s,\n%"']*/,  // Exclude leading digits so numbers match above
    ))),

    variable_ref: $ => seq('%', choice(prec(3, $.builtin_variable), $.identifier), '%'),

    parameter_list: $ => seq(
      $.parameter,
      repeat(seq(',', $.parameter))
    ),

    parameter: $ => seq(
      $.identifier,
      optional(seq(':=', $._expression))
    ),

    argument_list: $ => seq(
      $._expression,
      repeat(seq(',', $._expression))
    ),

    _expression: $ => choice(
      $.this_expression,
      $.base_expression,
      $.string,
      $.number,
      prec(3, $.builtin_variable),
      $.array_literal,
      $.index_expression,
      $.member_expression,
      $.method_call,
      $.identifier,
      $.function_call,
      $.parenthesized_expression,
    ),

    this_expression: $ => 'this',
    base_expression: $ => 'base',

    array_literal: $ => prec(2, seq(
      '[',
      optional(seq(
        $._expression,
        repeat(seq(',', $._expression))
      )),
      ']'
    )),

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
      'return', 'break', 'continue', 'goto', 'gosub',
      'global', 'local', 'static',
      'throw',
      'new', 'true', 'false',
      'and', 'or', 'not',
    ),

    operator: $ => choice(
      // Assignment
      ':=', '+=', '-=', '*=', '/=', '.=',
      // Comparison
      '==', '!=', '<>', '>=', '<=', '>', '<',
      // Arithmetic
      '//', '**', '+', '-', '*', '/', '%',
      // Logical
      '&&', '||', '!',
      // Bitwise
      '>>', '<<', '&', '|', '^', '~',
      // Ternary (only ?, colon conflicts with labels)
      '?',
    ),

    // Explicit low precedence so builtin_variable wins
    identifier: $ => token(prec(-1, /[a-zA-Z_][a-zA-Z0-9_]*/)),

    // Use choice() of multiple token(prec(3,...)) groups - matching command_name structure
    builtin_variable: $ => choice(
      token(prec(3, /A_ScriptDir|A_Now|A_TickCount/)),
      token(prec(3, /A_TimeIdle|A_AhkVersion|A_ComSpec/)),
      token(prec(3, /Clipboard|ErrorLevel/)),
    ),

    // Remaining punctuation - NOT parens/brackets/braces which have semantic meaning
    _punctuation: $ => /[.,@$\\]+/,
  }
});

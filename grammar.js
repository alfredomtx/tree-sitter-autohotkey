module.exports = grammar({
  name: 'autohotkey',

  extras: $ => [
    /\s/,
  ],

  // Removed word: $ => $.identifier (keyword extraction)

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
      $.function_definition,
      $.method_call,
      $.member_expression,
      $.index_expression,
      $.function_call,
      $.command,
      $.array_literal,
      $.string,
      $.number,
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

    function_definition: $ => prec(2, seq(
      field('name', $.identifier),
      token.immediate('('),
      optional($.parameter_list),
      ')',
      '{',
      repeat($._statement),
      '}'
    )),

    function_call: $ => prec(2, seq(
      field('name', $.identifier),
      token.immediate('('),
      optional($.argument_list),
      ')'
    )),

    member_expression: $ => prec.left(1, seq(
      field('object', choice($.identifier, $.member_expression)),
      token.immediate('.'),
      field('property', $.identifier)
    )),

    method_call: $ => prec(3, prec.left(2, seq(
      field('object', choice($.identifier, $.member_expression)),
      token.immediate('.'),
      field('method', $.identifier),
      token.immediate('('),
      optional($.argument_list),
      ')'
    ))),

    command: $ => prec(2, seq(
      field('name', $.command_name),
      optional(seq(
        ',',
        optional($.command_arguments)
      ))
    )),

    // Split into multiple token() groups to avoid regex length limit in tree-sitter-wasm
    command_name: $ => choice(
      token(prec(3, /MsgBox|InputBox|ToolTip|TrayTip/)),
      token(prec(3, /Send|SendInput|SendRaw|SendEvent|SendPlay/)),
      token(prec(3, /Sleep|SetTimer|Pause|Suspend/)),
      token(prec(3, /Run|RunWait|Reload|ExitApp/)),
      token(prec(3, /WinActivate|WinWait|WinClose|WinMinimize|WinMaximize/)),
      token(prec(3, /FileRead|FileAppend|FileDelete|FileCopy|FileMove/)),
      token(prec(3, /RegRead|RegWrite|RegDelete/)),
      token(prec(3, /IniRead|IniWrite/)),
      token(prec(3, /Gui|GuiControl/)),
      token(prec(3, /SetWorkingDir|CoordMode|SetFormat|SetBatchLines/)),
      token(prec(3, /SetDefaultMouseSpeed|SetWinDelay|SetControlDelay/)),
      token(prec(3, /Gosub|Goto/)),
    ),

    command_arguments: $ => prec.left(repeat1(choice(
      $.variable_ref,
      $.string,
      $.number,
      ',',
      /[^\s,\n%"']+/,
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
      $.string,
      $.number,
      prec(3, $.builtin_variable),
      $.array_literal,
      $.index_expression,
      $.member_expression,
      $.method_call,
      $.identifier,
      $.function_call,
    ),

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
      'if', 'else', 'while', 'loop', 'for',
      'return', 'break', 'continue', 'goto', 'gosub',
      'class', 'extends',
      'global', 'local', 'static',
      'try', 'catch', 'finally', 'throw',
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

    // Remaining punctuation (braces, dots, commas) - NOT parens/brackets which have semantic meaning
    _punctuation: $ => /[{}.,@$\\]+/,
  }
});

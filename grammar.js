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
      $.function_call,
      $.command,
      $.string,
      $.number,
      $.keyword,
      $.operator,
      $.builtin_variable,
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

    function_definition: $ => seq(
      field('name', $.identifier),
      token.immediate('('),
      optional($.parameter_list),
      ')',
      '{',
      repeat($._statement),
      '}'
    ),

    function_call: $ => seq(
      field('name', $.identifier),
      token.immediate('('),
      optional($.argument_list),
      ')'
    ),

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

    variable_ref: $ => seq('%', choice($.builtin_variable, $.identifier), '%'),

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
      $.builtin_variable,
      $.identifier,
      $.function_call,
    ),

    string: $ => choice(
      seq('"', /[^"]*/, '"'),
      seq("'", /[^']*/, "'"),
    ),

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

    identifier: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,

    // MINIMAL TEST - just a few built-in variables to test if rule works at all
    builtin_variable: $ => token(/A_ScriptDir|A_Now|A_TickCount|Clipboard|ErrorLevel/),

    // Remaining punctuation (braces, brackets, parens, dots, commas)
    _punctuation: $ => /[(){}\[\].,@$\\]+/,
  }
});

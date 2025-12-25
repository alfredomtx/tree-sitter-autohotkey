module.exports = grammar({
  name: 'autohotkey',

  extras: $ => [
    /\s/,
  ],

  word: $ => $.identifier,

  conflicts: $ => [
    [$.parameter, $._expression],
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
      $.string,
      $.number,
      $.keyword,
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

    identifier: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,

    // Punctuation and operators - NO braces, NO ^, NO :
    _punctuation: $ => /[:=(){}\[\]]+|[+\-*\/%<>=!&|~.,@$?\\]+/,
  }
});

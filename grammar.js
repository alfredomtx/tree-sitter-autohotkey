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
      $._operator,
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

    directive: $ => seq(
      '#',
      $.identifier,
      optional(/[^\n]*/)
    ),

    hotkey: $ => seq(
      optional(/[#!^+<>*~$]+/),
      /[a-zA-Z0-9]+/,
      '::'
    ),

    label: $ => seq(
      field('name', $.identifier),
      token.immediate(':'),
    ),

    function_definition: $ => seq(
      field('name', $.identifier),
      '(',
      optional($.parameter_list),
      ')',
      '{',
      repeat($._statement),
      '}'
    ),

    function_call: $ => prec(1, seq(
      field('name', $.identifier),
      '(',
      optional($.argument_list),
      ')'
    )),

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

    // Operators and punctuation
    _operator: $ => /:=|[+\-*\/%<>=!&|^~.,@$?\\{}\[\]]+/,
  }
});

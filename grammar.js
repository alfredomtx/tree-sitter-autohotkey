module.exports = grammar({
  name: 'autohotkey',

  extras: $ => [
    /\s/,
  ],

  word: $ => $.identifier,

  rules: {
    source_file: $ => repeat($._statement),

    _statement: $ => choice(
      $.comment,
      $.block_comment,
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
    _operator: $ => /:=|[+\-*\/%<>=!&|^~.,:#@$?\\(){}\[\]]+/,
  }
});

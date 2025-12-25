module.exports = grammar({
  name: 'autohotkey',

  extras: $ => [
    /\s/,
  ],

  rules: {
    source_file: $ => repeat($._statement),

    _statement: $ => choice(
      $.comment,
      $.block_comment,
      $.string,
      $.number,
      $._text,
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

    // Identifiers and operators (catch-all tokens)
    _text: $ => /[a-zA-Z_][a-zA-Z0-9_]*|:=|[+\-*\/%<>=!&|^~.,:#@$?\\(){}\[\]]+/,
  }
});

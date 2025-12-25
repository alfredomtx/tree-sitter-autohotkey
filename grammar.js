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

    // Catch-all for non-comment text (temporary for MVP)
    _text: $ => /[^;\s\/][^\n]*/,
  }
});

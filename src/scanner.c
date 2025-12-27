#include "tree_sitter/parser.h"
#include <wctype.h>

/**
 * External scanner for AutoHotkey grammar.
 *
 * Purpose: Detect when a return statement should NOT consume an identifier
 * that is actually a label on the next line.
 *
 * Problem: The grammar uses `extras: [/\s/]` which consumes all whitespace
 * including newlines. When `return_statement` has `optional($._expression)`,
 * it greedily consumes identifiers from subsequent lines before seeing the
 * colon that would indicate a label.
 *
 * Solution: This scanner looks ahead after newlines for "identifier:" patterns.
 * When found, it emits a zero-width STATEMENT_END token that terminates the
 * return statement before the label.
 */

enum TokenType {
  STATEMENT_END,
};

void *tree_sitter_autohotkey_external_scanner_create() {
  return NULL;
}

void tree_sitter_autohotkey_external_scanner_destroy(void *payload) {
}

unsigned tree_sitter_autohotkey_external_scanner_serialize(void *payload, char *buffer) {
  return 0;
}

void tree_sitter_autohotkey_external_scanner_deserialize(void *payload, const char *buffer, unsigned length) {
}

static bool is_identifier_start(int32_t c) {
  return iswalpha(c) || c == '_';
}

static bool is_identifier_char(int32_t c) {
  return iswalnum(c) || c == '_';
}

bool tree_sitter_autohotkey_external_scanner_scan(
  void *payload,
  TSLexer *lexer,
  const bool *valid_symbols
) {
  if (!valid_symbols[STATEMENT_END]) {
    return false;
  }

  // Skip horizontal whitespace (spaces and tabs)
  while (lexer->lookahead == ' ' || lexer->lookahead == '\t') {
    lexer->advance(lexer, true);
  }

  // Must be at a newline to proceed
  if (lexer->lookahead != '\n' && lexer->lookahead != '\r') {
    return false;
  }

  // Mark the end position here - token will be zero-width at current position
  lexer->mark_end(lexer);

  // Consume the newline
  if (lexer->lookahead == '\r') {
    lexer->advance(lexer, true);
  }
  if (lexer->lookahead == '\n') {
    lexer->advance(lexer, true);
  }

  // Skip any additional blank lines and whitespace
  while (lexer->lookahead == '\n' || lexer->lookahead == '\r' ||
         lexer->lookahead == ' ' || lexer->lookahead == '\t') {
    lexer->advance(lexer, true);
  }

  // Check for EOF
  if (lexer->eof(lexer)) {
    return false;
  }

  // Check if next content starts with an identifier character
  if (!is_identifier_start(lexer->lookahead)) {
    return false;
  }

  // Scan through the identifier
  while (is_identifier_char(lexer->lookahead)) {
    lexer->advance(lexer, true);
  }

  // Check if followed immediately by a colon (label syntax)
  if (lexer->lookahead == ':') {
    // This looks like a label - emit STATEMENT_END at the marked position
    // to terminate the previous statement before the label
    lexer->result_symbol = STATEMENT_END;
    return true;
  }

  return false;
}

#include "tree_sitter/parser.h"
#include <wctype.h>
#include <string.h>
#include <stdlib.h>

/**
 * External scanner for AutoHotkey grammar.
 *
 * Purpose 1: Detect statement boundaries to prevent return statements and commands
 * from consuming identifiers that start labels or commands on subsequent lines.
 *
 * Problem: The grammar uses `extras: [/\s/]` which consumes all whitespace
 * including newlines. When `return_statement` has `optional($._expression)`,
 * it greedily consumes identifiers from subsequent lines before seeing the
 * colon that would indicate a label. Similarly, `command` with `optional(command_arguments)`
 * would consume subsequent command names as identifiers in arguments.
 *
 * Solution: This scanner looks ahead after newlines for "identifier:" (label) or
 * "identifier," (command) patterns. When found, it emits a zero-width STATEMENT_END
 * token that terminates the return statement or command before the next statement.
 *
 * Purpose 2: Enable sub-expression highlighting in force expressions.
 *
 * Problem: Force expressions (% expression) in commands need to parse the expression
 * structure (not as terminal token) to enable syntax highlighting of sub-expressions.
 *
 * Solution: Scanner emits FORCE_EXPR_START when detecting % <space> pattern, then
 * grammar uses $._expression to parse the content, then scanner emits FORCE_EXPR_BOUNDARY
 * when detecting comma or newline terminator. This gives the parser the context it needs
 * to correctly parse ternary expressions without committing too early.
 */

enum TokenType {
  STATEMENT_END,
  FORCE_EXPR_START,     // % followed by space/tab
  FORCE_EXPR_BOUNDARY,  // , or newline terminating force expression
};

typedef struct {
  bool in_force_expression;
} Scanner;

void *tree_sitter_autohotkey_external_scanner_create() {
  Scanner *scanner = (Scanner *)calloc(1, sizeof(Scanner));
  scanner->in_force_expression = false;
  return scanner;
}

void tree_sitter_autohotkey_external_scanner_destroy(void *payload) {
  if (payload) {
    free(payload);
  }
}

unsigned tree_sitter_autohotkey_external_scanner_serialize(void *payload, char *buffer) {
  Scanner *scanner = (Scanner *)payload;
  if (scanner && buffer) {
    buffer[0] = scanner->in_force_expression ? 1 : 0;
    return 1;
  }
  return 0;
}

void tree_sitter_autohotkey_external_scanner_deserialize(void *payload, const char *buffer, unsigned length) {
  Scanner *scanner = (Scanner *)payload;
  if (scanner && buffer && length > 0) {
    scanner->in_force_expression = buffer[0] == 1;
  }
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
  Scanner *scanner = (Scanner *)payload;

  // Detect force expression start: % <space>
  if (valid_symbols[FORCE_EXPR_START] && !scanner->in_force_expression) {
    if (lexer->lookahead == '%') {
      lexer->advance(lexer, false);

      // Check for space or tab after %
      if (lexer->lookahead == ' ' || lexer->lookahead == '\t') {
        // Mark end BEFORE consuming space (space becomes part of next token)
        lexer->mark_end(lexer);

        // Consume the space
        lexer->advance(lexer, true);

        // Set state
        scanner->in_force_expression = true;
        lexer->result_symbol = FORCE_EXPR_START;
        return true;
      }
    }
  }

  // Detect force expression boundary: , or newline
  if (valid_symbols[FORCE_EXPR_BOUNDARY] && scanner->in_force_expression) {
    // Skip horizontal whitespace to reach boundary
    while (lexer->lookahead == ' ' || lexer->lookahead == '\t') {
      lexer->advance(lexer, true);
    }

    // Zero-width token at boundary
    if (lexer->lookahead == ',' || lexer->lookahead == '\n' ||
        lexer->lookahead == '\r' || lexer->eof(lexer)) {

      lexer->mark_end(lexer);  // Zero-width
      scanner->in_force_expression = false;
      lexer->result_symbol = FORCE_EXPR_BOUNDARY;
      return true;
    }
  }

  // Existing STATEMENT_END logic
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

  // Check for block delimiters - these always terminate previous statement
  if (lexer->lookahead == '{' || lexer->lookahead == '}') {
    lexer->result_symbol = STATEMENT_END;
    return true;
  }

  // Check if next content starts with an identifier character
  if (!is_identifier_start(lexer->lookahead)) {
    return false;
  }

  // Scan through the identifier
  while (is_identifier_char(lexer->lookahead)) {
    lexer->advance(lexer, true);
  }

  // Check if followed by colon (label), comma (command), or dot (method call)
  if (lexer->lookahead == ':' || lexer->lookahead == ',' || lexer->lookahead == '.') {
    // This looks like a label or command - emit STATEMENT_END at the marked position
    // to terminate the previous statement
    lexer->result_symbol = STATEMENT_END;
    return true;
  }

  return false;
}

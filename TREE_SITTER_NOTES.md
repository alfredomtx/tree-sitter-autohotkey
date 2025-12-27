# Tree-sitter Grammar Notes

Technical details, pitfalls, and lessons learned while developing this tree-sitter grammar for Zed.

## Pitfalls

### Use `word` token for major parser optimization

**Background:** The `word: $ => $.identifier` declaration enables tree-sitter's keyword extraction optimization. Early experiments showed interference with `token()` rules using `choice()` of string literals.

**Current solution:** Use `word` with regex-based token patterns (not string literal choices):

```javascript
// This grammar uses:
word: $ => $.identifier,  // Enables keyword extraction - 41% parser size reduction!

// Commands use regex patterns, not string literal choices
_command_name_pattern: $ => token(
  /MsgBox|InputBox|ToolTip|.../  // Single regex, not choice('MsgBox', 'Sleep', ...)
),
command: $ => seq(alias($._command_name_pattern, $.command_name), ...),
```

**Key insight:** The `word` rule interferes with `choice('literal1', 'literal2', ...)` patterns, but works fine with `token(/regex/)` patterns. Using regex-based patterns for commands allows us to keep the `word` optimization.

### Use `prec.dynamic()` for function_definition to beat function_call

**Problem:** With `prec(3)` on function_definition and `prec(2)` on function_call, functions still parse as function_call when there's content after them (like another identifier or function).

**Root cause:** Tree-sitter's static precedence (`prec()`) doesn't always resolve ambiguity when both rules produce valid parses. The parser may choose function_call because it's "simpler" in some global optimization sense.

**Solution:** Use `prec.dynamic()` which applies precedence at parse time:
```javascript
// WRONG - static precedence doesn't always win
function_definition: $ => prec(3, seq(...)),

// CORRECT - dynamic precedence ensures function_definition wins
function_definition: $ => prec.dynamic(10, seq(...)),
```

### Use GLR conflict for function call vs definition with `:=` arguments

**Problem:** `MyFunc(x := 10)` was parsed as ERROR because tree-sitter committed to `function_definition` (expecting `{` after `)`) instead of falling back to `function_call`.

**Root cause:** The syntax `x := 10` is ambiguous:
- In `parameter` (for function_definition): `identifier + optional(:= expression)`
- In `assignment_expression` (for function_call): `left := right`

Tree-sitter was choosing `parameter` by default, committing to `function_definition`, then failing when no `{` was found.

**Solution:** Use GLR conflict with equal precedence to explore both paths in parallel:

```javascript
// Add explicit conflict between parameter and assignment_expression
conflicts: $ => [
  [$.parameter, $.assignment_expression],  // func(x := 10) could be def or call
],

// Use dynamic precedence on both rules
function_definition: $ => prec.dynamic(10, seq(...)),  // Higher precedence
function_call: $ => prec.dynamic(5, seq(...)),         // Lower precedence

// Give parameter's := same precedence as assignment_expression
parameter: $ => seq(
  $.identifier,
  optional(prec.right(1, seq(':=', $._expression)))  // Same as assignment_expression
),

assignment_expression: $ => prec.right(1, seq(...)),  // Already has prec.right(1)
```

**How it works:**
1. Parser sees `MyFunc(x := 10)`
2. GLR explores BOTH paths in parallel:
   - Path A: `parameter` → `parameter_list` → `function_definition`
   - Path B: `assignment_expression` → `argument_list` → `function_call`
3. After `)`, parser checks what follows:
   - If `{`: Path A (function_definition) completes successfully
   - If no `{`: Path B (function_call) completes, Path A fails
4. Dynamic precedence ensures function_definition wins when BOTH are valid (rare case where function call is followed by `{ }` on next line)

**Key insight:** The conflict declaration is what enables GLR parsing. Without it, tree-sitter commits to one path early and doesn't backtrack. The equal static precedence (`prec.right(1)`) on both parameter and assignment_expression is what triggers tree-sitter to see the conflict.

### Commands must require comma to distinguish from function calls

**Problem:** `MsgBox("Hello")` looks like a function call but `MsgBox` is a command name. If command_name has high token precedence, it steals the identifier from function_call, breaking function definitions that contain such calls.

**Solution:** Make commands require comma syntax. This naturally distinguishes:
- `MsgBox, Hello` → command (comma after name)
- `MsgBox("Hello")` → would be function_call syntax (don't use this)

```javascript
// Command requires comma - clearly not a function call
command: $ => prec(2, seq(
  field('name', alias($._command_name_pattern, $.command_name)),
  ',',
  optional($.command_arguments)
)),

// Internal pattern - no token precedence to interfere
_command_name_pattern: $ => token(choice(
  /MsgBox|InputBox|.../,
)),
```

### Avoid high token precedence on patterns that overlap with identifiers

**Problem:** Using `token(prec(3, /MsgBox|.../))` for command_name causes the lexer to tokenize `MsgBox` as command_name even in contexts where it should be an identifier (like inside function bodies).

**Solution:** Use internal patterns (prefixed with `_`) without token precedence, exposed via `alias()`:
```javascript
// WRONG - high precedence steals from identifier in all contexts
command_name: $ => token(prec(3, /MsgBox|Sleep|Run/)),

// CORRECT - internal pattern, exposed only in command context
_command_name_pattern: $ => token(choice(/MsgBox|Sleep|Run/)),
command: $ => seq(alias($._command_name_pattern, $.command_name), ',', ...),
```

### Keep individual regex patterns short - use choice() to combine groups

**Problem:** Very long regex patterns (40+ alternatives) in a single `token()` can fail silently in tree-sitter-wasm/Zed. The grammar generates fine but highlighting doesn't work.

**Solution:** Split into logical groups combined with `choice()`:

```javascript
// WRONG - too many alternatives in one regex
_command_name_pattern: $ => token(/MsgBox|InputBox|...|ExitApp/),  // 40+ items

// CORRECT - split into groups of ~5 items each
_command_name_pattern: $ => token(choice(
  /MsgBox|InputBox|ToolTip|TrayTip/,
  /Send|SendInput|SendRaw|SendEvent|SendPlay/,
  /Sleep|SetTimer|Pause|Suspend/,
  /Run|RunWait|Reload|ExitApp/,
  // ... more groups
)),
```

### Rules in `_expression` must also be in `_statement` for top-level parsing

**Problem:** Adding a new rule to `_expression` doesn't make it parse at the top level. The parser will fall back to simpler matches (like `identifier` + `_punctuation`).

**Example:** Adding `member_expression` to parse `obj.name`:
```javascript
// WRONG - member_expression only in _expression
_expression: $ => choice(
  $.member_expression,  // Added here
  $.identifier,
  ...
),

_statement: $ => choice(
  $.function_call,
  $.identifier,
  $._punctuation,  // "." matches here instead!
  ...
),
```

With the above, `obj.name` parses as three separate tokens:
- `obj` → identifier
- `.` → punctuation (from `_punctuation: $ => /[(){}\[\].,@$\\]+/`)
- `name` → identifier

**Solution:** Add the rule to BOTH `_expression` AND `_statement`:
```javascript
_statement: $ => choice(
  $.method_call,        // Before function_call for precedence
  $.member_expression,  // Before identifier so it wins
  $.function_call,
  $.identifier,
  $._punctuation,
  ...
),
```

**Key insight:** `_expression` is only reachable through specific contexts (function arguments, parameter defaults). Top-level statements go through `_statement`.

### Current conflicts

The grammar uses these conflicts:

```javascript
conflicts: $ => [
  [$.parameter, $._expression],  // Parameter vs expression in function signatures
  [$.variable_ref, $.operator],  // % can start variable_ref or be modulo operator
],
```

The `[$.variable_ref, $.operator]` conflict is needed because `%` is ambiguous - it could be the modulo operator or the start of a variable reference like `%myVar%`.

### Remove `()[]` from `_punctuation` to enable empty function calls and arrays

**Problem:** `MyFunc()` parses as just `identifier`, and `arr := []` doesn't recognize the array literal. The `()` and `[]` are being consumed by `_punctuation` before `function_call` or `array_literal` can match.

**Solution:** Remove parentheses and brackets from `_punctuation`:
```javascript
// WRONG - eats () and [] before semantic rules match
_punctuation: $ => /[(){}\[\].,@$\\]+/,

// CORRECT - let function_call, array_literal, etc. handle these
_punctuation: $ => /[{}.,@$\\]+/,
```

**Why this happens:** Tree-sitter commits to matching `identifier` for `MyFunc`, then looks for the next token. If `_punctuation` matches `()`, the parser never backtracks to try `function_call` as a unit.

### Use inline tokens with precedence for patterns inside `repeat1(choice(...))`

**Problem:** In `command_arguments`, numbers like `1000` are captured by a catch-all regex instead of `$.number`, so they don't get number highlighting.

**Root cause:** Even with `$.number` listed before the catch-all in the choice, tree-sitter may prefer the catch-all for various reasons.

**Solution:** Use an inline token with explicit precedence and alias it to the desired node type:
```javascript
// WRONG - $.number may not win over catch-all
command_arguments: $ => repeat1(choice(
  $.number,
  /[^\s,\n%"'][^\s,\n%"']*/,  // catch-all
)),

// CORRECT - inline token with high precedence, aliased to number
command_arguments: $ => repeat1(choice(
  alias(token(prec(3, /\d+\.?\d*|0[xX][0-9a-fA-F]+/)), $.number),
  /[^\s,\n%"'0-9][^\s,\n%"']*/,  // catch-all excludes leading digits
)),
```

**Bonus:** Also exclude leading digits from the catch-all pattern to ensure numbers can only match via the number rule.

### Implicit concatenation must exclude statement-starting expressions

**Problem:** AutoHotkey v1 supports implicit string concatenation where adjacent expressions are automatically concatenated:
```ahk
options .= listOption.getName() "|" (isSelected ? "|" : "")
```

**Challenge:** Tree-sitter's `extras: [/\s/]` consumes all whitespace including newlines, so the parser can't distinguish between "expressions on separate lines" and "expressions in same statement being concatenated."

**Initial (broken) approach:**
```javascript
// ALL expression types in _concatenatable
_concatenatable: $ => choice(
  $.string, $.number, $.identifier, $.member_expression, ...
),
concatenation_expression: $ => prec.left(10, seq(
  choice($._concatenatable, $.concatenation_expression),
  $._concatenatable
)),
```

This caused cross-line concatenation:
```ahk
a := 1
b := 2  ; b was being concatenated with 1 above!
```

**Solution:** Exclude expression types that can start new statements (identifier, member_expression, index_expression):
```javascript
_concatenatable: $ => choice(
  $.string,
  $.number,
  $.variable_ref,     // %var% syntax - clearly not a new statement
  $.function_call,    // func() - complete expression
  $.method_call,      // obj.method() - complete expression
  $.parenthesized_expression,  // (...) - clearly part of current expr
),
```

**Key insight:** Include only "complete" expressions that can't possibly start a new statement:
- Strings/numbers: literals are never statement starters
- function_call/method_call: include trailing parens, so clearly complete
- parenthesized_expression: starts with `(`, can't be confused with statement
- Exclude identifier: could be followed by `:=` on next line
- Exclude member_expression: `this.foo` on next line looks like concatenation

### Implicit concat with identifier works in contained contexts only

**The limitation:** Implicit concatenation of strings with identifiers works in specific contexts, with some patterns supported and others not.

**Works:**
```ahk
test(" w" w)           ; Function call - identifier is clearly an argument
x := arr[" w" w]       ; Index expression - identifier is clearly part of index
log(prefix ": " msg)   ; Multiple concat elements in argument list
w ? value "" extra : w ; Ternary - identifier-string-identifier pattern works
```

**Doesn't work:**
```ahk
w ? "a" value : ""     ; Ternary - string-identifier pattern causes cross-line issues
```

**Why:** Tree-sitter's `extras: [/\s/]` consumes all whitespace including newlines. There's no way to distinguish same-line `" w" w` from cross-line `"str"\nid` without fundamental changes to whitespace handling.

**Ternary support:** The `_ternary_branch` rule supports `_identifier_string_concat` (e.g., `value "" extra`) but NOT `_string_identifier_concat` (e.g., `"a" value`). The string-first pattern would grab identifiers from subsequent lines, breaking consecutive ternary statements.

**Workaround for unsupported patterns:** Use explicit concatenation operator `.`:
```ahk
w ? "a" . value : ""   ; Works - explicit concat operator
```

**Implementation:** The `_string_identifier_concat` and `_identifier_string_concat` patterns are used in `argument_list` and `index_expression` via the `_argument` rule. Ternary expressions use `_ternary_branch` which only includes `_identifier_string_concat` to avoid cross-line issues.

## Debugging Tips

### Verify Zed is using the correct grammar

Zed clones from GitHub - check what it actually has:
```bash
cat grammars/autohotkey/grammar.js | grep "command_name"
```

### Test incrementally

When adding new commands or rules:
1. Start with a small set (3-5 items)
2. Verify highlighting works
3. Add more in small batches
4. If it breaks, you know which batch caused it

## Troubleshooting Extension Installation Failures

### "Failed to install dev extension: failed to compile grammar"

This error can have multiple causes. Check Zed's logs for the actual error:

**Log location (Windows):**
```
C:\Users\<username>\AppData\Local\Zed\logs\Zed.log
```

**Search for the actual error:**
```bash
grep -i "autohotkey\|grammar\|compile\|failed" "C:/Users/<username>/AppData/Local/Zed/logs/Zed.log" | tail -50
```

**Common causes:**

1. **Invalid commit hash in extension.toml**
   ```
   failed to fetch revision <hash> in directory '...\grammars\autohotkey'
   ```
   - Verify the `rev` in extension.toml matches an actual commit: `git rev-parse <short-hash>`
   - Use the full 40-character hash, not abbreviated

2. **Grammar too complex for WASM compilation**
   - Multiple `clang.exe` processes consuming GB of memory
   - Installation hangs indefinitely
   - Solution: Split large `token()` rules into smaller groups (see "Keep individual regex patterns short" above)

3. **Corrupted cache state**
   - Delete these and retry:
     ```
     <project>/grammars/
     C:\Users\<username>\AppData\Local\Zed\extensions\installed\autohotkey\
     ```

### Monitoring WASM compilation

If installation hangs, check Task Manager for `clang.exe` processes. Multiple clang processes consuming excessive memory (1GB+) indicates the grammar is too complex for WASM compilation.

### Zed cache locations (Windows)

| Path | Purpose |
|------|---------|
| `<project>/grammars/` | Git clone of grammar at specified rev |
| `%LOCALAPPDATA%\Zed\extensions\installed\` | Installed extensions |
| `%LOCALAPPDATA%\Zed\extensions\build\wasi-sdk\` | WASM SDK for compilation |
| `%LOCALAPPDATA%\Zed\logs\Zed.log` | Main log file |

## Zed Theme Highlight Group Support

### Use `@variable.special` instead of `@variable.builtin` (SOLVED)

**Problem:** `builtin_variable` nodes weren't highlighting in Zed, while `command_name` nodes worked fine with identical grammar patterns.

**Root Cause:** Zed's default themes (like "One") don't include `variable.builtin` in their syntax color definitions. The grammar was correct - Zed just had no color to apply.

**Zed theme support:**
| Capture Group | Supported |
|---------------|-----------|
| `@variable` | ✓ Yes |
| `@variable.special` | ✓ Yes |
| `@variable.builtin` | ✗ No |
| `@function.builtin` | ✓ Yes (falls back to @function) |

**Solution:** Use `@variable.special` instead of `@variable.builtin` in highlights.scm:
```scheme
; WRONG - Zed themes don't support this
(builtin_variable) @variable.builtin

; CORRECT - Zed themes support this
(builtin_variable) @variable.special
```

**What we tried that didn't help (because the grammar was never the problem):**
- Adding `prec(3)` to builtin_variable token
- Adding `prec(-1)` to identifier token
- Adding parser-level `prec(3, $.builtin_variable)` in choices
- Matching `command_name` structure with `choice()` of multiple `token()` groups

**Lesson learned:** When highlighting doesn't work, check if the capture group is supported by Zed's themes before assuming a grammar issue. Reference: [Zed Issue #22193](https://github.com/zed-industries/zed/issues/22193) documents that Zed uses non-standard captures compared to Helix/Neovim.

## Zed indents.scm Uses Different Pattern Than Helix

### Query for tokens in the node that DIRECTLY contains them

**Problem:** Language fails to load with "Impossible pattern" error in indents.scm.

**Error in Zed logs:**
```
ERROR [language::language_registry] failed to load language AutoHotkey:
Error loading indents query
    Query error at 5:19. Impossible pattern:
```

**Root Cause:** Tree-sitter queries can only match tokens that are DIRECT children of a node. If the token is inside a nested child, the query fails silently with "Impossible pattern".

**Example:** Given this grammar structure:
```javascript
if_statement: $ => seq('if', $.parenthesized_expression, $.statement_block, ...)
statement_block: $ => seq('{', optional($.block), '}')  // braces are HERE
```

The `}` is a direct child of `statement_block`, NOT `if_statement`.

```scheme
; WRONG - if_statement doesn't directly contain }
(if_statement "}" @end) @indent

; CORRECT - statement_block directly contains }
(statement_block "}" @end) @indent
```

**Debugging tip:** When you get "Impossible pattern", check if the token you're querying actually exists as a direct child of the node. Use `tree-sitter parse` to see the actual tree structure.

**Bonus:** Using `statement_block` is simpler anyway - one rule covers all control flow (if/else/while/loop/for) instead of repeating for each.

### Use `@indent` on the node, `@end` on closing delimiter

**Problem:** Indentation doesn't work - pressing Enter after `{` puts cursor at column 1.

**Root Cause:** Zed uses a different indentation pattern than Helix/Neovim:

| Editor | Pattern |
|--------|---------|
| Helix/Neovim | `@indent` on `{`, `@outdent` on `}` |
| Zed | `@indent` on parent node, `@end` on closing delimiter |

```scheme
; WRONG (Helix style) - doesn't work in Zed
(function_definition "{" @indent)
(function_definition "}" @outdent)

; CORRECT (Zed style)
(function_definition "}" @end) @indent
```

**How Zed's pattern works:**
- `@indent` on the node means "indent children of this node"
- `@end` marks the closing delimiter that ends the indented region
- `@outdent` is NOT a standard Zed capture

**Zed's supported captures:**
| Capture | Purpose |
|---------|---------|
| `@indent` | Increase indent for node's children |
| `@end` | Mark closing delimiter |
| `@indent.begin` | Alternative to `@indent` |
| `@indent.end` | Alternative to `@end` |
| `@indent.ignore` | Skip indentation for this node |

**Reference:** [Zed Language Extensions Documentation](https://zed.dev/docs/extensions/languages)

## Self-Injection for Sub-Token Highlighting

### Use injections.scm to highlight patterns inside flat tokens

**Problem:** `command_arguments` needs to stay as a flat regex `/[^\r\n]+/` to prevent multi-line parsing (tree-sitter's `extras` consumes newlines between repetitions). But we want to highlight `%var%` patterns inside it.

**Why `repeat1(choice(...))` doesn't work:**
```javascript
// WRONG - spans multiple lines because extras: [/\s/] consumes newlines
command_arguments: $ => repeat1(choice(
  $.variable_ref,
  $.string,
  $._command_text,
)),
```

Tree-sitter's `extras` automatically consume whitespace (including newlines) between tokens. Even with `prec.right(-1)`, the repeat continues across lines.

**Solution:** Self-injection - re-parse the flat token's content as AutoHotkey:

1. Keep `command_arguments` as flat regex:
```javascript
command_arguments: $ => /[^\r\n]+/,
```

2. Add `variable_ref` to `_statement` so it can parse at the top level:
```javascript
_statement: $ => choice(
  // ... other rules ...
  prec(4, $.variable_ref),  // Higher precedence than operator
  $.operator,
  // ...
),
```

3. Add conflict for `%` ambiguity:
```javascript
conflicts: $ => [
  [$.variable_ref, $.operator],
],
```

4. Create `injections.scm` to re-parse command_arguments:
```scheme
((command_arguments) @injection.content
 (#set! injection.language "autohotkey"))
```

**How it works:**
- Main parse: `MsgBox, %A_TickCount%` → `command_arguments` = `%A_TickCount%` (flat text)
- Injection: Zed re-parses `%A_TickCount%` as AutoHotkey starting from `source_file`
- The text matches `variable_ref` because it's now in `_statement`
- Highlight rules apply to the injected parse tree

**Key insight:** Self-injection lets you have a "coarse" main parse (for correct structure) and a "fine" injected parse (for detailed highlighting).

### Use grammar rules to prevent false labels in injected content

**Problem:** Self-injection of `command_arguments` causes false labels to appear in the symbol picker. For example, `GuiControl, MyGui:, MyProgress` parses `MyGui:` as a label during injection, polluting Zed's symbol picker (Ctrl+Shift+O).

**Root cause:** During injection, the entire `command_arguments` content is re-parsed as AutoHotkey. The pattern `identifier:,` matches the `label` rule, and `outline.scm` registers labels as symbol picker items.

**Solution:** Add a grammar rule that matches `identifier:,` with higher precedence than label:
```javascript
// GUI target reference (like "MyGui:," in GuiControl, MyGui:, Control)
// Matches identifier + colon + comma as a unit with higher precedence than label
gui_target: $ => prec(10, seq(
  field('gui_name', $.identifier),
  token.immediate(':'),
  token.immediate(',')
)),
```

**Why this works:**
- The `gui_target` rule has precedence 10, same as `gui_action`
- It matches `identifier:,` as a unit before `label` can match `identifier:`
- `gui_target` is NOT in `outline.scm`, so it doesn't pollute the symbol picker
- Full injection is preserved, so `%var%`, `gui_action`, `gui_options` all still work

**Why conditional injection didn't work:**
Conditional injection (only inject when `%var%` exists) broke highlighting for GUI patterns like `MyGui:Add` and `MyGui:-Caption` in commands without variable references.

## Highlight Tests

### Test syntax

Tree-sitter supports highlight tests in `test/highlight/`. Tests use assertion comments to verify highlighting:

```ahk
; Caret (^) - tests the column directly above on the previous non-comment line
x := 1
; ^ operator

; Arrow (<-) - tests the column where the comment starts
MsgBox, Hello
; <- function.builtin

; Multiple carets test multiple consecutive columns
result := a && b
;           ^^ operator

; Negation (!) - asserts something is NOT a highlight
baz()
; <- !variable
```

**Key points:**
- Carets must align exactly with the character column being tested
- Arrow tests column 0 (where `;` appears), not where `<-` appears
- For inline keywords (like `else` after `}`), use carets not arrows

### Known issue: %var% in command_arguments causes memory errors

Testing variable references inside command_arguments (`%myVar%`) causes tree-sitter to run out of memory during highlight tests:

```ahk
; This causes 34GB+ memory allocation error in highlight tests
MsgBox, %myVar%
;        ^^^^^ variable
```

**Root cause:** Likely related to the self-injection in `injections.scm` that re-parses command_arguments. The highlight test system may be triggering infinite or exponential expansion.

**Workaround:** Skip highlight assertions for `%var%` patterns inside command_arguments. The highlighting still works in Zed - it's only the test assertions that fail.

### tree-sitter.json configuration

The `tree-sitter.json` file configures the tree-sitter CLI:

```json
{
  "grammars": [{
    "name": "autohotkey",
    "scope": "source.ahk",
    "file-types": ["ahk"],
    "highlights": "languages/autohotkey/highlights.scm",
    "injections": "languages/autohotkey/injections.scm"
  }],
  "metadata": {
    "version": "1.0.0",
    "license": "MIT",
    "authors": [{ "name": "..." }],
    "links": { "repository": "..." }
  }
}
```

**Required for:**
- File type association (`.ahk` → autohotkey grammar)
- Highlight test discovery
- `tree-sitter highlight` command

## Parser Optimization

### What actually reduces parser size

**Tested optimizations and results (starting from 42,633 lines):**

| Technique | Result | Recommendation |
|-----------|--------|----------------|
| `word: $ => $.identifier` | **-41% (→ 25,044 lines)** | **USE THIS** |
| Consolidate tokens into single regex | Minor (~1-2%) | Worth doing |
| Split binary_expression into hidden rules | **+16% (worse!)** | Don't do this |
| Named precedences (`precedences: [...]`) | Conflicts with numeric prec | Avoid mixing |
| Split statement_block into variants | +0.6% (worse) | Don't do this |
| `inline: [...]` for token rules | Error - tokens can't be inlined | N/A |

**Key findings:**

1. **`word` token is the big win.** Enables tree-sitter's keyword extraction optimization. Single biggest impact.

2. **Hidden rules don't help expression parsing.** Splitting `binary_expression` into `_logical_or_expr`, `_bitwise_and_expr`, etc. INCREASED parser size by 16%. Tree-sitter expands hidden rules during LR state generation anyway.

3. **Token consolidation helps marginally.** Merging multiple `token(prec(3, /pattern1/)), token(prec(3, /pattern2/))` into a single `token(prec(3, /pattern1|pattern2/))` provides small improvements.

4. **Named precedences (`precedences: [...]`) don't infer transitive relationships.** If you define `['a', 'b']` and `['b', 'c']`, tree-sitter does NOT infer `a > c`. Stick with numeric precedences for expression parsing.

5. **Splitting optional() into choice() doesn't help.** Replacing `optional($.block)` with `choice($.empty_block, $.populated_block)` slightly increased parser size.

### Use #match? queries instead of grammar tokens for pure highlighting

**Problem:** Adding 159 builtin variables and 192 commands to the grammar via `token(choice(...))` caused the parser to grow from 55K to 127K lines (+131%). WASM compilation took minutes and used 5GB+ RAM.

**Root cause:** Tree-sitter builds an LR parser. Token alternatives multiply with parser states, especially when the token appears in multiple grammar locations (like `_statement` AND `_expression`).

**Solution:** Move highlighting-only patterns from grammar.js to highlights.scm using `#match?` predicates:

```javascript
// BEFORE (in grammar.js) - causes parser bloat
builtin_variable: $ => token(prec(3, choice(
  /A_ScriptDir|A_WorkingDir|.../,
  // ... 159 variables total
))),
```

```scheme
; AFTER (in highlights.scm) - zero parser impact
((identifier) @variable.special
 (#match? @variable.special "^(?i)A_(ScriptDir|WorkingDir|...)$"))
```

**Results:**
| Approach | Parser Size | Reduction |
|----------|-------------|-----------|
| All builtins in grammar | 127,475 lines | baseline |
| Builtins moved to #match? | 124,084 lines | -2.7% |
| Commands also moved to #match? | 69,927 lines | **-45%** |

**Trade-offs:**
- Pro: Unlimited patterns with zero parser impact
- Pro: Case-insensitive matching via `(?i)` regex flag
- Con: No distinct node type in parse tree (builtins parse as `identifier`)
- Con: Highlighting is query-time, not parse-time (minimal performance impact)

**When to use each approach:**
- **Grammar tokens:** When parsing behavior depends on the pattern (e.g., `command_name` + comma distinguishes commands from function calls)
- **#match? queries:** When the pattern is only for highlighting (e.g., builtin variables are just identifiers with special colors)

### Monitoring parser complexity

```bash
# Check parser size after changes
wc -l src/parser.c

# Baseline expectations for this grammar:
# - Minimal grammar with word token: ~25,000 lines
# - Current grammar (builtins/commands in #match?): ~70,000 lines
# - Grammar with builtins in tokens: ~127,000 lines (avoid!)
```

## Directive and Conditional Parsing

### Use `token.immediate()` to prevent extras from consuming content across lines

**Problem:** A rule like `directive_arguments: $ => /[^\s;][^;\n]*/` was matching content from the NEXT line because `extras: [/\s/]` consumes newlines between tokens.

```javascript
// WRONG - extras consumes newline, then regex matches next line's content
directive: $ => seq('#', $.identifier, optional($.directive_arguments)),
directive_arguments: $ => /[^\s;][^;\n]*/,
```

With input:
```
#NoEnv
#SingleInstance force
```

The parser would match `#NoEnv` then skip the newline (via extras), then match `#SingleInstance force` as `directive_arguments` of `#NoEnv`.

**Solution:** Use `token.immediate()` which prevents ANY whitespace (including newlines from extras) between tokens:

```javascript
// CORRECT - token.immediate requires content immediately after identifier
directive_arguments: $ => token.immediate(/[, \t]+[^\s;][^;\n]*/),
```

**Key insight:** When you need content to stay on the same line as a preceding token, use `token.immediate()`. The regex inside can require leading whitespace (like `/[ \t]+.../`) but the `token.immediate()` ensures no newlines sneak in.

### Include required whitespace in the token when using structured rules

**Problem:** Using `optional(seq(token.immediate(/[ \t]+/), $.rule))` doesn't work because `extras` are consumed BEFORE the `optional` evaluates, so the immediate whitespace token finds nothing to match.

```javascript
// WRONG - extras consume the space before token.immediate sees it
if_directive: $ => seq(
  '#',
  token.immediate(/if/i),
  optional(seq(
    token.immediate(/[ \t]+/),  // Space already consumed by extras!
    field('condition', $._expression)
  ))
)),
```

With `#if WinActive("test")`, the space between `if` and `WinActive` is consumed by `extras` before the `optional` branch evaluates, so `token.immediate(/[ \t]+/)` fails to match.

**Solution:** Include the required whitespace IN the preceding token pattern:

```javascript
// CORRECT - split into two alternatives with whitespace in the token
if_directive: $ => choice(
  // #if with condition - whitespace is part of the token
  prec.right(6, seq(
    '#',
    token.immediate(/if[ \t]+/i),  // Whitespace included!
    field('condition', $._if_directive_condition)
  )),
  // Bare #if - no whitespace, no condition
  prec.right(5, seq(
    '#',
    token.immediate(/if/i)
  ))
),
```

This ensures:
- `#if WinActive()` - matches first alternative (with whitespace in token)
- `#if` alone - matches second alternative (bare form)
- `#if\nLabel:` - matches second alternative, `Label:` parses separately as label

**Key insight:** When you have structured rules (like `$.function_call`) that can't be wrapped in `token.immediate()`, include the required same-line whitespace in the PRECEDING token pattern instead.

### Case-insensitive keywords can't be highlighted by string literal in queries

**Problem:** Changing `'or'` to `/or/i` for case-insensitivity breaks highlight queries that reference `"or"`.

```javascript
// Grammar change for case-insensitivity
binary_expression: $ => choice(
  prec.left(2, seq($._expression, choice('||', /or/i), $._expression)),  // /or/i instead of 'or'
  ...
),
```

```scheme
; This highlight query STOPS WORKING after the change
(binary_expression "or" @keyword.operator)
```

**Root cause:** Tree-sitter queries match against node types and literal token strings. When you use a regex like `/or/i`, it creates an anonymous pattern that can't be referenced by the string `"or"` in queries.

**Solutions:**
1. **Accept no specific highlighting** - Remove the highlight rule; the expression still parses correctly
2. **Use alias()** - `alias(/or/i, 'or')` to give it a name (but this doesn't work for anonymous inline patterns)
3. **Keep case-sensitive in grammar, use #match? for highlighting** - If highlighting is important, keep `'or'` in grammar and add `#match?` patterns for `OR`, `Or` variants

**Current approach:** We removed the highlight rules for `or`/`and`/`not` since the expressions parse correctly and the surrounding context provides visual structure.

### Use `prec.right()` for optional trailing content

**Problem:** Rules with optional trailing content can cause conflicts about whether to consume the content or leave it empty.

```javascript
// Conflict: should the condition be consumed or left empty?
if_directive: $ => prec(5, seq(
  '#', token.immediate(/if/i),
  optional(field('condition', $._expression))
)),
```

**Solution:** Use `prec.right()` to prefer consuming the optional content (greedy matching):

```javascript
// CORRECT - prec.right ensures condition is consumed when present
if_directive: $ => prec.right(5, seq(
  '#', token.immediate(/if/i),
  optional(field('condition', $._expression))
)),
```

### Exclude leading special characters from catch-all patterns

**Problem:** A catch-all pattern like `/[^,\r\n]+/` matches quoted strings before `$.string` can, because it starts matching from the current position (including the `"` character).

```javascript
// WRONG - regex matches `"hello"` as plain text before $.string can match
_if_win_title: $ => choice($.string, /[^,\r\n]+/),
```

**Solution:** Exclude leading quote/space characters from the catch-all so `extras` can consume whitespace and `$.string` can match quoted content:

```javascript
// CORRECT - catch-all excludes leading quotes and whitespace
_if_win_title: $ => choice($.string, /[^,\r\n"' \t][^,\r\n]*/),
```

**Key insight:** When using `choice($.specific_rule, /catch-all/)`, make sure the catch-all pattern can't match the starting character of the specific rule.

## External Scanner for Statement Termination

### Use external scanner to prevent return from consuming labels

**Problem:** `return_statement` with `optional($._expression)` consumes identifiers from subsequent lines because `extras: [/\s/]` makes newlines invisible to the grammar.

```ahk
return

MyLabel:  ; Gets consumed as return value instead of parsed as label
```

The parser sees `return`, skips whitespace (including newlines via extras), finds `MyLabel` (valid identifier/expression), and commits to that parse before seeing the `:` that would indicate a label.

**Why other solutions don't work:**
- `prec.dynamic()` doesn't help because there's no ambiguity at the decision point - `identifier` is a valid expression
- Restructuring `_expression` to exclude identifiers would break valid `return myVar` syntax
- GLR conflicts only resolve ambiguity when rules start at the same position

**Solution:** External scanner (`src/scanner.c`) that detects `identifier:` patterns after newlines:

```c
// In src/scanner.c
bool tree_sitter_autohotkey_external_scanner_scan(...) {
  // Skip to newline, then look ahead for "identifier:" pattern
  // If found, emit STATEMENT_END token to terminate return statement
}
```

```javascript
// In grammar.js
externals: $ => [$._statement_end],

return_statement: $ => prec.right(choice(
  seq(/return/i, $._statement_end),  // Bare return before label
  seq(/return/i, $._expression),      // Return with expression
  /return/i,                          // Bare return (fallback)
)),
```

The scanner looks ahead (without consuming) for label-like patterns. When found, it emits a zero-width `_statement_end` token that matches the first alternative, terminating the return statement before the label.

**Key insight:** External scanners can perform lookahead that regular grammar rules cannot, enabling context-sensitive decisions about statement boundaries.

# Tree-sitter Grammar Notes

Technical details, pitfalls, and lessons learned while developing this tree-sitter grammar for Zed.

## Pitfalls

### CRITICAL: Avoid case-insensitive regex patterns - causes massive parser bloat

**Problem:** Using `/keyword/i` patterns (even in centralized keyword rule) causes exponential parser size explosion.

**Test results:**
- Baseline (lowercase string literals): **90,466 lines** ✓
- Inline `/keyword/i` in statement rules: **281,425 lines** (+211%) ✗
- `/keyword/i` in keyword rule + string literals in statements: **299,642 lines** (+231%) ✗ WORST
- caseInsensitive() helper function: **296,410 lines** (+228%) ✗

**Root cause:** Case-insensitive patterns create state explosion regardless of location. Even centralized patterns in the keyword rule cause conflicts with string literals elsewhere.

**Solution:** Use lowercase string literals only. AutoHotkey code must use lowercase keywords (`if`, `while`, `for`, etc.). Uppercase keywords (`IF`, `WHILE`) are not supported.

**Trade-off:** Parser compiles in seconds with <2GB RAM instead of minutes with 14GB RAM. This is the only viable approach for tree-sitter.

### Use `word` token for major parser optimization

`word: $ => $.identifier` enables keyword extraction - **41% parser size reduction**. Use with regex patterns, not string literal choices:

```javascript
word: $ => $.identifier,
_command_name_pattern: $ => token(/MsgBox|InputBox|.../),  // Regex, not choice('MsgBox', ...)
```

### Use `prec.dynamic()` for function_definition to beat function_call

Static `prec()` doesn't always resolve ambiguity. Use `prec.dynamic()` for parse-time precedence:
```javascript
function_definition: $ => prec.dynamic(10, seq(...)),  // Ensures function_definition wins
```

### Use GLR conflict for function call vs definition with `:=` arguments

**Problem:** `MyFunc(x := 10)` is ambiguous - `x := 10` could be a parameter with default value (function definition) or an assignment expression (function call argument).

**Solution:** Use GLR conflict to explore both paths. After `)`, presence of `{` commits to function_definition; otherwise function_call wins.

```javascript
conflicts: $ => [
  [$.parameter, $.assignment_expression],  // func(x := 10) could be def or call
],

function_definition: $ => prec.dynamic(10, seq(...)),  // Wins when both valid
function_call: $ => prec.dynamic(5, seq(...)),
parameter: $ => seq($.identifier, optional(prec.right(1, seq(':=', $._expression)))),
assignment_expression: $ => prec.right(1, seq(...)),  // Same precedence triggers conflict
```

**Key insight:** The conflict declaration enables GLR parsing - without it, tree-sitter commits early. Equal precedence (`prec.right(1)`) on both rules triggers the conflict.

### Commands require comma syntax and avoid high token precedence

**Problem:** Command names like `MsgBox` overlap with identifiers. High token precedence steals identifiers even in function bodies where they shouldn't be commands.

**Solution:** Require comma syntax to distinguish commands from function calls, and use internal patterns without token precedence:

```javascript
// Command requires comma - distinguishes from function_call
command: $ => prec(2, seq(
  field('name', alias($._command_name_pattern, $.command_name)),
  ',',
  optional($.command_arguments)
)),

// Internal pattern (no token precedence) exposed via alias
_command_name_pattern: $ => token(choice(/MsgBox|InputBox|.../)),
```

This ensures `MsgBox, Hello` is a command, while `MsgBox("Hello")` would be function_call syntax.

### Keep individual regex patterns short - use choice() to combine groups

Very long regex patterns (40+ alternatives) in single `token()` can fail silently in WASM. Split into groups of ~5:
```javascript
_command_name_pattern: $ => token(choice(
  /MsgBox|InputBox|ToolTip|TrayTip/,
  /Send|SendInput|SendRaw|SendEvent|SendPlay/,
  ...
)),
```

### Rules in `_expression` must also be in `_statement` for top-level parsing

New rules added only to `_expression` don't parse at top level. Must also add to `_statement`:
```javascript
_statement: $ => choice(
  $.method_call,        // Order matters for precedence
  $.member_expression,  // Before identifier so it wins
  $.function_call,
  $.identifier,
  ...
),
```

Otherwise `obj.name` parses as three tokens: `obj`, `.` (punctuation), `name`.

### Current conflicts

```javascript
conflicts: $ => [
  [$.parameter, $._expression],  // Parameter vs expression in function signatures
  [$.variable_ref, $.operator],  // % = modulo or %var% reference
],
```

### Remove `()[]` from `_punctuation` to enable empty function calls and arrays

Remove parens/brackets from `_punctuation` so `function_call` and `array_literal` can match:
```javascript
_punctuation: $ => /[{}.,@$\\]+/,  // Removed ()[]
```

### Use inline tokens with precedence inside `repeat1(choice(...))`

Use inline tokens with precedence to ensure specific patterns win over catch-all:
```javascript
command_arguments: $ => repeat1(choice(
  alias(token(prec(3, /\d+\.?\d*|0[xX][0-9a-fA-F]+/)), $.number),
  /[^\s,\n%"'0-9][^\s,\n%"']*/,  // Excludes leading digits
)),
```

### Implicit concatenation - exclude statement-starting expressions

**Problem:** AutoHotkey v1 supports implicit concatenation (`"a" "b"` → `"ab"`), but tree-sitter's `extras: [/\s/]` consumes newlines, making it impossible to distinguish same-line from cross-line expressions.

**Solution:** Only include "complete" expressions in `_concatenatable` - exclude types that can start new statements:

```javascript
_concatenatable: $ => choice(
  $.string, $.number,                 // Literals never start statements
  $.variable_ref,                     // %var% clearly not a statement
  $.function_call, $.method_call,     // Include parens - clearly complete
  $.parenthesized_expression,         // Starts with ( - unambiguous
  // EXCLUDE: identifier, member_expression - could start next line
),
```

**Contained contexts:** Identifier concatenation works in limited contexts (function arguments, array indices) via `_argument` rule:
- ✓ `test(" w" w)` - works in function calls
- ✓ `arr[" w" w]` - works in array indices
- ✗ `w ? "a" value : ""` - doesn't work in ternary (use `.` operator: `"a" . value`)

**Why the limitation:** `_ternary_branch` uses `_identifier_string_concat` (identifier first) but NOT `_string_identifier_concat` (string first) to prevent grabbing identifiers from subsequent lines.

## Debugging Tips

**Verify Zed grammar:** `cat grammars/autohotkey/grammar.js | grep "pattern"` (Zed clones from GitHub)

**Test incrementally:** Add rules in small batches (3-5 items), verify, repeat. Easier to isolate breakages.

## Troubleshooting Extension Installation Failures

**Check logs:** `%LOCALAPPDATA%\Zed\logs\Zed.log` - search for error details

**Common causes:**
1. **Invalid commit hash** - Use full 40-char hash in extension.toml (`git rev-parse <hash>`)
2. **Grammar too complex** - Multiple `clang.exe` with GB memory usage. Split large `token()` rules.
3. **Corrupted cache** - Delete `<project>/grammars/` and `%LOCALAPPDATA%\Zed\extensions\installed\autohotkey\`

**Zed cache (Windows):** `%LOCALAPPDATA%\Zed\` - logs, extensions, WASM SDK

## Zed Theme Highlight Group Support

### Use `@variable.special` instead of `@variable.builtin`

Zed themes don't support `@variable.builtin`. Use `@variable.special` instead:
```scheme
(builtin_variable) @variable.special
```

**Zed support:** `@variable` ✓, `@variable.special` ✓, `@variable.builtin` ✗, `@function.builtin` ✓

Reference: [Zed Issue #22193](https://github.com/zed-industries/zed/issues/22193)

## Zed indents.scm Uses Different Pattern Than Helix

### Query for tokens in the node that DIRECTLY contains them

Tree-sitter queries only match tokens that are DIRECT children. "Impossible pattern" error means token is in nested child.

```scheme
; Match where token actually exists
(statement_block "}" @end) @indent  // ✓ } is direct child of statement_block
```

Use `tree-sitter parse` to verify tree structure.

### Use `@indent` on the node, `@end` on closing delimiter

Zed uses different pattern than Helix/Neovim:
```scheme
(function_definition "}" @end) @indent  // Zed style - @indent on node, @end on delimiter
```

**Zed captures:** `@indent` (node), `@end` (delimiter), `@indent.begin`, `@indent.end`, `@indent.ignore`

Reference: [Zed Language Extensions Documentation](https://zed.dev/docs/extensions/languages)

## Self-Injection for Sub-Token Highlighting

### Use injections.scm to highlight patterns inside flat tokens

**Problem:** `command_arguments` must be flat regex `/[^\r\n]+/` to prevent multi-line parsing (extras consumes newlines between `repeat1` elements). But we need to highlight `%var%` patterns inside.

**Solution:** Self-injection re-parses flat token content:
1. Keep `command_arguments` as `/[^\r\n]+/`
2. Add `variable_ref` to `_statement` with higher precedence than `operator`
3. Add conflict: `[$.variable_ref, $.operator]` (for `%` ambiguity)
4. Create `injections.scm`:
```scheme
((command_arguments) @injection.content (#set! injection.language "autohotkey"))
```

Zed re-parses command content as AutoHotkey, matching `variable_ref` in the injected tree.

### Prevent false labels in injected content

**Problem:** `GuiControl, MyGui:, MyProgress` parses `MyGui:` as label during injection, polluting symbol picker.

**Solution:** Add higher-precedence rule matching `identifier:,` before `label` can:
```javascript
gui_target: $ => prec(10, seq(field('gui_name', $.identifier),
  token.immediate(':'), token.immediate(','))),
```

Matches `identifier:,` as unit with precedence 10. Not in `outline.scm`, so doesn't appear in symbol picker.

## Structured command_arguments - Eliminating Self-Injection Recursion

### Problem with self-injection approach

Self-injection causes **infinite recursion** when the injected language can match patterns that also contain the injected rule:

1. `command_arguments` is flat token: `/[^\r\n]+/`
2. Injection re-parses it as AutoHotkey
3. Injected content matches as `command` (e.g., `MsgBox, Hello`)
4. That command has `command_arguments` which get injected again
5. **Infinite loop** → 34GB memory allocation failure in `tree-sitter test`

### Solution: Structured command_arguments with repeat1(choice(...))

Replace flat token with structured parsing - eliminates injection entirely:

```javascript
command_arguments: $ => prec.right(repeat1(choice(
  $.variable_ref,          // %name%
  $.string,                // "text"
  $.number,                // 123
  $.gui_action,            // MyGui:Add
  $.gui_action_spaced,     // MyGui: Add
  $.gui_options,           // MyGui:-Caption
  $.gui_options_spaced,    // MyGui: -Caption
  $.gui_target,            // MyGui:,
  $.gui_option_flag,       // +Caption -Border
  $.drive_letter,          // C:
  $.identifier,            // word
  ',',                     // comma
  /[ \t]+/,                // whitespace (not newline)
  /[^a-zA-Z0-9_%," \t\r\n]+/, // symbols/operators
))),
```

**Key requirements:**
1. **All patterns exclude `\r\n`** - ensures command terminates at newline
2. **Use `prec.right()` on both `command` and `command_arguments`** - prefers consuming tokens as arguments vs separate statement
3. **Pattern ordering** - specific patterns first (variable_ref, string, GUI patterns), catch-all last

### Why newline termination works

Critical insight: `extras` are consumed BETWEEN tokens, not during pattern matching.

1. When `repeat1(choice(...))` tries to match the next element:
   - It tries ALL choice patterns against input
   - If NONE match, repeat terminates
   - Only AFTER a pattern matches does tree-sitter consume extras

2. All patterns exclude `\r\n`:
   - `/[ \t]+/` matches space/tab, NOT newline
   - `/[^a-zA-Z0-9_%," \t\r\n]+/` explicitly excludes `\r` and `\n`
   - Other patterns (identifier, string, etc.) inherently don't match newline

3. Therefore:
   - When input has `\n`, no pattern matches
   - `repeat1` terminates
   - Newline remains in input (not consumed)
   - Command parsing ends at newline boundary

This is why the original flat token used `/[^\r\n]+/` - to explicitly terminate at newlines. The structured version maintains the same boundary by excluding newlines from ALL patterns.

### Benefits

- **Eliminates infinite recursion** - no injection, no self-reference
- **More testable** - structured parse tree can be validated in corpus tests
- **Simpler highlighting** - direct node queries instead of injection complexity
- **Cleaner architecture** - no special-case injection rules
- **Parser size**: 88K lines (6% increase from 83K, well under 100K limit)

## Force Expression Support

### Force expressions with terminal token pattern

Force expression syntax (`% expression`) is now supported in command arguments using a terminal token pattern that consumes content until comma or newline.

**Grammar approach:**
```javascript
force_expression: $ => prec(15, seq(
  '%',
  token.immediate(/[ \t]+[^,\r\n]+/)  // Space + content as single atomic token
)),

command_arguments: $ => prec.right(repeat1(choice(
  $.force_expression,      // FIRST - higher precedence wins over variable_ref
  $.variable_ref,          // %name%
  ...
))),
```

**Key design decisions:**
1. **Terminal token**: `token.immediate(/[ \t]+[^,\r\n]+/)` consumes entire force expression as atomic unit
2. **Precedence 15**: Higher than variable_ref, so `% ` pattern wins over `%identifier%` pattern
3. **First in choice**: Placed first in command_arguments so it's tried before variable_ref
4. **Pattern**: Matches `% ` (percent + space) followed by any content until comma or newline

**Parse flow:**
1. Parser sees `%` in command_arguments
2. Tries force_expression first (precedence 15)
   - If followed by space: matches `% ` + content as terminal token → force_expression succeeds
   - If followed by identifier: fails (no space), tries next option
3. Tries variable_ref (no precedence)
   - Matches `%identifier%` pattern → variable_ref succeeds

**Examples:**
```ahk
MsgBox, % x ? "A" : "B"    ; force_expression (ternary)
MsgBox, % x + 1             ; force_expression (binary)
MsgBox, %myVar%             ; variable_ref (unchanged)
Send, % GetValue()          ; force_expression (function call)
Gui, Add, Text, , % "test"  ; force_expression in multi-arg command
```

**Trade-offs:**
- ✅ Correctly parses all force expression syntaxes (ternary, binary, function calls)
- ✅ Variable references `%var%` still work correctly
- ✅ Parser size: 89,241 lines (under 100K threshold)
- ✅ All corpus tests pass (297 total, 5 new force expression tests)
- ⚠️ Sub-expression highlighting lost - force_expression is atomic token highlighted as `@string.special`
- ⚠️ Highlight tests for force_expression cause memory issues in test harness (corpus tests work fine)

**Why terminal token approach:**
- Initial attempts using GLR conflicts or structured expressions caused exponential state explosion
- Terminal token eliminates ambiguity - entire force expression consumed as single unit
- Simpler implementation, no conflicts needed between force_expression and variable_ref

### Known limitations

1. **Empty arguments** (double comma `,,`) cause early termination:
   - Example: `StringReplace, var, old, new,, All` - the `, All` part parsed as separate statement
   - Rare edge case in practice

### Migration notes

When moving from self-injection to structured approach:
- Delete injection rule from `injections.scm`
- Update corpus test expected parse trees (use `tree-sitter test --update`)
- Add `$.drive_letter` to patterns if file paths needed in arguments

## Highlight Tests

### Test syntax

Assertion comments verify highlighting: `^` tests column above, `<-` tests column 0, `!` negates:
```ahk
x := 1
; ^ operator    (caret - column above)

MsgBox, Hello
; <- function.builtin    (arrow - column 0)

baz()
; <- !variable    (negation)
```

### Former issue: %var% in command_arguments caused memory errors (FIXED)

**Problem (when using self-injection):** Testing `%var%` inside command_arguments caused memory exhaustion due to self-injection recursion.

**Solution:** Replaced self-injection with structured `command_arguments` (see "Structured command_arguments" section above). Tests now pass without memory errors (251/252 passing).

### tree-sitter.json configuration

Configures tree-sitter CLI for file association, highlight tests, and `tree-sitter highlight` command.

## Parser Optimization

### What actually reduces parser size

**Key findings (baseline: 42,633 lines):**
- **`word: $ => $.identifier`** → **-41%** (25,044 lines) - Enables keyword extraction. Single biggest win.
- **Token consolidation** → Minor (1-2%) - Merge multiple `token()` patterns with same precedence
- **Hidden rules for expressions** → +16% (worse!) - Don't split `binary_expression` into variants
- **Named precedences** → Conflicts with numeric - Doesn't infer transitivity. Stick with numeric.
- **Split optional() variants** → Slightly worse - Don't replace `optional()` with `choice()`

### Use #match? queries instead of grammar tokens for pure highlighting

**Problem:** Adding 159 builtin variables + 192 commands to grammar via `token(choice(...))` grew parser 55K → 127K lines (+131%). WASM compilation used 5GB+ RAM.

**Solution:** Move highlighting-only patterns to highlights.scm using `#match?`:
```scheme
((identifier) @variable.special (#match? @variable.special "^(?i)A_(ScriptDir|...)$"))
```

**Results:** Builtins + commands in #match? → 69,927 lines (**-45%** from baseline)

**When to use:**
- **Grammar tokens:** Parsing behavior depends on pattern (e.g., command requires comma)
- **#match? queries:** Highlighting only (e.g., builtin variables are just colored identifiers)

### Monitoring parser complexity

`wc -l src/parser.c` - Expect ~25k (minimal+word), ~70k (current), avoid >127k (builtins in grammar)

## Directive and Conditional Parsing

### Use `token.immediate()` to keep content on same line

**Problem:** `extras: [/\s/]` consumes newlines between tokens, causing rules to span multiple lines.

**Solution:** Use `token.immediate()` to prevent whitespace consumption between tokens:
```javascript
directive_arguments: $ => token.immediate(/[, \t]+[^\s;][^;\n]*/),
```

### Include required whitespace in preceding token for structured rules

**Problem:** `optional(seq(token.immediate(/[ \t]+/), $.rule))` doesn't work - extras consume space before `optional` evaluates.

**Solution:** Include whitespace IN the preceding token, use `choice()` for with/without variants:
```javascript
if_directive: $ => choice(
  prec.right(6, seq('#', token.immediate(/if[ \t]+/i), $._if_directive_condition)),
  prec.right(5, seq('#', token.immediate(/if/i)))  // Bare form
),
```

### Case-insensitive regex keywords can't be referenced in highlight queries

Using `/or/i` instead of `'or'` breaks highlight queries referencing `"or"`. Either accept no highlighting or keep case-sensitive in grammar, use `#match?` for variants.

### Use `prec.right()` for optional trailing content

Greedy matching: `prec.right(5, seq(..., optional(field('x', $._expression))))`

### Exclude leading special chars from catch-all patterns

```javascript
_if_win_title: $ => choice($.string, /[^,\r\n"' \t][^,\r\n]*/),  // Excludes leading quotes/spaces
```

## External Scanner for Statement Termination

### External scanner terminates both return statements and commands

The external scanner (`src/scanner.c`) emits `_statement_end` when it detects `identifier:` (label) or `identifier,` (command) patterns at the start of a line. This prevents:

1. **return statements** from consuming the label's identifier as return value
2. **commands** from consuming subsequent command names as arguments

**Example of command termination:**
```ahk
Gui, MyGui:Add, Text    ; Line 1
                        ; Line 2 (blank - newline in extras)
GuiControl, MyGui:, Ctl ; Line 3
```

Without `_statement_end`, line 1's `command_arguments` would consume "GuiControl" from line 3 as an identifier (since `extras: [/\s/]` makes the newline invisible). The scanner detects "GuiControl," at the start of line 3 and emits `_statement_end`, which terminates line 1's command.

Both grammar rules use the same pattern:

```javascript
externals: $ => [$._statement_end],

return_statement: $ => prec.right(choice(
  seq('return', $._statement_end),  // Terminate before label/command
  seq('return', $._expression),
  'return',
)),

command: $ => prec.right(2, choice(
  seq(
    field('name', $.identifier),
    ',',
    optional($.command_arguments),
    $._statement_end  // Terminate before next label/command
  ),
  seq(
    field('name', $.identifier),
    ',',
    optional($.command_arguments)  // Natural termination
  )
)),
```

**Scanner logic** (scanner.c:98-102):
```c
// Check if followed by colon (label) or comma (command)
if (lexer->lookahead == ':' || lexer->lookahead == ',') {
    lexer->result_symbol = STATEMENT_END;
    return true;
}
```

External scanners enable lookahead that regular grammar rules cannot, for context-sensitive statement boundaries.

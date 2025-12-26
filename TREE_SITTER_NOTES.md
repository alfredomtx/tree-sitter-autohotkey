# Tree-sitter Grammar Notes

Technical details, pitfalls, and lessons learned while developing this tree-sitter grammar for Zed.

## Pitfalls

### DO NOT use `word` rule with token-based command matching

**Problem:** The `word: $ => $.identifier` rule enables tree-sitter's keyword extraction, which interferes with `token()` rules. When enabled, only SOME alternatives in a regex pattern will match - the rest silently fail to highlight.

**Solution:** This grammar intentionally OMITS the `word` rule. Commands use internal patterns with `alias()` instead of `choice()` of string literals.

```javascript
// WRONG - keyword extraction breaks this
word: $ => $.identifier,
command_name: $ => choice('MsgBox', 'Sleep', 'Run'),

// CORRECT - no word rule, use internal pattern with alias
// (no word rule)
_command_name_pattern: $ => token(choice(/MsgBox|Sleep|Run/)),
command: $ => seq(alias($._command_name_pattern, $.command_name), ...),
```

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

### The `[$.command]` conflict is required

The grammar needs `[$.command]` in the conflicts array to resolve ambiguity between `command` with and without arguments. Don't remove it.

```javascript
conflicts: $ => [
  [$.parameter, $._expression],
  [$.command],  // Required - don't remove
],
```

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

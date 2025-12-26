# Tree-sitter Grammar Notes

Technical details, pitfalls, and lessons learned while developing this tree-sitter grammar for Zed.

## Pitfalls

### DO NOT use `word` rule with token-based command matching

**Problem:** The `word: $ => $.identifier` rule enables tree-sitter's keyword extraction, which interferes with `token()` rules. When enabled, only SOME alternatives in a regex pattern will match - the rest silently fail to highlight.

**Solution:** This grammar intentionally OMITS the `word` rule. Commands use `token(prec(3, /regex/))` instead of `choice()` of string literals.

```javascript
// WRONG - keyword extraction breaks this
word: $ => $.identifier,
command_name: $ => choice('MsgBox', 'Sleep', 'Run'),

// CORRECT - no word rule, use token with regex
// (no word rule)
command_name: $ => token(prec(3, /MsgBox|Sleep|Run/)),
```

### Use `token(prec())` for command names, not `choice()`

**Problem:** Using `choice('MsgBox', 'Sleep', ...)` relies on keyword extraction which has subtle bugs in tree-sitter-wasm/Zed integration.

**Solution:** Use token with regex and precedence:
```javascript
command_name: $ => token(prec(3, /MsgBox|Sleep|Run/)),
```

### Keep individual regex patterns short - use choice() to combine groups

**Problem:** Very long regex patterns (40+ alternatives) in a single `token()` can fail silently in tree-sitter-wasm/Zed. The grammar generates fine but highlighting doesn't work.

**Solution:** Split commands into logical groups, each with their own `token()`, combined with `choice()`:

```javascript
// WRONG - too many alternatives in one regex
command_name: $ => token(prec(3, /MsgBox|InputBox|...|ExitApp/)),  // 40+ items

// CORRECT - split into groups of ~5 items each
command_name: $ => choice(
  token(prec(3, /MsgBox|InputBox|ToolTip|TrayTip/)),
  token(prec(3, /Send|SendInput|SendRaw|SendEvent|SendPlay/)),
  token(prec(3, /Sleep|SetTimer|Pause|Suspend/)),
  token(prec(3, /Run|RunWait|Reload|ExitApp/)),
  // ... more groups
),
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

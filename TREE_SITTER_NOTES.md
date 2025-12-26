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

### The grammars/ folder is Zed's cache

- It's a git clone from GitHub at the specified `rev`
- Delete it to force Zed to re-fetch
- Your local grammar.js changes have NO effect until pushed and rev updated

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

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Tree-sitter grammar for AutoHotkey v1, packaged as a Zed editor extension. Provides syntax highlighting and comment toggling (`gcc` / `Ctrl+/`) for `.ahk` files.

## Commands

```bash
npm run generate   # Generate parser from grammar.js (creates src/parser.c)
npm run build      # Alias for generate
npm run test       # Run tree-sitter test suite (tests in test/corpus/)
npm run parse <file>  # Parse a file and show AST
```

## Development Workflow

**CRITICAL: Zed ALWAYS fetches grammar from GitHub, never local files!**

After modifying `grammar.js`:
1. Run `npm run generate` to regenerate the parser
2. Commit and push changes to GitHub
3. Get the new commit hash: `git rev-parse HEAD`
4. Update `rev` in `extension.toml` to the new commit hash
5. Delete `grammars/` folder to clear Zed's cache
6. Reinstall dev extension in Zed: Command Palette → "Extensions: Install Dev Extension"

**Why this matters:**
- The `[grammars.autohotkey]` section REQUIRES `repository` and `rev` fields - Zed will error without them
- Zed clones the grammar from GitHub at the specified `rev`, ignoring your local `grammar.js`
- Local changes have NO effect until pushed and rev updated
- The `grammars/` folder contains Zed's git clone - delete it to force re-fetch

## Architecture

```
├── grammar.js                      # Tree-sitter grammar rules (the source of truth)
├── extension.toml                  # Zed extension manifest
├── languages/autohotkey/
│   ├── config.toml                 # Language settings (file associations, comment syntax)
│   └── highlights.scm              # Syntax highlighting queries (maps nodes to @highlight groups)
├── src/                            # Generated files (parser.c, grammar.json, node-types.json)
└── test/corpus/                    # Tree-sitter test cases
```

**Key relationships:**
- `grammar.js` defines node types → `highlights.scm` maps those nodes to highlight groups
- `config.toml` defines comment syntax → enables `gcc`/`Ctrl+/` comment toggling
- `extension.toml` `rev` field → must match a pushed commit containing current grammar

## Highlight Query Notes

- Put fallback patterns first (e.g., `(identifier) @variable`), specific patterns last to override
- Use anchored child syntax with `.` for first child: `(function_definition . (identifier) @function)`
- Zed uses `@attribute` for preprocessor-style directives (not `@preproc`)

## Tree-sitter Grammar Pitfalls

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

**Solution:** Use a single regex token with precedence:
```javascript
command_name: $ => token(prec(3, /MsgBox|Sleep|Run|.../)),
```

### The `[$.command]` conflict is required

The grammar needs `[$.command]` in the conflicts array to resolve ambiguity between `command` with and without arguments. Don't remove it.

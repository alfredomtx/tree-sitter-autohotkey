# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Tree-sitter grammar for AutoHotkey v1, packaged as a Zed editor extension. Provides syntax highlighting and comment toggling (`gcc` / `Ctrl+/`) for `.ahk` files.

## Commands

```bash
npm run generate   # Generate parser from grammar.js (creates src/parser.c)
npm run build      # Alias for generate
npm run test       # Run tree-sitter test suite (corpus + highlight tests)
npm run parse <file>  # Parse a file and show AST
npm run release    # Create and push version tag (triggers GitHub Action)
```

## Development Workflow

**CRITICAL: Zed ALWAYS fetches grammar files from GitHub, never local files!**

After modifying `grammar.js`, `highlights.scm`, or any grammar-related file:
1. Run `npm run generate` to regenerate the parser (if grammar.js changed)
2. Commit and push changes to GitHub
3. Update rev, commit, and push in one command (DO IT WITHOUT ASKING):
   ```bash
   NEW_REV=$(git rev-parse HEAD) && sed -i "s/rev = \".*\"/rev = \"$NEW_REV\"/" extension.toml && git add extension.toml && git commit -m "chore: Update grammar rev to $NEW_REV" && git push
   ```
4. Reinstall dev extension in Zed: Command Palette → "Extensions: Install Dev Extension"

**Why this matters:**
- The `[grammars.autohotkey]` section REQUIRES `repository` and `rev` fields - Zed will error without them
- Zed clones the grammar from GitHub at the specified `rev`, ignoring ALL local files
- Local changes to `grammar.js`, `highlights.scm`, etc. have NO effect until pushed and rev updated
- The `grammars/` folder contains Zed's git clone - delete it to force re-fetch

## Releasing to Zed Extension Store

To publish a new version to the Zed extension registry:

1. Make your changes and run tests
2. Bump `version` in `extension.toml` (e.g., `0.1.0` → `0.2.0`)
3. Commit and push:
   ```bash
   git add . && git commit -m "feat: description of changes" && git push
   ```
4. Release:
   ```bash
   npm run release
   ```

The `release` script reads the version from `extension.toml`, creates a matching git tag (`v0.2.0`), and pushes it. This triggers the GitHub Action which:
- Creates a GitHub Release with auto-generated notes
- Opens a PR to `zed-industries/extensions` to update the extension

After the Zed team merges the PR, the new version appears in Zed's extension panel.

## Architecture

```
├── grammar.js                      # Tree-sitter grammar rules (the source of truth)
├── tree-sitter.json                # Tree-sitter CLI configuration (grammar metadata, file associations)
├── extension.toml                  # Zed extension manifest
├── languages/autohotkey/
│   ├── config.toml                 # Language settings (file associations, comment syntax)
│   └── highlights.scm              # Syntax highlighting queries (maps nodes to @highlight groups)
├── src/                            # Generated files (parser.c, grammar.json, node-types.json)
├── test/corpus/                    # Tree-sitter grammar tests (parse tree validation)
└── test/highlight/                 # Tree-sitter highlight tests (syntax highlighting validation)
```

**Key relationships:**
- `grammar.js` defines node types → `highlights.scm` maps those nodes to highlight groups
- `config.toml` defines comment syntax → enables `gcc`/`Ctrl+/` comment toggling
- `extension.toml` `rev` field → must match a pushed commit containing current grammar

## LSP Integration

This extension includes AutoHotkey LSP server for IDE features (go-to-definition, hover, completions, diagnostics).

**How it works:**
- LSP server downloaded from GitHub releases on first use
- Cached in versioned directory: `autohotkey-lsp-v0.4.0/` (in extension work dir)
- Downloaded file: `server.bundle.js` (bundled Node.js LSP server)
- Transport: `--stdio` (stdin/stdout with LSP message framing)
- Path resolution: Converts relative→absolute using `env::current_dir()` in Zed's WASM runtime

**Updating LSP version:**
1. Update `LSP_VERSION` in `src/lib.rs` (e.g., `"v0.5.0"`)
2. Ensure matching GitHub release exists with tag: `lsp-v0.5.0`
3. Release must include `server.bundle.js` asset (create with `npm run bundle` in lsp-server/)
4. Rebuild extension: `cargo build --release --target wasm32-wasip1`
5. Copy WASM: `cp target/wasm32-wasip1/release/autohotkey.wasm ./`
6. Commit and push - users automatically download new version on next extension load

**LSP server source:**
- Based on helsmy/vscode-autohotkey language server
- Bundled using esbuild into single file (`server.bundle.js`)
- Original source in `lsp-server/` directory (for reference/modifications)

**Troubleshooting:**
- If LSP fails: Check Zed logs at `%LOCALAPPDATA%\Zed\logs\Zed.log` (Windows)
- Common issues: Network down, invalid LSP_VERSION, GitHub release missing
- Syntax highlighting works even if LSP download fails

## Highlight Query Notes

- Put fallback patterns first (e.g., `(identifier) @variable`), specific patterns last to override
- Use anchored child syntax with `.` for first child: `(function_definition . (identifier) @function)`
- Zed uses `@attribute` for preprocessor-style directives (not `@preproc`)

## Tree-sitter Technical Details

@TREE_SITTER_NOTES.md

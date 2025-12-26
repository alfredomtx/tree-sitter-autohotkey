# Tree-sitter AutoHotkey

[![CI](https://github.com/alfredomtx/tree-sitter-autohotkey/actions/workflows/ci.yml/badge.svg)](https://github.com/alfredomtx/tree-sitter-autohotkey/actions/workflows/ci.yml)

Tree-sitter grammar for AutoHotkey v1, packaged as a Zed editor extension.

## Features

- Syntax highlighting for `.ahk` files
- Comment toggling (`Ctrl+/` or `gcc` in vim mode)
- Document outline and go-to-symbol (`Ctrl+Shift+O`)
- Auto-indentation
- Bracket matching

### Supported Syntax

| Category | Elements |
|----------|----------|
| Comments | Line (`;`), block (`/* */`), doc (`/** */`) |
| Literals | Strings, numbers (int, hex, float), arrays |
| Operators | Assignment, comparison, arithmetic, logical, bitwise |
| Keywords | `if`, `else`, `while`, `loop`, `for`, `return`, `class`, `try`, `catch`, etc. |
| Functions | Definitions, calls, parameters with defaults |
| Commands | 30+ built-in commands (`MsgBox`, `Send`, `Sleep`, `Run`, etc.) |
| Variables | Regular, built-in (`A_ScriptDir`, `A_Now`, etc.), `%var%` dereferencing |
| Objects | Property access, method calls, array indexing |
| Hotkeys | Modifier combinations (`^!+#`) |
| Directives | `#Include`, `#NoEnv`, `#SingleInstance`, etc. |
| Escape sequences | `` `n ``, `` `t ``, `` `r ``, etc. |

### Not Yet Implemented

- Hotstrings (`::\btw::by the way`)
- Structured control flow blocks (if/else/while bodies)
- Class definitions
- Object literals (`{key: value}`)
- Try/catch/finally blocks

## Installation

### Zed Editor (Development Extension)

1. Clone this repository
2. In Zed, open Command Palette (`Ctrl+Shift+P`)
3. Run "Extensions: Install Dev Extension"
4. Select the cloned folder

> **Note:** This extension is not yet published to the Zed extension store.

## Development

### Prerequisites

- Node.js 18+
- npm

### Commands

```bash
npm install          # Install dependencies
npm run generate     # Generate parser from grammar.js
npm run test         # Run test suite
npm run parse <file> # Parse a file and show AST
```

### Making Changes

After modifying `grammar.js` or query files:

1. Run `npm run generate`
2. Run `npm run test` to verify changes
3. Commit and push to GitHub
4. Update `rev` in `extension.toml` to the new commit hash
5. Delete the `grammars/` folder (Zed's cache)
6. Reinstall the dev extension in Zed

See [TREE_SITTER_NOTES.md](TREE_SITTER_NOTES.md) for technical details and lessons learned.

## Contributing

Contributions are welcome! Please:

1. Check existing [issues](https://github.com/alfredomtx/tree-sitter-autohotkey/issues) or open a new one
2. Fork the repository
3. Create a branch for your changes
4. Add tests in `test/corpus/` for new syntax
5. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) for details.

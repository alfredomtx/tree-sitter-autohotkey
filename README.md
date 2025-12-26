# Tree-sitter AutoHotkey

[![CI](https://github.com/alfredomtx/tree-sitter-autohotkey/actions/workflows/ci.yml/badge.svg)](https://github.com/alfredomtx/tree-sitter-autohotkey/actions/workflows/ci.yml)

Tree-sitter grammar for AutoHotkey v1, packaged as a Zed editor extension.

## Features

- Syntax highlighting for `.ahk` files
- Comment toggling (`Ctrl+/` or `gcc` in vim mode)
- Document outline and go-to-symbol (`Ctrl+Shift+O`)
- Auto-indentation
- Bracket matching
- Run scripts directly from the editor (requires task configuration)

### Running Scripts

To enable the "Run" button in the gutter, add a task configuration:

1. Create `.zed/tasks.json` in your project:
   ```json
   [
     {
       "label": "Run AHK Script",
       "command": "AutoHotkey.exe",
       "args": ["$ZED_FILE"],
       "tags": ["ahk-script"]
     }
   ]
   ```

2. Ensure `AutoHotkey.exe` is in your PATH, or use the full path

3. Click the run button in the gutter or use Command Palette → "Run"

### Supported Syntax

| Category | Elements |
|----------|----------|
| Comments | Line (`;`), block (`/* */`), doc (`/** */`) |
| Literals | Strings, numbers (int, hex, float), arrays |
| Operators | Assignment, comparison, arithmetic, logical, bitwise |
| Keywords | `if`, `else`, `while`, `loop`, `for`, `switch`, `case`, `try`, `catch`, `throw`, `return`, `class`, `new`, etc. |
| Functions | Definitions, calls, parameters with defaults |
| Commands | 38 built-in commands (`MsgBox`, `Send`, `Sleep`, `Run`, `Gui`, etc.) |
| Variables | Regular, built-in (`A_ScriptDir`, `A_Now`, `A_TickCount`, `Clipboard`, `ErrorLevel`, etc.), `%var%` dereferencing |
| Objects | Property access, method calls, array indexing |
| Hotkeys | Modifier combinations (`^!+#`) |
| Directives | `#Include`, `#NoEnv`, `#SingleInstance`, etc. |
| Escape sequences | `` `n ``, `` `t ``, `` `r ``, etc. |

### Advanced Syntax

- **Hotstrings:** `:options:trigger::replacement` syntax with option parsing
- **Classes:** Full OOP with `extends`, static members, magic methods (`__New`, `__Delete`, `__Get`, `__Set`, `__Call`)
- **Object literals:** `{key: value}` syntax with identifier, string, and numeric keys
- **Exception handling:** `try`/`catch`/`finally` blocks with `throw`
- **Switch statements:** `switch`/`case`/`default` control flow
- **Ternary expressions:** `condition ? value1 : value2`
- **Control flow:** `for...in` loops, `break`/`continue`, labeled statements

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

See [TREE_SITTER_NOTES.md](TREE_SITTER_NOTES.md) for technical details, debugging tips, and technical lessons learned.

## Contributing

Contributions are welcome! Please:

1. Check existing [issues](https://github.com/alfredomtx/tree-sitter-autohotkey/issues) or open a new one
2. Fork the repository
3. Create a branch for your changes
4. Add tests in `test/corpus/` for new syntax
5. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) for details.

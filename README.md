# Tree-sitter AutoHotkey

[![CI](https://github.com/alfredomtx/tree-sitter-autohotkey/actions/workflows/ci.yml/badge.svg)](https://github.com/alfredomtx/tree-sitter-autohotkey/actions/workflows/ci.yml)
[![Zed](https://img.shields.io/badge/Zed-Extension-blue)](https://zed.dev/extensions/autohotkey)

Tree-sitter grammar for AutoHotkey v1, packaged as a Zed editor extension.

## Features

### Syntax & Editing
- Syntax highlighting for `.ahk` files
- Comment toggling (`Ctrl+/` or `gcc` in vim mode)
- Auto-indentation and bracket matching

### Language Server (LSP)
- **Go-to-definition** (`Ctrl+Click` or `gd` in vim mode) - Navigate to function/class definitions
- **Hover documentation** - View function signatures and documentation
- **Code completions** - IntelliSense for AutoHotkey keywords, functions, and variables
- **Diagnostics** - Real-time error and warning detection

### Navigation
- Document outline (`Ctrl+Shift+O`) - Jump to functions, classes, and labels
- Symbol search across project

### Execution
- Run scripts directly from the editor (requires task configuration)

### Running Scripts

To enable the "Run" button in the gutter, add a task to your Zed config:

**Tip**: Ask AI to do it for you.

1. Open Command Palette → "zed: open tasks"
2. Add a task with the `ahk-script` tag:
   ```json
   [
     {
       "label": "Run AutoHotkey Script",
       "command": "& 'C:\\Program Files\\AutoHotkey\\AutoHotkey.exe'",
       "args": ["$ZED_FILE"],
       "tags": ["ahk-script"]
     }
   ]
   ```
   > **Note:** The `& '...'` syntax is required for PowerShell when the path contains spaces. Adjust the path to your AutoHotkey installation.

3. Click the run button in the gutter or use Command Palette → "task: spawn" (if you don't see the button, try reopening the IDE).

### Debugging

Debug AutoHotkey v1 scripts with breakpoints, stepping, and variable inspection.

**Features:**
- Set breakpoints (click gutter or `F9`)
- Step over (`F10`), step into (`F11`), step out (`Shift+F11`)
- Inspect local and global variables
- View call stack
- Watch expressions

**Setup:**

1. Create `.zed/debug.json` in your project root:
   ```json
   [
     {
       "label": "Debug Current Script",
       "adapter": "autohotkey",
       "request": "launch",
       "program": "$ZED_FILE",
       "stopOnEntry": true
     }
   ]
   ```

2. Open a `.ahk` file and press `F5` or use Command Palette → "debugger: start"

**Configuration options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `program` | string | *required* | Path to the `.ahk` script (`$ZED_FILE` for current file) |
| `stopOnEntry` | boolean | `true` | Break on the first line |
| `args` | array | `[]` | Command-line arguments for the script |
| `port` | integer | `9005` | DBGp debugger port |

> **Note:** The debug adapter includes a bundled AutoHotkey runtime. No separate installation required for debugging.

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

### From Zed Extensions (Recommended)

1. Open Zed
2. Open Command Palette (`Ctrl+Shift+P`)
3. Run "zed: extensions"
4. Search for "AutoHotkey"
5. Click Install

### From Source (Development)

1. Clone this repository
2. Open Command Palette → "Extensions: Install Dev Extension"
3. Select the cloned folder

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

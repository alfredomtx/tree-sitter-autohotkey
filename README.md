# AutoHotkey v1 for Zed

[![CI](https://github.com/alfredomtx/tree-sitter-autohotkey/actions/workflows/ci.yml/badge.svg)](https://github.com/alfredomtx/tree-sitter-autohotkey/actions/workflows/ci.yml)
[![Zed](https://img.shields.io/badge/Zed-Extension-blue)](https://zed.dev/extensions/autohotkey)

Full AutoHotkey v1 support for Zed: syntax highlighting, LSP, and debugging.

> **Note:** Requires Windows (AutoHotkey is Windows-only).

## Features

### Syntax Highlighting
- Full syntax highlighting for `.ahk` files
- Auto-indentation and bracket matching

### Language Server (LSP)
- **Go-to-definition** - Navigate to function/class definitions
- **Hover documentation** - View function signatures and documentation
- **Code completions** - IntelliSense for AutoHotkey keywords, functions, and variables
- **Diagnostics** - Real-time error and warning detection
- **Document outline** - Jump to functions, classes, and labels
- **Symbol search** - Find symbols across your project

### Running Scripts

To enable the "Run" button in the gutter, add a task to your Zed config:

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

Comprehensive AutoHotkey v1 syntax support including:
- Comments, strings, numbers, arrays, and operators
- Control flow (`if`, `while`, `loop`, `for`, `switch`, `try`/`catch`)
- Functions, classes, objects, and hotkeys/hotstrings
- Built-in commands, variables, and directives

For full AutoHotkey v1 syntax reference, see the [official documentation](https://www.autohotkey.com/docs/v1/).

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

## Credits

The debug adapter is based on [alfredomtx/autohotkey-debug-adapter](https://github.com/alfredomtx/autohotkey-debug-adapter), a fork of [helsmy/autohotkey-debug-adapter](https://github.com/helsmy/autohotkey-debug-adapter) with DAP protocol fixes for Zed compatibility.

## License

MIT License - see [LICENSE](LICENSE) for details.

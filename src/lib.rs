use zed_extension_api::{self as zed, LanguageServerId, Result};
use std::path::PathBuf;

struct AutoHotkeyExtension {
    cached_server_path: Option<String>,
}

impl zed::Extension for AutoHotkeyExtension {
    fn new() -> Self {
        Self {
            cached_server_path: None,
        }
    }

    fn language_server_command(
        &mut self,
        _language_server_id: &LanguageServerId,
        worktree: &zed::Worktree,
    ) -> Result<zed::Command> {
        // Get path to bundled LSP server
        let server_path = self.get_server_path()?;

        // Get Node.js binary from Zed
        let node_path = zed::node_binary_path()?;

        Ok(zed::Command {
            command: node_path,
            args: vec![
                server_path,
                "--node-ipc".to_string(),
            ],
            env: worktree.shell_env(),
        })
    }
}

impl AutoHotkeyExtension {
    fn get_server_path(&mut self) -> Result<String> {
        // Return cached path if available
        if let Some(path) = &self.cached_server_path {
            return Ok(path.clone());
        }

        // Check possible entry points
        let possible_paths = vec![
            "lsp-server/out/server.js",
            "lsp-server/dist/server.js",
        ];

        for path_str in possible_paths {
            let path = PathBuf::from(path_str);
            if path.exists() {
                let path_string = path
                    .to_str()
                    .ok_or("Invalid path encoding")?
                    .to_string();

                self.cached_server_path = Some(path_string.clone());
                return Ok(path_string);
            }
        }

        Err("AutoHotkey LSP server not found. Expected at lsp-server/out/server.js".into())
    }
}

zed::register_extension!(AutoHotkeyExtension);

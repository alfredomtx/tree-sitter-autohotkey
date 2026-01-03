use zed_extension_api::{self as zed, LanguageServerId, Result};

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

        // Get shell environment and add NODE_PATH for module resolution
        let mut env = worktree.shell_env();

        // Construct absolute path to lsp-server/node_modules
        // NODE_PATH requires absolute paths for Node.js to resolve modules correctly
        let extension_dir = std::env::current_dir()
            .map_err(|e| format!("Failed to get current directory: {}", e))?;

        let node_modules_path = extension_dir
            .join("lsp-server")
            .join("node_modules");

        // Add absolute path to NODE_PATH
        env.push((
            "NODE_PATH".to_string(),
            node_modules_path
                .to_str()
                .ok_or("Invalid path encoding")?
                .to_string()
        ));

        Ok(zed::Command {
            command: node_path,
            args: vec![
                server_path,
                "--node-ipc".to_string(),
            ],
            env,
        })
    }
}

impl AutoHotkeyExtension {
    fn get_server_path(&mut self) -> Result<String> {
        // Return cached path if available
        if let Some(path) = &self.cached_server_path {
            return Ok(path.clone());
        }

        // Path relative to extension directory (Zed resolves this when launching Node.js)
        let server_path = "lsp-server/out/server.js".to_string();
        self.cached_server_path = Some(server_path.clone());
        Ok(server_path)
    }
}

zed::register_extension!(AutoHotkeyExtension);

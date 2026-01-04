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

        // Get shell environment
        let env = worktree.shell_env();

        // DEBUG: Log what we're actually passing to Node.js
        eprintln!("=== AutoHotkey Extension Debug ===");
        eprintln!("Node path: {:?}", node_path);
        eprintln!("Server path: {:?}", server_path);
        eprintln!("Current dir: {:?}", std::env::current_dir());
        eprintln!("Env vars count: {}", env.len());
        for (key, val) in &env {
            if key.contains("PATH") || key.contains("NODE") {
                eprintln!("  {}: {}", key, val);
            }
        }
        eprintln!("=== End Debug ===");

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

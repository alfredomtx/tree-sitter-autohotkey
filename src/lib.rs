use zed_extension_api::{self as zed, LanguageServerId, Result};
use std::{env, fs};

struct AutoHotkeyExtension {
    cached_server_path: Option<String>,
}

const LSP_VERSION: &str = "v0.4.0";
const GITHUB_REPO: &str = "alfredomtx/tree-sitter-autohotkey";

impl zed::Extension for AutoHotkeyExtension {
    fn new() -> Self {
        Self {
            cached_server_path: None,
        }
    }

    fn language_server_command(
        &mut self,
        language_server_id: &LanguageServerId,
        worktree: &zed::Worktree,
    ) -> Result<zed::Command> {
        // Download and get relative path to LSP server
        let server_path = self.get_server_path(language_server_id)?;

        // Get Node.js binary from Zed
        let node_path = zed::node_binary_path()?;

        // Convert relative path to absolute for Node.js
        // Pattern from PHP intelephense extension: env::current_dir() returns extension directory
        let abs_server_path = env::current_dir()
            .map_err(|e| format!("Failed to get extension directory: {}", e))?
            .join(&server_path)
            .to_string_lossy()
            .to_string();

        Ok(zed::Command {
            command: node_path,
            args: vec![
                abs_server_path,
                "--stdio".to_string(),
            ],
            env: worktree.shell_env(),
        })
    }
}

impl AutoHotkeyExtension {
    fn get_server_path(&mut self, language_server_id: &LanguageServerId) -> Result<String> {
        // Return cached path if available and file still exists
        if let Some(path) = &self.cached_server_path {
            if fs::metadata(path).map_or(false, |stat| stat.is_file()) {
                return Ok(path.clone());
            }
        }

        // Set installation status to "checking for updates"
        zed::set_language_server_installation_status(
            language_server_id,
            &zed::LanguageServerInstallationStatus::CheckingForUpdate,
        );

        // Create versioned directory for LSP server
        let server_dir = format!("autohotkey-lsp-{}", LSP_VERSION);
        fs::create_dir_all(&server_dir)
            .map_err(|e| format!("Failed to create directory: {}", e))?;

        let server_path = format!("{}/server.bundle.js", server_dir);

        // Check if already downloaded
        if !fs::metadata(&server_path).map_or(false, |stat| stat.is_file()) {
            // Download from GitHub release
            zed::set_language_server_installation_status(
                language_server_id,
                &zed::LanguageServerInstallationStatus::Downloading,
            );

            let download_url = format!(
                "https://github.com/{}/releases/download/lsp-{}/server.bundle.js",
                GITHUB_REPO, LSP_VERSION
            );

            zed::download_file(
                &download_url,
                &server_path,
                zed::DownloadedFileType::Uncompressed,
            )
            .map_err(|e| format!("Failed to download LSP server: {}", e))?;
        }

        // Return relative path - Zed resolves it from extension work directory
        // The download_file() API downloads to the extension's work directory,
        // and Zed automatically resolves relative paths from there when executing the LSP
        self.cached_server_path = Some(server_path.clone());
        Ok(server_path)
    }
}

zed::register_extension!(AutoHotkeyExtension);

use std::{env, fs, path::Path, sync::OnceLock};

use zed_extension_api::{
    self as zed, download_file, latest_github_release, serde_json, DebugAdapterBinary,
    DebugConfig, DebugRequest, DebugScenario, DebugTaskDefinition, DownloadedFileType,
    GithubReleaseAsset, GithubReleaseOptions, LanguageServerId, Result,
    StartDebuggingRequestArguments, StartDebuggingRequestArgumentsRequest, Worktree,
};

// ==================== LSP Configuration ====================

const LSP_VERSION: &str = "v0.4.0";
const LSP_GITHUB_REPO: &str = "alfredomtx/vscode-autohotkey";

// ==================== DAP Configuration ====================

const DAP_ADAPTER_NAME: &str = "autohotkey";
const DAP_GITHUB_REPO: &str = "alfredomtx/autohotkey-debug-adapter";

// ==================== Helper Functions ====================

fn dap_request_type_from_config(
    config: &serde_json::Value,
) -> std::result::Result<StartDebuggingRequestArgumentsRequest, String> {
    match config.get("request").and_then(|v| v.as_str()) {
        Some("launch") => Ok(StartDebuggingRequestArgumentsRequest::Launch),
        Some("attach") => Ok(StartDebuggingRequestArgumentsRequest::Attach),
        Some(other) => Err(format!(
            "Invalid request type '{}', expected 'launch' or 'attach'",
            other
        )),
        None => Ok(StartDebuggingRequestArgumentsRequest::Launch),
    }
}

fn validate_dap_adapter_name(name: &str) -> std::result::Result<(), String> {
    if name != DAP_ADAPTER_NAME {
        return Err(format!(
            "Unsupported adapter '{}', expected '{}'",
            name, DAP_ADAPTER_NAME
        ));
    }
    Ok(())
}

// ==================== Extension Struct ====================

struct AutoHotkeyExtension {
    cached_lsp_path: Option<String>,
    cached_dap_version: OnceLock<String>,
}

// ==================== Extension Trait Implementation ====================

impl zed::Extension for AutoHotkeyExtension {
    fn new() -> Self {
        Self {
            cached_lsp_path: None,
            cached_dap_version: OnceLock::new(),
        }
    }

    // ==================== LSP Methods ====================

    fn language_server_command(
        &mut self,
        language_server_id: &LanguageServerId,
        worktree: &Worktree,
    ) -> Result<zed::Command> {
        let server_path = self.get_lsp_path(language_server_id)?;
        let node_path = zed::node_binary_path()?;

        let abs_server_path = env::current_dir()
            .map_err(|e| format!("Failed to get current directory: {}", e))?
            .join(&server_path)
            .to_string_lossy()
            .to_string();

        Ok(zed::Command {
            command: node_path,
            args: vec![abs_server_path, "--stdio".to_string()],
            env: worktree.shell_env(),
        })
    }

    // ==================== DAP Methods ====================

    fn get_dap_binary(
        &mut self,
        adapter_name: String,
        config: DebugTaskDefinition,
        user_provided_debug_adapter_path: Option<String>,
        worktree: &Worktree,
    ) -> std::result::Result<DebugAdapterBinary, String> {
        validate_dap_adapter_name(&adapter_name)?;

        let version = self.ensure_dap_installed()?;
        self.build_dap_binary(&version, config, user_provided_debug_adapter_path, worktree)
    }

    fn dap_request_kind(
        &mut self,
        adapter_name: String,
        config: serde_json::Value,
    ) -> std::result::Result<StartDebuggingRequestArgumentsRequest, String> {
        validate_dap_adapter_name(&adapter_name)?;

        dap_request_type_from_config(&config)
    }

    fn dap_config_to_scenario(
        &mut self,
        config: DebugConfig,
    ) -> std::result::Result<DebugScenario, String> {
        validate_dap_adapter_name(&config.adapter)?;

        let scenario_config = match &config.request {
            DebugRequest::Launch(launch) => {
                if !launch.program.is_empty() && !Path::new(&launch.program).exists() {
                    return Err(format!(
                        "Script file not found: '{}'. Check the 'program' path in your debug configuration.",
                        launch.program
                    ));
                }

                serde_json::json!({
                    "request": "launch",
                    "program": launch.program,
                    "cwd": launch.cwd,
                    "args": launch.args,
                    "stopOnEntry": config.stop_on_entry.unwrap_or(false),
                    "port": 9005,
                })
            }
            DebugRequest::Attach(_) => {
                return Err("AutoHotkey debugger does not support attach mode".into());
            }
        };

        Ok(DebugScenario {
            adapter: config.adapter,
            label: config.label,
            build: None,
            config: scenario_config.to_string(),
            tcp_connection: None,
        })
    }
}

// ==================== LSP Helper Methods ====================

impl AutoHotkeyExtension {
    fn get_lsp_path(&mut self, language_server_id: &LanguageServerId) -> Result<String> {
        if let Some(path) = &self.cached_lsp_path {
            if fs::metadata(path).map_or(false, |stat| stat.is_file()) {
                return Ok(path.clone());
            }
        }

        zed::set_language_server_installation_status(
            language_server_id,
            &zed::LanguageServerInstallationStatus::CheckingForUpdate,
        );

        let server_dir = format!("autohotkey-lsp-{}", LSP_VERSION);
        fs::create_dir_all(&server_dir)
            .map_err(|e| format!("Failed to create LSP cache directory '{}': {}", server_dir, e))?;

        let server_path = format!("{}/server.bundle.js", server_dir);

        if !fs::metadata(&server_path).map_or(false, |stat| stat.is_file()) {
            zed::set_language_server_installation_status(
                language_server_id,
                &zed::LanguageServerInstallationStatus::Downloading,
            );

            let download_url = format!(
                "https://github.com/{}/releases/download/lsp-{}/server.bundle.js",
                LSP_GITHUB_REPO, LSP_VERSION
            );

            zed::download_file(&download_url, &server_path, zed::DownloadedFileType::Uncompressed)
                .map_err(|e| {
                    format!(
                        "Failed to download server.bundle.js from GitHub release lsp-{}: {}",
                        LSP_VERSION, e
                    )
                })?;
        }

        self.cached_lsp_path = Some(server_path.clone());
        Ok(server_path)
    }
}

// ==================== DAP Helper Methods ====================

impl AutoHotkeyExtension {
    fn dap_adapter_dir(&self) -> String {
        env::current_dir()
            .unwrap()
            .join(DAP_ADAPTER_NAME)
            .to_string_lossy()
            .into_owned()
    }

    fn dap_versioned_dir(&self, version: &str) -> String {
        format!("{}/{}_{}", self.dap_adapter_dir(), DAP_ADAPTER_NAME, version)
    }

    fn fetch_latest_dap_release(
    ) -> std::result::Result<(GithubReleaseAsset, String), String> {
        let release = latest_github_release(
            DAP_GITHUB_REPO,
            GithubReleaseOptions {
                require_assets: true,
                pre_release: false,
            },
        )?;

        let version = release.version.trim_start_matches('v').to_string();
        let expected_name = format!("autohotkey-debug-{}.vsix", version);

        let asset = release
            .assets
            .into_iter()
            .find(|a| a.name.ends_with(".vsix"))
            .ok_or_else(|| {
                format!(
                    "No .vsix asset found in release (expected {})",
                    expected_name
                )
            })?;

        Ok((asset, version))
    }

    fn ensure_dap_installed(&mut self) -> std::result::Result<String, String> {
        if let Some(version) = self.cached_dap_version.get() {
            return Ok(version.clone());
        }

        match Self::fetch_latest_dap_release() {
            Ok((asset, version)) => {
                let versioned_dir = self.dap_versioned_dir(&version);

                if !Path::new(&versioned_dir).exists() {
                    let adapter_dir = self.dap_adapter_dir();
                    fs::remove_dir_all(&adapter_dir).ok();
                    fs::create_dir_all(&adapter_dir)
                        .map_err(|e| format!("Failed to create adapter directory: {}", e))?;

                    download_file(&asset.download_url, &versioned_dir, DownloadedFileType::Zip)?;
                }

                self.cached_dap_version.set(version.clone()).ok();
                Ok(version)
            }
            Err(fetch_err) => {
                let prefix = format!("{}_", DAP_ADAPTER_NAME);
                let adapter_dir = self.dap_adapter_dir();

                if let Ok(entries) = fs::read_dir(&adapter_dir) {
                    let version = entries
                        .filter_map(|e| e.ok())
                        .filter_map(|entry| {
                            entry
                                .file_name()
                                .to_string_lossy()
                                .strip_prefix(&prefix)
                                .map(ToOwned::to_owned)
                        })
                        .max();

                    if let Some(v) = version {
                        self.cached_dap_version.set(v.clone()).ok();
                        return Ok(v);
                    }
                }

                Err(format!(
                    "Failed to fetch release and no cached version found: {}",
                    fetch_err
                ))
            }
        }
    }

    fn dap_ahk_exe_path(&self, version: &str) -> String {
        Path::new(&self.dap_versioned_dir(version))
            .join("extension/bin/AutoHotkey.exe")
            .to_string_lossy()
            .into_owned()
    }

    fn dap_adapter_script_path(&self, version: &str) -> String {
        Path::new(&self.dap_versioned_dir(version))
            .join("extension/ahkdbg/debugAdapter.ahk")
            .to_string_lossy()
            .into_owned()
    }

    fn build_dap_binary(
        &self,
        version: &str,
        config: DebugTaskDefinition,
        user_provided_path: Option<String>,
        worktree: &Worktree,
    ) -> std::result::Result<DebugAdapterBinary, String> {
        let ahk_exe = user_provided_path.unwrap_or_else(|| self.dap_ahk_exe_path(version));
        let adapter_script = self.dap_adapter_script_path(version);

        if !Path::new(&ahk_exe).exists() {
            return Err(format!(
                "Debug adapter AutoHotkey.exe not found at '{}'. Try reinstalling the extension.",
                ahk_exe
            ));
        }

        if !Path::new(&adapter_script).exists() {
            return Err(format!(
                "Debug adapter script not found at '{}'. Try reinstalling the extension.",
                adapter_script
            ));
        }

        let request = Self::parse_dap_request_kind(&config.config)?;

        let mut config_json: serde_json::Value = serde_json::from_str(&config.config)
            .map_err(|e| format!("Failed to parse config: {}", e))?;

        if config_json.get("port").is_none() {
            config_json["port"] = serde_json::json!(9005);
        }

        Ok(DebugAdapterBinary {
            command: Some(ahk_exe),
            arguments: vec![adapter_script],
            envs: vec![],
            cwd: Some(worktree.root_path()),
            connection: None,
            request_args: StartDebuggingRequestArguments {
                configuration: config_json.to_string(),
                request,
            },
        })
    }

    fn parse_dap_request_kind(
        config_json: &str,
    ) -> std::result::Result<StartDebuggingRequestArgumentsRequest, String> {
        let config: serde_json::Value = serde_json::from_str(config_json)
            .map_err(|e| format!("Failed to parse config JSON: {}", e))?;

        dap_request_type_from_config(&config)
    }
}

zed::register_extension!(AutoHotkeyExtension);

// ==================== Tests ====================

#[cfg(test)]
mod tests {
    use super::*;
    use zed_extension_api::{AttachRequest, Extension, LaunchRequest};

    // ==================== dap_request_type_from_config tests ====================

    #[test]
    fn dap_request_type_from_config_returns_launch_for_launch_request() {
        // Arrange
        let config = serde_json::json!({"request": "launch"});

        // Act
        let result = dap_request_type_from_config(&config);

        // Assert
        assert!(matches!(
            result,
            Ok(StartDebuggingRequestArgumentsRequest::Launch)
        ));
    }

    #[test]
    fn dap_request_type_from_config_returns_attach_for_attach_request() {
        // Arrange
        let config = serde_json::json!({"request": "attach"});

        // Act
        let result = dap_request_type_from_config(&config);

        // Assert
        assert!(matches!(
            result,
            Ok(StartDebuggingRequestArgumentsRequest::Attach)
        ));
    }

    #[test]
    fn dap_request_type_from_config_returns_error_for_invalid_request() {
        // Arrange
        let config = serde_json::json!({"request": "invalid"});

        // Act
        let result = dap_request_type_from_config(&config);

        // Assert
        assert!(result.is_err());
        assert!(result.unwrap_err().contains("Invalid request type"));
    }

    #[test]
    fn dap_request_type_from_config_defaults_to_launch_when_missing() {
        // Arrange
        let config = serde_json::json!({});

        // Act
        let result = dap_request_type_from_config(&config);

        // Assert
        assert!(matches!(
            result,
            Ok(StartDebuggingRequestArgumentsRequest::Launch)
        ));
    }

    #[test]
    fn dap_request_type_from_config_defaults_to_launch_when_null() {
        // Arrange
        let config = serde_json::json!({"request": null});

        // Act
        let result = dap_request_type_from_config(&config);

        // Assert
        assert!(matches!(
            result,
            Ok(StartDebuggingRequestArgumentsRequest::Launch)
        ));
    }

    // ==================== validate_dap_adapter_name tests ====================

    #[test]
    fn validate_dap_adapter_name_accepts_autohotkey() {
        // Arrange
        let name = "autohotkey";

        // Act
        let result = validate_dap_adapter_name(name);

        // Assert
        assert!(result.is_ok());
    }

    #[test]
    fn validate_dap_adapter_name_rejects_other_names() {
        // Arrange
        let name = "python";

        // Act
        let result = validate_dap_adapter_name(name);

        // Assert
        assert!(result.is_err());
        assert!(result.unwrap_err().contains("Unsupported adapter"));
    }

    #[test]
    fn validate_dap_adapter_name_rejects_empty_string() {
        // Arrange
        let name = "";

        // Act
        let result = validate_dap_adapter_name(name);

        // Assert
        assert!(result.is_err());
    }

    #[test]
    fn validate_dap_adapter_name_is_case_sensitive() {
        // Arrange
        let name = "AutoHotkey";

        // Act
        let result = validate_dap_adapter_name(name);

        // Assert
        assert!(result.is_err());
    }

    // ==================== parse_dap_request_kind tests ====================

    #[test]
    fn parse_dap_request_kind_parses_valid_json() {
        // Arrange
        let json = r#"{"request": "launch"}"#;

        // Act
        let result = AutoHotkeyExtension::parse_dap_request_kind(json);

        // Assert
        assert!(matches!(
            result,
            Ok(StartDebuggingRequestArgumentsRequest::Launch)
        ));
    }

    #[test]
    fn parse_dap_request_kind_returns_error_for_invalid_json() {
        // Arrange
        let json = "not valid json";

        // Act
        let result = AutoHotkeyExtension::parse_dap_request_kind(json);

        // Assert
        assert!(result.is_err());
        assert!(result.unwrap_err().contains("Failed to parse config JSON"));
    }

    #[test]
    fn parse_dap_request_kind_handles_empty_json_object() {
        // Arrange
        let json = "{}";

        // Act
        let result = AutoHotkeyExtension::parse_dap_request_kind(json);

        // Assert
        assert!(matches!(
            result,
            Ok(StartDebuggingRequestArgumentsRequest::Launch)
        ));
    }

    // ==================== Path construction tests ====================

    #[test]
    fn dap_versioned_dir_contains_version() {
        // Arrange
        let ext = AutoHotkeyExtension::new();
        let version = "1.2.3";

        // Act
        let result = ext.dap_versioned_dir(version);

        // Assert
        assert!(result.contains("autohotkey_1.2.3"));
    }

    #[test]
    fn dap_ahk_exe_path_contains_expected_components() {
        // Arrange
        let ext = AutoHotkeyExtension::new();
        let version = "1.0.0";

        // Act
        let result = ext.dap_ahk_exe_path(version);

        // Assert
        assert!(result.contains("extension"));
        assert!(result.contains("bin"));
        assert!(result.contains("AutoHotkey.exe"));
    }

    #[test]
    fn dap_adapter_script_path_contains_expected_components() {
        // Arrange
        let ext = AutoHotkeyExtension::new();
        let version = "1.0.0";

        // Act
        let result = ext.dap_adapter_script_path(version);

        // Assert
        assert!(result.contains("extension"));
        assert!(result.contains("ahkdbg"));
        assert!(result.contains("debugAdapter.ahk"));
    }

    // ==================== Filesystem tests using tempfile ====================

    #[test]
    fn dap_config_to_scenario_returns_error_for_missing_program() {
        // Arrange
        let mut ext = AutoHotkeyExtension::new();
        let config = DebugConfig {
            adapter: "autohotkey".to_string(),
            label: "Test".to_string(),
            request: DebugRequest::Launch(LaunchRequest {
                program: "/nonexistent/path/script.ahk".to_string(),
                cwd: None,
                args: vec![],
                envs: vec![],
            }),
            stop_on_entry: None,
        };

        // Act
        let result = ext.dap_config_to_scenario(config);

        // Assert
        assert!(result.is_err());
        assert!(result.unwrap_err().contains("Script file not found"));
    }

    #[test]
    fn dap_config_to_scenario_returns_error_for_attach_mode() {
        // Arrange
        let mut ext = AutoHotkeyExtension::new();
        let config = DebugConfig {
            adapter: "autohotkey".to_string(),
            label: "Test".to_string(),
            request: DebugRequest::Attach(AttachRequest { process_id: None }),
            stop_on_entry: None,
        };

        // Act
        let result = ext.dap_config_to_scenario(config);

        // Assert
        assert!(result.is_err());
        assert!(result.unwrap_err().contains("does not support attach mode"));
    }

    #[test]
    fn dap_config_to_scenario_succeeds_with_existing_file() {
        // Arrange
        let temp_dir = tempfile::tempdir().unwrap();
        let script_path = temp_dir.path().join("test.ahk");
        std::fs::write(&script_path, "MsgBox Hello").unwrap();

        let mut ext = AutoHotkeyExtension::new();
        let config = DebugConfig {
            adapter: "autohotkey".to_string(),
            label: "Test".to_string(),
            request: DebugRequest::Launch(LaunchRequest {
                program: script_path.to_string_lossy().to_string(),
                cwd: None,
                args: vec![],
                envs: vec![],
            }),
            stop_on_entry: Some(true),
        };

        // Act
        let result = ext.dap_config_to_scenario(config);

        // Assert
        assert!(result.is_ok());
        let scenario = result.unwrap();
        assert_eq!(scenario.adapter, "autohotkey");
        assert!(scenario.config.contains("\"stopOnEntry\":true"));
    }

    #[test]
    fn dap_config_to_scenario_allows_empty_program_path() {
        // Arrange
        let mut ext = AutoHotkeyExtension::new();
        let config = DebugConfig {
            adapter: "autohotkey".to_string(),
            label: "Test".to_string(),
            request: DebugRequest::Launch(LaunchRequest {
                program: "".to_string(),
                cwd: None,
                args: vec![],
                envs: vec![],
            }),
            stop_on_entry: None,
        };

        // Act
        let result = ext.dap_config_to_scenario(config);

        // Assert
        assert!(result.is_ok());
    }

    #[test]
    fn dap_config_to_scenario_rejects_wrong_adapter() {
        // Arrange
        let mut ext = AutoHotkeyExtension::new();
        let config = DebugConfig {
            adapter: "python".to_string(),
            label: "Test".to_string(),
            request: DebugRequest::Launch(LaunchRequest {
                program: "".to_string(),
                cwd: None,
                args: vec![],
                envs: vec![],
            }),
            stop_on_entry: None,
        };

        // Act
        let result = ext.dap_config_to_scenario(config);

        // Assert
        assert!(result.is_err());
        assert!(result.unwrap_err().contains("Unsupported adapter"));
    }
}


use zed_extension_api::{self as zed, LanguageServerId};

struct AutoHotkeyExtension;

impl zed::Extension for AutoHotkeyExtension {
    fn new() -> Self {
        Self
    }

    fn language_server_configs(
        &self,
    ) -> zed::Lazy<std::collections::HashMap<LanguageServerId, zed::LanguageServerConfig>> {
        zed::Lazy::new(Default::default)
    }
}

zed::register_extension!(AutoHotkeyExtension);

# Tauri + React + Typescript

This template should help get you started developing with Tauri, React and Typescript in Vite.

## env config

- Install [BiomeJS vscode extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)
  - To make Biome the default formatter open a supported file and:
    - open the Command Palette (View or Ctrl/⌘+⇧+P)
    - select Format Document With…
    - select Configure Default Formatter
    - select Biome.
    - check if your vscode setting is setup for format on save
      - `"[typescriptreact]": {`
        - `"editor.defaultFormatter": "biomejs.biome",`
        - `"editor.formatOnSave": true,`
      - `}`
- Install Rust `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`
  - [visit](https://tauri.app/v1/guides/getting-started/prerequisites#setting-up-macos) for more info

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

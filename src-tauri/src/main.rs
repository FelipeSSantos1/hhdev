// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// #[tauri::command]
// fn greet(name: &str) -> String {
//     format!("Hello, {}! You've been greeted from Rust!", name)
// }

use tauri::{SystemTray, Manager, SystemTrayEvent};
use tauri_plugin_positioner::{Position, WindowExt};
use window_vibrancy::{apply_vibrancy, NSVisualEffectMaterial, NSVisualEffectState};
use webbrowser;

fn main() {
    let tray = SystemTray::new().with_title("HH Dev");

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![open_slack])
        .plugin(tauri_plugin_positioner::init())
        .system_tray(tray)
        .setup(|app| {
            let window = app.get_window("main").unwrap();
            app.set_activation_policy(tauri::ActivationPolicy::Accessory);
        
            #[cfg(target_os = "macos")]
            apply_vibrancy(
                &window, 
                NSVisualEffectMaterial::Menu,
                Some(NSVisualEffectState::Active),
                Some(6.0)
            )
            .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");
        
            Ok(())
            })
        .on_system_tray_event(|app, event| {
            // This is required to get tray-relative positions to work
            tauri_plugin_positioner::on_tray_event(app, &event);

            match event {
                SystemTrayEvent::LeftClick {
                    position: _,
                    size: _,
                    ..
                } => {
                    let window = app.get_window("main").unwrap();
                    let _ = window.move_window(Position::TopRight);
                    // toggle application window
                    if window.is_visible().unwrap() {
                        window.hide().unwrap();
                    } else {
                        window.show().unwrap();
                        window.set_focus().unwrap();
                    }
                },
                _ => {}
            }
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn open_slack(window: tauri::Window, url: String) -> Result<(), String> {
    println!("Opening URL: {}", url);
    if webbrowser::open(&url).is_ok() {
        window.close().unwrap();
        Ok(())
    } else {
        Err(String::from("Failed to open browser"))
    }
}
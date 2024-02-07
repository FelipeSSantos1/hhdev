// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// #[tauri::command]
// fn greet(name: &str) -> String {
//     format!("Hello, {}! You've been greeted from Rust!", name)
// }

use tauri::{SystemTray, Manager, SystemTrayEvent, CustomMenuItem, SystemTrayMenu};
use tauri_plugin_positioner::{Position, WindowExt};
use window_vibrancy::{apply_vibrancy, NSVisualEffectMaterial, NSVisualEffectState};
use std::process::Command;
use serde::Serialize;
use rdev::display_size;
use tauri::regex::Regex;
use webbrowser;

fn main() {

    // system tray stuffs
    let close = CustomMenuItem::new("close".to_string(), "Close");
    let tray_menu = SystemTrayMenu::new()
    .add_item(close);
    let tray = SystemTray::new().with_menu(tray_menu);

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![open_slack, open_ios, get_ios_simulators])
        .plugin(tauri_plugin_positioner::init())
        .system_tray(tray)
        .setup(|app| {
            let window = app.get_window("main").unwrap();
            app.set_activation_policy(tauri::ActivationPolicy::Accessory);

            // set window size
            let (_, height )= display_size();
            let size = tauri::Size::new(tauri::LogicalSize::new(750.0, (height - 50) as f64));
            window.set_size(size).unwrap();
        
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
                SystemTrayEvent::MenuItemClick { id, .. } => {
                    match id.as_str() {
                      "close" => {
                        std::process::exit(0);
                      }
                      _ => {}
                    }
                  }
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
        window.hide().unwrap();
        Ok(())
    } else {
        Err(String::from("Failed to open browser"))
    }
}

#[derive(Serialize)]
pub struct Simulator {
    name: String,
    uuid: String,
}

#[tauri::command]
fn get_ios_simulators() -> Result<Vec<Simulator>, String> {
    let output = Command::new("xcrun")
        .arg("simctl")
        .arg("list")
        .arg("devices")
        .output()
        .map_err(|e| e.to_string())?;

    let output_str = String::from_utf8_lossy(&output.stdout);
    let lines: Vec<&str> = output_str.split('\n').collect();

    let mut simulators: Vec<Simulator> = Vec::new();
    let re = Regex::new(r"(.*) \((.*)\) \((Shutdown|Booted)\)").unwrap();

    for line in lines {
        if line.contains("unavailable") {
            continue;
        }
        if let Some(caps) = re.captures(line) {
            let name = caps.get(1).map_or("", |m| m.as_str()).to_string();
            let uuid = caps.get(2).map_or("", |m| m.as_str()).to_string();
            simulators.push(Simulator {name, uuid});
        }
    }

    Ok(simulators)
}

#[tauri::command]
fn open_ios(window: tauri::Window, uuid: String) {
    window.hide().unwrap();
    let output = Command::new("xcrun")
        .arg("simctl")
        .arg("boot")
        .arg(&uuid)
        .output()
        .expect("Failed to execute command");
}

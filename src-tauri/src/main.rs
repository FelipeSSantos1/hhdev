// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{SystemTray, Manager, SystemTrayEvent};
use tauri_plugin_positioner::{Position, WindowExt};
use window_vibrancy::{apply_vibrancy, NSVisualEffectMaterial};

fn main() {
  let tray = SystemTray::new().with_title("HH Dev");

  tauri::Builder::default()
  .plugin(tauri_plugin_positioner::init())
  .system_tray(tray)
  .setup(|app| {
    let window = app.get_window("main").unwrap();
    app.set_activation_policy(tauri::ActivationPolicy::Accessory);

    // ToDo: I cannot see the vusual transparency effect
    #[cfg(target_os = "macos")]
    apply_vibrancy(
      &window, 
      NSVisualEffectMaterial::HudWindow, None, None
    )
    .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

    Ok(())
  })
  .on_system_tray_event(|app, event| {
    // This is required to get tray-relative positions to work
    // tauri_plugin_positioner::on_tray_event(app, &event);
    // ToDo: It's not working
    match event {
      SystemTrayEvent::LeftClick {
          position: _,
          size: _,
          ..
      } => {
          let window = app.get_window("main").unwrap();
          // let _ = window.move_window(Position::TrayLeft);
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

# 🩸 DonorBro Frontend (Tauri v2 Mobile Client)

> **Status:** 🚧 Construction Phase (Phase 2)
> **Core:** Tauri v2 (Rust + React + TypeScript)
> **Target:** Android (Primary), iOS, Desktop
> **Mission:** The "Always-On" Lifeline for Critical Blood Donation.

![Tauri v2](https://img.shields.io/badge/Tauri-v2.0-orange?style=flat-square)
![Rust](https://img.shields.io/badge/Rust-Security-black?style=flat-square)
![License](https://img.shields.io/badge/License-GPLv3-blue?style=flat-square)

---

## 📱 The Mission
This is the user-facing terminal of the **DonorBro Network**. It is designed not just as an "App," but as a **Forensic Communication Tool** that operates in hostile network conditions.

It solves the **"Last Mile Problem"** of blood donation: ensuring a notification wakes up a donor immediately, regardless of battery optimization or network instability.

---

## 🛡️ Forensic Architecture
The frontend is built to interface strictly with the **DonorBro Immutable Backend**.

### 1. The "RAM-Ticket" Connection Protocol
Because the backend operates in a restricted environment, this client implements a custom **"Two-Key" Handshake**:
1.  **Acquire:** Client requests a disposable stream ticket using its SSO token.
2.  **Connect:** Client opens the event stream using the ticket.
3.  **Burn:** The ticket is destroyed instantly upon connection.

### 2. Android Vitality (The "Wake Lock")
To adhere to **SDG 3 (Good Health)**, the app refuses to die.
* **Foreground Service:** Uses native code to spawn a persistent notification, preventing the OS from killing the process.
* **Partial Wake Locks:** Ensures the CPU stays awake to process incoming donation requests even when the screen is off.

### 3. Data Integrity
* **Strict Schema Validation:** All incoming data is validated against strict types derived from the backend to prevent malformed data injection.
* **Forensic Logging:** Network failures and "Heartbeat Misses" are tracked to ensure reliability.

---

## ⚡ Tech Stack

### **The "Rust Sandwich"**
* **Core:** Rust (Tauri Main Process) - Handles OS interactions, Notification Service, and Threading.
* **UI:** React 18 + TypeScript - Fast, reactive user interface.
* **Styling:** TailwindCSS - Utility-first styling.
* **State Management:** TanStack Query + Context API.

---

## 📜 License
**GNU General Public License v3.0 (GPL-3.0)**

Copyright (c) 2026 **Aman Adhlakha**

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation.
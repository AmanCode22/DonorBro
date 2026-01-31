# 🩸 DonorBro Forensic Client (Tauri v2)

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
![Tauri](https://img.shields.io/badge/Tauri-v2.0-orange?style=flat-square)
![Rust](https://img.shields.io/badge/Rust-Security-black?style=flat-square)
![Platform](https://img.shields.io/badge/Platform-Android_%7C_iOS_%7C_Windows_%7C_Linux-teal?style=flat-square)
![Status](https://img.shields.io/badge/Status-Forensic_Beta-crimson?style=flat-square)

> **The "Last Mile" Lifeline for Critical Blood Donation.**
> A cross-platform forensic communication tool designed to wake donors in <150ms, regardless of battery optimization, OS restrictions, or network chaos.

---

## 📱 Mission & Capabilities

DonorBro is not just an app; it is **Forensic Infrastructure**. Standard medical apps fail during network congestion or aggressive OS battery saving. DonorBro is engineered to survive.

This client interfaces with the **DonorBro Immutable Backend** to provide a unified experience across all devices:
* **Mobile (Android/iOS):** Uses native "Vitality" protocols (Wake Locks, Foreground Services) to physically wake the device during Red Alerts.
* **Desktop (Windows/Linux):** Provides a robust, "Always-On" client for Donors and Patients who prefer a desktop environment. Runs efficiently in the background to ensure alerts are never missed.
* **Zero-Trace:** Uses RAM-only session tickets. No persistent cookies. No tracking pixels.

---

## 🛡️ Architecture: The Hybrid Forensic Engine

To balance **Privacy**, **Speed**, and **Reliability**, we utilize a Hybrid Architecture:

### 1. The "RAM-Ticket" Protocol (Privacy)
We bypass standard cookie-based auth to prevent session hijacking.
* The client exchanges a cryptographic `sso_token` for a **One-Time RAM Ticket**.
* This ticket allows a single connection to the Event Stream and is **atomically burned** by the server instantly.

### 2. Universal Vitality (Reliability)
Adhering to **UN SDG 3**, the app adapts to its host OS:
* **Mobile:** Spawns persistent foreground services and holds partial wake locks to decrypt payloads even when the screen is locked.
* **Desktop:** Utilizes native OS notification channels to deliver high-priority alerts even when the app is minimized to the system tray.

### 3. Hybrid AI Triage (Intelligence)
* **Phase 1 (Current):** Server-Side Heuristic Engine. Uses a deployed Python logic layer for instant (<150ms) compatibility matching and geofencing.
* **Phase 2 (Roadmap):** On-Device Neural Processing. "Model-on-Demand" system to download quantized Llama-3 models for local patient history summarization.

---

## ⚡ Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Core** | **Rust** (Tauri) | Memory-safe OS bridging, Threading, Notification Service. |
| **Network** | **Tauri HTTP Plugin** | Bypasses CORS/WebView restrictions; uses native OS networking stack. |
| **UI** | **React** + **MUI** | Adaptive "Material You" (Monet) design on supported Android; falls back to a high-contrast **"Forensic Green"** theme on Desktop & legacy devices. |
| **Language** | **JavaScript (JSX)** | Fast iteration, component-based architecture. |
| **Validation** | **Zod** | Strict runtime schema enforcement for backend data. |
| **Security** | **AES-256** | Payload encryption for all patient data. |

---

## 📜 License
**GNU General Public License v3.0 (GPL-3.0)**

Copyright (c) 2026 **Team DonorBro**

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
# 🛁 Project Portfolio: E2E Testing - Soapleasure Website

![Cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Allure](https://img.shields.io/badge/-Allure_Report-21b3b3?style=for-the-badge&logo=allure&logoColor=white)

Proyek ini adalah portofolio otomatisasi pengujian *End-to-End* (E2E) untuk website [Soapleasure.com](https://soapleasure.com/). Pengujian ini dibangun menggunakan **Cypress** untuk memastikan fungsionalitas utama website berjalan dengan baik.

---

## 📑 Daftar Isi

- [Tech Stack](#-tech-stack)
- [Fitur yang Diuji](#-fitur-yang-diuji)
- [Prerequisites](#-prerequisites)
- [Instalasi](#-instalasi)
- [Struktur Proyek](#-struktur-proyek)
- [Menjalankan Test](#-menjalankan-test)
- [Laporan Pengujian (Allure)](#-laporan-pengujian-allure)
- [CI/CD](#-cicd)

---

## 💻 Tech Stack

*   **Framework**: [Cypress](https://www.cypress.io/)
*   **Language**: JavaScript
*   **Reporting**: [Allure Report](https://allurereport.org/)
*   **CI/CD**: GitHub Actions
*   **Code Quality**: ESLint, Prettier

## 🎯 Fitur yang Diuji

Cakupan pengujian meliputi skenario positif dan negatif untuk fitur-fitur berikut:

*   **Authentication**: Login, Register, Forgot Password, Logout.
*   **Shop**: Checkout flow.

## 📋 Prerequisites

Sebelum menjalankan proyek ini, pastikan Anda telah menginstal:

*   **Node.js**: Versi 16 atau lebih baru (Disarankan v20 LTS).
*   **Yarn**: Package manager yang digunakan dalam proyek ini.
    ```bash
    npm install --global yarn
    ```
*   **Java (Optional)**: Diperlukan hanya jika Anda ingin men-generate Allure Report secara lokal (membutuhkan Java Runtime Environment).

## 🚀 Instalasi

1.  **Clone repository ini:**
    ```bash
    git clone https://github.com/Albarokah9/Project_Portofolio_e2e_cypress_soapleasure.git
    cd Project_Portofolio_e2e_cypress_soapleasure
    ```

2.  **Instal dependencies:**
    ```bash
    yarn install
    ```

## 📂 Struktur Proyek

```text
├── .github/workflows   # Konfigurasi CI/CD (GitHub Actions)
├── cypress
│   ├── e2e             # File test (Spec files)
│   ├── fixtures        # Data test (JSON)
│   ├── support         # Reusable commands & configurations
│   └── ...
├── allure-results      # Raw data untuk report (digenerate otomatis)
├── allure-report       # Report HTML final (digenerate otomatis)
├── cypress.config.js   # Konfigurasi utama Cypress
└── package.json        # Dependencies & Scripts
```

## ▶️ Menjalankan Test

Berikut adalah perintah-perintah yang tersedia di `package.json` untuk menjalankan pengujian:

### 1. Interactive Mode (Cypress App)
Membuka Cypress Test Runner untuk menjalankan test secara visual.
```bash
yarn cy:open
```
*   Browser spesifik: `yarn cy:open:chrome`, `yarn cy:open:firefox`, `yarn cy:open:edge`

### 2. Headless Mode (CLI)
Menjalankan test di terminal (tanpa GUI).
```bash
yarn cy:run
```
*   Browser spesifik: `yarn cy:run:chrome`, `yarn cy:run:firefox`, `yarn cy:run:edge`

### 3. Menjalankan Test Spesifik
*   **Authentication**: `yarn test:auth`
*   **Shop**: `yarn test:shop`
*   **Login Only**: `yarn test:login`
*   **Register Only**: `yarn test:register`
*   **Checkout Only**: `yarn test:checkout`

### 4. Berdasarkan Tag (Smoke/Regression)
Menggunakan `cypress-grep` untuk memfilter test.
*   **Smoke Test**: `yarn test:smoke`
*   **Regression Test**: `yarn test:regression`

## 📊 Laporan Pengujian (Allure)

Proyek ini menggunakan **Allure Report** untuk visualisasi hasil test yang komprehensif.

1.  **Jalankan Test** (pastikan env `allure=true` aktif, default di script `cy:run`):
    ```bash
    yarn cy:run
    ```

2.  **Generate Report**:
    Mengubah data mentah di `allure-results` menjadi HTML report di `allure-report`.
    ```bash
    yarn allure:generate
    ```

3.  **Buka Report**:
    Membuka report di browser default.
    ```bash
    yarn allure:open
    ```

> **Note**: Anda juga bisa menjalankan `yarn test:report` untuk menjalankan test dan langsung membuka report setelah selesai.

## 🔄 CI/CD

Proyek ini terintegrasi dengan **GitHub Actions** untuk menjalankan pengujian secara otomatis pada setiap:
*   Push ke branch `main`
*   Pull Request ke branch `main`

Workflow file dapat dilihat di `.github/workflows/cypress-ci.yml`.
Artifact report (Allure & Screenshots) akan tersedia untuk diunduh di tab "Actions" pada GitHub jika test gagal atau selesai.

---
*Dibuat oleh [Albarokah Rifansah Sutanto Putra](https://github.com/Albarokah9)*

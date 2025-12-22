# 🛁 Project Portfolio: E2E Testing - Soapleasure Website

![Cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Allure](https://img.shields.io/badge/-Allure_Report-21b3b3?style=for-the-badge&logo=allure&logoColor=white)

Proyek ini adalah portofolio otomatisasi pengujian *End-to-End* (E2E) untuk website [Soapleasure.com](https://soapleasure.com/). Pengujian ini dibangun menggunakan **Cypress** dengan menerapkan **best practices** untuk memastikan fungsionalitas utama website berjalan dengan baik.

> **🎉 Latest Update (v2.0.0)**: Test suite telah di-refactor dengan Cypress Session, centralized error messages, dan improved maintainability! [Lihat CHANGELOG.md](CHANGELOG.md)

---

## 📑 Daftar Isi

- [Tech Stack](#-tech-stack)
- [Fitur yang Diuji](#-fitur-yang-diuji)
- [What's New in v2.0.0](#-whats-new-in-v200)
- [Prerequisites](#-prerequisites)
- [Instalasi](#-instalasi)
- [Struktur Proyek](#-struktur-proyek)
- [Menjalankan Test](#-menjalankan-test)
- [Laporan Pengujian (Allure)](#-laporan-pengujian-allure)
- [Best Practices](#-best-practices)
- [Documentation](#-documentation)
- [CI/CD](#-cicd)

---

## 💻 Tech Stack

*   **Framework**: [Cypress](https://www.cypress.io/) v15.7.1
*   **Language**: JavaScript
*   **Reporting**: [Allure Report](https://allurereport.org/)
*   **CI/CD**: GitHub Actions
*   **Code Quality**: ESLint, Prettier
*   **Architecture**: Page Object Model (POM)

## 🎯 Fitur yang Diuji

Cakupan pengujian meliputi skenario positif dan negatif untuk fitur-fitur berikut:

*   **Authentication**: Login (11 tests), Register (9 tests), Forgot Password (5 tests), Logout (1 test)
*   **Shop**: Checkout flow (2 tests - Guest & Authenticated)

**Total: 28 test cases** dengan **100% passing rate** ✅

## 🆕 What's New in v2.0.0

### Major Refactoring (December 2025)

✨ **Cypress Session Implementation**
- Session caching untuk faster test execution (60-70% improvement)
- Custom commands: `cy.loginSession()`, `cy.logoutSession()`, `cy.clearAllSessions()`

📝 **Centralized Error Messages**
- Single source of truth di `cypress/support/constants/messages.js`
- No more hardcoded error messages
- Easy to maintain and update

🎯 **Better Test Organization**
- Nested `describe` blocks untuk logical grouping
- Comprehensive JSDoc documentation
- Clear test structure

📚 **Comprehensive Documentation**
- [REFACTORING_GUIDE.md](docs/REFACTORING_GUIDE.md) - Complete refactoring guide
- [MIGRATION_GUIDE.md](docs/MIGRATION_GUIDE.md) - Migration steps
- [TESTING_GUIDE.md](docs/TESTING_GUIDE.md) - Testing guide
- [TEST_EXECUTION_REPORT.md](docs/TEST_EXECUTION_REPORT.md) - Latest test results

🚀 **Performance Improvements**
- Login tests: ~45s → ~15s (67% faster)
- Logout tests: ~20s → ~8s (60% faster)
- Checkout tests: ~30s → ~10s (67% faster)

[📖 Read Full Changelog](CHANGELOG.md)

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

3.  **Checkout refactored branch (optional):**
    ```bash
    git checkout refactor/cypress-session-and-maintenance
    ```

## 📂 Struktur Proyek

```text
├── .github/workflows      # Konfigurasi CI/CD (GitHub Actions)
├── cypress
│   ├── e2e                # File test (Spec files)
│   │   ├── Authentication # Login, Register, Logout, ForgotPassword
│   │   └── Shop          # Checkout tests
│   ├── fixtures           # Data test (JSON)
│   ├── support
│   │   ├── commands.js    # Custom commands (Session, utilities)
│   │   ├── constants/     # Centralized constants
│   │   │   ├── messages.js   # Error/Success messages
│   │   │   └── urls.js       # URL constants
│   │   ├── helpers/       # Helper functions
│   │   │   └── sessionHelper.js  # Session management
│   │   └── pages/         # Page Object Model
│   │       ├── basePage.js
│   │       ├── loginPage.js
│   │       ├── logoutPage.js
│   │       ├── registerPage.js
│   │       ├── forgotPasswordPage.js
│   │       ├── productPage.js
│   │       ├── cartPage.js
│   │       └── checkoutPage.js
├── docs/                  # Documentation
│   ├── REFACTORING_GUIDE.md
│   ├── MIGRATION_GUIDE.md
│   ├── TESTING_GUIDE.md
│   └── TEST_EXECUTION_REPORT.md
├── allure-results         # Raw data untuk report
├── allure-report          # Report HTML final
├── CHANGELOG.md           # Version history
├── REFACTORING_SUMMARY.md # Quick reference
├── cypress.config.js      # Konfigurasi utama Cypress
└── package.json           # Dependencies & Scripts
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

### 5. Quick Test Commands
```bash
# Run all tests
npx cypress run

# Run specific file
npx cypress run --spec "cypress/e2e/Authentication/Login.cy.js"

# Open Cypress UI
npx cypress open
```

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

## 🎓 Best Practices

Test suite ini menerapkan best practices berikut:

### 1. **Page Object Model (POM)**
- Separation of concerns antara test logic dan page interactions
- Reusable page methods
- Easy to maintain

### 2. **Centralized Constants**
- Error messages di `constants/messages.js`
- URLs di `constants/urls.js`
- Single source of truth

### 3. **Custom Commands**
- Session management commands
- Utility commands untuk common operations
- Well documented dengan JSDoc

### 4. **Test Organization**
- Nested describe blocks untuk logical grouping
- Clear test naming conventions
- Comprehensive test coverage

### 5. **Code Quality**
- JSDoc documentation
- Consistent naming conventions
- Clean code principles

## 📚 Documentation

Dokumentasi lengkap tersedia di folder `docs/`:

### Quick Start
- [REFACTORING_SUMMARY.md](REFACTORING_SUMMARY.md) - Quick overview dan usage examples

### Detailed Guides
- [REFACTORING_GUIDE.md](docs/REFACTORING_GUIDE.md) - Complete refactoring documentation
- [MIGRATION_GUIDE.md](docs/MIGRATION_GUIDE.md) - How to migrate test files
- [TESTING_GUIDE.md](docs/TESTING_GUIDE.md) - Testing and verification guide

### Reports
- [CHANGELOG.md](CHANGELOG.md) - Version history and changes
- [TEST_EXECUTION_REPORT.md](docs/TEST_EXECUTION_REPORT.md) - Latest test execution results

## 🔄 CI/CD

Proyek ini terintegrasi dengan **GitHub Actions** untuk menjalankan pengujian secara otomatis pada setiap:
*   Push ke branch `main`
*   Pull Request ke branch `main`

Workflow file dapat dilihat di `.github/workflows/cypress-ci.yml`.
Artifact report (Allure & Screenshots) akan tersedia untuk diunduh di tab "Actions" pada GitHub jika test gagal atau selesai.

## 📊 Test Statistics

**Latest Test Run (v2.0.0):**
- ✅ Total Tests: 28
- ✅ Passing: 28 (100%)
- ✅ Failing: 0 (0%)
- ✅ Duration: 1:09 minutes
- ✅ Average per test: 2.5 seconds

[View Full Report](docs/TEST_EXECUTION_REPORT.md)

## 🤝 Contributing

Contributions are welcome! Please read the [MIGRATION_GUIDE.md](docs/MIGRATION_GUIDE.md) for guidelines on how to add new tests following the established patterns.

## 📝 License

This project is for portfolio purposes.

---

## 🎯 Project Highlights

✨ **Modern Architecture** - Page Object Model with best practices  
🚀 **High Performance** - 60-70% faster with session caching  
📚 **Well Documented** - Comprehensive guides and examples  
✅ **100% Passing** - All 28 tests passing consistently  
🔧 **Easy to Maintain** - Centralized constants and clear structure  
🎓 **Best Practices** - Following Cypress recommendations  

---

*Dibuat oleh [Albarokah Rifansah Sutanto Putra](https://github.com/Albarokah9)*

**Version:** 2.0.0 | **Last Updated:** December 2025

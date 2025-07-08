git clone https://github.com/Albarokah9/Project_Portofolio_e2e_cypress_soapleasure
# E2E Testing - Soapleasure Website

Automation testing untuk website [Soapleasure.com](https://soapleasure.com/) menggunakan Cypress dan Mochawesome reporting.

## Tech Stack
- **Framework**: Cypress
- **Reporting**: Cypress Mochawesome Reporter
- **Website**: Soapleasure.com
- **Manajemen Test Case**: ClickUp

## Test Cases
- Register
- Login
- Logout  
- Forgot Password
- Checkout

## Test Case & Report
https://drive.google.com/drive/folders/1k1AeSEvJvtBNFns2YaJbUl-72DiO1E6S?usp=drive_link

## Prerequisites
- Node.js (versi 16 atau lebih baru)
- Git
  
## Setup & Installation
```bash
npm install --global yarn
```
##  Clone Repository
```bash
git clone https://github.com/Albarokah9/Project_Portofolio_e2e_cypress_soapleasure
cd Project_Portofolio_e2e_cypress_soapleasure
```
## Install Dependencies
```bash
yarn install
```
## Run Tests
```bash
# Open Cypress Test Runner
yarn test:open

# Run all tests with report
yarn test:run:report

# Run tests in different browsers
yarn test:open:chrome
yarn test:open:firefox
yarn test:open:edge
```

Portfolio project untuk demonstrasi E2E testing automation.

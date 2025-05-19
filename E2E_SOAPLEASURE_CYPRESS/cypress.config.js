const { defineConfig } = require('cypress');
// Allure jika masih diperlukan
// const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Soapleasure Tests Report',
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // Menginstal plugin Mochawesome
      require('cypress-mochawesome-reporter/plugin')(on);
      
      // Jika masih ingin menggunakan Allure juga, bisa uncomment baris berikut
      // allureWriter(on, config);
      
      return config;
    },
    baseUrl: 'https://soapleasure.com/',
  },
  // konfigurasi Allure jika masih diperlukan
  // env: {
  //   allure: true,
  // },
});
// const { defineConfig } = require('cypress');
// const allureWriter = require('@shelex/cypress-allure-plugin/writer');

// module.exports = defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       allureWriter(on, config);
//       return config;
//     },
//     baseUrl: 'https://soapleasure.com/',
//   },
//   env: {
//     allure: true,
//   },
// });

// const { defineConfig } = require('cypress');
// const allureWriter = require('@shelex/cypress-allure-plugin/writer');
// const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
// const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
// const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');

// async function setupNodeEvents(on, config) {
//   // Tambahkan plugin Allure
//   allureWriter(on, config);

//   // Tambahkan plugin Cucumber Preprocessor
//   await addCucumberPreprocessorPlugin(on, config);

//   // Gunakan bundler untuk memproses file
//   on('file:preprocessor', createBundler({ plugins: [createEsbuildPlugin(config)] }));

//   return config;
// }

// module.exports = defineConfig({
//   video: false, // Nonaktifkan perekaman video
//   defaultCommandTimeout: 5000, // Timeout untuk perintah Cypress
//   pageLoadTimeout: 10000, // Timeout untuk memuat halaman
//   env: {
//     allure: true, // Enable Allure reporting
//   },
//   e2e: {
//     baseUrl: 'https://soapleasure.com/',
//     specPattern: 'cypress/e2e/**/*.feature', // Cari file .feature di folder e2e
//     supportFile: 'cypress/support/e2e.js', // File support untuk e2e testing
//     stepDefinitions: 'cypress/support/step_definitions/**/*.js', // Step definitions
//     setupNodeEvents, // Menjalankan setupNodeEvents yang telah didefinisikan
//   },
// });

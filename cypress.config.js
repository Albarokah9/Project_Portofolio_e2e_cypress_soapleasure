const { defineConfig } = require('cypress');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
    video: false,
    screenshotOnRunFailure: true,
    e2e: {
        setupNodeEvents(on, config) {
            allureWriter(on, config);
            return config;
        },
        baseUrl: 'https://soapleasure.com/',
        pageLoadTimeout: 60000,
        watchForFileChanges: false,
        retries: {
            runMode: 1,
            openMode: 0
        }
    },
    env: {
        allure: true,
        allureReuseAfterSpec: true
    }
});

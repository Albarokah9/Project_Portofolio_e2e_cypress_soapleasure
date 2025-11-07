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
        pageLoadTimeout: 100000,
        watchForFileChanges: false
    },
    env: {
        allure: true,
        allureReuseAfterSpec: true
    }
});

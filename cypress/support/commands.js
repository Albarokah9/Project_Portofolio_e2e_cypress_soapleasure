// ***********************************************
// File commands.js ini menunjukkan cara membuat
// berbagai custom commands dan menimpa
// commands yang sudah ada.
//
// Untuk contoh yang lebih lengkap tentang custom
// commands silakan baca di:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- Ini adalah parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- Ini adalah child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- Ini adalah dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- Ini akan menimpa existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// cypress/support/commands.js

// Perintah kustom untuk pengetikan lambat untuk mensimulasikan input manusia
Cypress.Commands.add('slowType', (selector, text, options = {}) => {
    const defaultOptions = { delay: 10 }; // Delay pengetikan default
    return cy.get(selector).type(text, { ...defaultOptions, ...options });
});

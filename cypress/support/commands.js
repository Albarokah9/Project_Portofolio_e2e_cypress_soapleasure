// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// cypress/support/commands.js

import './commands';
import '@shelex/cypress-allure-plugin';

// Perintah kustom untuk pengetikan lambat untuk mensimulasikan input manusia
Cypress.Commands.add('slowType', (selector, text, options = {}) => {
  const defaultOptions = { delay: 100 }; // Delay pengetikan default
  return cy.get(selector).type(text, { ...defaultOptions, ...options });
});

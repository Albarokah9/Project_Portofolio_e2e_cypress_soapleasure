// ***********************************************
// Custom Commands untuk Cypress E2E Testing
// 
// File ini berisi custom commands yang dapat digunakan
// di seluruh test suite untuk meningkatkan reusability
// dan maintainability
// ***********************************************

import { URLS } from './constants/urls';

// ========================================
// AUTHENTICATION COMMANDS
// ========================================

/**
 * Login menggunakan Cypress Session untuk caching
 * Ini akan menyimpan session dan tidak perlu login ulang di setiap test
 * 
 * @param {string} email - Email user
 * @param {string} password - Password user
 * @param {string} sessionName - Nama unik untuk session (default: email)
 * 
 * @example
 * cy.loginSession('test@gmail.com', 'password123')
 */
Cypress.Commands.add('loginSession', (email, password, sessionName = email) => {
    cy.session(
        sessionName,
        () => {
            // Visit login page
            cy.visit(URLS.HOME);
            cy.get('.d-inline-flex > [href="/account/login"] > u').click();
            cy.url().should('include', URLS.LOGIN);

            // Perform login
            cy.get('#input-email').should('be.visible').and('be.enabled').type(email);
            cy.get('#input-password').should('be.visible').and('be.enabled').type(password);
            cy.get('.btn').click();

            // Verify login success
            cy.get('.dropdown', { timeout: 10000 }).should('be.visible');
        },
        {
            validate() {
                // Validasi bahwa session masih aktif
                // Bisa dicek dengan cookie atau local storage
                cy.getCookie('connect.sid').should('exist');
            },
            cacheAcrossSpecs: true, // Cache session across different spec files
        }
    );
});

/**
 * Login tanpa menggunakan session (untuk test yang memerlukan fresh login)
 * 
 * @param {string} email - Email user
 * @param {string} password - Password user
 * 
 * @example
 * cy.loginWithoutSession('test@gmail.com', 'password123')
 */
Cypress.Commands.add('loginWithoutSession', (email, password) => {
    cy.visit(URLS.HOME);
    cy.get('.d-inline-flex > [href="/account/login"] > u').click();
    cy.url().should('include', URLS.LOGIN);

    cy.get('#input-email').should('be.visible').and('be.enabled').type(email);
    cy.get('#input-password').should('be.visible').and('be.enabled').type(password);
    cy.get('.btn').click();

    cy.get('.dropdown', { timeout: 10000 }).should('be.visible');
});

/**
 * Logout dari aplikasi
 * 
 * @example
 * cy.logoutSession()
 */
Cypress.Commands.add('logoutSession', () => {
    cy.get('.dropdown').click();
    cy.contains('Logout').click();
    cy.url().should('include', URLS.HOME);
});

// ========================================
// UTILITY COMMANDS
// ========================================

/**
 * Perintah kustom untuk pengetikan lambat untuk mensimulasikan input manusia
 * 
 * @param {string} selector - CSS selector
 * @param {string} text - Text yang akan diketik
 * @param {object} options - Options untuk typing (delay, etc)
 * 
 * @example
 * cy.slowType('#input-email', 'test@gmail.com', { delay: 50 })
 */
Cypress.Commands.add('slowType', (selector, text, options = {}) => {
    const defaultOptions = { delay: 10 };
    return cy.get(selector).type(text, { ...defaultOptions, ...options });
});

/**
 * Clear all sessions dan cookies
 * Berguna untuk reset state sebelum test
 * 
 * @example
 * cy.clearAllSessions()
 */
Cypress.Commands.add('clearAllSessions', () => {
    cy.clearCookies();
    cy.clearLocalStorage();
    Cypress.session.clearAllSavedSessions();
});

/**
 * Session Helper
 * 
 * Helper functions untuk mengelola Cypress sessions
 * Menyediakan utility functions untuk login, logout, dan session management
 */

import { URLS } from '../constants/urls';

/**
 * Session configuration untuk different user types
 */
export const SESSION_CONFIG = {
    VALID_USER: 'valid-user-session',
    UNVERIFIED_USER: 'unverified-user-session',
    ADMIN_USER: 'admin-user-session',
};

/**
 * Setup login session untuk test yang memerlukan authenticated user
 * 
 * @param {string} email - Email user
 * @param {string} password - Password user
 * @param {string} sessionName - Nama session (optional)
 * 
 * @example
 * setupLoginSession('test@gmail.com', 'password123')
 */
export const setupLoginSession = (email, password, sessionName = SESSION_CONFIG.VALID_USER) => {
    cy.loginSession(email, password, sessionName);
};

/**
 * Navigate to specific page after login
 * 
 * @param {string} url - URL to navigate to
 * 
 * @example
 * navigateAfterLogin(URLS.PRODUCTS)
 */
export const navigateAfterLogin = (url) => {
    cy.visit(url);
    cy.url().should('include', url);
};

/**
 * Verify user is logged in
 * 
 * @example
 * verifyUserLoggedIn()
 */
export const verifyUserLoggedIn = () => {
    cy.get('.dropdown', { timeout: 10000 }).should('be.visible');
};

/**
 * Clear all sessions and start fresh
 * Useful untuk test yang memerlukan clean state
 * 
 * @example
 * clearAllSessions()
 */
export const clearAllSessions = () => {
    cy.clearAllSessions();
};

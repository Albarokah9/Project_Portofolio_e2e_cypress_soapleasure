import BasePage from './basePage';
import { URLS } from '../constants/urls';

/**
 * Selectors for Logout Page
 */
const SELECTORS = {
    // Navigation
    userDropdown: '.dropdown',
    logoutLink: '[href="/account/logout"]',

    // Confirmation
    loginLink: '.d-inline-flex > [href="/account/login"] > u',
};

/**
 * LogoutPage - Handles logout functionality
 * Extends BasePage for common functionality
 */
class LogoutPage extends BasePage {
    /**
     * Click user dropdown to reveal logout option
     */
    clickUserDropdown() {
        this.clickElement(SELECTORS.userDropdown);
        return this;
    }

    /**
     * Click logout link
     */
    clickLogoutLink() {
        this.clickElement(SELECTORS.logoutLink);
        return this;
    }

    /**
     * Complete logout flow
     */
    logout() {
        this.clickUserDropdown();
        this.clickLogoutLink();
        return this;
    }

    // ========================================
    // GETTERS - Return elements for flexible assertions
    // ========================================

    /**
     * Get login link element (visible after logout)
     * @returns {Cypress.Chainable} Cypress element
     */
    getLoginLink() {
        return this.getElement(SELECTORS.loginLink);
    }

    // ========================================
    // VERIFICATION METHODS - Common assertions for reusability
    // ========================================

    /**
     * Verify user is logged out successfully
     */
    verifyLogoutSuccess() {
        this.getLoginLink().should('be.visible');
        this.verifyUrl(URLS.HOME);
        return this;
    }
}

export default new LogoutPage();

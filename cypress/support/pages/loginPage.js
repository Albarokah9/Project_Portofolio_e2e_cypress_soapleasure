import BasePage from './basePage';
import { ERROR_MESSAGES } from '../constants/messages';
import { URLS } from '../constants/urls';

/**
 * Selectors for Login Page
 * Note: Ideally use data-cy attributes in the application
 * Current selectors are based on existing HTML structure
 */
const SELECTORS = {
    // Navigation
    loginLink: '.d-inline-flex > [href="/account/login"] > u',

    // Form inputs
    emailInput: '#input-email',
    passwordInput: '#input-password',

    // Buttons
    loginButton: '.btn',

    // Feedback elements
    userDropdown: '.dropdown',
    alertMessage: '.alert',
    invalidFeedback: '.invalid-feedback',
};

/**
 * LoginPage - Handles all login-related actions
 * Extends BasePage for common functionality
 */
class LoginPage extends BasePage {
    /**
     * Navigate to login page from home
     */
    visitLoginPage() {
        this.visit(URLS.HOME);
        this.clickElement(SELECTORS.loginLink);
        this.verifyUrl(URLS.LOGIN);
        return this;
    }

    /**
     * Type email into email input field
     * @param {string} email - Email address
     */
    typeEmail(email) {
        this.typeText(SELECTORS.emailInput, email);
        return this;
    }

    /**
     * Type password into password input field
     * @param {string} password - Password
     */
    typePassword(password) {
        this.typeText(SELECTORS.passwordInput, password);
        return this;
    }

    /**
     * Press Enter key on password field
     * @param {string} password - Password to type before pressing Enter
     */
    pressEnterOnPassword(password) {
        if (password) {
            cy.get(SELECTORS.passwordInput).type(`${password}{enter}`);
        } else {
            cy.get(SELECTORS.passwordInput).type('{enter}');
        }
        return this;
    }

    /**
     * Click login button
     */
    clickLoginButton() {
        this.clickElement(SELECTORS.loginButton);
        return this;
    }

    /**
     * Complete login flow
     * @param {string} email - Email address
     * @param {string} password - Password
     */
    login(email, password) {
        if (email) this.typeEmail(email);
        if (password) this.typePassword(password);
        this.clickLoginButton();
        return this;
    }

    /**
     * Login using Enter key
     * @param {string} email - Email address
     * @param {string} password - Password
     */
    loginWithEnter(email, password) {
        if (email) this.typeEmail(email);
        this.pressEnterOnPassword(password);
        return this;
    }

    // ========================================
    // GETTERS - Return elements for flexible assertions
    // ========================================

    /**
     * Get user dropdown element (visible when logged in)
     * @returns {Cypress.Chainable} Cypress element
     */
    getUserDropdown() {
        return this.getElement(SELECTORS.userDropdown, { timeout: 10000 });
    }

    /**
     * Get alert message element
     * @returns {Cypress.Chainable} Cypress element
     */
    getAlertMessage() {
        return this.getElement(SELECTORS.alertMessage);
    }

    /**
     * Get invalid feedback element
     * @returns {Cypress.Chainable} Cypress element
     */
    getInvalidFeedback() {
        return this.getElement(SELECTORS.invalidFeedback);
    }

    /**
     * Get password input element
     * @returns {Cypress.Chainable} Cypress element
     */
    getPasswordInput() {
        return this.getElement(SELECTORS.passwordInput);
    }

    // ========================================
    // VERIFICATION METHODS - Common assertions for reusability
    // ========================================

    /**
     * Verify user is successfully logged in
     */
    verifyLoginSuccess() {
        this.getUserDropdown().should('be.visible');
        return this;
    }

    /**
     * Verify invalid credentials error message
     */
    verifyInvalidCredentials() {
        this.getAlertMessage()
            .should('be.visible')
            .and('contain', ERROR_MESSAGES.LOGIN.INVALID_CREDENTIALS);
        return this;
    }

    /**
     * Verify invalid email format error
     */
    verifyInvalidEmailFormat() {
        this.getInvalidFeedback()
            .should('be.visible')
            .and('contain', ERROR_MESSAGES.LOGIN.INVALID_EMAIL_FORMAT);
        return this;
    }

    /**
     * Verify required email error
     */
    verifyRequiredEmail() {
        this.getInvalidFeedback()
            .should('be.visible')
            .and('contain', ERROR_MESSAGES.LOGIN.REQUIRED_EMAIL);
        return this;
    }

    /**
     * Verify required password error
     */
    verifyRequiredPassword() {
        this.getInvalidFeedback()
            .should('be.visible')
            .and('contain', ERROR_MESSAGES.LOGIN.REQUIRED_PASSWORD);
        return this;
    }

    /**
     * Verify both fields are required
     */
    verifyBothFieldsRequired() {
        this.getInvalidFeedback().eq(0).should('contain', ERROR_MESSAGES.LOGIN.REQUIRED_EMAIL);
        this.getInvalidFeedback().eq(1).should('contain', ERROR_MESSAGES.LOGIN.REQUIRED_PASSWORD);
        return this;
    }

    /**
     * Verify password field is masked
     */
    verifyPasswordMasked() {
        this.getPasswordInput().should('have.attr', 'type', 'password');
        return this;
    }
}

export default new LoginPage();

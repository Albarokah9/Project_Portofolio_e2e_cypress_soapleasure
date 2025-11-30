import BasePage from './basePage';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../constants/messages';
import { URLS } from '../constants/urls';

/**
 * Selectors for Forgot Password Page
 */
const SELECTORS = {
    // Navigation
    loginLink: '.d-inline-flex > [href="/account/login"] > u',
    forgotPasswordLink: '.d-flex > a > u',

    // Form inputs
    emailInput: '.form-control',

    // Buttons
    submitButton: '.btn',

    // Feedback elements
    instructionText: '.col-md-6 > .text-muted',
    successMessage: '.mb-3',
    toastMessage: '.react-toast-notifications__toast__content',
    invalidFeedback: '.invalid-feedback',
};

/**
 * ForgotPasswordPage - Handles forgot password functionality
 * Extends BasePage for common functionality
 */
class ForgotPasswordPage extends BasePage {
    /**
     * Navigate to forgot password page
     */
    visitForgotPasswordPage() {
        this.visit(URLS.HOME);
        this.clickElement(SELECTORS.loginLink);
        this.clickElement(SELECTORS.forgotPasswordLink);
        this.verifyUrl(URLS.FORGOT_PASSWORD);
        return this;
    }

    /**
     * Verify instruction text is displayed
     */
    verifyInstructionText() {
        this.getElement(SELECTORS.instructionText)
            .should('be.visible')
            .and('contain', SUCCESS_MESSAGES.FORGOT_PASSWORD.INSTRUCTION);
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
     * Click submit button
     */
    clickSubmitButton() {
        this.clickElement(SELECTORS.submitButton);
        return this;
    }

    /**
     * Complete forgot password flow
     * @param {string} email - Email address
     */
    submitForgotPassword(email) {
        this.typeEmail(email);
        this.clickSubmitButton();
        return this;
    }

    // ========================================
    // GETTERS - Return elements for flexible assertions
    // ========================================

    /**
     * Get success message element
     * @returns {Cypress.Chainable} Cypress element
     */
    getSuccessMessage() {
        return this.getElement(SELECTORS.successMessage);
    }

    /**
     * Get toast message element
     * @returns {Cypress.Chainable} Cypress element
     */
    getToastMessage() {
        return this.getElement(SELECTORS.toastMessage);
    }

    /**
     * Get invalid feedback element
     * @returns {Cypress.Chainable} Cypress element
     */
    getInvalidFeedback() {
        return this.getElement(SELECTORS.invalidFeedback);
    }

    // ========================================
    // VERIFICATION METHODS - Common assertions for reusability
    // ========================================

    /**
     * Verify success message is displayed
     */
    verifySuccessMessage() {
        this.getSuccessMessage()
            .should('be.visible')
            .and('contain', 'Check your email for a link to reset your password');
        return this;
    }

    /**
     * Verify email not found message
     * @param {string} email - Email that was not found
     */
    verifyEmailNotFound(email) {
        this.getToastMessage()
            .should('be.visible')
            .and('contain', ERROR_MESSAGES.FORGOT_PASSWORD.EMAIL_NOT_FOUND(email));
        return this;
    }

    /**
     * Verify invalid email format error
     */
    verifyInvalidEmailFormat() {
        this.getInvalidFeedback()
            .should('be.visible')
            .and('contain', ERROR_MESSAGES.FORGOT_PASSWORD.INVALID_EMAIL_FORMAT);
        return this;
    }

    /**
     * Verify required email error
     */
    verifyRequiredEmail() {
        this.getInvalidFeedback()
            .should('be.visible')
            .and('contain', ERROR_MESSAGES.FORGOT_PASSWORD.REQUIRED_EMAIL);
        return this;
    }
}

export default new ForgotPasswordPage();

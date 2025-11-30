import BasePage from './basePage';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../constants/messages';
import { URLS } from '../constants/urls';

/**
 * Selectors for Register Page
 */
const SELECTORS = {
    // Navigation
    registerLink: 'Register',

    // Form inputs
    firstNameInput: '#firstName',
    lastNameInput: '#lastName',
    emailInput: '#email',
    phoneInput: '#phone',
    passwordInput: '#password',
    confirmPasswordInput: '#confirmPassword',

    // Buttons
    registerButton: '.button',

    // Feedback elements
    alertMessage: '.alert',
    firstNameError: '.gutter-xs-1 > :nth-child(1) > .form-group > .invalid-feedback',
    lastNameError: '.gutter-xs-1 > :nth-child(2) > .form-group > .invalid-feedback',
    emailError: ':nth-child(2) > .invalid-feedback',
    phoneError: ':nth-child(3) > .invalid-feedback',
    passwordError: ':nth-child(4) > :nth-child(1) > .form-group > .invalid-feedback',
    confirmPasswordError: ':nth-child(4) > :nth-child(2) > .form-group > .invalid-feedback',
};

/**
 * RegisterPage - Handles all registration-related actions
 * Extends BasePage for common functionality
 */
class RegisterPage extends BasePage {
    /**
     * Navigate to register page
     */
    visitRegisterPage() {
        this.visit(URLS.HOME);
        cy.contains('Register').click();
        this.verifyUrl(URLS.REGISTER);
        return this;
    }

    /**
     * Type first name
     * @param {string} firstName
     */
    typeFirstName(firstName) {
        this.typeText(SELECTORS.firstNameInput, firstName);
        return this;
    }

    /**
     * Type last name
     * @param {string} lastName
     */
    typeLastName(lastName) {
        this.typeText(SELECTORS.lastNameInput, lastName);
        return this;
    }

    /**
     * Type email
     * @param {string} email
     */
    typeEmail(email) {
        this.typeText(SELECTORS.emailInput, email);
        return this;
    }

    /**
     * Type phone number
     * @param {string} phone
     */
    typePhone(phone) {
        this.typeText(SELECTORS.phoneInput, phone);
        return this;
    }

    /**
     * Type password
     * @param {string} password
     */
    typePassword(password) {
        this.typeText(SELECTORS.passwordInput, password);
        return this;
    }

    /**
     * Type confirm password
     * @param {string} confirmPassword
     */
    typeConfirmPassword(confirmPassword) {
        this.typeText(SELECTORS.confirmPasswordInput, confirmPassword);
        return this;
    }

    /**
     * Click register button
     */
    clickRegisterButton() {
        this.clickElement(SELECTORS.registerButton);
        return this;
    }

    /**
     * Complete registration flow
     * @param {string} firstName
     * @param {string} lastName
     * @param {string} email
     * @param {string} phone
     * @param {string} password
     * @param {string} confirmPassword
     */
    register(firstName, lastName, email, phone, password, confirmPassword) {
        if (firstName) this.typeFirstName(firstName);
        if (lastName) this.typeLastName(lastName);
        if (email) this.typeEmail(email);
        if (phone) this.typePhone(phone);
        if (password) this.typePassword(password);
        if (confirmPassword) this.typeConfirmPassword(confirmPassword);

        this.clickRegisterButton();
        return this;
    }

    // ========================================
    // GETTERS - Return elements for flexible assertions
    // ========================================

    /**
     * Get alert message element
     * @returns {Cypress.Chainable} Cypress element
     */
    getAlertMessage() {
        return this.getElement(SELECTORS.alertMessage);
    }

    /**
     * Get email input element
     * @returns {Cypress.Chainable} Cypress element
     */
    getEmailInput() {
        return this.getElement(SELECTORS.emailInput);
    }

    /**
     * Get first name error element
     * @returns {Cypress.Chainable} Cypress element
     */
    getFirstNameError() {
        return this.getElement(SELECTORS.firstNameError);
    }

    /**
     * Get last name error element
     * @returns {Cypress.Chainable} Cypress element
     */
    getLastNameError() {
        return this.getElement(SELECTORS.lastNameError);
    }

    /**
     * Get email error element
     * @returns {Cypress.Chainable} Cypress element
     */
    getEmailError() {
        return this.getElement(SELECTORS.emailError);
    }

    /**
     * Get phone error element
     * @returns {Cypress.Chainable} Cypress element
     */
    getPhoneError() {
        return this.getElement(SELECTORS.phoneError);
    }

    /**
     * Get password error element
     * @returns {Cypress.Chainable} Cypress element
     */
    getPasswordError() {
        return this.getElement(SELECTORS.passwordError);
    }

    /**
     * Get confirm password error element
     * @returns {Cypress.Chainable} Cypress element
     */
    getConfirmPasswordError() {
        return this.getElement(SELECTORS.confirmPasswordError);
    }

    // ========================================
    // VERIFICATION METHODS - Common assertions for reusability
    // ========================================

    /**
     * Verify registration success
     * @param {string} email - Email used for registration
     */
    verifyRegistrationSuccess(email) {
        this.getAlertMessage()
            .should('be.visible')
            .and('contain', SUCCESS_MESSAGES.REGISTER.CONFIRMATION_EMAIL(email));
        return this;
    }

    /**
     * Verify all required field errors
     */
    verifyAllRequiredFieldsError() {
        this.getFirstNameError()
            .should('be.visible')
            .and('contain', ERROR_MESSAGES.REGISTER.REQUIRED_FIRST_NAME);

        this.getLastNameError()
            .should('be.visible')
            .and('contain', ERROR_MESSAGES.REGISTER.REQUIRED_LAST_NAME);

        this.getEmailError()
            .should('be.visible')
            .and('contain', ERROR_MESSAGES.REGISTER.REQUIRED_EMAIL);

        this.getPhoneError()
            .should('be.visible')
            .invoke('text')
            .then((text) => {
                expect(
                    text.trim() === ERROR_MESSAGES.REGISTER.PHONE_CUSTOM ||
                    text.trim() === ERROR_MESSAGES.REGISTER.INVALID_PHONE
                ).to.be.true;
            });

        this.getPasswordError()
            .should('be.visible')
            .and('contain', ERROR_MESSAGES.REGISTER.SHORT_PASSWORD);

        this.getConfirmPasswordError()
            .should('be.visible')
            .and('contain', ERROR_MESSAGES.REGISTER.REQUIRED_CONFIRM_PASSWORD);

        return this;
    }

    /**
     * Verify phone error message
     */
    verifyPhoneError() {
        this.getPhoneError()
            .should('be.visible')
            .invoke('text')
            .should('match', /(Phone is invalid format|custom\.phone)/);
        return this;
    }

    /**
     * Verify email required error
     */
    verifyEmailRequired() {
        this.getEmailError()
            .should('be.visible')
            .and('contain', ERROR_MESSAGES.REGISTER.REQUIRED_EMAIL);
        return this;
    }

    /**
     * Verify invalid email format error
     */
    verifyInvalidEmailFormat() {
        this.getEmailInput().then(($input) => {
            expect($input[0].validationMessage).to.include('email');
        });
        return this;
    }

    /**
     * Verify short password error
     */
    verifyShortPassword() {
        this.getPasswordError()
            .should('be.visible')
            .and('contain', ERROR_MESSAGES.REGISTER.SHORT_PASSWORD);
        return this;
    }

    /**
     * Verify password mismatch error
     */
    verifyPasswordMismatch() {
        this.getConfirmPasswordError()
            .should('be.visible')
            .and('contain', ERROR_MESSAGES.REGISTER.PASSWORD_MISMATCH);
        return this;
    }

    /**
     * Verify confirm password required error
     */
    verifyConfirmPasswordRequired() {
        this.getConfirmPasswordError()
            .should('be.visible')
            .and('contain', ERROR_MESSAGES.REGISTER.PASSWORD_MISMATCH);
        return this;
    }
}

export default new RegisterPage();

import BasePage from './basePage';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../constants/messages';
import { URLS } from '../constants/urls';

/**
 * Selectors untuk Halaman Register
 */
const SELECTORS = {
    // Navigasi
    registerLink: 'Register',

    // Input form
    firstNameInput: '#firstName',
    lastNameInput: '#lastName',
    emailInput: '#email',
    phoneInput: '#phone',
    passwordInput: '#password',
    confirmPasswordInput: '#confirmPassword',

    // Tombol
    registerButton: '.button',

    // Elemen feedback
    alertMessage: '.alert',
    firstNameError: '.gutter-xs-1 > :nth-child(1) > .form-group > .invalid-feedback',
    lastNameError: '.gutter-xs-1 > :nth-child(2) > .form-group > .invalid-feedback',
    emailError: ':nth-child(2) > .invalid-feedback',
    phoneError: ':nth-child(3) > .invalid-feedback',
    passwordError: ':nth-child(4) > :nth-child(1) > .form-group > .invalid-feedback',
    confirmPasswordError: ':nth-child(4) > :nth-child(2) > .form-group > .invalid-feedback',
};

/**
 * RegisterPage - Menangani semua aksi terkait registrasi
 * Extends BasePage untuk fungsionalitas umum
 */
class RegisterPage extends BasePage {
    /**
     * Navigasi ke halaman register
     */
    visitRegisterPage() {
        this.visit(URLS.HOME);
        cy.contains('Register').click();
        this.verifyUrl(URLS.REGISTER);
        return this;
    }

    /**
     * Ketik nama depan
     * @param {string} firstName
     */
    typeFirstName(firstName) {
        this.typeText(SELECTORS.firstNameInput, firstName);
        return this;
    }

    /**
     * Ketik nama belakang
     * @param {string} lastName
     */
    typeLastName(lastName) {
        this.typeText(SELECTORS.lastNameInput, lastName);
        return this;
    }

    /**
     * Ketik email
     * @param {string} email
     */
    typeEmail(email) {
        this.typeText(SELECTORS.emailInput, email);
        return this;
    }

    /**
     * Ketik nomor telepon
     * @param {string} phone
     */
    typePhone(phone) {
        this.typeText(SELECTORS.phoneInput, phone);
        return this;
    }

    /**
     * Ketik password
     * @param {string} password
     */
    typePassword(password) {
        this.typeText(SELECTORS.passwordInput, password);
        return this;
    }

    /**
     * Ketik konfirmasi password
     * @param {string} confirmPassword
     */
    typeConfirmPassword(confirmPassword) {
        this.typeText(SELECTORS.confirmPasswordInput, confirmPassword);
        return this;
    }

    /**
     * Klik tombol register
     */
    clickRegisterButton() {
        this.clickElement(SELECTORS.registerButton);
        return this;
    }

    /**
     * Proses registrasi lengkap
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
    // GETTERS - Mengembalikan elemen untuk assertions yang fleksibel
    // ========================================

    /**
     * Dapatkan elemen alert message
     * @returns {Cypress.Chainable} Elemen Cypress
     */
    getAlertMessage() {
        return this.getElement(SELECTORS.alertMessage);
    }

    /**
     * Dapatkan elemen email input
     * @returns {Cypress.Chainable} Elemen Cypress
     */
    getEmailInput() {
        return this.getElement(SELECTORS.emailInput);
    }

    /**
     * Dapatkan elemen error nama depan
     * @returns {Cypress.Chainable} Elemen Cypress
     */
    getFirstNameError() {
        return this.getElement(SELECTORS.firstNameError);
    }

    /**
     * Dapatkan elemen error nama belakang
     * @returns {Cypress.Chainable} Elemen Cypress
     */
    getLastNameError() {
        return this.getElement(SELECTORS.lastNameError);
    }

    /**
     * Dapatkan elemen error email
     * @returns {Cypress.Chainable} Elemen Cypress
     */
    getEmailError() {
        return this.getElement(SELECTORS.emailError);
    }

    /**
     * Dapatkan elemen error telepon
     * @returns {Cypress.Chainable} Elemen Cypress
     */
    getPhoneError() {
        return this.getElement(SELECTORS.phoneError);
    }

    /**
     * Dapatkan elemen error password
     * @returns {Cypress.Chainable} Elemen Cypress
     */
    getPasswordError() {
        return this.getElement(SELECTORS.passwordError);
    }

    /**
     * Dapatkan elemen error konfirmasi password
     * @returns {Cypress.Chainable} Elemen Cypress
     */
    getConfirmPasswordError() {
        return this.getElement(SELECTORS.confirmPasswordError);
    }

    // ========================================
    // METODE VERIFIKASI - Assertions umum untuk reusability
    // ========================================

    /**
     * Verifikasi registrasi berhasil
     * @param {string} email - Email yang digunakan untuk registrasi
     */
    verifyRegistrationSuccess(email) {
        this.getAlertMessage()
            .should('be.visible')
            .and('contain', SUCCESS_MESSAGES.REGISTER.CONFIRMATION_EMAIL(email));
        return this;
    }

    /**
     * Verifikasi semua error field yang required
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
     * Verifikasi error message telepon
     */
    verifyPhoneError() {
        this.getPhoneError()
            .should('be.visible')
            .invoke('text')
            .should('match', /(Phone is invalid format|custom\.phone)/);
        return this;
    }

    /**
     * Verifikasi error email required
     */
    verifyEmailRequired() {
        this.getEmailError()
            .should('be.visible')
            .and('contain', ERROR_MESSAGES.REGISTER.REQUIRED_EMAIL);
        return this;
    }

    /**
     * Verifikasi error format email tidak valid
     */
    verifyInvalidEmailFormat() {
        this.getEmailInput().then(($input) => {
            expect($input[0].validationMessage).to.include('email');
        });
        return this;
    }

    /**
     * Verifikasi error password terlalu pendek
     */
    verifyShortPassword() {
        this.getPasswordError()
            .should('be.visible')
            .and('contain', ERROR_MESSAGES.REGISTER.SHORT_PASSWORD);
        return this;
    }

    /**
     * Verifikasi error password tidak cocok
     */
    verifyPasswordMismatch() {
        this.getConfirmPasswordError()
            .should('be.visible')
            .and('contain', ERROR_MESSAGES.REGISTER.PASSWORD_MISMATCH);
        return this;
    }

    /**
     * Verifikasi error konfirmasi password required
     */
    verifyConfirmPasswordRequired() {
        this.getConfirmPasswordError()
            .should('be.visible')
            .and('contain', ERROR_MESSAGES.REGISTER.PASSWORD_MISMATCH);
        return this;
    }
}

export default new RegisterPage();

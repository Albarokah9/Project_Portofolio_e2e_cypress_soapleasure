import BasePage from './basePage';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../constants/messages';
import { URLS } from '../constants/urls';

/**
 * Selectors untuk Halaman Lupa Password
 */
const SELECTORS = {
    // Navigasi
    loginLink: '.d-inline-flex > [href="/account/login"] > u',
    forgotPasswordLink: '.d-flex > a > u',

    // Input form
    emailInput: '.form-control',

    // Tombol
    submitButton: '.btn',

    // Elemen feedback
    instructionText: '.col-md-6 > .text-muted',
    successMessage: '.mb-3',
    toastMessage: '.react-toast-notifications__toast__content',
    invalidFeedback: '.invalid-feedback',
};

/**
 * ForgotPasswordPage - Menangani fungsionalitas lupa password
 * Extends BasePage untuk fungsionalitas umum
 */
class ForgotPasswordPage extends BasePage {
    /**
     * Navigasi ke halaman lupa password
     */
    visitForgotPasswordPage() {
        this.visit(URLS.HOME);
        this.clickElement(SELECTORS.loginLink);
        this.clickElement(SELECTORS.forgotPasswordLink);
        this.verifyUrl(URLS.FORGOT_PASSWORD);
        return this;
    }

    /**
     * Verifikasi teks instruksi ditampilkan
     */
    verifyInstructionText() {
        this.getElement(SELECTORS.instructionText)
            .should('be.visible')
            .and('contain', SUCCESS_MESSAGES.FORGOT_PASSWORD.INSTRUCTION);
        return this;
    }

    /**
     * Ketik email ke dalam input field email
     * @param {string} email - Alamat email
     */
    typeEmail(email) {
        this.typeText(SELECTORS.emailInput, email);
        return this;
    }

    /**
     * Klik tombol submit
     */
    clickSubmitButton() {
        this.clickElement(SELECTORS.submitButton);
        return this;
    }

    /**
     * Proses lupa password lengkap
     * @param {string} email - Alamat email
     */
    submitForgotPassword(email) {
        this.typeEmail(email);
        this.clickSubmitButton();
        return this;
    }

    // ========================================
    // GETTERS - Mengembalikan elemen untuk assertions yang fleksibel
    // ========================================

    /**
     * Dapatkan elemen pesan sukses
     * @returns {Cypress.Chainable} Elemen Cypress
     */
    getSuccessMessage() {
        return this.getElement(SELECTORS.successMessage);
    }

    /**
     * Dapatkan elemen toast message
     * @returns {Cypress.Chainable} Elemen Cypress
     */
    getToastMessage() {
        return this.getElement(SELECTORS.toastMessage);
    }

    /**
     * Dapatkan elemen invalid feedback
     * @returns {Cypress.Chainable} Elemen Cypress
     */
    getInvalidFeedback() {
        return this.getElement(SELECTORS.invalidFeedback);
    }

    // ========================================
    // METODE VERIFIKASI - Assertions umum untuk reusability
    // ========================================

    /**
     * Verifikasi pesan sukses ditampilkan
     */
    verifySuccessMessage() {
        this.getSuccessMessage()
            .should('be.visible')
            .and('contain', 'Check your email for a link to reset your password');
        return this;
    }

    /**
     * Verifikasi pesan email tidak ditemukan
     * @param {string} email - Email yang tidak ditemukan
     */
    verifyEmailNotFound(email) {
        this.getToastMessage()
            .should('be.visible')
            .and('contain', ERROR_MESSAGES.FORGOT_PASSWORD.EMAIL_NOT_FOUND(email));
        return this;
    }

    /**
     * Verifikasi error format email tidak valid
     */
    verifyInvalidEmailFormat() {
        this.getInvalidFeedback()
            .should('be.visible')
            .and('contain', ERROR_MESSAGES.FORGOT_PASSWORD.INVALID_EMAIL_FORMAT);
        return this;
    }

    /**
     * Verifikasi error email required
     */
    verifyRequiredEmail() {
        this.getInvalidFeedback()
            .should('be.visible')
            .and('contain', ERROR_MESSAGES.FORGOT_PASSWORD.REQUIRED_EMAIL);
        return this;
    }
}

export default new ForgotPasswordPage();

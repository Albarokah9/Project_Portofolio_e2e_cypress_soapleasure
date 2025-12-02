import BasePage from './basePage';
import { ERROR_MESSAGES } from '../constants/messages';
import { URLS } from '../constants/urls';

/**
 * Selectors untuk Halaman Login
 * Catatan: Idealnya menggunakan atribut data-cy di aplikasi
 * Selectors saat ini berdasarkan struktur HTML yang ada
 */
const SELECTORS = {
    // Navigasi
    loginLink: '.d-inline-flex > [href="/account/login"] > u',

    // Input form
    emailInput: '#input-email',
    passwordInput: '#input-password',

    // Tombol
    loginButton: '.btn',

    // Elemen feedback
    userDropdown: '.dropdown',
    alertMessage: '.alert',
    invalidFeedback: '.invalid-feedback',
};

/**
 * LoginPage - Menangani semua aksi terkait login
 * Extends BasePage untuk fungsionalitas umum
 */
class LoginPage extends BasePage {
    /**
     * Navigasi ke halaman login dari home
     */
    visitLoginPage() {
        this.visit(URLS.HOME);
        this.clickElement(SELECTORS.loginLink);
        this.verifyUrl(URLS.LOGIN);
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
     * Ketik password ke dalam input field password
     * @param {string} password - Password
     */
    typePassword(password) {
        this.typeText(SELECTORS.passwordInput, password);
        return this;
    }

    /**
     * Tekan tombol Enter pada field password
     * @param {string} password - Password yang akan diketik sebelum menekan Enter
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
     * Klik tombol login
     */
    clickLoginButton() {
        this.clickElement(SELECTORS.loginButton);
        return this;
    }

    /**
     * Proses login lengkap
     * @param {string} email - Alamat email
     * @param {string} password - Password
     */
    login(email, password) {
        if (email) this.typeEmail(email);
        if (password) this.typePassword(password);
        this.clickLoginButton();
        return this;
    }

    /**
     * Login menggunakan tombol Enter
     * @param {string} email - Alamat email
     * @param {string} password - Password
     */
    loginWithEnter(email, password) {
        if (email) this.typeEmail(email);
        this.pressEnterOnPassword(password);
        return this;
    }

    // ========================================
    // GETTERS - Mengembalikan elemen untuk assertions yang fleksibel
    // ========================================

    /**
     * Dapatkan elemen dropdown user (terlihat saat sudah login)
     * @returns {Cypress.Chainable} Elemen Cypress
     */
    getUserDropdown() {
        return this.getElement(SELECTORS.userDropdown, { timeout: 10000 });
    }

    /**
     * Dapatkan elemen alert message
     * @returns {Cypress.Chainable} Elemen Cypress
     */
    getAlertMessage() {
        return this.getElement(SELECTORS.alertMessage);
    }

    /**
     * Dapatkan elemen invalid feedback
     * @returns {Cypress.Chainable} Elemen Cypress
     */
    getInvalidFeedback() {
        return this.getElement(SELECTORS.invalidFeedback);
    }

    /**
     * Dapatkan elemen input password
     * @returns {Cypress.Chainable} Elemen Cypress
     */
    getPasswordInput() {
        return this.getElement(SELECTORS.passwordInput);
    }

    // ========================================
    // METODE VERIFIKASI - Assertions umum untuk reusability
    // ========================================

    /**
     * Verifikasi user berhasil login
     */
    verifyLoginSuccess() {
        this.getUserDropdown().should('be.visible');
        return this;
    }

    /**
     * Verifikasi pesan error kredensial tidak valid
     */
    verifyInvalidCredentials() {
        this.getAlertMessage()
            .should('be.visible')
            .and('contain', ERROR_MESSAGES.LOGIN.INVALID_CREDENTIALS);
        return this;
    }

    /**
     * Verifikasi error format email tidak valid
     */
    verifyInvalidEmailFormat() {
        this.getInvalidFeedback()
            .should('be.visible')
            .and('contain', ERROR_MESSAGES.LOGIN.INVALID_EMAIL_FORMAT);
        return this;
    }

    /**
     * Verifikasi error email required
     */
    verifyRequiredEmail() {
        this.getInvalidFeedback()
            .should('be.visible')
            .and('contain', ERROR_MESSAGES.LOGIN.REQUIRED_EMAIL);
        return this;
    }

    /**
     * Verifikasi error password required
     */
    verifyRequiredPassword() {
        this.getInvalidFeedback()
            .should('be.visible')
            .and('contain', ERROR_MESSAGES.LOGIN.REQUIRED_PASSWORD);
        return this;
    }

    /**
     * Verifikasi kedua field required
     */
    verifyBothFieldsRequired() {
        this.getInvalidFeedback().eq(0).should('contain', ERROR_MESSAGES.LOGIN.REQUIRED_EMAIL);
        this.getInvalidFeedback().eq(1).should('contain', ERROR_MESSAGES.LOGIN.REQUIRED_PASSWORD);
        return this;
    }

    /**
     * Verifikasi field password tertutup (masked)
     */
    verifyPasswordMasked() {
        this.getPasswordInput().should('have.attr', 'type', 'password');
        return this;
    }
}

export default new LoginPage();

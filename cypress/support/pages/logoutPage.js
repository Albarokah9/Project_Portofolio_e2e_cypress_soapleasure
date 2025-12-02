import BasePage from './basePage';
import { URLS } from '../constants/urls';

/**
 * Selectors untuk Halaman Logout
 */
const SELECTORS = {
    // Navigasi
    userDropdown: '.dropdown',
    logoutLink: '[href="/account/logout"]',

    // Konfirmasi
    loginLink: '.d-inline-flex > [href="/account/login"] > u',
};

/**
 * LogoutPage - Menangani fungsionalitas logout
 * Extends BasePage untuk fungsionalitas umum
 */
class LogoutPage extends BasePage {
    /**
     * Klik dropdown user untuk menampilkan opsi logout
     */
    clickUserDropdown() {
        this.clickElement(SELECTORS.userDropdown);
        return this;
    }

    /**
     * Klik link logout
     */
    clickLogoutLink() {
        this.clickElement(SELECTORS.logoutLink);
        return this;
    }

    /**
     * Proses logout lengkap
     */
    logout() {
        this.clickUserDropdown();
        this.clickLogoutLink();
        return this;
    }

    // ========================================
    // GETTERS - Mengembalikan elemen untuk assertions yang fleksibel
    // ========================================

    /**
     * Dapatkan elemen link login (terlihat setelah logout)
     * @returns {Cypress.Chainable} Elemen Cypress
     */
    getLoginLink() {
        return this.getElement(SELECTORS.loginLink);
    }

    // ========================================
    // METODE VERIFIKASI - Assertions umum untuk reusability
    // ========================================

    /**
     * Verifikasi user berhasil logout
     */
    verifyLogoutSuccess() {
        this.getLoginLink().should('be.visible');
        this.verifyUrl(URLS.HOME);
        return this;
    }
}

export default new LogoutPage();

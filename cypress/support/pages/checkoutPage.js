import BasePage from './basePage';
import { URLS } from '../constants/urls';

/**
 * Selectors untuk Halaman Checkout
 */
const SELECTORS = {
    // Tombol checkout
    checkoutButton: '.panel-body > :nth-child(2) > .btn',
};

/**
 * CheckoutPage - Menangani proses checkout
 * Extends BasePage untuk fungsionalitas umum
 */
class CheckoutPage extends BasePage {
    /**
     * Klik tombol checkout
     */
    proceedToCheckout() {
        this.clickElement(SELECTORS.checkoutButton);
        return this;
    }

    /**
     * Verifikasi user berada di halaman checkout
     */
    verifyCheckoutPage() {
        this.verifyUrl(URLS.CHECKOUT);
        return this;
    }

    // ========================================
    // GETTERS
    // ========================================

    /**
     * Dapatkan elemen tombol checkout
     * @returns {Cypress.Chainable} Elemen Cypress
     */
    getCheckoutButton() {
        return this.getElement(SELECTORS.checkoutButton);
    }
}

export default new CheckoutPage();

import BasePage from './basePage';
import { URLS } from '../constants/urls';

/**
 * Selectors for Checkout Page
 */
const SELECTORS = {
    // Checkout button
    checkoutButton: '.panel-body > :nth-child(2) > .btn',
};

/**
 * CheckoutPage - Handles checkout process
 * Extends BasePage for common functionality
 */
class CheckoutPage extends BasePage {
    /**
     * Click checkout button
     */
    proceedToCheckout() {
        this.clickElement(SELECTORS.checkoutButton);
        return this;
    }

    /**
     * Verify user is on checkout page
     */
    verifyCheckoutPage() {
        this.verifyUrl(URLS.CHECKOUT);
        return this;
    }

    // ========================================
    // GETTERS
    // ========================================

    /**
     * Get checkout button element
     * @returns {Cypress.Chainable} Cypress element
     */
    getCheckoutButton() {
        return this.getElement(SELECTORS.checkoutButton);
    }
}

export default new CheckoutPage();

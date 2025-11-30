import BasePage from './basePage';
import { SUCCESS_MESSAGES } from '../constants/messages';

/**
 * Selectors for Cart Page
 */
const SELECTORS = {
    // Cart elements
    cartButton: '.txt-chart',

    // Product actions
    addToCartButton: '.mt-2 > :nth-child(1)',
    buyNowButton: '.primary',
    addQuantity: '.icon_plus',

    // Feedback
    toastMessage: '.react-toast-notifications__toast__content',
};

/**
 * CartPage - Handles shopping cart functionality
 * Extends BasePage for common functionality
 */
class CartPage extends BasePage {
    /**
     * Click add to cart button
     */
    addToCart() {
        this.clickElement(SELECTORS.addToCartButton);
        return this;
    }

    /**
     * Click buy now button
     */
    buyNow() {
        this.clickElement(SELECTORS.buyNowButton);
        return this;
    }

    /**
     * Increase product quantity
     */
    addQuantity() {
        this.clickElement(SELECTORS.addQuantity);
        return this;
    }

    /**
     * View cart
     */
    viewCart() {
        this.clickElement(SELECTORS.cartButton);
        return this;
    }

    // ========================================
    // GETTERS
    // ========================================

    /**
     * Get toast message element
     * @returns {Cypress.Chainable} Cypress element
     */
    getToastMessage() {
        return this.getElement(SELECTORS.toastMessage);
    }

    // ========================================
    // VERIFICATION METHODS
    // ========================================

    /**
     * Verify product was added to cart successfully
     */
    verifyProductAddedToCart() {
        this.getToastMessage()
            .should('be.visible')
            .and('contain', SUCCESS_MESSAGES.CART.PRODUCT_ADDED);
        return this;
    }
}

export default new CartPage();

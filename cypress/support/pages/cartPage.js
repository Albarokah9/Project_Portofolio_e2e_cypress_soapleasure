import BasePage from './basePage';
import { SUCCESS_MESSAGES } from '../constants/messages';

/**
 * Selectors untuk Halaman Cart
 */
const SELECTORS = {
    // Elemen Cart
    cartButton: '.txt-chart',

    // Aksi Produk
    addToCartButton: '.mt-2 > :nth-child(1)',
    buyNowButton: '.primary',
    addQuantity: '.icon_plus',

    // Feedback
    toastMessage: '.react-toast-notifications__toast__content',
};

/**
 * CartPage - Menangani fungsionalitas keranjang belanja
 * Extends BasePage untuk fungsionalitas umum
 */
class CartPage extends BasePage {
    /**
     * Klik tombol add to cart
     */
    addToCart() {
        this.clickElement(SELECTORS.addToCartButton);
        return this;
    }

    /**
     * Klik tombol buy now
     */
    buyNow() {
        this.clickElement(SELECTORS.buyNowButton);
        return this;
    }

    /**
     * Tambah kuantitas produk
     */
    addQuantity() {
        this.clickElement(SELECTORS.addQuantity);
        return this;
    }

    /**
     * Lihat keranjang
     */
    viewCart() {
        this.clickElement(SELECTORS.cartButton);
        return this;
    }

    // ========================================
    // GETTERS
    // ========================================

    /**
     * Dapatkan elemen toast message
     * @returns {Cypress.Chainable} Elemen Cypress
     */
    getToastMessage() {
        return this.getElement(SELECTORS.toastMessage);
    }

    // ========================================
    // METODE VERIFIKASI
    // ========================================

    /**
     * Verifikasi produk berhasil ditambahkan ke keranjang
     */
    verifyProductAddedToCart() {
        this.getToastMessage()
            .should('be.visible')
            .and('contain', SUCCESS_MESSAGES.CART.PRODUCT_ADDED);
        return this;
    }
}

export default new CartPage();

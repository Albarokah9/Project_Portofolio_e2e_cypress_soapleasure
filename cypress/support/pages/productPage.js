import BasePage from './basePage';
import { URLS } from '../constants/urls';

/**
 * Selectors untuk Halaman Produk
 */
const SELECTORS = {
    // Search
    searchInput: 'input',

    // Elemen produk
    productName: '.name > a',

    // Navigasi kategori
    coldProcess: ':nth-child(1) > .category-menu',
    menuDropdown: 'div.menu-dropdown--wrapper',
};

/**
 * ProductPage - Menangani fungsionalitas browsing dan pencarian produk
 * Extends BasePage untuk fungsionalitas umum
 */
class ProductPage extends BasePage {
    /**
     * Navigasi ke halaman home
     */
    visitHomePage() {
        this.visit(URLS.HOME);
        return this;
    }

    /**
     * Cari produk
     * @param {string} productName - Nama produk yang akan dicari
     */
    searchProduct(productName) {
        cy.get(SELECTORS.searchInput).type(`${productName}{enter}`);
        return this;
    }

    /**
     * Klik produk berdasarkan index
     * @param {number} index - Index produk (default: 0)
     */
    clickProduct(index = 0) {
        cy.get(SELECTORS.productName).eq(index).click();
        return this;
    }

    /**
     * Klik produk berdasarkan nama
     * @param {string} productName - Nama persis produk
     */
    clickProductByName(productName) {
        cy.contains(productName).click();
        return this;
    }

    /**
     * Navigasi ke kategori Cold Process Soap dan pilih Essential Oil Soap
     * Kemudian pilih produk spesifik
     * @param {string} productName - Nama produk yang akan dipilih
     */
    navigateToColdProcessSoap(productName = 'SOAPLEASURE RECYCLE BLACK LEVEL LAVENDER SOAP') {
        cy.get(SELECTORS.coldProcess).click();
        cy.get(SELECTORS.menuDropdown).should('be.visible');
        cy.contains('a', 'Essential Oil Soap').click();
        this.verifyUrl(URLS.ESSENTIAL_OIL_SOAP);
        cy.contains(productName).click();
        return this;
    }

    // ========================================
    // GETTERS
    // ========================================

    /**
     * Dapatkan semua elemen nama produk
     * @returns {Cypress.Chainable} Elemen Cypress
     */
    getProductNames() {
        return this.getElement(SELECTORS.productName);
    }
}

export default new ProductPage();

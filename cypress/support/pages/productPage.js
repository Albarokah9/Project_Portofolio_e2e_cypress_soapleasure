import BasePage from './basePage';
import { URLS } from '../constants/urls';

/**
 * Selectors for Product Page
 */
const SELECTORS = {
    // Search
    searchInput: 'input',

    // Product elements
    productName: '.name > a',

    // Category navigation
    coldProcess: ':nth-child(1) > .category-menu',
    menuDropdown: 'div.menu-dropdown--wrapper',
};

/**
 * ProductPage - Handles product browsing and search functionality
 * Extends BasePage for common functionality
 */
class ProductPage extends BasePage {
    /**
     * Navigate to home page
     */
    visitHomePage() {
        this.visit(URLS.HOME);
        return this;
    }

    /**
     * Search for a product
     * @param {string} productName - Name of product to search
     */
    searchProduct(productName) {
        cy.get(SELECTORS.searchInput).type(`${productName}{enter}`);
        return this;
    }

    /**
     * Click on a product by index
     * @param {number} index - Index of product (default: 0)
     */
    clickProduct(index = 0) {
        cy.get(SELECTORS.productName).eq(index).click();
        return this;
    }

    /**
     * Click on a product by name
     * @param {string} productName - Exact name of product
     */
    clickProductByName(productName) {
        cy.contains(productName).click();
        return this;
    }

    /**
     * Navigate to Cold Process Soap category and select Essential Oil Soap
     * Then select a specific product
     * @param {string} productName - Name of the product to select
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
     * Get all product name elements
     * @returns {Cypress.Chainable} Cypress element
     */
    getProductNames() {
        return this.getElement(SELECTORS.productName);
    }
}

export default new ProductPage();

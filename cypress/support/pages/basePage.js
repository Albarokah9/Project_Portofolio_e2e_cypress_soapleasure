/**
 * BasePage - Parent class untuk semua page objects
 * Berisi common methods yang digunakan oleh semua pages
 */
class BasePage {
    /**
     * Navigate to a specific path
     * @param {string} path - URL path to visit
     */
    visit(path = '/') {
        cy.visit(path);
        return this;
    }

    /**
     * Verify current URL contains expected path
     * @param {string} expectedPath - Expected URL path
     */
    verifyUrl(expectedPath) {
        cy.url().should('include', expectedPath);
        return this;
    }

    /**
     * Click an element
     * @param {string} selector - CSS selector or data-cy attribute
     */
    clickElement(selector) {
        cy.get(selector).click();
        return this;
    }

    /**
     * Type text into an input field with slow typing
     * @param {string} selector - CSS selector
     * @param {string} text - Text to type
     */
    typeText(selector, text) {
        if (text) {
            cy.slowType(selector, text);
        }
        return this;
    }

    /**
     * Get an element with optional timeout
     * @param {string} selector - CSS selector
     * @param {object} options - Cypress options (timeout, etc.)
     */
    getElement(selector, options = {}) {
        return cy.get(selector, options);
    }

    /**
     * Take a screenshot
     * @param {string} name - Screenshot name
     */
    takeScreenshot(name) {
        cy.screenshot(name, { capture: 'fullPage' });
        return this;
    }

    /**
     * Wait for element to be visible
     * @param {string} selector - CSS selector
     * @param {number} timeout - Timeout in milliseconds
     */
    waitForElement(selector, timeout = 10000) {
        cy.get(selector, { timeout }).should('be.visible');
        return this;
    }

    /**
     * Clear input field
     * @param {string} selector - CSS selector
     */
    clearInput(selector) {
        cy.get(selector).clear();
        return this;
    }

    /**
     * Check if element exists
     * @param {string} selector - CSS selector
     */
    elementExists(selector) {
        return cy.get(selector).should('exist');
    }

    /**
     * Check if element is visible
     * @param {string} selector - CSS selector
     */
    elementIsVisible(selector) {
        return cy.get(selector).should('be.visible');
    }
}

export default BasePage;

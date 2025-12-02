/**
 * BasePage - Parent class untuk semua page objects
 * Berisi common methods yang digunakan oleh semua pages
 */
class BasePage {
    /**
     * Navigasi ke path tertentu
     * @param {string} path - URL path yang akan dikunjungi
     */
    visit(path = '/') {
        cy.visit(path);
        return this;
    }

    /**
     * Verifikasi URL saat ini mengandung path yang diharapkan
     * @param {string} expectedPath - Path URL yang diharapkan
     */
    verifyUrl(expectedPath) {
        cy.url().should('include', expectedPath);
        return this;
    }

    /**
     * Klik sebuah elemen
     * @param {string} selector - CSS selector atau atribut data-cy
     */
    clickElement(selector) {
        cy.get(selector).click();
        return this;
    }

    /**
     * Ketik teks ke dalam input field dengan pengetikan lambat
     * @param {string} selector - CSS selector
     * @param {string} text - Teks yang akan diketik
     */
    typeText(selector, text) {
        if (text) {
            cy.slowType(selector, text);
        }
        return this;
    }

    /**
     * Dapatkan elemen dengan timeout opsional
     * @param {string} selector - CSS selector
     * @param {object} options - Opsi Cypress (timeout, dll.)
     */
    getElement(selector, options = {}) {
        return cy.get(selector, options);
    }

    /**
     * Ambil screenshot
     * @param {string} name - Nama screenshot
     */
    takeScreenshot(name) {
        cy.screenshot(name, { capture: 'fullPage' });
        return this;
    }

    /**
     * Tunggu elemen hingga terlihat
     * @param {string} selector - CSS selector
     * @param {number} timeout - Timeout dalam milidetik
     */
    waitForElement(selector, timeout = 10000) {
        cy.get(selector, { timeout }).should('be.visible');
        return this;
    }

    /**
     * Bersihkan input field
     * @param {string} selector - CSS selector
     */
    clearInput(selector) {
        cy.get(selector).clear();
        return this;
    }

    /**
     * Cek apakah elemen ada
     * @param {string} selector - CSS selector
     */
    elementExists(selector) {
        return cy.get(selector).should('exist');
    }

    /**
     * Cek apakah elemen terlihat
     * @param {string} selector - CSS selector
     */
    elementIsVisible(selector) {
        return cy.get(selector).should('be.visible');
    }
}

export default BasePage;

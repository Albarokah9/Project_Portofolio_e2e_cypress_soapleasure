const SELECTORS = {
    loginLink: '.d-inline-flex > [href="/account/login"] > u',
    emailInput: '#input-email',
    passwordInput: '#input-password',
    loginButton: '.btn',
    searchInput: 'input',
    cartButton: '.txt-chart',
    productName: '.name > a',
    addToCartButton: '.mt-2 > :nth-child(1)',
    buyNowButton: '.primary',
    addQuantity: '.icon_plus',
    checkoutButton: '.panel-body > :nth-child(2) > .btn',
    coldProcess: ':nth-child(1) > .category-menu',
};

class CheckoutPage {
    visitHomePage() {
        cy.visit('/');
    }

    typeSearchAsGuest() {
        cy.get(SELECTORS.searchInput).type('Soapleasure Classic Brew Coffee Soap{enter}');
        return this;
    }

    typeEmail(email) {
        cy.get(SELECTORS.emailInput).type(email); //.type('test@gmail.com');
        return this;
    }

    typePassword(password) {
        cy.get(SELECTORS.passwordInput).type(password); //.type('password123');
        return this;
    }

    clickLogin() {
        cy.get(SELECTORS.loginLink).click();
        return this;
    }

    clickLoginButton() {
        cy.get(SELECTORS.loginButton).click();
        return this;
    }

    clickProduct() {
        cy.get(SELECTORS.productName).eq(0).click();
        return this;
    }

    /**
     * Navigates to the 'Essential Oil Soap' category by triggering a mouseover
     * on the cold process category and verifies the dropdown is visible.
     * Clicks on the 'Essential Oil Soap' link and ensures the URL includes
     * the expected path. Finally, selects the 'SOAPLEASURE RECYCLE BLACK LEVEL
     * LAVENDER SOAP' product.
     */

    clickColdProcessSoap() {
        cy.get(SELECTORS.coldProcess).click();
        cy.get('div.menu-dropdown--wrapper').should('be.visible');
        cy.contains('a', 'Essential Oil Soap').click();
        cy.url().should(
            'eq',
            'https://soapleasure.com/shop/cold-process-soap/cold-process-soap-soap-by-scents/cold-process-soap-soap-by-scents-essential-oil-soap'
        );
        cy.contains('SOAPLEASURE RECYCLE BLACK LEVEL LAVENDER SOAP').click();
        return this;
    }

    addToCart() {
        cy.get(SELECTORS.addToCartButton).click();
        return this;
    }

    buyNow() {
        cy.get(SELECTORS.buyNowButton).click();
        return this;
    }

    addQuantity() {
        cy.get(SELECTORS.addQuantity).click();
        return this;
    }

    checkout() {
        cy.get(SELECTORS.checkoutButton).click();
        return this;
    }

    assertProductAddedToCart() {
        cy.get('.react-toast-notifications__toast__content')
            .should('be.visible')
            .should('contain', 'Product has been added to your cart');
        cy.screenshot('Product Added to Cart', { capture: 'fullPage' });
        return this;
    }

    login(email, password) {
        this.clickLogin();
        this.typeEmail(email);
        this.typePassword(password);
        this.clickLoginButton();
        return this;
    }
}

export default new CheckoutPage();

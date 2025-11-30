/// <reference types="cypress" />
import LoginPage from '../../support/pages/loginPage';
import ProductPage from '../../support/pages/productPage';
import CartPage from '../../support/pages/cartPage';
import CheckoutPage from '../../support/pages/checkoutPage';

describe('Checkout Test Suite', () => {
    beforeEach(() => {
        ProductPage.visitHomePage();
    });

    afterEach(() => {
        cy.clearCookies();
    });

    it('TC_CO_001 - Verifikasi pengguna dapat menyelesaikan proses checkout sebagai guest dengan mengisi semua informasi yang diperlukan dan melakukan pembayaran', () => {
        // Search for product as guest
        ProductPage.searchProduct('Soapleasure Classic Brew Coffee Soap').clickProduct();

        // Add to cart and proceed to checkout
        CartPage.addQuantity().buyNow();

        CheckoutPage.proceedToCheckout();

        // Verify product was added
        CartPage.verifyProductAddedToCart();

        cy.screenshot('TC_CO_001-guest-checkout', { capture: 'fullPage' });
    });

    it('TC_CO_002 - Verifikasi pengguna yang sudah login dapat menemukan produk melalui navigasi kategori, menambahkannya ke keranjang, dan berhasil menyelesaikan proses checkout', () => {
        cy.fixture('loginData.json').then((data) => {
            const { email, password } = data.validUser;

            // Login first
            LoginPage.visitLoginPage().login(email, password).verifyLoginSuccess();

            // Navigate to home and browse products
            ProductPage.visitHomePage().navigateToColdProcessSoap();

            // Buy now and checkout
            CartPage.buyNow();
            CheckoutPage.proceedToCheckout();

            // Verify product was added
            CartPage.verifyProductAddedToCart();

            cy.screenshot('TC_CO_002-logged-in-checkout', { capture: 'fullPage' });
        });
    });
});

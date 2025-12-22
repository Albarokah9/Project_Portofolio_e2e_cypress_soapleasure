/// <reference types="cypress" />
import ProductPage from '../../support/pages/productPage';
import CartPage from '../../support/pages/cartPage';
import CheckoutPage from '../../support/pages/checkoutPage';
import { setupLoginSession } from '../../support/helpers/sessionHelper';

describe('Checkout Test Suite', () => {
    let testData;

    before(() => {
        // Load test data once before all tests
        cy.fixture('loginData.json').then((data) => {
            testData = data;
        });
    });

    afterEach(() => {
        cy.clearCookies();
    });

    describe('Guest Checkout', () => {
        beforeEach(() => {
            ProductPage.visitHomePage();
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
    });

    describe('Authenticated User Checkout', () => {
        beforeEach(() => {
            // Setup login session before each test
            const { email, password } = testData.validUser;
            setupLoginSession(email, password);

            // Navigate to home page after login
            ProductPage.visitHomePage();
        });

        it('TC_CO_002 - Verifikasi pengguna yang sudah login dapat menemukan produk melalui navigasi kategori, menambahkannya ke keranjang, dan berhasil menyelesaikan proses checkout', () => {
            // Navigate and browse products
            ProductPage.navigateToColdProcessSoap();

            // Buy now and checkout
            CartPage.buyNow();
            CheckoutPage.proceedToCheckout();

            // Verify product was added
            CartPage.verifyProductAddedToCart();

            cy.screenshot('TC_CO_002-logged-in-checkout', { capture: 'fullPage' });
        });
    });
});

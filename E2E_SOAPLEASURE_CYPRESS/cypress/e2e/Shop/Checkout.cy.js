/// <reference types="cypress" />
import CheckoutPage from '../../support/pages/checkoutPage';

describe('Checkout Test Suite', () => {
  beforeEach(() => {
    CheckoutPage.visitHomePage();
  });

  it('Checkout sebagai guest', function () {
    CheckoutPage.typeSearchAsGuest()
    .clickProduct()
    .addQuantity()
    .buyNow()
    .checkout()
    .assertProductAddedToCart();
   });

   it('Checkout sebagai pengguna yang sudah login mengunakan menu category home page', function () {
    CheckoutPage.clickLogin()
    .typeEmail()
    .typePassword()
    .clickLoginButton()
    .clickColdProcessSoap()
    .buyNow()
    .checkout()
    .assertProductAddedToCart();
   });
});

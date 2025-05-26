/// <reference types="cypress" />
import CheckoutPage from '../../support/pages/checkoutPage';

describe('Checkout Test Suite', () => {
  beforeEach(() => {
    CheckoutPage.visitHomePage();
  });

  it('TC_CO_001 - Verifikasi pengguna dapat menyelesaikan proses checkout sebagai guest dengan mengisi semua informasi yang diperlukan dan melakukan pembayaran', function () {
    CheckoutPage.typeSearchAsGuest()
    .clickProduct()
    .addQuantity()
    .buyNow()
    .checkout()
    .assertProductAddedToCart();
   });

   it('TC_CO_002 - Verifikasi pengguna yang sudah login dapat menemukan produk melalui navigasi kategori, menambahkannya ke keranjang, dan berhasil menyelesaikan proses checkout', function () {
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

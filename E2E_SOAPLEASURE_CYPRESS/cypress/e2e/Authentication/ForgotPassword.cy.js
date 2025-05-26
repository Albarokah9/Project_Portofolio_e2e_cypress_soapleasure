/// <reference types="cypress" />
import forgotPasswordPage from '../../support/pages/forgotPasswordPage';

describe('Forgot Password Test Suite', function () {
  beforeEach(function () {
    cy.fixture('forgotPasswordData').as('userData');
    forgotPasswordPage.visitHome()
  });

  it('TC_FORGOTPWD_01 - Verifikasi fungsionalitas "Forgot Password" berhasil ketika menggunakan alamat email yang valid dan sudah terdaftar di sistem', function () {
    const registeredEmail = this.userData.registeredEmail;

    forgotPasswordPage.clickLoginLink()
    .clickForgotPasswordLink()
    .verifyInstructionText()
    .typeEmail(registeredEmail)
    .clickSubmitButton()
    .verifySuccessMessage();
  });

  it('TC_FORGOTPWD_02 - Verifikasi respons sistem ketika pengguna mencoba mereset password menggunakan alamat email yang tidak terdaftar', function () {
    const unregisteredEmail = this.userData.unregisteredEmail;
    
    forgotPasswordPage.clickLoginLink()
    .clickForgotPasswordLink()
    .verifyInstructionText()
    .typeEmail(unregisteredEmail)
    .clickSubmitButton()
    .verifyEmailNotFoundMessage(unregisteredEmail);
  });

  it('TC_FORGOTPWD_03 - Verifikasi pesan error validasi ketika pengguna memasukkan alamat email dengan format yang salah pada halaman "Forgot Password', function () {
    const invalidEmail = this.userData.invalidEmail;
    
    forgotPasswordPage.clickLoginLink()
    .clickForgotPasswordLink()
    .verifyInstructionText()
    .typeEmail(invalidEmail)
    .clickSubmitButton()
    .verifyInvalidEmailFormatMessage();
  });

  it('TC_FORGOTPWD_04 - Verifikasi pesan error validasi ketika pengguna mencoba melanjutkan proses "Forgot Password" tanpa mengisi field email', function () {
    forgotPasswordPage.clickLoginLink()
    .clickForgotPasswordLink()
    .verifyInstructionText()
    .clickSubmitButton()
    .verifyRequiredEmailMessage();
  });
});

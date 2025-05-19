/// <reference types="cypress" />
import forgotPasswordPage from '../../support/pages/forgotPasswordPage';

describe('Forgot Password Test Suite', function () {
  beforeEach(function () {
    cy.fixture('forgotPasswordData').as('userData');
  });

  it('menggunakan email yang sudah terdaftar', function () {
    const registeredEmail = this.userData.registeredEmail;

    forgotPasswordPage.visitHome();
    forgotPasswordPage.clickLoginLink();
    forgotPasswordPage.clickForgotPasswordLink();
    forgotPasswordPage.verifyInstructionText();
    forgotPasswordPage.typeEmail(registeredEmail);
    forgotPasswordPage.clickSubmitButton();
    forgotPasswordPage.verifySuccessMessage();
  });

  it('menggunakan email yang belum terdaftar', function () {
    const unregisteredEmail = this.userData.unregisteredEmail;
    
    forgotPasswordPage.visitHome();
    forgotPasswordPage.clickLoginLink();
    forgotPasswordPage.clickForgotPasswordLink();
    forgotPasswordPage.verifyInstructionText();
    forgotPasswordPage.typeEmail(unregisteredEmail);
    forgotPasswordPage.clickSubmitButton();
    forgotPasswordPage.verifyEmailNotFoundMessage(unregisteredEmail);
  });

  it('menggunakan format email yang salah', function () {
    const invalidEmail = this.userData.invalidEmail;
    
    forgotPasswordPage.visitHome();
    forgotPasswordPage.clickLoginLink();
    forgotPasswordPage.clickForgotPasswordLink();
    forgotPasswordPage.verifyInstructionText();
    forgotPasswordPage.typeEmail(invalidEmail);
    forgotPasswordPage.clickSubmitButton();
    forgotPasswordPage.verifyInvalidEmailFormatMessage();
  });

  it('tanpa mengisi field email', function () {
    forgotPasswordPage.visitHome();
    forgotPasswordPage.clickLoginLink();
    forgotPasswordPage.clickForgotPasswordLink();
    forgotPasswordPage.verifyInstructionText();
    forgotPasswordPage.clickSubmitButton();
    forgotPasswordPage.verifyRequiredEmailMessage();
  });
});

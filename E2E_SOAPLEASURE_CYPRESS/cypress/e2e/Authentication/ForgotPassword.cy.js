/// <reference types="cypress" />
import forgotPasswordPage from '../../support/pages/forgotPasswordPage';

describe('Forgot Password Test Suite', function () {
  beforeEach(function () {
    cy.fixture('forgotPasswordData').as('userData');
    forgotPasswordPage.visitHome()
  });

  it('menggunakan email yang sudah terdaftar', function () {
    const registeredEmail = this.userData.registeredEmail;

    forgotPasswordPage.clickLoginLink()
    .clickForgotPasswordLink()
    .verifyInstructionText()
    .typeEmail(registeredEmail)
    .clickSubmitButton()
    .verifySuccessMessage();
  });

  it('menggunakan email yang belum terdaftar', function () {
    const unregisteredEmail = this.userData.unregisteredEmail;
    
    forgotPasswordPage.visitHome()
    .clickLoginLink()
    .clickForgotPasswordLink()
    .verifyInstructionText()
    .typeEmail(unregisteredEmail)
    .clickSubmitButton()
    .verifyEmailNotFoundMessage(unregisteredEmail);
  });

  it('menggunakan format email yang salah', function () {
    const invalidEmail = this.userData.invalidEmail;
    
    forgotPasswordPage.visitHome()
    .clickLoginLink()
    .clickForgotPasswordLink()
    .verifyInstructionText()
    .typeEmail(invalidEmail)
    .clickSubmitButton()
    .verifyInvalidEmailFormatMessage();
  });

  it('tanpa mengisi field email', function () {
    forgotPasswordPage.visitHome()
    .clickLoginLink()
    .clickForgotPasswordLink()
    .verifyInstructionText()
    .clickSubmitButton()
    .verifyRequiredEmailMessage();
  });
});

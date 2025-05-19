const SELECTORS = {
  loginLink: '.d-inline-flex > [href="/account/login"] > u',
  forgotPasswordLink: '.d-flex > a > u',
  emailInput: '.form-control',
  submitButton: '.btn',
  instructionText: '.col-md-6 > .text-muted',
  successMessage: '.mb-3',
  toastMessage: '.react-toast-notifications__toast__content',
  invalidFeedback: '.invalid-feedback',
};

class ForgotPasswordPage {
  visitHome() {
    cy.visit('/');
    cy.get(SELECTORS.loginLink).click(); // Gunakan selector dari data
    cy.get(SELECTORS.forgotPasswordLink).click();
    cy.url().should('include', '/account/login');
  }

  clickLoginLink() {
    cy.get(SELECTORS.loginLink).click();
  }

  clickForgotPasswordLink() {
    cy.get(SELECTORS.forgotPasswordLink).click();
  }

  verifyInstructionText() {
    cy.get(SELECTORS.instructionText)
      .should('be.visible')
      .and(
        'contain',
        'Enter the e-mail address associated with your account. Click submit to have a password reset link e-mailed to you.'
      );
  }

  typeEmail(email) {
    cy.slowType(SELECTORS.emailInput, email);
  }

  clickSubmitButton() {
    cy.get(SELECTORS.submitButton).click();
  }

  verifySuccessMessage() {
    cy.get(SELECTORS.successMessage)
      .should('be.visible')
      .and(
        'contain',
        'Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.'
      );
  }

  verifyEmailNotFoundMessage(email) {
    cy.get(SELECTORS.toastMessage)
      .should('be.visible')
      .and('contain', `Email: ${email} not found!`);
  }

  verifyInvalidEmailFormatMessage() {
    cy.get(SELECTORS.invalidFeedback)
      .should('be.visible')
      .and('contain', 'Email address must be a valid email');
  }

  verifyRequiredEmailMessage() {
    cy.get(SELECTORS.invalidFeedback)
      .should('be.visible')
      .and('contain', 'Email address is a required field');
  }
}

export default new ForgotPasswordPage();

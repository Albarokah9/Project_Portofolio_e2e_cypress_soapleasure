const SELECTORS = {
  emailInput: '#input-email',
  passwordInput: '#input-password',
  loginButton: '.btn',
  dropdown: '.dropdown',
  dropdownMenu: '.dropdown-menu',
  logoutButton: '.dropdown-menu > :nth-child(5)',
  loginLink: '.d-inline-flex > [href="/account/login"] > u',
};

class LogoutPage {
  visitHomePage() {
    cy.visit('/');
    cy.get(SELECTORS.loginLink).click();
  }

  login(email, password) {
    cy.get(SELECTORS.emailInput).type(email);
    cy.get(SELECTORS.passwordInput).type(password);
    cy.get(SELECTORS.loginButton).click();
  }

  logout() {
    cy.get(SELECTORS.dropdown).click();
    cy.get(SELECTORS.dropdownMenu, { timeout: 10000 }).should('be.visible'); // pastikan dropdown muncul
    cy.get(SELECTORS.logoutButton).click();
  }

  assertUserIsLoggedIn() {
    cy.get(SELECTORS.dropdown).should('be.visible');
  }
}

export default new LogoutPage();

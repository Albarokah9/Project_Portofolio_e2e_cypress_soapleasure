/// <reference types="cypress" />
import LogoutPage from '../../support/pages/logoutPage';

describe('Logout Test', () => {
  it('Logout setelah login berhasil', () => {
    cy.fixture('loginData.json').then(({ validUser }) => {
      const { email, password } = validUser;

      LogoutPage.visitHomePage();
      LogoutPage.login(email, password);
      LogoutPage.assertUserIsLoggedIn();
      LogoutPage.logout();

      cy.url().should('eq', 'https://soapleasure.com/');
    });
  });
});

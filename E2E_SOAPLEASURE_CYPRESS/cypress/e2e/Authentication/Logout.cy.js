/// <reference types="cypress" />
import LogoutPage from '../../support/pages/logoutPage';

describe('Logout Test', () => {
  it('TC_LOGOUT_01 - Memverifikasi fungsionalitas logout pengguna', function () {
    cy.fixture('loginData.json').then(function (userData) {
      const { email, password } = userData.validUser;

      LogoutPage.visitHomePage()
        .login(email, password)
        .assertUserIsLoggedIn()
        .logout()
        .assertUserLogout();
    });
  });
});
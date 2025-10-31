/// <reference types="cypress" />
import LogoutPage from '../../support/pages/logoutPage';

describe('Logout Test', () => {
    beforeEach(function () {
        cy.fixture('loginData.json').as('userData');
        LogoutPage.visitHomePage();
    });
    it('TC_LOGOUT_01 - Memverifikasi fungsionalitas logout pengguna', () => {
        cy.get('@userData').then((userData) => {
            const { email, password } = userData.validUser;

            LogoutPage.login(email, password).assertUserIsLoggedIn().logout().assertUserLogout();
        });
    });

    afterEach(() => {
        cy.clearCookies();
    });
});

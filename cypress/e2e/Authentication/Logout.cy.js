/// <reference types="cypress" />
import LoginPage from '../../support/pages/loginPage';
import LogoutPage from '../../support/pages/logoutPage';

describe('Logout Test Suite', () => {
    let testData;

    beforeEach(() => {
        cy.fixture('loginData.json').then((data) => {
            testData = data;
        });

        // Navigate to home and login first
        LoginPage.visitLoginPage();
    });

    afterEach(() => {
        cy.clearCookies();
    });

    it('TC_LOGOUT_01 - Memverifikasi fungsionalitas logout pengguna', () => {
        const { email, password } = testData.validUser;

        // Login first
        LoginPage.login(email, password).verifyLoginSuccess();

        // Then logout
        LogoutPage.logout().verifyLogoutSuccess();

        cy.screenshot('TC_LOGOUT_01-success', { capture: 'fullPage' });
    });
});

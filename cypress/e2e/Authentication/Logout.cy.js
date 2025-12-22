/// <reference types="cypress" />
/**
 * Logout Test Suite - Simplified Version
 * 
 * Test suite untuk logout functionality
 */

import LoginPage from '../../support/pages/loginPage';
import LogoutPage from '../../support/pages/logoutPage';

describe('Logout Test Suite', () => {
    beforeEach(() => {
        // Load test data and login
        cy.fixture('loginData.json').then((data) => {
            const { email, password } = data.validUser;

            // Navigate to login page and login
            LoginPage.visitLoginPage();
            LoginPage.login(email, password).verifyLoginSuccess();
        });
    });

    afterEach(() => {
        cy.clearCookies();
    });

    it('TC_LOGOUT_01 - Memverifikasi fungsionalitas logout pengguna', () => {
        // Perform logout
        LogoutPage.logout().verifyLogoutSuccess();

        cy.screenshot('TC_LOGOUT_01-success', { capture: 'fullPage' });
    });
});

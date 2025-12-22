/// <reference types="cypress" />
/**
 * Logout Test Suite - Refactored Version
 * 
 * Test suite ini menggunakan Cypress Session untuk:
 * 1. Faster test execution dengan session caching
 * 2. Better test isolation
 * 3. Improved maintainability
 */

import LogoutPage from '../../support/pages/logoutPage';
import { setupLoginSession } from '../../support/helpers/sessionHelper';

describe('Logout Test Suite', () => {
    let testData;

    before(() => {
        // Load test data once before all tests
        cy.fixture('loginData.json').then((data) => {
            testData = data;
        });
    });

    beforeEach(() => {
        // Setup login session before each test
        const { email, password } = testData.validUser;
        setupLoginSession(email, password);

        // Navigate to home page after login
        cy.visit('/');
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


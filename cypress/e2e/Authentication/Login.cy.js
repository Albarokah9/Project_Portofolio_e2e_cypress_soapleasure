/// <reference types="cypress" />
/**
 * Login Test Suite - Refactored Version
 * 
 * Test suite ini menggunakan best practices:
 * 1. Cypress Session untuk test yang memerlukan login state
 * 2. Centralized error messages dari constants
 * 3. Proper test organization dengan nested describes
 * 4. Reusable helper functions
 * 5. Clear separation of concerns
 */

import LoginPage from '../../support/pages/loginPage';
import { ERROR_MESSAGES } from '../../support/constants/messages';

describe('Login Test Suite', () => {
    let testData;

    before(() => {
        // Load test data once before all tests
        cy.fixture('loginData.json').then((data) => {
            testData = data;
        });
    });

    beforeEach(() => {
        // Navigate to login page before each test
        LoginPage.visitLoginPage();
    });

    afterEach(() => {
        // Clean up after each test
        cy.clearCookies();
    });

    describe('Successful Login Scenarios', () => {
        it('TC_LOGIN_01 - Login dengan kredensial benar', () => {
            const { email, password } = testData.validUser;

            LoginPage.login(email, password).verifyLoginSuccess();

            cy.screenshot('TC_LOGIN_01-success', { capture: 'fullPage' });
        });

        it('TC_LOGIN_02 - Login dengan menekan tombol Enter di keyboard setelah menginput email dan password', () => {
            const { email, password } = testData.validUser;

            LoginPage.loginWithEnter(email, password).verifyLoginSuccess();

            cy.screenshot('TC_LOGIN_02-enter-key-success', { capture: 'fullPage' });
        });

        it('TC_LOGIN_11 - Login meski belum verifikasi email', () => {
            const { email, password } = testData.unverifiedAccount;

            LoginPage.login(email, password).verifyLoginSuccess();

            cy.screenshot('TC_LOGIN_11-unverified-success', { capture: 'fullPage' });
        });
    });

    describe('Failed Login Scenarios', () => {
        it('TC_LOGIN_03 - Login dengan password salah', () => {
            const { email, password } = testData.invalidPassword;

            LoginPage.login(email, password).verifyInvalidCredentials();

            cy.screenshot('TC_LOGIN_03-invalid-password', { capture: 'fullPage' });
        });

        it('TC_LOGIN_04 - Login menggunakan email yang salah', () => {
            const { email, password } = testData.invalidEmail;

            LoginPage.login(email, password).verifyInvalidCredentials();

            cy.screenshot('TC_LOGIN_04-invalid-email', { capture: 'fullPage' });
        });

        it('TC_LOGIN_05 - Login menggunakan email & password yang salah', () => {
            const { email, password } = testData.invalidEmailAndPassword;

            LoginPage.login(email, password).verifyInvalidCredentials();

            cy.screenshot('TC_LOGIN_05-invalid-both', { capture: 'fullPage' });
        });
    });

    describe('Validation Scenarios', () => {
        it('TC_LOGIN_06 - Login menggunakan format email tidak valid', () => {
            const { email, password } = testData.incorrectEmailFormat;

            LoginPage.login(email, password).verifyInvalidEmailFormat();

            cy.screenshot('TC_LOGIN_06-invalid-format', { capture: 'fullPage' });
        });

        it('TC_LOGIN_07 - Login tanpa mengisi kolom email', () => {
            const { password } = testData.validUser;

            LoginPage.login('', password).verifyRequiredEmail();

            cy.screenshot('TC_LOGIN_07-empty-email', { capture: 'fullPage' });
        });

        it('TC_LOGIN_08 - Login tanpa mengisi kolom password', () => {
            const { email } = testData.validUser;

            LoginPage.login(email, '').verifyRequiredPassword();

            cy.screenshot('TC_LOGIN_08-empty-password', { capture: 'fullPage' });
        });

        it('TC_LOGIN_09 - Login tanpa mengisi field email & password', () => {
            LoginPage.login('', '').verifyBothFieldsRequired();

            cy.screenshot('TC_LOGIN_09-empty-both', { capture: 'fullPage' });
        });
    });

    describe('Security Scenarios', () => {
        it('TC_LOGIN_10 - Memastikan karakter password dimasukkan sebagai titik/bintang', () => {
            const { password } = testData.validUser;

            LoginPage.typePassword(password).verifyPasswordMasked();

            cy.screenshot('TC_LOGIN_10-password-masked', { capture: 'fullPage' });
        });
    });
});

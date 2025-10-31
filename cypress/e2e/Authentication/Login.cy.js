/// <reference types="cypress" />
import LoginPage from '../../support/pages/loginPage';

describe('Login Test Suite', () => {
    beforeEach(function () {
        LoginPage.visitHome();
        cy.fixture('loginData.json').as('userData');
    });

    it('TC_LOGIN_01 - Login dengan kredensial benar', () => {
        cy.get('@userData').then((userData) => {
            const { email, password } = userData.validUser;

            LoginPage.login(email, password).assertUserIsLoggedIn();
        });
    });

    it('TC_LOGIN_02 - Login dengan menekan tombol Enter di di keyboard setelah menginput email dan password ', () => {
        cy.get('@userData').then((userData) => {
            const { email, password } = userData.validUser;

            LoginPage.login(email).pressEnterOnPassword(password).assertUserIsLoggedIn();
        });
    });

    it('TC_LOGIN_03 - Login dengan password salah', () => {
        cy.get('@userData').then((userData) => {
            const { email, password } = userData.invalidPassword;

            LoginPage.login(email, password).assertInvalidCredentialsMessage();
        });
    });

    it('TC_LOGIN_04 - Login menggunkan email yang salah', () => {
        cy.get('@userData').then((userData) => {
            const { email, password } = userData.invalidEmail;

            LoginPage.login(email, password).assertInvalidCredentialsMessage();
        });
    });

    it('TC_LOGIN_05 - Login menggunakan email & password yang salah', () => {
        cy.get('@userData').then((userData) => {
            const { email, password } = userData.invalidEmailAndPassword;

            LoginPage.login(email, password).assertInvalidCredentialsMessage();
        });
    });

    it('TC_LOGIN_06 - Login Mengunkan format email tidak valid', () => {
        cy.get('@userData').then((userData) => {
            const { email, password } = userData.incorrectEmailFormat;

            LoginPage.login(email, password).asserInvalidEmailFormatMessage();
        });
    });

    it('TC_LOGIN_07 - Login tanpa mengisi kolom email', () => {
        cy.get('@userData').then((userData) => {
            const { email } = userData.emptyEmail;

            LoginPage.login(email).assertRequiredEmailMessage();
        });
    });

    it('TC_LOGIN_08 - Login tanpa mengisi kolom password', () => {
        cy.get('@userData').then((userData) => {
            const { email } = userData.emptyPassword;

            LoginPage.login(email).assertRequiredPasswordMessage();
        });
    });

    it('TC_LOGIN_09 - Login tana mengisi field email & password', () => {
        cy.get('@userData').then((userData) => {
            const { email, password } = userData.emptyFields;

            LoginPage.login(email, password).assertBothFieldsRequiredMessage();
        });
    });

    it('TC_LOGIN_10 - Memastikan karakter password dimasukkan sebagai titik/bintang', () => {
        cy.get('@userData').then((userData) => {
            const { password } = userData.validUser;

            LoginPage.login(password).assertPasswordMasked();
        });
    });

    it('TC_LOGIN_11 - Login meski belum verifikasi email', () => {
        cy.get('@userData').then((userData) => {
            const { email, password } = userData.unverifiedAccount;

            LoginPage.login(email, password).assertUserIsLoggedIn();
        });
    });
    afterEach(() => {
        cy.clearCookies();
    });
});

/// <reference types="cypress" />
import ForgotPasswordPage from '../../support/pages/forgotPasswordPage';

describe('Forgot Password Test Suite', () => {
    let testData;

    beforeEach(() => {
        cy.fixture('forgotPasswordData').then((data) => {
            testData = data;
        });

        ForgotPasswordPage.visitForgotPasswordPage();
    });

    afterEach(() => {
        cy.clearCookies();
    });

    it('TC_FORGOTPWD_01 - Verifikasi fungsionalitas "Forgot Password" berhasil ketika menggunakan alamat email yang valid dan sudah terdaftar di sistem', () => {
        const registeredEmail = testData.registeredEmail;

        ForgotPasswordPage.verifyInstructionText()
            .submitForgotPassword(registeredEmail)
            .verifySuccessMessage();

        cy.screenshot('TC_FORGOTPWD_01-success', { capture: 'fullPage' });
    });

    it('TC_FORGOTPWD_02 - Verifikasi respons sistem ketika pengguna mencoba mereset password menggunakan alamat email yang tidak terdaftar', () => {
        const unregisteredEmail = testData.unregisteredEmail;

        ForgotPasswordPage.verifyInstructionText()
            .submitForgotPassword(unregisteredEmail)
            .verifyEmailNotFound(unregisteredEmail);

        cy.screenshot('TC_FORGOTPWD_02-email-not-found', { capture: 'fullPage' });
    });

    it('TC_FORGOTPWD_03 - Verifikasi pesan error validasi ketika pengguna memasukkan alamat email dengan format yang salah pada halaman "Forgot Password"', () => {
        const invalidEmail = testData.invalidEmail;

        ForgotPasswordPage.verifyInstructionText()
            .submitForgotPassword(invalidEmail)
            .verifyInvalidEmailFormat();

        cy.screenshot('TC_FORGOTPWD_03-invalid-format', { capture: 'fullPage' });
    });

    it('TC_FORGOTPWD_04 - Verifikasi pesan error validasi ketika pengguna mencoba melanjutkan proses "Forgot Password" tanpa mengisi field email', () => {
        ForgotPasswordPage.verifyInstructionText().clickSubmitButton().verifyRequiredEmail();

        cy.screenshot('TC_FORGOTPWD_04-empty-email', { capture: 'fullPage' });
    });
});

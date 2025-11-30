/// <reference types="cypress" />
import RegisterPage from '../../support/pages/registerPage';
import { DataGenerator } from '../../support/utils/dataGenerator';

describe('Register Test Suite', () => {
    let testData;

    beforeEach(() => {
        cy.fixture('registerData.json').then((data) => {
            testData = data;
        });

        RegisterPage.visitRegisterPage();
    });

    afterEach(() => {
        cy.clearCookies();
    });

    describe('Successful Registration Scenarios', () => {
        it('TC_REG_01 - Berhasil membuat akun baru', () => {
            const { firstName, lastName, phone, password, confirmPassword } = testData.validUser;
            const email = DataGenerator.generateUniqueEmail();

            RegisterPage.register(firstName, lastName, email, phone, password, confirmPassword)
                .verifyRegistrationSuccess(email);

            cy.screenshot('TC_REG_01-success', { capture: 'fullPage' });
        });

        it('TC_REG_02 - Register dengan menggunakan kombinasi password huruf & angka', () => {
            const { firstName, lastName, phone, password, confirmPassword } =
                testData.userWithAlphanumericPassword;
            const email = DataGenerator.generateUniqueEmail();

            RegisterPage.register(firstName, lastName, email, phone, password, confirmPassword)
                .verifyRegistrationSuccess(email);

            cy.screenshot('TC_REG_02-alphanumeric-password', { capture: 'fullPage' });
        });

        it('TC_REG_03 - Register dengan konfirmasi password sama dengan password', () => {
            const { firstName, lastName, phone, password, confirmPassword } =
                testData.userWithMatchingPasswords;
            const email = DataGenerator.generateUniqueEmail();

            RegisterPage.register(firstName, lastName, email, phone, password, confirmPassword)
                .verifyRegistrationSuccess(email);

            cy.screenshot('TC_REG_03-matching-passwords', { capture: 'fullPage' });
        });
    });

    describe('Validation Error Scenarios', () => {
        it('TC_REG_04 - Verifikasi validasi error saat field email dikosongkan pada form registrasi', () => {
            const { firstName, lastName, email, phone, password, confirmPassword } =
                testData.userWithEmptyEmail;

            RegisterPage.register(firstName, lastName, email, phone, password, confirmPassword)
                .verifyEmailRequired();

            cy.screenshot('TC_REG_04-empty-email', { capture: 'fullPage' });
        });

        it('TC_REG_05 - Verifikasi pesan error validasi ketika password yang dimasukkan kurang dari 8 karakter', () => {
            const { firstName, lastName, email, phone, password, confirmPassword } =
                testData.userWithShortPassword;

            RegisterPage.register(firstName, lastName, email, phone, password, confirmPassword)
                .verifyShortPassword();

            cy.screenshot('TC_REG_05-short-password', { capture: 'fullPage' });
        });

        it('TC_REG_06 - Verifikasi pesan error validasi ketika field konfirmasi password dikosongkan pada form registrasi', () => {
            const { firstName, lastName, email, phone, password } =
                testData.userWithEmptyConfirmPassword;

            RegisterPage.register(firstName, lastName, email, phone, password)
                .verifyConfirmPasswordRequired();

            cy.screenshot('TC_REG_06-empty-confirm-password', { capture: 'fullPage' });
        });

        it('TC_REG_07 - Verifikasi pesan error validasi ketika format email yang dimasukkan salah pada form registrasi', () => {
            const { firstName, lastName, email, phone, password, confirmPassword } =
                testData.userWithInvalidEmailFormat;

            RegisterPage.register(firstName, lastName, email, phone, password, confirmPassword)
                .verifyInvalidEmailFormat();

            cy.screenshot('TC_REG_07-invalid-email-format', { capture: 'fullPage' });
        });

        it('TC_REG_08 - Verifikasi pesan error validasi ketika format nomor HP yang dimasukkan salah (misalnya, mengandung huruf atau panjang tidak sesuai)', () => {
            const { firstName, lastName, email, phone, password, confirmPassword } =
                testData.userWithInvalidPhoneNumber;

            RegisterPage.register(firstName, lastName, email, phone, password, confirmPassword)
                .verifyPhoneError();

            cy.screenshot('TC_REG_08-invalid-phone', { capture: 'fullPage' });
        });

        it('TC_REG_09 - Verifikasi pesan error validasi ketika nilai pada field konfirmasi password tidak sama dengan nilai pada field password', () => {
            const { firstName, lastName, email, phone, password, confirmPassword } =
                testData.userWithMismatchedPasswords;

            RegisterPage.register(firstName, lastName, email, phone, password, confirmPassword)
                .verifyPasswordMismatch();

            cy.screenshot('TC_REG_09-password-mismatch', { capture: 'fullPage' });
        });

        it('TC_REG_10 - Verifikasi pesan error validasi ketika mencoba registrasi dengan semua field input dibiarkan kosong', () => {
            RegisterPage.clickRegisterButton().verifyAllRequiredFieldsError();

            cy.screenshot('TC_REG_10-all-fields-required', { capture: 'fullPage' });
        });
    });
});

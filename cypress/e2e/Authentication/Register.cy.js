/// <reference types="cypress" />
import RegisterPage from '../../support/pages/registerPage';

describe('Register Test Suite', () => {
  beforeEach(function () {
    RegisterPage.visitRegisterPage();
    cy.fixture('registerData.json').as('userData');
  });

  it('TC_REG_01 - Berhasil membuat akun baru', () => {
    cy.get('@userData').then((userData) => {
    const { firstName, lastName, email, phone, password, confirmPassword } = userData.validUser;

    RegisterPage.register(firstName, lastName, email, phone, password, confirmPassword)
      .assertRegistrationSuccessMessage(email);
    });
  });

  it('TC_REG_02 - Register  dengan menggunakan kombinasi password huruf & angka', () => {
    cy.get('@userData').then((userData) => {
    const { firstName, lastName, email, phone, password, confirmPassword } = userData.userWithAlphanumericPassword;

    RegisterPage.register(firstName, lastName, email, phone, password, confirmPassword)
      .assertRegistrationSuccessMessage(email);
    });
  });

  it('TC_REG_03 - Register dengan konfirmasi password sama dengan password', () => {
    cy.get('@userData').then((userData) => {
    const { firstName, lastName, email, phone, password, confirmPassword } = userData.userWithMatchingPasswords;

    RegisterPage.register(firstName, lastName, email, phone, password, confirmPassword)
      .assertRegistrationSuccessMessage(email);
    });
  });

  it('TC_REG_04 - Verifikasi validasi error saat field email dikosongkan pada form registrasi', () => {
    cy.get('@userData').then((userData) => {
    const { firstName, lastName, email, phone, password, confirmPassword } = userData.userWithEmptyEmail;

    RegisterPage.register(firstName, lastName, email, phone, password, confirmPassword)
      .assertEmailErrorMessage();
    });
  });

  it('TC_REG_05 - Verifikasi pesan error validasi ketika password yang dimasukkan kurang dari 8 karakter', () => {
    cy.get('@userData').then((userData) => {
    const { firstName, lastName, email, phone, password, confirmPassword } = userData.userWithShortPassword;

    RegisterPage.register(firstName, lastName, email, phone, password, confirmPassword)
      .assertShortPasswordErrorMessage();
    });
  });

  it('TC_REG_06 - Verifikasi pesan error validasi ketika field konfirmasi password dikosongkan pada form registrasi', () => {
    cy.get('@userData').then((userData) => {
    const { firstName, lastName, email, phone, password } = userData.userWithEmptyConfirmPassword;

    RegisterPage.register(firstName, lastName, email, phone, password)
      .assertRequiredConfirmPasswordMessage();
    });
  });

  it('TC_REG_07 - Verifikasi pesan error validasi ketika format email yang dimasukkan salah pada form registrasi', function () {
    cy.get('@userData').then((userData) => {
    const { firstName, lastName, email, phone, password, confirmPassword } = userData.userWithInvalidEmailFormat;

    RegisterPage.register(firstName, lastName, email, phone, password, confirmPassword)
      .assertInvalidEmailFormatErrorMessage(email);
    });
  });

  it('TC_REG_08 -Verifikasi pesan error validasi ketika format nomor HP yang dimasukkan salah (misalnya, mengandung huruf atau panjang tidak sesuai)', function () {
    cy.get('@userData').then((userData) => {
    const { firstName, lastName, email, phone, password, confirmPassword } = userData.userWithInvalidPhoneNumber;

    RegisterPage.register(firstName, lastName, email, phone, password, confirmPassword)
      .assertPhoneErrorMessage();
    });
  });

  it('TC_REG_09 - Verifikasi pesan error validasi ketika nilai pada field konfirmasi password tidak sama dengan nilai pada field password', () => {
    cy.get('@userData').then((userData) => {
    const { firstName, lastName, email, phone, password, confirmPassword } = userData.userWithMismatchedPasswords;

    RegisterPage.register(firstName, lastName, email, phone, password, confirmPassword)
      .assertRequiredPasswordMismatchMessage();
    });
  });

  it('TC_REG_10 - Verifikasi pesan error validasi ketika mencoba registrasi dengan semua field input dibiarkan kosong', () => {
    RegisterPage.clickRegisterButton();
    RegisterPage.assertRequiredFieldErrorMessage();
  });

  afterEach(() => {
    cy.clearCookies();
  });
});

it('email', function() {
  cy.visit('https://soapleasure.com/')
  
});

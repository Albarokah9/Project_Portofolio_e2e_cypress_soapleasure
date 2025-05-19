/// <reference types="cypress" />
import RegisterPage from '../../support/pages/registerPage';

describe('Register Test Suite', () => {
  beforeEach(function () {
    // Mengambil fixture data sekali di beforeEach untuk digunakan pada semua test
    cy.fixture('registerData.json').as('userData');
    // Navigasi ke halaman register
    RegisterPage.visitRegisterPage();
  });

  it('Register dengan data lengkap & valid', function () {
    const { firstName, lastName, email, phone, password, confirmPassword } =
      this.userData.validUser;

    RegisterPage.typeFirstName(firstName)
      .typeLastName(lastName)
      .typeEmail(email)
      .typePhone(phone)
      .typePassword(password)
      .typeConfirmPassword(confirmPassword);
    //   .clickRegisterButton();
    // RegisterPage.assertRegistrationSuccessMessage(email);
  });

  it('Register dengan password huruf & angka', function () {
    const { firstName, lastName, email, phone, password, confirmPassword } =
      this.userData.userWithAlphanumericPassword;

    RegisterPage.typeFirstName(firstName)
      .typeLastName(lastName)
      .typeEmail(email)
      .typePhone(phone)
      .typePassword(password)
      .typeConfirmPassword(confirmPassword);
    //  .clickRegisterButton();
    // RegisterPage.assertRegistrationSuccessMessage(email);
  });

  it('Register dengan konfirmasi password cocok', function () {
    const { firstName, lastName, email, phone, password, confirmPassword } =
      this.userData.userWithMatchingPasswords;

    RegisterPage.typeFirstName(firstName)
      .typeLastName(lastName)
      .typeEmail(email)
      .typePhone(phone)
      .typePassword(password)
      .typeConfirmPassword(confirmPassword);
    //   .clickRegisterButton();
    // RegisterPage.assertRegistrationSuccessMessage(email);
  });

  it('Register dengan email kosong', function () {
    const { firstName, lastName, email, phone, password, confirmPassword } =
      this.userData.userWithEmptyEmail;

    RegisterPage.typeFirstName(firstName)
      .typeLastName(lastName)
      .typeEmail(email)
      .typePhone(phone)
      .typePassword(password)
      .typeConfirmPassword(confirmPassword)
      .clickRegisterButton();
    RegisterPage.assertEmailErrorMessage();
  });

  it('Register dengan password kurang dari 8 karakter', function () {
    const { firstName, lastName, email, phone, password, confirmPassword } =
      this.userData.userWithShortPassword;

    RegisterPage.typeFirstName(firstName)
      .typeLastName(lastName)
      .typeEmail(email)
      .typePhone(phone)
      .typePassword(password)
      .typeConfirmPassword(confirmPassword)
      .clickRegisterButton();
    RegisterPage.assertShortPasswordErrorMessage();
  });

  it('Register dengan konfirmasi password kosong', function () {
    const { firstName, lastName, email, phone, password } =
      this.userData.userWithEmptyConfirmPassword;

    RegisterPage.typeFirstName(firstName)
      .typeLastName(lastName)
      .typeEmail(email)
      .typePhone(phone)
      .typePassword(password)
      .typeConfirmPassword(password);
    //   .clickRegisterButton();
    // RegisterPage.assertRequiredConfirmPasswordMessage();
  });

  it('Register dengan format email salah', function () {
    const { firstName, lastName, email, phone, password, confirmPassword } =
      this.userData.userWithInvalidEmailFormat;

    RegisterPage.typeFirstName(firstName)
      .typeLastName(lastName)
      .typeEmail(email)
      .typePhone(phone)
      .typePassword(password)
      .typeConfirmPassword(confirmPassword)
      .clickRegisterButton();
    RegisterPage.assertInvalidEmailFormatErrorMessage();
  });

  it('Register dengan nomor HP tidak valid', function () {
    const { firstName, lastName, email, phone, password, confirmPassword } =
      this.userData.userWithInvalidPhoneNumber;

    RegisterPage.typeFirstName(firstName)
      .typeLastName(lastName)
      .typeEmail(email)
      .typePhone(phone)
      .typePassword(password)
      .typeConfirmPassword(confirmPassword)
      .clickRegisterButton();
    RegisterPage.assertPhoneErrorMessage();
  });

  it('Register dengan password & konfirmasi tidak cocok', function () {
    const { firstName, lastName, email, phone, password, confirmPassword } =
      this.userData.userWithMismatchedPasswords;

    RegisterPage.typeFirstName(firstName)
      .typeLastName(lastName)
      .typeEmail(email)
      .typePhone(phone)
      .typePassword(password)
      .typeConfirmPassword(confirmPassword)
      .clickRegisterButton();
    RegisterPage.assertRequiredPasswordMismatchMessage();
  });

  it('Register tanpa mengisi field apa pun', () => {
    RegisterPage.clickRegisterButton();
    RegisterPage.assertRequiredFieldErrorMessage();
  });
});

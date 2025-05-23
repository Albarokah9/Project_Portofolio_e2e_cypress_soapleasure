/// <reference types="cypress" />
import LoginPage from '../../support/pages/loginPage';

describe('Login Test Suite', () => {
  beforeEach(function () {
    cy.fixture('loginData.json').as('userData');
    LoginPage.visitHome();
  });

  it('Login dengan kredensial valid', function () {
    const { email, password } = this.userData.validUser;

    LoginPage.typeEmail(email)
    .typePassword(password)
    .clickLogin()
    .assertUserIsLoggedIn();
  });

  it('Login dengan menekan tombol enter', function () {
    const { email, password } = this.userData.validUser;

    LoginPage.typeEmail(email)
    .pressEnterOnPassword(password)
    .assertUserIsLoggedIn();
  });

  it('Login dengan email valid tapi password salah', function () {
    const { email, password } = this.userData.invalidPassword;

    LoginPage.typeEmail(email)
      .typePassword(password)
      .clickLogin()
      .assertInvalidCredentialsMessage();
  });

  it('Login dengan email salah tapi password valid', function () {
    const { email, password } = this.userData.invalidEmail;

    LoginPage.typeEmail(email)
      .typePassword(password)
      .clickLogin()
      .assertInvalidCredentialsMessage();
  });

  it('Login dengan email & password yang salah', function () {
    const { email, password } = this.userData.invalidEmailAndPassword;

    LoginPage.typeEmail(email)
      .typePassword(password)
      .clickLogin()
      .assertInvalidCredentialsMessage();
  });

  it('Login dengan format email tidak valid', function () {
    const { email, password } = this.userData.incorrectEmailFormat;

    LoginPage.typeEmail(email)
      .typePassword(password)
      .clickLogin()
      .asserInvalidEmailFormatMessage();
  });

  it('Login dengan kolom email kosong', function () {
    const { password } = this.userData.emptyPassword;

    LoginPage.typePassword(password)
    .clickLogin()
    .assertRequiredEmailMessage();
  });

  it('Login dengan kolom password kosong', function () {
    const { email } = this.userData.emptyPassword;

    LoginPage.typeEmail(email)
    .clickLogin()
    .assertRequiredPasswordMessage();
  });

  it('Login tanpa mengisi kedua kolom', function () {
    const { email, password } = this.userData.emptyFields;

    LoginPage.typeEmail(email)
      .typePassword(password)
      .clickLogin()
      .assertBothFieldsRequiredMessage();
  });

  it('Password harus termasking', function () {
    const { password } = this.userData.validUser;

    LoginPage.typePassword(password)
    .assertPasswordMasked();
  });

  it('Login dengan akun belum terverifikasi', function () {
    const { unverifiedAccount } = this.userData;
    LoginPage.typeEmail(unverifiedAccount.email)
      .typePassword(unverifiedAccount.password)
      .clickLogin()
      .assertUserIsLoggedIn();
  });
});

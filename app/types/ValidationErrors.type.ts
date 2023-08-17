export interface ISignInFormValidation {
  validationResult: boolean;
  phoneNumber: string;
  authCode: string;
}

export interface ISignUpFormValidation {
  validationResult: boolean;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  cardNumber: string;
  cardExpDate: string;
  cardCvv: string;
  authCode: string;
}

export interface IForgotPasswordFormValidation {
  validationResult: boolean;
  email: string;
}

export interface IConfirmRegisterFormValidation {
  validationResult: boolean;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  authCode: string;
  cardNumber: string;
  cardExpDate: string;
  cardCvv: string;
}

export interface IResetPasswordFormValidation {
  validationResult: boolean;
  password: string;
  confirmPassword: string;
}

export interface IProfileFormValidation {
  validationResult: boolean;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export interface IChargingLoginValidation {
  validationResult: boolean;
  phoneNumber: string;
  stationId: string;
}

export interface IAuthCodeValidation {
  validationResult: boolean;
  authCode: string;
}

export interface IProfilePasswordValidation {
  validationResult: boolean;
  password: string;
  confirmPassword: string;
}

export interface IProfileCreditValidation {
  validationResult: boolean;
  cardNumber: string;
  cardExpDate: string;
  cardCvv: string;
}

export interface ISignInFormValidation {
  validationResult: boolean;
  phoneNumber: string;
  authCode: string;
  pinCode: string;
}

export interface ISignUpFormValidation {
  validationResult: boolean;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  authCode: string;
  pinCode: string;
  pinConfirmCode: string;
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
  pinCode: string;
  pinConfirmCode: string;
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

export interface IChargingStationValidation {
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

import { Token } from '../../../models/Token';

export enum LoginTypes {
  LOGIN = '@login/LOGIN',
  TWOFA = '@login/TWOFA',
  TWOFA_FAILURE = '@login/TWOFA_FAILURE',
  LOGIN_SUCCESS = '@login/LOGIN_SUCCESS',
  LOGIN_FAILURE = '@login/LOGIN_FAILURE',
  FORGOT_PASSWORD = '@login/FORGOT_PASSWORD',
  FORGOT_PASSWORD_SUCCESS = '@login/FORGOT_PASSWORD_SUCCESS',
  FORGOT_PASSWORD_FAILURE = '@login/FORGOT_PASSWORD_FAILURE',
  RESET_PASSWORD = '@login/RESET_PASSWORD',
  RESET_PASSWORD_SUCCESS = '@login/RESET_PASSWORD_SUCCESS',
  RESET_PASSWORD_FAILURE = '@login/RESET_PASSWORD_FAILURE',
  CLEAR_RESET_PASSWORD = '@login/CLEAR_RESET_PASSWORD',
  ONBOARDING = '@login/ONBOARDING',
  SEND_CONFIRMATION = '@login/SEND_CONFIRMATION',
}

export interface OnBoarding {
  id: string;
  email: string;
}

export interface LoginState {
  readonly data: Token;
  readonly loading: boolean;
  readonly isAuthenticating: boolean;
  readonly resetPassword: boolean;
  readonly onboarding: OnBoarding;
  readonly error: string;
  readonly id: string;
}

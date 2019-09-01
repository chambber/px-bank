import { LoginTypes, OnBoarding } from './types';

import { Login } from '../../../models/Login';
import { Token } from '../../../models/Token';

export const login = (payload: Login) => ({
  type: LoginTypes.LOGIN, payload,
});
export const loginSuccess = (payload: Token) => ({
  type: LoginTypes.LOGIN_SUCCESS, payload,
});
export const loginFailure = (payload: string) => ({
  type: LoginTypes.LOGIN_FAILURE, payload,
});
export const login2fa = (user: string, token: string) => ({
  type: LoginTypes.TWOFA, payload: { user, token },
});
export const login2faFailure = (payload: string) => ({
  type: LoginTypes.TWOFA_FAILURE, payload,
});
export const onboarding = (payload: OnBoarding) => ({
  type: LoginTypes.ONBOARDING, payload,
});
export const sendConfirmation = (payload: OnBoarding) => ({
  type: LoginTypes.SEND_CONFIRMATION, payload,
});

export const forgotPassword = (payload: string) => ({
  type: LoginTypes.FORGOT_PASSWORD, payload,
});
export const forgotPasswordSuccess = () => ({
  type: LoginTypes.FORGOT_PASSWORD_SUCCESS,
});
export const forgotPasswordFailure = (payload: string) => ({
  type: LoginTypes.FORGOT_PASSWORD_FAILURE, payload,
});

export const resetPassword = (token: string, password: string) => ({
  type: LoginTypes.RESET_PASSWORD, payload: { token, password },
});
export const resetPasswordSuccess = () => ({
  type: LoginTypes.RESET_PASSWORD_SUCCESS,
});
export const resetPasswordFailure = (payload: string) => ({
  type: LoginTypes.RESET_PASSWORD_FAILURE, payload,
});
export const clearResetPassword = () => ({
  type: LoginTypes.CLEAR_RESET_PASSWORD,
});

import { ForgotPasswordTypes } from './types';

export const forgotPassword = (payload: string) => ({
  type: ForgotPasswordTypes.FORGOT_PASSWORD, payload,
});
export const forgotPasswordSuccess = () => ({
  type: ForgotPasswordTypes.FORGOT_PASSWORD_SUCCESS,
});
export const forgotPasswordFailure = (payload: string) => ({
  type: ForgotPasswordTypes.FORGOT_PASSWORD_FAILURE, payload,
});

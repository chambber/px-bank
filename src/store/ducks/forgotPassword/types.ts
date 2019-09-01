
export enum ForgotPasswordTypes {
    FORGOT_PASSWORD = '@forgot/FORGOT_PASSWORD',
    FORGOT_PASSWORD_SUCCESS = '@forgot/FORGOT_PASSWORD_SUCCESS',
    FORGOT_PASSWORD_FAILURE = '@forgot/FORGOT_PASSWORD_FAILURE',
  }

  export interface ForgotPasswordState {

    readonly loading: boolean;
    readonly error: string;
  }
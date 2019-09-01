import { AccountTypes } from './types';

import { Token, Account, UpdatePassword } from '../../../models';

export const account = (payload: Token) => ({
  type: AccountTypes.ACCOUNT,
  payload,
});
export const accountSuccess = (payload: Account) => ({
  type: AccountTypes.ACCOUNT_SUCCESS,
  payload,
});
export const accountFailure = (payload: string) => ({
  type: AccountTypes.ACCOUNT_FAILURE,
  payload,
});

export const twofaInsert = (user: string, token: string, secret: string) => ({
  type: AccountTypes.TWOFA_INSERT,
  payload: { user, token, secret },
});
export const twofaInsertSuccess = () => ({
  type: AccountTypes.TWOFA_INSERT_SUCCESS,
});
export const twofaInsertFailure = (payload: string) => ({
  type: AccountTypes.TWOFA_INSERT_FAILURE,
  payload,
});
export const updatePassword = (payload: UpdatePassword) => ({
  type: AccountTypes.UPDATE_PASSWORD,
  payload,
});
export const updatePasswordSuccess = () => ({
  type: AccountTypes.UPDATE_PASSWORD_SUCCESS,
});
export const updatePasswordFailure = (payload: string) => ({
  type: AccountTypes.UPDATE_PASSWORD_FAILURE,
  payload,
});
export const clearStatus = () => ({
  type: AccountTypes.CLEAR_STATUS,
});

export const checkTermsValidate = (payload: boolean, account: Account) => ({
  type: AccountTypes.CHECK_TERMS_VALIDATE,
  payload: { payload, account },
})
export const checkTermsValidateSuccess = () => ({
  type: AccountTypes.CHECK_TERMS_VALIDATE_SUCCESS,
})
export const checkTermsValidateFailure = (payload: boolean) => ({
  type: AccountTypes.CHECK_TERMS_VALIDATE_FAILURE,
  payload,
})

export const logout = () => ({
  type: AccountTypes.LOGOUT,
});

import { Account } from '../../../models/Account';

export enum AccountTypes {
  ACCOUNT = '@account/ACCOUNT_REQUEST',
  ACCOUNT_SUCCESS = '@account/ACCOUNT_SUCCESS',
  ACCOUNT_FAILURE = '@account/ACCOUNT_FAILURE',
  TWOFA_INSERT = '@account/TWOFA_INSERT',
  TWOFA_INSERT_SUCCESS = '@account/TWOFA_INSERT_SUCCESS',
  TWOFA_INSERT_FAILURE = '@account/TWOFA_INSERT_FAILURE',
  UPDATE_PASSWORD = '@account/UPDATE_PASSWORD',
  UPDATE_PASSWORD_SUCCESS = '@account/UPDATE_PASSWORD_SUCCESS',
  UPDATE_PASSWORD_FAILURE = '@account/UPDATE_PASSWORD_FAILURE',
  CHECK_TERMS_VALIDATE = '@account/CHECK_TERMS_VALIDATE',
  CHECK_TERMS_VALIDATE_SUCCESS = '@account/CHECK_TERMS_VALIDATE_SUCCESS',
  CHECK_TERMS_VALIDATE_FAILURE = '@account/CHECK_TERMS_VALIDATE_FAILURE',
  CLEAR_STATUS = '@account/CLEAR_STATUS',
  LOGOUT = '@account/LOGOUT'
}

export interface AccountState {
  readonly data: Account;
  readonly isLoggedIn: boolean;
  readonly updated: boolean;
  readonly loading: boolean;
  readonly error: string;
}

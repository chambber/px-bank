import { CustomerTypes } from './types';

import { Customer } from '../../../models';

export const saveCustomer = (payload: Customer) => ({
  type: CustomerTypes.SET_CUSTOMER,
  payload,
});
export const clearCustomer = () => ({
  type: CustomerTypes.CLEAR_CUSTOMER,
});

export const createAccount = (payload: Customer) => ({
  type: CustomerTypes.CREATE,
  payload,
});
export const createAccountSuccess = (payload: Customer) => ({
  type: CustomerTypes.CREATE_SUCCESS,
  payload,
});
export const createAccountFailure = (payload: string) => ({
  type: CustomerTypes.CREATE_FAILURE,
  payload,
});

import { Customer } from '../../../models/Customer';

export enum CustomerTypes {
  CREATE = '@customer/CREATE',
  CREATE_SUCCESS = '@customer/CREATE_SUCCESS',
  CREATE_FAILURE = '@customer/CREATE_FAILURE',
  SET_CUSTOMER = '@customer/SET_CUSTOMER',
  CLEAR_CUSTOMER = '@customer/CLEAR_CUSTOMER',
}

export interface CustomerState {
  readonly created: boolean;
  readonly loading: boolean;
  readonly data: Customer;
  readonly error: string;
}

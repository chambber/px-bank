import { call, put } from 'redux-saga/effects';

import {
 createAccountSuccess, createAccountFailure,
} from './actions';
import * as service from './services';

import { Customer } from '../../../models';

export function* createAccount(customer: Customer) {
  try {
    const newCustomer = yield call(service.create, customer);

    return yield put(createAccountSuccess(newCustomer));
  } catch (error) {
    return yield put(createAccountFailure(error.message));
  }
}

import { call, put } from 'redux-saga/effects';

import {
  accountSuccess,
  accountFailure,
  twofaInsertSuccess,
  twofaInsertFailure,
  updatePasswordSuccess,
  updatePasswordFailure,
  checkTermsValidateSuccess,
  checkTermsValidateFailure,
} from './actions';

import * as service from './services';

import { toggleLoader } from '../app/actions';
import { Token, UpdatePassword } from '../../../models';

export function* account(user: Token) {
  try {
    yield put(toggleLoader(true));
    const data = yield call(service.get, user);
    yield put(toggleLoader(false));
    return yield put(accountSuccess(data));
  } catch (error) {
    return yield put(accountFailure(error.message));
  }
}

export function* insert2FA(user: string, token: string, secret: string) {
  try {
    yield call(service.insert2FA, user, token, secret);
    return yield put(twofaInsertSuccess());
  } catch (error) {
    return yield put(twofaInsertFailure(error.message));
  }
}

export function* updatePassword(updatePassword: UpdatePassword) {
  console.log('updatePassword saga:', updatePassword);
  try {
    yield call(service.updatePassword, updatePassword);
    return yield put(updatePasswordSuccess());
  } catch (error) {
    console.log('error saga', error)
    return yield put(updatePasswordFailure(error.message));
  }
}

export function* termsValidate(data: boolean) {
  try {
    yield call(service.validateTerms, data);
    return yield put(checkTermsValidateSuccess());
  } catch (error) {
    return yield put(checkTermsValidateFailure(error.message));
  }
}

import {
  all, call, cancel, fork, take, select,
} from 'redux-saga/effects';

import { AccountTypes } from './account/types';

import { logout as clearLogin, getUser } from '../../services/auth';

import {
  login, resetPassword, sendConfirmation,
} from './login/sagas';
import { createAccount } from './customer/sagas';
import { insert2FA, account, updatePassword, termsValidate } from './account/sagas';
import { alert } from './app/sagas';
import { forgotPassword } from './forgotPassword/sagas'

import { LoginTypes } from './login/types';
import { CustomerTypes } from './customer/types';
import { AppTypes } from './app/types';
import { getIsLoggedIn } from '../selectors';
import { Token } from '../../models';

function* watchLogin() {
  while (true) {
    const {
      payload: { email, password, infoDevice },
    } = yield take(LoginTypes.LOGIN);
    const task = yield fork(login, email, password, infoDevice);
    const action = yield take([AccountTypes.LOGOUT, LoginTypes.LOGIN_FAILURE]);
    if (action.type === AccountTypes.LOGOUT) yield cancel(task);
    yield call(clearLogin);
  }
}

function* watchCreateAccount() {
  while (true) {
    const { payload: customer } = yield take(CustomerTypes.CREATE);
    yield fork(createAccount, customer);
  }
}

function* watchAccount() {
  while (true) {
    const isLoggedIn = yield select(getIsLoggedIn);
    let token: Token;
    if (isLoggedIn) {
      token = getUser() as Token;
    } else {
      ({ payload: token } = yield take(AccountTypes.ACCOUNT));
    }
    yield fork(account, token);
    yield take(AccountTypes.LOGOUT);
    yield call(clearLogin);
  }
}

function* watchUpdateAlert() {
  while (true) {
    const { payload } = yield take(AppTypes.ALERT);
    yield fork(alert, payload);
  }
}

export default function* rootSaga() {
  return yield all([
    fork(watchLogin),
    fork(watchAccount),
    fork(watchCreateAccount),
    fork(watchUpdateAlert),
  ]);
}

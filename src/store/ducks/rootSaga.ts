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
import { ForgotPasswordTypes } from './forgotPassword/types'
import { CustomerTypes } from './customer/types';
import { AppTypes } from './app/types';
import { DeviceCreateTypes } from './device/types'
import { DeviceRegister } from './device/sagas';
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



function* watchDevice() {
  while (true) {
    const { payload: device } = yield take(DeviceCreateTypes.CREATE_DEVICE);
    yield fork(DeviceRegister, device);    
  }
}

function* watchCreateAccount() {
  while (true) {
    const { payload: customer } = yield take(CustomerTypes.CREATE);
    yield fork(createAccount, customer);
  }
}

function* watchInsert2faAccount() {
  while (true) {
    const {
      payload: { user, token, secret },
    } = yield take(AccountTypes.TWOFA_INSERT);
    yield fork(insert2FA, user, token, secret);
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

function* watchForgotPassword() {
  while (true) {
    const { payload: email } = yield take(ForgotPasswordTypes.FORGOT_PASSWORD);
    yield call(forgotPassword, email);
  }
}

function* watchResetPassword() {
  while (true) {
    const {
      payload: { token, password },
    } = yield take(LoginTypes.RESET_PASSWORD);
    yield fork(resetPassword, token, password);
  }
}

function* watchSendConfirmation() {
  while (true) {
    const { payload } = yield take(LoginTypes.SEND_CONFIRMATION);
    yield fork(sendConfirmation, payload);
  }
}

function* watchUpdatePassword() {
  while (true) {
    const { payload: updatePasswordData } = yield take(AccountTypes.UPDATE_PASSWORD);
    yield fork(updatePassword, updatePasswordData);
  }
}

function* watchTermsValidate() {
  while (true) {
    const { payload: termsValidateData } = yield take(AccountTypes.CHECK_TERMS_VALIDATE);
    yield fork(termsValidate, termsValidateData);
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
    fork(watchForgotPassword),
    fork(watchResetPassword),
    fork(watchCreateAccount),
    fork(watchInsert2faAccount),
    fork(watchSendConfirmation),
    fork(watchUpdatePassword),
    fork(watchTermsValidate),
    fork(watchUpdateAlert),
    fork(watchDevice)
  ]);
}

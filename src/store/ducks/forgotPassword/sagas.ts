import {
  call, put,
} from 'redux-saga/effects';
import {
  forgotPasswordSuccess,
  forgotPasswordFailure,

} from './actions';
import * as service from './services';
import { alert } from '../app/actions';

export function* forgotPassword(email: string) {
  try {
    yield call(service.forgotPassword, email);
    yield put(forgotPasswordSuccess());
    return yield put(alert({ text: 'Sent email for password reset!' }));
  } catch (error) {
    return yield put(forgotPasswordFailure(error.message));
  }
}

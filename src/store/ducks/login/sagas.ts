import {
 call, put, select, take,
} from 'redux-saga/effects';
import { decode } from 'jsonwebtoken';

import {
  loginSuccess,
  loginFailure,
  login2faFailure,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  onboarding,
} from './actions';
import * as service from './services';

import { login as storeLogin } from '../../../services/auth';
import { Token } from '../../../models/Token';

import { LoginTypes, OnBoarding } from './types';
import { getUserLogin } from '../../selectors';
import { account } from '../account/actions';
import { alert } from '../app/actions';

function decodeToken(token: string) {
  const tokenDecoded = decode(token) as Record<string, any>; 
  if (!tokenDecoded) throw Error('Invalid Token')
  return tokenDecoded;
}

function* loginCredentials(email: string, password: string, infoDevice:any) {
  try {
    const token = yield call(service.login, { email, password, infoDevice });
    if(token.id){
      yield put(loginSuccess(token));
      return token;
    }else{
      if (token) {
        const tokenDecoded = decodeToken(token);
        yield put(loginSuccess(tokenDecoded.customer));
        if (!(tokenDecoded.customer as Token).authenticated) return token;  
        yield call(storeLogin, token);
        return token;
      }
    }
    
    const customer = yield call(service.existCustomer, email, password);
    // eslint-disable-next-line
    yield put(onboarding({ id: customer.id, email: customer.email }));
    return null;
  } catch (error) {
    return yield put(loginFailure(error.message));
  }
}

function* login2fa(user: string, token2fa: string, tokenJwt: string) {
  try {
    const token = yield call(service.verify2FA, user, token2fa, tokenJwt);
    const tokenDecoded = decodeToken(token);
    yield put(loginSuccess(tokenDecoded.customer));

    yield call(storeLogin, token);
    return tokenDecoded;
  } catch (error) {
    return yield put(login2faFailure(error.message));
  }
}

export function* login(email: string, password: string, infoDevice:any) {
  const tokenJwt = yield call(loginCredentials, email, password, infoDevice);
  let userData: Token = yield select(getUserLogin);

  while (!userData.authenticated) {
    const {
      payload: { user, token: token2fa },
    } = yield take(LoginTypes.TWOFA);
    yield call(login2fa, user, token2fa, tokenJwt);
    userData = yield select(getUserLogin);
  }
  yield put(account(userData));
}

export function* resetPassword(token: string, password: string) {
  try {
    yield call(service.resetPassword, token, password);
    yield put(forgotPasswordSuccess());
    return yield put(alert({ text: 'Password successfully reset!' }));
  } catch (error) {
    return yield put(forgotPasswordFailure(error.message));
  }
}

export function* sendConfirmation(data: OnBoarding) {
  try {
    yield call(service.sendConfirmation, data);
    return yield put(alert({ text: 'Successfully resent email!' }));
  } catch (error) {
    return yield put(alert({ text: error.message }));
  }
}

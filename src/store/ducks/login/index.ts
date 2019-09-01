import { Reducer } from 'redux';

import { LoginState, LoginTypes, OnBoarding } from './types';

import { Token } from '../../../models/Token';
import { AccountTypes } from '../account/types';

const INITIAL_ONBOARDING: OnBoarding = {
  id: '',
  email: '',
};

const INITIAL_TOKEN: Token = {
  id: '',
  authenticated: false,
  status: true
};

const INITIAL_STATE: LoginState = {
  data: INITIAL_TOKEN,
  loading: false,
  isAuthenticating: false,
  onboarding: INITIAL_ONBOARDING,
  resetPassword: false,
  error: '',
  id: '',
};

const reducer: Reducer<LoginState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LoginTypes.LOGIN:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case LoginTypes.LOGIN_SUCCESS:
      return {
        ...state,
        data: action.payload || INITIAL_TOKEN,
        isAuthenticating: false,
        loading: false,
      };
    case LoginTypes.LOGIN_FAILURE:
      return {
        ...state,
        data: INITIAL_TOKEN,
        isAuthenticating: false,
        loading: false,
        error: action.payload,
      };
    case LoginTypes.TWOFA:
      return {
        ...state,
        isAuthenticating: true,
      };
    case LoginTypes.TWOFA_FAILURE:
      return {
        ...state,
        isAuthenticating: false,
        error: action.payload,
      };
    case LoginTypes.FORGOT_PASSWORD:
      return {
        ...state,
        loading: true,
      };
    case LoginTypes.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        resetPassword: true,
      };
    case LoginTypes.FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LoginTypes.RESET_PASSWORD:
      return {
        ...state,
        loading: true,
      };
    case LoginTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        resetPassword: true,
      };
    case LoginTypes.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LoginTypes.CLEAR_RESET_PASSWORD:
      return {
        ...state,
        resetPassword: false,
        error: '',
      };
    case LoginTypes.ONBOARDING:
      return {
        ...state,
        onboarding: action.payload,
        loading: false,
      };
    case LoginTypes.SEND_CONFIRMATION:
      return {
        ...state,
        onboarding: INITIAL_ONBOARDING,
      };
    case AccountTypes.LOGOUT:
      return {
        ...INITIAL_STATE
      }
    default:
      return state;
  }
};

export default reducer;

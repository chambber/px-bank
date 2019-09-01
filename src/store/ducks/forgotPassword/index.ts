import { Reducer } from 'redux';

import { ForgotPasswordState, ForgotPasswordTypes } from './types';

const INITIAL_STATE: ForgotPasswordState = {
  loading: false,
  error: '',
};

const reducer: Reducer<ForgotPasswordState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ForgotPasswordTypes.FORGOT_PASSWORD:
      return {
        ...state,
        loading: true,
      };
    case ForgotPasswordTypes.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        resetPassword: true,
      };
    case ForgotPasswordTypes.FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;

import { combineReducers } from 'redux';
import login from './login';
import customer from './customer';
import account from './account';
import app from './app';

export default combineReducers({
  login,
  customer,
  account,
  app,
});

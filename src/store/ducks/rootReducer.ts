import { combineReducers } from 'redux';
import login from './login';
import customer from './customer';
import account from './account';
import app from './app';
import forgotPassword from './forgotPassword'
import rates from './rates';
import devices from './device'

export default combineReducers({
  login,
  customer,
  account,
  app,
  forgotPassword,
  rates,
  devices
});

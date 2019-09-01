import { LoginState } from '../store/ducks/login/types';
import { CustomerState } from '../store/ducks/customer/types';
import { AccountState } from '../store/ducks/account/types';
import { AppReducerState } from '../store/ducks/app/types';
import { ForgotPasswordState } from '../store/ducks/forgotPassword/types'
import { RatesState } from '../store/ducks/rates/types'
import { DeviceState } from '../store/ducks/device/types'

export interface ApplicationState {
  app: AppReducerState;
  login: LoginState;
  customer: CustomerState;
  account: AccountState;
  forgotPassword: ForgotPasswordState;
  rates: RatesState;
  devices: DeviceState;
}

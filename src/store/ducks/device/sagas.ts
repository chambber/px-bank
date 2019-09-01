import {
 call, put
} from 'redux-saga/effects';

import {
  deviceSuccess,
  deviceFailure
} from './actions';
import * as service from './services';
import { DeviceInfo } from '../../../models/DeviceInfo';


export function* DeviceRegister(device: DeviceInfo) {
  try {
    const deviceRegistered = yield call(service.createDevice, device);  
      if (deviceRegistered) {
        return yield put(deviceSuccess(device));        
      }     
  } catch (error) {
    return yield put(deviceFailure(error));
  }
}




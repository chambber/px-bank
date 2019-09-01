import { Reducer } from 'redux';

import { DeviceState, DeviceCreateTypes } from './types';
import {
  DeviceInfo,
  Client,
  Device,
  Os
} from '../../../models/DeviceInfo';

const INITIAL_STATE_DEVICE_CLIENT: Client = {
  engine: '',
  engineVersion: '',
  name: '',
  type: '',
  version: ''
}

const INITIAL_STATE_DEVICE_DEVICE: Device = {
  brand: '',
  model: '',
  type: ''
}

const INITIAL_STATE_DEVICE_OS: Os = {
  name: '',
  platform: '',
  version: ''
}


const INITIAL_STATE_DEVICE: DeviceInfo = {
  aliasDevice: '',
  customer: '',
  client: INITIAL_STATE_DEVICE_CLIENT,
  device: INITIAL_STATE_DEVICE_DEVICE,
  os: INITIAL_STATE_DEVICE_OS
};

const INITIAL_STATE: DeviceState = {
  error: {},
  data: INITIAL_STATE_DEVICE,
  loading: false,
  permission: false
};

const reducer: Reducer<DeviceState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DeviceCreateTypes.CREATE_DEVICE:
      return {
        ...state,
        loading: true,
      };
    case DeviceCreateTypes.CREATE_DEVICE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: '',
        permission: true
      };
    case DeviceCreateTypes.CREATE_DEVICE_FAILURE:
      let error: {} = action.payload;
      return {
        ...state,
        loading: false,
        error: error,
        permission: false
      };
    case DeviceCreateTypes.CREATE_DEVICE_CLEAR:
      return {
        ...state,
        loading: false,
        error: '',
      };
    default:
      return state;
  }
};

export default reducer;

import { DeviceInfo } from '../../../models/DeviceInfo';

export enum DeviceCreateTypes {
  CREATE_DEVICE = '@device/CREATE_DEVICE',
  CREATE_DEVICE_SUCCESS = '@device/CREATE_DEVICE_SUCCESS',
  CREATE_DEVICE_FAILURE = '@device/CREATE_DEVICE_FAILURE',
  CREATE_DEVICE_CLEAR = '@device/CREATE_DEVICE_CLEAR'
}

export interface DeviceState {
  readonly error: any;
  readonly data: DeviceInfo;
  readonly loading: boolean;
  readonly permission: boolean;
}
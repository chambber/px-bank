import { DeviceCreateTypes } from './types';
import { DeviceInfo } from '../../../models/DeviceInfo';

export const device = (payload: DeviceInfo) => ({
  type: DeviceCreateTypes.CREATE_DEVICE, payload,
});
export const deviceSuccess = (payload: DeviceInfo) => ({
  type: DeviceCreateTypes.CREATE_DEVICE_SUCCESS, payload,
});
export const deviceFailure = (payload: any) => ({
  type: DeviceCreateTypes.CREATE_DEVICE_FAILURE, payload,
});

export const deviceClear = () => ({
  type: DeviceCreateTypes.CREATE_DEVICE_CLEAR
});


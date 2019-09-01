import { DeviceActivity } from './DeviceActivity';

export interface UseDeviceActivitiesHook {
  loading: boolean;
  data: DeviceActivity[];
}

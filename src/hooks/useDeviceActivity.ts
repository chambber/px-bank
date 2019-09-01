import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getDevices } from '../store/ducks/account/services';
import { DeviceActivity, UseDeviceActivitiesHook } from '../models';
import { toggleLoader, alert } from '../store/ducks/app/actions';

const useDeviceActivity = (customer: string | undefined) => {
  const dispatch = useDispatch();

  const [hook, setHook] = useState<UseDeviceActivitiesHook>({
    loading: false,
    data: [],
  });

  useEffect(() => {
    (async () => {
      if (!customer) return setHook({ loading: false, data: [] });

      try {
        dispatch(toggleLoader(true));
        setHook({ loading: true, data: [] });
        const devices = await getDevices(customer);
        console.log('aqui a', devices);
        return setHook({
          loading: false,
          data: devices.map((activity: DeviceActivity) => Object.assign(new DeviceActivity(), activity)),
        });
      } catch (err) {
        dispatch(
          alert({
            className: 'bg-danger',
            text: 'Unable to load account devices.',
          }),
        );
      } finally {
        dispatch(toggleLoader(false));
      }
    })();
  }, [customer, dispatch]);

  return hook;
};

export { useDeviceActivity };

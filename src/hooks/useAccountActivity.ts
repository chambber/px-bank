import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getActivities } from '../store/ducks/account/services';
import { AccountActivity, UseAccountActivitiesHook } from '../models';
import { toggleLoader, alert } from '../store/ducks/app/actions';

const useAccountActivity = (customer: string | undefined) => {
  const dispatch = useDispatch();

  const [hook, setHook] = useState<UseAccountActivitiesHook>({
    loading: false,
    data: [],
  });

  useEffect(() => {
    (async () => {
      if (!customer) return setHook({ loading: false, data: [] });

      try {
        dispatch(toggleLoader(true));
        setHook({ loading: true, data: [] });
        const activities = await getActivities(customer);

        return setHook({
          loading: false,
          data: activities.map((activity: AccountActivity) => Object.assign(new AccountActivity(), activity)),
        });
      } catch (err) {
        dispatch(
          alert({
            className: 'bg-danger',
            text: 'Could not load account activity.',
          }),
        );
      } finally {
        dispatch(toggleLoader(false));
      }
    })();
  }, [customer, dispatch]);

  return hook;
};

export { useAccountActivity };

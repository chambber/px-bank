import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCustomerWallets } from '../store/ducks/wallet/services';
import { UseWalletsHook } from '../models/UseWalletsHook';
import { toggleLoader, alert } from '../store/ducks/app/actions';

const useWallets = (isoDate?: string) => {
  const dispatch = useDispatch();

  const [hook, setHook] = useState<UseWalletsHook>({
    loading: false,
    data: [],
  });

  useEffect(() => {
    (async () => {
      try {
        dispatch(toggleLoader(true));
        setHook({ loading: true, data: [] });
        const wallets = await getCustomerWallets();

        if (wallets) {
          setHook({ loading: false, data: wallets });
        }
      } catch (err) {
        dispatch(
          alert({
            className: 'bg-danger',
            text: 'Could not load balances.',
          }),
        );
      } finally {
        dispatch(toggleLoader(false));
      }
    })();
  }, [isoDate, dispatch]);

  return hook;
};

export { useWallets };

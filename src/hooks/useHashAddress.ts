import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDepositHash } from '../store/ducks/wallet/services';
import { UseHashAddressHook } from '../models/UseHashAddressHook';
import { toggleLoader, alert } from '../store/ducks/app/actions';

const useHashAddresss = (coinId: number) => {
  const dispatch = useDispatch();

  const [hook, setHook] = useState<UseHashAddressHook>({
    loading: false,
    data: '',
  });

  useEffect(() => {
    (async () => {
      if (coinId === 0) return;
      dispatch(toggleLoader(true));
      setHook({ loading: true, data: '' });

      try {
        const hash = await getDepositHash(coinId);
        if (hash) {
          setHook({ loading: false, data: hash });
        }
      } catch (err) {
        dispatch(
          alert({
            className: 'bg-danger',
            text: 'Could not load address for deposit.',
          }),
        );
      } finally {
        dispatch(toggleLoader(false));
      }
    })();
  }, [coinId, dispatch]);

  return hook;
};

export { useHashAddresss };

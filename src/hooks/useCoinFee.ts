import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCoinFee } from '../store/ducks/coin/services';
import { UseCoinFeeHook } from '../models/UseCoinFeeHook';
import { alert, toggleLoader } from '../store/ducks/app/actions';

const initialCoinFee = {
  loading: false,
  data: '0.00',
};

const useCoinFee = (coinId: number) => {
  const [hook, setHook] = useState<UseCoinFeeHook>(initialCoinFee);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (coinId === 0) return setHook(initialCoinFee);

      try {
        dispatch(toggleLoader(true));
        setHook({ loading: true, data: '' });
        const coinFee = await getCoinFee(coinId);

        return setHook(coinFee ? { loading: false, data: coinFee } : initialCoinFee);
      } catch (err) {
        dispatch(
          alert({
            className: 'bg-danger',
            text: 'Could not load rates for this currency.',
          }),
        );
      } finally {
        dispatch(toggleLoader(false));
      }
    })();
  }, [coinId, dispatch]);

  return hook;
};

export { useCoinFee };

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { toggleLoader } from '../store/ducks/app/actions';
import { getExchangeRate } from '../store/ducks/rates/services';

import { UseExchangeRateHook } from '../models';

const useExchangeRate = (currencies: string[]) => {
  const dispatch = useDispatch();
  const [hook, setHook] = useState<UseExchangeRateHook>({});

  useEffect(() => {
    (async () => {
      let rates: UseExchangeRateHook = {};
      dispatch(toggleLoader(true));

      try {
        rates = await getExchangeRate(currencies);
      } catch (err) {
        console.log(err);
        rates = {};
      }

      setHook(rates);
      dispatch(toggleLoader(false));
    })();
  }, [dispatch]);

  return hook;
};

export { useExchangeRate };

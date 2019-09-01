import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getCustomerTransactions } from '../store/ducks/wallet-transaction/services';
import { UseTransactionsHook, WalletTransaction } from '../models';
import { toggleLoader, alert } from '../store/ducks/app/actions';

const useTransactions = (/* TODO: filter params */) => {
  const dispatch = useDispatch();

  const [hook, setHook] = useState<UseTransactionsHook>({
    loading: false,
    data: [],
  });

  useEffect(() => {
    (async () => {
      try {
        dispatch(toggleLoader(true));
        setHook({ loading: true, data: [] });
        const transactions = await getCustomerTransactions();

        if (transactions) {
          setHook({
            loading: false,
            data: transactions.map(t => Object.assign(new WalletTransaction(), t)),
          });
        }
      } catch (err) {
        dispatch(
          alert({
            className: 'bg-danger',
            text: 'Could not load drives.',
          }),
        );
      } finally {
        dispatch(toggleLoader(false));
      }
    })();
  }, [dispatch]);

  return hook;
};

export { useTransactions };

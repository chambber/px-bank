import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getCustomerTransactionById } from '../store/ducks/wallet-transaction/services';
import { UseTransactionDetailsHook, WalletTransaction, WalletTransactionDetails } from '../models';
import { toggleLoader, alert } from '../store/ducks/app/actions';

const useTransactionDetails = (transactionId: number, coinId: number) => {
  const dispatch = useDispatch();

  const [hook, setHook] = useState<UseTransactionDetailsHook>({
    loading: false,
    data: new WalletTransactionDetails(),
  });

  useEffect(() => {
    if (transactionId === 0 || coinId === 0) setHook({ loading: false, data: new WalletTransactionDetails() });

    (async () => {
      try {
        dispatch(toggleLoader(true));
        setHook({ loading: true, data: new WalletTransactionDetails() });
        const transaction = await getCustomerTransactionById(transactionId, coinId);

        if (transaction) {
          setHook({
            loading: false,
            data: Object.assign(new WalletTransaction(), transaction),
          });
        }
      } catch (err) {
        dispatch(
          alert({
            className: 'bg-danger',
            text: 'Could not load drive details.',
          }),
        );
      } finally {
        dispatch(toggleLoader(false));
      }
    })();
  }, [transactionId, coinId, dispatch]);

  return hook;
};

export { useTransactionDetails };

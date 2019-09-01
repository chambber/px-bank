import { WalletTransactionDetails } from './WalletTransactionDetails';

export interface UseTransactionDetailsHook {
  loading: boolean;
  data: WalletTransactionDetails;
}

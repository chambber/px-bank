import { WalletTransaction } from './WalletTransaction';

export interface UseTransactionsHook {
  loading: boolean;
  data: WalletTransaction[];
}

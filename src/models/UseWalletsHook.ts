import { WalletWithBalance } from './WalletWithBalance';

export interface UseWalletsHook {
  loading: boolean;
  data: WalletWithBalance[];
}

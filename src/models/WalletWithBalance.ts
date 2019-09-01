export interface WalletWithBalance {
  walletId: number;
  coinId: number;
  coin: string;
  coinCode: string;
  walletKey: string;
  balance: string;
  pendingBalance: {
    income: string;
    debts: string;
  };
  total: string;
}

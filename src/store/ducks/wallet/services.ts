import { apiOsiris } from '../../../services/api';
import { getUser } from '../../../services/auth';
import { WalletWithBalance, WithdrawParams } from '../../../models';

export const getCustomerWallets = async () => {
  const loggedUser = getUser();

  if (loggedUser) {
    const url = `/customers/${loggedUser.id}/wallets`;
    const result = await apiOsiris.get<WalletWithBalance[]>(url);

    return result.data;
  }
};

export const getDepositHash = async (coinId: number) => {
  const loggedUser = getUser();

  if (loggedUser) {
    const url = `/customers/${loggedUser.id}/hash-addresses?coinId=${coinId}`;
    const result = await apiOsiris.get(url);

    return result.data.hash;
  }
};

export const checkWithdrawHashAddress = async (hashAddress: string) => {
  const loggedUser = getUser();

  if (loggedUser) {
    const url = `/customers/${loggedUser.id}/hash-addresses/${hashAddress}`;
    const result = await apiOsiris.get(url);
    return result.data;
  }
};

export const withdraw = async (params: WithdrawParams) => {
  const loggedUser = getUser();

  if (loggedUser) {
    const url = `/customers/${loggedUser.id}/withdrawals`;
    const result = await apiOsiris.post(url, params);
    return result.data;
  }
};

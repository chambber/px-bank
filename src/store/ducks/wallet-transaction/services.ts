import { apiOsiris } from '../../../services/api';
import { getUser } from '../../../services/auth';
import { WalletTransactionModel, WalletTransactionDetailsModel } from '../../../models';

interface CustomerTransactionResponse {
  trxs: WalletTransactionModel[];
}

export const getCustomerTransactions = async () => {
  const loggedUser = getUser();

  if (loggedUser) {
    const url = `/customers/${loggedUser.id}/transactions`;
    const result = await apiOsiris.get<CustomerTransactionResponse>(url);

    return result.data.trxs;
  }
};

export const getCustomerTransactionById = async (id: number, coinId: number) => {
  const loggedUser = getUser();

  if (loggedUser) {
    const url = `/customers/${loggedUser.id}/transactions/${id}?coinId=${coinId}`;
    const result = await apiOsiris.get<WalletTransactionDetailsModel>(url);

    return result.data;
  }
};

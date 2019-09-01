import Big from "big.js";
import moment from 'moment';

export interface WalletTransactionDetailsModel {
  id: number;
  transactionId: string;
  networkId: string;
  typeId: number;
  type: string;
  statusId: number;
  status: string;
  amount: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  hashAddress: string;
  networkUrl: string;
  nativeAmount: string;
  nativeCurrency: string;
  coinId: number;
  coin: string;
  coinCode: string;
}

export class WalletTransactionDetails implements WalletTransactionDetailsModel {
  id: number = 0;
  transactionId: string = '';
  networkId: string = '';
  typeId: number = 0;
  type: string = '';
  statusId: number = 0;
  status: string = '';
  amount: string = '';
  createdAt: string = '';
  updatedAt: string = '';
  description: string = '';
  hashAddress: string = '';
  networkUrl: string = '';
  nativeAmount: string = '';
  nativeCurrency: string = '';
  coinId: number = 0;
  coin: string = '';
  coinCode: string = '';

  get bigAmount() {
    return new Big(this.amount);
  }

  get badgeClassName() {
    switch (this.statusId) {
      case 1:
        return "badge bg-warning";
      case 2:
        return "badge bg-success";
      default:
        return "badge";
    }
  }

  get fCreatedAt() {
    return moment(this.createdAt).format("DD/MM/YYYY HH:mm");
  }

  get statusStr() {
    switch (this.statusId) {
      case 1:
        return "Pending";
      case 2:
        return "Completed";
      default:
        return "";
    }
  }

  get typeStr() {
    switch (this.typeId) {
      case 1:
        return "Deposit";
      case 2:
        return "Withdrawal";
      case 3:
        return "Transfer";
      case 4:
        return "Fee (withdrawal)";
      default:
        return "";
    }
  }
}

import Big from "big.js";
import moment from 'moment';

export interface WalletTransactionModel {
  id: number;
  networkId: string;
  type: string;
  typeId: number;
  status: string;
  statusId: number;
  coin: string;
  coinId: number;
  amount: string;
  createdAt: string;
  description: string;
}

export class WalletTransaction implements WalletTransactionModel {
  id: number = 0;
  networkId: string = '';
  type: string = '';
  typeId: number = 0;
  status: string = '';
  statusId: number = 0;
  coin: string = '';
  coinId: number = 0;
  amount: string = '';
  createdAt: string = '';
  description: string = '';

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

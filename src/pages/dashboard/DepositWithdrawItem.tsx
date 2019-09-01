import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { WalletWithBalance } from "../../models/WalletWithBalance";
import { formatStringToCurrency } from "../../helpers/formatter";

interface DepositWithdrawProps {
  wallet: WalletWithBalance;
  onDepositClick(wallet: WalletWithBalance): void;
  onWithdrawClick(wallet: WalletWithBalance): void;
}

class DepositWithdrawItem extends Component<DepositWithdrawProps> {
  render() {
    const { coin, balance, pendingBalance } = this.props.wallet;

    return (
      <div className="dashboard-depositar-sacar-box">
        <div className="dashboard-depositar-sacar-content">
          <i className="fab fa-bitcoin dashboard-depositar-sacar-icon" />
          <div className="col-group">
            <div className="col-6">
              <div className="dashboard-depositar-sacar-box-item">
                <strong>Coin:</strong> {coin}
              </div>
            </div>
            <div className="col-6">
              <div className="dashboard-depositar-sacar-box-item">
                <strong>Balance:</strong>
                <span className="badge bg-success">
                  {formatStringToCurrency(balance, 8)}
                </span>
              </div>
            </div>
            <div className="col-6">
              <div className="dashboard-depositar-sacar-box-item">
                <strong>Opened:</strong> 0,00
              </div>
            </div>
            <div className="col-6">
              <div className="dashboard-depositar-sacar-box-item">
                <strong>Pending Balance:</strong>{" "}
                {formatStringToCurrency(pendingBalance.income, 8)}
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard-depositar-sacar-footer">
          <div className="col-group">
            <div className="col-6 text-left">
              {/* <Button
                className="btn btn-success"
                onClick={() => this.props.onDepositClick(this.props.wallet)}
                disabled
              >
                Deposit
              </Button> */}
              <Button className="btn btn-success" disabled>
                Deposit
              </Button>
            </div>
            <div className="col-6 text-right">
              <Button
                className="btn btn-danger"
                onClick={() => this.props.onWithdrawClick(this.props.wallet)}
              >
                Withdraw
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DepositWithdrawItem;

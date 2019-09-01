import React, { useState } from "react";

import ModalDeposit from "./ModalDeposit";
import ModalWithdraw from "./ModalWithdraw";
import DepositWithdrawItem from "./DepositWithdrawItem";
import { useWallets } from "../../hooks";
import { WalletWithBalance } from "../../models/WalletWithBalance";


const getISODate = () => new Date().toISOString();

const DepositWithdraw: React.FC = () => {
  const [ISODate, setISODate] = useState(getISODate());
  const [depositOpen, setDepositOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [wallet, setWallet] = useState<WalletWithBalance | null>(null);

  const wallets = useWallets(ISODate);

  const openWithdrawModal = (wallet: WalletWithBalance) => {
    setWallet(wallet);
    setWithdrawOpen(true);
  };

  const openDepositModal = (wallet: WalletWithBalance) => {
    setWallet(wallet);
    setDepositOpen(true);
  };

  const closeWithdrawModal = () => {
    setWithdrawOpen(false);
    setISODate(getISODate());
  };

  const closeDepositModal = () => {
    setDepositOpen(false);
    setISODate(getISODate());
  };

  return (
    <div className="main">
      <section className="dashboard-depositar-sacar">
        <div className="wrapper">
          <h2 className="breadcrumb-title">
            Deposit & Withdraw
          </h2>
          <div className="dashboard-description">
            View your account balance. Use 'Deposit' to add funds and 'Withdraw' to remove them.
          </div>
          <div className="col-group">
            {
              wallets.loading ?
                <p>Loading...</p> :
                wallets.data.map((w, i) => (
                  <div key={`wallet-${i}`} className="col-4">
                    <DepositWithdrawItem
                      wallet={w}
                      onDepositClick={openDepositModal}
                      onWithdrawClick={openWithdrawModal}
                    />
                  </div>
                ))
            }
          </div>
        </div>

        {depositOpen && <ModalDeposit
          visible={depositOpen}
          wallet={wallet}
          close={() => closeDepositModal()}
        />}

        {withdrawOpen && <ModalWithdraw
          visible={withdrawOpen}
          wallet={wallet}
          close={() => closeWithdrawModal()}
        />}
      </section>
    </div>
  );
};

export default DepositWithdraw;

import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Button } from "semantic-ui-react";

import { Modal } from "../../components";

import { useHashAddresss } from "../../hooks";

import { WalletWithBalance } from "../../models";

interface OwnProps {
  visible: boolean;
  wallet: WalletWithBalance | null;

  close(): void;
}

const ModalDeposit: React.FC<OwnProps> = ({ visible, wallet, close }) => {

  const hash = useHashAddresss(wallet ? wallet.coinId : 0);

  const renderFooter = () => (
    <div className="modal-footer text-center">
      <div className="col-group">
        <div className="col-6 text-left">
        </div>
        <div className="col-6 text-right">
          <Button onClick={() => close()} className="btn">Close!</Button>
        </div>
      </div>
    </div>
  );

  return visible && wallet ? (
    <Modal
      renderFooter={renderFooter}
      className="modal-depositar"
      title="Deposit!"
      close={() => close()}
    >
      <div>
        <i className="fas fa-hand-holding-usd icon-success" />
        <p>
          To make a deposit, use the email address below:
        </p>
        <div className="modal-2fa-code">
          {hash.data}
        </div>
        <CopyToClipboard text={hash.data}>
          <i className="fas fa-copy icon-copy" />
        </CopyToClipboard>
        <p>
          BTC's will be deposited only after the 6 blockchain confirmations.
        </p>
        <div className="modal-confirmation modal-confirmation-attention">
          Remembering that this is an address {wallet.coin} and sending any other currency will result in loss
          permanent.
        </div>
      </div>
    </Modal>
  ) : null;
};

export default ModalDeposit;

import React from "react";
import { useSelector } from "react-redux";
import Big from 'big.js';

import { Modal } from "../../components";

import { useTransactionDetails, useExchangeRate } from "../../hooks";
import { formatStringToCurrency } from "../../helpers/formatter";
import { ApplicationState } from "../../models";

interface OwnProps {
  visible: boolean;

  close(): void;

  transactionId: number;
  coinId: number;
}

const ModalExtractDetail: React.FC<OwnProps> = ({ visible, close, transactionId, coinId }) => {
  const { data } = useTransactionDetails(transactionId, coinId);

  const { selected: selectedRate } = useSelector(
    (state: ApplicationState) => ({ ...state.account, ...state.rates })
  );

  const exchangeRates = useExchangeRate(["BTC"]);

  return visible ? (
    <Modal
      className="modal-detalhe-extrato"
      title="MOVING DETAILS"
      close={() => close()}>
      <div>
        <i className="fas fa-wallet icon-success"></i>
        <div className="col-group">
          <div className="col-12">
            <div className="modal-detalhe-extrato-valor">
              {data.amount} {data.coinCode}
              {
                data.nativeAmount && Object.keys(exchangeRates).length > 0 &&
                <small>
                  Approximately&nbsp;
                  {`${selectedRate} ${formatStringToCurrency(new Big(data.amount).times(new Big(exchangeRates[data.coinCode][selectedRate])).toFixed(2), 2)}`}
                </small>
              }
              <span className="badge bg-default">{data.hashAddress}</span>
              <br />
              {
                data.networkUrl &&
                <a href={data.networkUrl} target="_blank" className="link" rel="noopener noreferrer">
                  View in browser <i className="fas fa-link"></i>
                </a>
              }
            </div>
          </div>
          <div className="col-12">
            <div className="col-group">
              <div className="modal-detalhe-extrato-infos">
                <div className="col-12">
                  <p>
                    <strong>Description:</strong> {data.description}
                  </p>
                </div>
                <div className="col-4">
                  <p>
                    <strong>Date:</strong> {data.fCreatedAt}
                  </p>
                </div>

                <div className="col-4">
                  <p>
                    <strong>Type:</strong> {data.typeStr}
                  </p>
                </div>
                <div className="col-4">
                  <p>
                    <strong>Status:</strong>
                    <span className={data.badgeClassName}>{data.statusStr}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  ) : null;
};

export default ModalExtractDetail;

import React, { useState } from "react";
// import { Link } from "react-router-dom";
import Big from 'big.js';
import IconBitcoin from "../assets/images/icons/bitcoin.png";
import { useTransactions } from "../hooks";
import { formatStringToCurrency } from '../helpers/formatter';
import ModalExtractDetail from '../pages/my-extract/ModalExtractDetail';
import { PDFExport } from '@progress/kendo-react-pdf';
import { drawDOM, exportPDF } from '@progress/kendo-drawing';
import { saveAs } from '@progress/kendo-file-saver';
interface OwnProps {
  close(): void;
}

const MyExtract: React.FC<OwnProps> = ({ close }) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [transactionId, setTransactionId] = useState(0);
  const [coinId, setCoinId] = useState(0);
  const transactions = useTransactions();

  let pdfExportComponent: any;

  const total = transactions.data
    .filter((t) => t.statusId === 2)
    .reduce((total, t) => {
      return total.plus(t.bigAmount);
    }, new Big("0.00"))

  const openDetailsModal = (transactionId: number, coinId: number) => {
    setTransactionId(transactionId);
    setCoinId(coinId);
    setDetailsOpen(true);
  }

  const closeDetailsModal = () => {
    setTransactionId(0);
    setDetailsOpen(false);
  }

  const exportPDFWithMethod = () => {
    let gridElement: any;
    gridElement = document.getElementsByClassName('table')[0];
    drawDOM(gridElement, { paperSize: "A1" } as any).then((document: any) => {
      return exportPDF(document);
    }).then((dataUri: any) => {
      saveAs(dataUri, `extrato-ftcorpex-${Date.now()}.pdf`);
    });
  }

  return (
    <section className="dashboard">
      <div className="main">
        <div className="col-6">
          <h2 className="breadcrumb-title">
            My Extract
          </h2>
        </div>
        <div className="col-6">
          <div className="text-right btn-export-table">
            <button className="btn" disabled={transactions.data.length === 0 ? true : false} onClick={exportPDFWithMethod}>Export Extract</button>
          </div>
        </div>
        <div className="col-group">
          <div className="col-12">
            <div className="dashboard-box">
              <div className="table-responsive">
                <PDFExport ref={(component: any) => pdfExportComponent = component} paperSize="A4">
                  <table className="table">
                    <thead>
                      <tr>
                        <td></td>
                        <td>Coin</td>
                        <td>Date/Time</td>
                        <td>Description</td>
                        <td className="text-center">Status</td>
                        <td className="text-right">Withdrawal/Deposit</td>
                        <td></td>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        transactions.data.map((t) => (
                          <tr key={`transaction-${t.id}`}>
                            <td className="text-center dashboard-moeda">
                              {/* TODO: icone de acordo com a moeda */}
                              <img src={IconBitcoin} alt={t.coin} />
                            </td>
                            <td><strong>{t.coin}</strong></td>
                            <td>{t.fCreatedAt}</td>
                            <td>{t.description}</td>
                            <td className="text-center">
                              <span className={t.badgeClassName}>{t.statusStr}</span>
                            </td>
                            <td className="text-right">
                              {
                                t.bigAmount.gt(0) ?
                                  <span className="badge bg-success">+{formatStringToCurrency(t.bigAmount.toFixed(), 8)}</span> :
                                  <span className="badge bg-default">{formatStringToCurrency(t.bigAmount.toFixed(), 8)}</span>
                              }
                            </td>
                            <td className="text-right" onClick={() => openDetailsModal(t.id, t.coinId)}>
                              <div className="meu-extrato-view-link">
                                <i className="far fa-eye" />
                              </div>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={7} className="text-right">Total: {total.toFixed()}</td>
                      </tr>
                    </tfoot>
                  </table>
                </PDFExport>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        detailsOpen &&
        <ModalExtractDetail
          visible={detailsOpen}
          close={() => closeDetailsModal()}
          transactionId={transactionId}
          coinId={coinId}
        />
      }
    </section>
  );
};

export default MyExtract;

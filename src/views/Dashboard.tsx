import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Big from "big.js";
import IconBitcoin from "../assets/images/icons/bitcoin.png";
import IconTrue from "../assets/images/icons/trueusd.png";
import IconEther from "../assets/images/icons/ether.png";
import IconLitecoin from "../assets/images/icons/litecoin.png";
import IconReal from "../assets/images/icons/real.png";
import TradingViewWidget, { Themes, BarStyles } from 'react-tradingview-widget';

import Autenticacao2FA from "../pages/dashboard/Authentication2FA";

import { useWallets, useExchangeRate } from "../hooks";

import { ApplicationState } from "../models";

import { formatStringToCurrency } from "../helpers/formatter";

const Dashboard: React.FC = () => {
  const { data: account, selected: selectedRate } = useSelector(
    (state: ApplicationState) => ({ ...state.account, ...state.rates })
  );

  const [ISODate] = useState(new Date().toISOString());
  const wallets = useWallets(ISODate);
  const exchangeRates = useExchangeRate(["BTC"]);

  return (
    <div>
      {account.id && !account.has2FA && <Autenticacao2FA />}

      <section className="dashboard">
        <div className="main">
          <h2 className="breadcrumb-title">Account Summary</h2>
          <div className="col-group">
            <div className="col-6">
              <div className="dashboard-box">
                <h3 className="dashboard-subtitle">Simplified registration</h3>
                <p className="description">
                  With your registration you can deposit/withdraw up to 0.5 BTCs/Month.
                  <br />
                  <strong className="text-danger">
                    Deposits and withdrawals above these amounts, only for accounts verified.
                  </strong>
                </p>
                <Link to="/deposit-withdraw" className="btn">
                  Deposit or Withdraw
                </Link>
              </div>
            </div>
            <div className="col-6">
              <div className="dashboard-box">
                <h3 className="dashboard-subtitle">Verified Account</h3>
                <p className="description">
                  With the verified account you can deposit/withdraw above 0.5 BTCs and depositing/removing crypts.
                </p>
                <Link to="/dashboard" className="btn disabled">Check it now</Link>
              </div>
            </div>
          </div>
          <div className="col-group">
            <div className="col-12">
              <div className="dashboard-box">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <td></td>
                        <td>Coin</td>
                        <td className="text-right">Balance</td>
                        <td className="text-right">Status</td>
                        <td className="text-right">At {selectedRate}</td>
                      </tr>
                    </thead>
                    <tbody>
                      {wallets.data.length > 0 && Object.keys(exchangeRates).length > 0 && (
                        <tr>
                          <td className="text-center dashboard-moeda">
                            <img src={IconBitcoin} alt="Bitcoin" />
                          </td>
                          <td>
                            <strong>{wallets.data[0].coin}</strong>
                          </td>
                          <td className="text-right">
                            {formatStringToCurrency(wallets.data[0].balance, 8)}
                          </td>
                          <td className="text-right">
                            {formatStringToCurrency(
                              wallets.data[0].pendingBalance.income,
                              8,
                            )}
                          </td>
                          <td className="text-right">
                            {`${selectedRate} `}
                            {wallets.data[0] &&
                              exchangeRates["BTC"] &&
                              formatStringToCurrency(
                                new Big(wallets.data[0].balance)
                                  .times(new Big(exchangeRates[wallets.data[0].coinCode][selectedRate]))
                                  .toFixed(2),
                                2,
                              )}
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td className="text-center dashboard-moeda">
                          <img src={IconReal} alt="Real Brasileiro" />
                        </td>
                        <td>
                          <strong>Real</strong>
                        </td>
                        <td className="text-right">0,00</td>
                        <td className="text-right">{`${selectedRate} `}0,00</td>
                        <td className="text-right">{`${selectedRate} `}0,00</td>
                      </tr>
                      <tr>
                        <td className="text-center dashboard-moeda">
                          <img src={IconTrue} alt="TrueUSD" />
                        </td>
                        <td>
                          <strong>TrueUSD</strong>
                        </td>
                        <td className="text-right">0,00</td>
                        <td className="text-right">{`${selectedRate} `}0,00</td>
                        <td className="text-right">{`${selectedRate} `}0,00</td>
                      </tr>

                      <tr>
                        <td className="text-center dashboard-moeda">
                          <img src={IconEther} alt="Ether" />
                        </td>
                        <td>
                          <strong>Ether</strong>
                        </td>
                        <td className="text-right">0,00000000</td>
                        <td className="text-right">0,00000000</td>
                        <td className="text-right">{`${selectedRate} `}0,00</td>
                      </tr>
                      <tr>
                        <td className="text-center dashboard-moeda">
                          <img src={IconLitecoin} alt="Litecoin" />
                        </td>
                        <td>
                          <strong>Litecoin</strong>
                        </td>
                        <td className="text-right">0,00000000</td>
                        <td className="text-right">0,00000000</td>
                        <td className="text-right">{`${selectedRate} `}0,00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="dashboard-saldo">
                  balance approximately in: ~{" "}
                  {wallets.data.length > 0 && (
                    <span>
                      {`${selectedRate} `}
                      {wallets.data[0] &&
                        exchangeRates["BTC"] &&
                        formatStringToCurrency(
                          new Big(wallets.data[0].balance)
                            .times(new Big(exchangeRates[wallets.data[0].coinCode][selectedRate]))
                            .toFixed(2),
                          2,
                        )}
                    </span>
                  )}
                </div>

              </div>
            </div>
          </div>
          <div className="col-group">
            <div className="col-12">
              <div className="dashboard-box">
                <TradingViewWidget
                  symbol="COINBASE:BTCUSD"
                  theme={Themes.LIGHT}
                  locale="en"
                  width="100%"
                  style={BarStyles.CANDLES}
                />
                <div className="text-center mt-10">
                  <a href="https://www.tradingview.com/symbols/NASDAQ-AAPL/" rel="noopener noreferrer" target="_blank">
                    <span className="blue-text">AAPL Chart</span>
                  </a> by TradingView
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

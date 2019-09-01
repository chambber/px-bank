import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Big from "big.js";

import { ApplicationState } from "../models";

import { formatStringToCurrency } from "../helpers/formatter";

const Dashboard: React.FC = () => {
  const { selected: selectedRate } = useSelector(
    (state: ApplicationState) => ({ ...state.account, ...state.rates })
  );

  return (
    <div>
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
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

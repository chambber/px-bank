import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Big from "big.js";

import { ApplicationState } from "../models";

import { formatStringToCurrency } from "../helpers/formatter";
import { useProfile } from "../hooks";

const Dashboard: React.FC = () => {
  const { account } = useSelector((state: ApplicationState) => state);

  const { data } = useProfile(account.data.personalInfo.documentNumber);

  return (
    <div>
      <section className="dashboard">
        <div className="main">
          <h2 className="breadcrumb-title">Sumário da Conta</h2>
          <div className="col-group">
            <div className="col-6">
              <div className="dashboard-box">
                <h3 className="dashboard-subtitle">Perfil de Investimento</h3>
                <p className="description">
                  Seu perfil de investimento é <strong>{data}</strong>.
                </p>
              </div>
            </div>
            <div className="col-group">
              <div className="col-12">
                <div className="dashboard-box">
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <td>Fundo</td>
                          <td className="text-right">Saldo</td>
                        </tr>
                      </thead>
                      <tbody>
                          <tr>
                            <td>
                              <strong>AZZURRA FUNDO DE INVESTIMENTO MULTIMERCADO</strong>
                            </td>
                            <td className="text-right">
                              2.000,00
                            </td>
                          </tr>
                        <tr>
                          <td>
                            <strong>ITAÚ PRIVATE DURATION PRÉ 3X RENDA FIXA FUNDO DE INVESTIMENTO EM COTAS DE FUNDOS DE INVESTIMENTO</strong>
                          </td>
                          <td className="text-right">1.500,00</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>NUCLEOS V ALM FUNDO DE INVESTIMENTO RENDA FIXA LONGO PRAZO</strong>
                          </td>
                          <td className="text-right">453,50</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div >
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Button } from "semantic-ui-react";

import { logout } from "../store/ducks/account/actions";
import Logo from "../assets/images/logo-ft-corpex.png";

import { Account, ApplicationState } from "../models";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const account: Account | undefined = useSelector(
    (state: ApplicationState) => state.account.data
  );

  const handleClick = () => {
    dispatch(logout());
  };

  const renderRegister = () =>
    account.id ? null : (
      <Link to="create-account" className="btn home-btn-create-account">
        Register
      </Link>
    );

  const renderLogin = () =>
    account.id ? (
      <>
        <div className="dropdown">
          <Button className="btn dropdown-btn">
            Hello, {account.displayName} <i className="fas fa-sort-down down" />
          </Button>
          <div className="dropdown-content">
            <Link to="dashboard">
              <i className="fas fa-tachometer-alt" /> Dashboard
            </Link>
            <Link to="my-account">
              <i className="fas fa-user" /> My Account
            </Link>
            <Link to="login" onClick={handleClick}>
              <i className="fas fa-power-off" /> Logout
            </Link>
          </div>
        </div>
      </>
    ) : (
        <Link to="login" className="btn home-login">
          Log in
      </Link>
      );

  return (
    <section className="home">
      {renderLogin()}

      <div className="home-content">
        <img src={Logo} alt="Logo FT Corpex" className="home-logo" />
        <h1 className="home-title">
          YOUR NEW CHOICE FOR YOUR CRYPTO CURRENCIES
          <span>NEGOTIATE WITH SECURITY ENVIRONMENT OF WHEREVER YOU ARE</span>
        </h1>
        {renderRegister()}
        {/* <Link to="create-account" className="btn home-btn-create-account">
          Cadastre-se
        </Link> */}
      </div>
    </section>
  );
};

export default Home;

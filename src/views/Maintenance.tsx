import React from "react";
import { Link } from "react-router-dom";

import Logo from "../assets/images/logo-ft-corpex.png";

const Maintenance: React.FC = () => {
  return (
    <>
      <section className="login">
        <div className="maintenance-content">
          <img src={Logo} alt="Logo FT Corpex" className="login-logo"/>
          <div className="login-maintenance">
            The site is currently <span>down for maintenance</span>
          </div>
        </div>
        <Link to="/" className="login-btn-back">
          Back
        </Link>
      </section>
    </>
  );
};

export default Maintenance;

import React from "react";
import Logo from "../assets/images/logo-ft-corpex.png";


const HomeTemporary: React.FC = () => {
  return (
    <section className="home">
      <div className="home-content">
        <img src={Logo} alt="Logo FT Corpex" className="home-logo"/>
        <h1 className="home-title">
          YOUR NEW CHOICE FOR YOUR CRYPTO CURRENCIES
          <span>NEGOTIATE WITH SECURITY ENVIRONMENT OF WHEREVER YOU ARE</span>
        </h1>
      </div>
    </section>
  );
};

export default HomeTemporary;

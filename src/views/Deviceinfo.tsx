import React, { useEffect, useState, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { confirmDevice } from "../services/send-email-device";
import uuid from "uuid";
import Logo from "../assets/images/logo-ft-corpex.png";

const DeviceInfo: React.FC = (props: any) => {
  const id = {
    id: props.match.params.id,
    ui: uuid()
  }

  useEffect(() => {
    const status = confirmDevice(id);
    localStorage.setItem("hashIdDevice",id.ui);
    console.log(id);
  }, [id.id]);

  return (
    <>
      <section className="login">
        <div className="maintenance-content">
          <img src={Logo} alt="Logo FT Corpex" className="login-logo"/>

          <form>
            <div>
              <div className="login-maintenance">Access your e-mail <span>to register this device!</span></div>
            </div>
          </form>
        </div>
        <Link to="/" className="login-btn-back">
          Back
        </Link>
      </section>
    </>
  );
};

export default DeviceInfo;

import React, { useEffect, useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import { Modal } from "../index";

const Recapcha: React.FC = (props: any) => {
  const [callback, setCallback] = useState("not fired");
  const [value, setValue] = useState("[empty]");
  const [expired, setExpired] = useState("false");
  const [load, setLoad] = useState(false);
  const [close, setClose] = useState(true);

  const DELAY = 1500;

  useEffect(() => {
    setTimeout(() => {
      setLoad(true);
    }, DELAY)
  });

  // capcha

  const _reCaptchaRef = useRef(null);

  const handleChangeCaptcha = (value: any) => {
    setValue(value);
    if (value) {
      setClose(false);
    }

    // if value is null recaptcha expired
    if (value === null) setExpired("true");
  };

  return (
    <>
      {/* reCapcha */}
      <Modal
        title="Validate"
        titleButton="Send"
        className="modal-google-authenticator"
        close={() => close}
        renderFooter={() => <></>}
      >
        <div className="form-group">
          <ReCAPTCHA
            theme="light"
            ref={_reCaptchaRef}
            sitekey="6LcpkKsUAAAAADxV8pSA8Pklfkl-UUxUV3xOuqKE"
            onChange={handleChangeCaptcha}
          />
        </div>
      </Modal>
    </>
  );
};

export { Recapcha };

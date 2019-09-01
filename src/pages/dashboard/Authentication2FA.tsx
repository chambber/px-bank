import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import QRCode from "qrcode";
import speakeasy from "speakeasy";

import { Input, Modal } from "../../components";

import { ApplicationState } from "../../models";
import { twofaInsert } from "../../store/ducks/account/actions";

const Authentication2FA: React.FC = () => {
  const dispatch = useDispatch();

  const { data: account, error } = useSelector((state: ApplicationState) => state.account);
  const [secret, setSecret] = useState<string>("");
  const [dataUrl, setDataUrl] = useState<string>("");
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const newSecret = speakeasy.generateSecret({
      issuer: "FT Corpex",
      name: account.contactInfo.email.address
    });
    setSecret(newSecret.base32);
    const otp_url = speakeasy.otpauthURL({
      secret: newSecret.ascii,
      label: account.contactInfo.email.address,
      issuer: "FT Corpex",
      algorithm: "sha1"
    });
    QRCode.toDataURL(otp_url, (err: any, dataUrl: any) => {
      if (err) return err;
      setDataUrl(dataUrl);
    });
  }, [account.id, account.contactInfo.email.address]);

  const confirm2fa = () => {
    if (!account.id) return;

    dispatch(twofaInsert(account.id, token, secret));
  };

  return (
    <Modal
      className="modal-2fa"
      close={confirm2fa}
      title="Enable your 2FA"
      titleButton="Enable"
    >
      <p>
        Follow the step-by-step below to enable 2-factor authentication in your account:
      </p>

      <div className="col-group">
        <div className="col-3">
          <img src={dataUrl} alt="QRCode 2FA"/>
        </div>
        <div className="col-9 text-left">
          <strong>How to enable 2FA?</strong>
          <ul>
            <li>
              1- Download the "Google Authenticator" application in your mobile app store (Google Play or App Store).
            </li>
            <li>
              2 - Open the app, tap the + symbol and click on "Scan a barcode".
            </li>
            <li>
              3- Now just point your camera at the next code and type the 6 numbers that appeared in the your phone's
              screen.
            </li>
          </ul>
        </div>
      </div>

      <p>If you can not read the QR Code, copy and paste the code below into the application.</p>

      <div className="modal-2fa-code">{secret}</div>

      <Input
        autoFocus
        className="form-input"
        maxLength={6}
        onChange={(e: any) => setToken(e.target.value)}
        placeholder="Enter verification code here"
        type="text"
      />
      {error && <span className="text-validation" style={{ left: 0, right: 0 }}>Bad token.</span>}
    </Modal>
  );
};

export default Authentication2FA;

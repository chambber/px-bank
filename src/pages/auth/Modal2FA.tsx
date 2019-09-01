import { Modal, Input } from "../../components";
import LogoGoogleAuthentication from "../../assets/images/logo-google-authentication.png";
import React, { useState, useEffect } from "react";
import { use2FAValidation } from "../../hooks";

interface OwnProps {
  onTokenValid(data: string): void;
  close(): void;
  isLogin?: boolean;
}

const Modal2FA: React.FC<OwnProps> = ({ onTokenValid, close, isLogin = false }) => {
  const [token, setToken] = useState('');
  const twoFAValidation = use2FAValidation(token, isLogin);

  const handleChangeToken = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
  };

  useEffect(() => {
    if (token.length === 6 && token && (isLogin || twoFAValidation.isValid)) {
      onTokenValid(token);
    }
  }, [token, twoFAValidation.isValid]);

  return (
    <Modal
      title="Google Authentication"
      titleButton="Close"
      className="modal-google-authenticator"
      close={close}
      loading={twoFAValidation.loading}
    >
      <img
        src={LogoGoogleAuthentication}
        alt="Google Authenticator"
        className="logo-google-authentication"
      />
      <div className="form-group">
        <label>Enter Authenticator Code below:</label>
        <Input
          autoFocus
          className="form-input text-center"
          onChange={handleChangeToken}
          type="text"
          maxLength={6}
        />
        {twoFAValidation.hasError && (
          <span className="text-validation" style={{ left: 0, right: 0 }}>
            Token incorrect.
          </span>
        )}
      </div>
    </Modal>
  );
};

export default Modal2FA;

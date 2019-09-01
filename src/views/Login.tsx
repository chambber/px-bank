import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import * as yup from 'yup';
import ReCAPTCHA from 'react-google-recaptcha';

import Logo from '../assets/images/logo-ft-corpex.png';
import { Input } from '../components';
import { useForm } from '../hooks';
import {
  login as loginAction,
  login2fa as login2faAction,
  sendConfirmation
} from '../store/ducks/login/actions';
import { Login as LoginModel, ApplicationState } from '../models';
import { logout } from '../store/ducks/account/actions';
import Modal2FA from '../pages/auth/Modal2FA';
import { DetectorDevice } from '../helpers/deviceDetector';

const Login: React.FC = (props: any) => {
  const [token, setToken] = useState('');
  const { login, account } = useSelector((state: ApplicationState) => state);

  // captcha
  const [show2FA, setShow2FA] = useState(false);
  const [captcha, setCaptcha] = useState(false);
  const [showPassword, setViewPassword] = useState(false);
  const [initialLogin, setInitialLogin] = useState<Record<string, any>>();

  const dispatch = useDispatch();

  useEffect(() => {
    if (account.isLoggedIn) {
      props.history.push('/dashboard');
    }
  }, [account.isLoggedIn, props.history]);

  useEffect(() => {
    if (login.data.status === false) {
      props.history.push(`/device-info/${login.data.id}`);
    }
    if (login.data.id && !login.data.authenticated) {
      setShow2FA(true);
    }
  }, [login.data.id, login.data.authenticated, props.history]);

  useEffect(() => {
    setInitialLogin({
      email: '',
      password: ''
    });
  }, []);

  const formSchema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required()
  });

  const handleLogin = (data: Record<string, any>) => {
    let InfoDevice: any = DetectorDevice();
    data.infoDevice = InfoDevice;
    dispatch(loginAction(data as LoginModel));
  };

  const { handleChange, handleSubmit, errors } = useForm(
    initialLogin,
    formSchema
  );

  const onTokenValid = (_token: string) => {
    dispatch(login2faAction(login.data.id, _token));
  };
  const verifyToken = useCallback(() => {
    if (!token) return;

    dispatch(login2faAction(login.data.id, token));
    setToken('');
  }, [dispatch, login.data.id, token]);

  useEffect(() => {
    if (token.length === 6) verifyToken();
  }, [token, verifyToken]);

  const sendEmailConfirmation = () => {
    dispatch(sendConfirmation(login.onboarding));
  };

  const handleEye = () => {
    let change = showPassword ? false : true;
    setViewPassword(change);
  };

  // capcha
  const _reCaptchaRef = useRef(null);

  const handleChangeCaptcha = (value: any) => {
    if (value) setCaptcha(value);
  };

  const onModal2FAclose = () => {
    dispatch(logout());
    setShow2FA(false);
  };

  return (
    <>
      {login.data.id && !login.data.authenticated && show2FA && (
        <Modal2FA
          isLogin={true}
          onTokenValid={onTokenValid}
          close={onModal2FAclose}
        />
      )}

      <section className="login">
        <div className="login-content">
          <img src={Logo} alt="Logo FT Corpex" className="login-logo" />

          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="form-group">
              <label>E-mail</label>
              <Input
                autoFocus
                className="form-input"
                name="email"
                onChange={handleChange}
                type="text"
              />
              {errors.email && (
                <span className="text-validation" style={{ left: 0, right: 0 }}>
                  Please, enter your e-mail.
                </span>
              )}
            </div>
            <div className="form-group">
              <label>Password</label>
              <Input
                className="form-input"
                name="password"
                onChange={handleChange}
                type={showPassword ? 'text' : 'password'}
              />{' '}
              <span
                style={{
                  top: 36,
                  right: 13
                }}
                className="login-eye"
                onClick={handleEye}
              >
                {showPassword === false ? (
                  <i className="far fa-eye"></i>
                ) : (
                  <i className="far fa-eye-slash"></i>
                )}
              </span>
              {errors.password && (
                <span className="text-validation" style={{ left: 0, right: 0 }}>
                  Please, enter your password.
                </span>
              )}
            </div>

            <div className="form-group">
              <Link to="/reset-password" className="login-forgot-password">
                Forgot password?
              </Link>
              <div className="login-recaptcha">
                <ReCAPTCHA
                  onChange={handleChangeCaptcha}
                  ref={_reCaptchaRef}
                  sitekey="6LcpkKsUAAAAADxV8pSA8Pklfkl-UUxUV3xOuqKE"
                  size={'normal'}
                />
              </div>
              {/* <br/>
              <Link to='/' className='login-2fa'>Problemas com 2FA?</Link> */}

              <Button
                className={`btn ${login.loading ? 'btn-loading' : ''}`}
                type="submit"
                disabled={!captcha}
              >
                Log In
              </Button>

              {login.error && (
                <span className="text-validation" style={{ left: 0, right: 0 }}>
                  Incorrect user and/or password(s).
                </span>
              )}
              <Link to="/create-account" className="login-register">
                Not on FT Corpex yet? <span>Register</span>
              </Link>
            </div>
          </form>
        </div>
        <Link to="/" className="login-btn-back">
          Back
        </Link>

        {login.onboarding.id && (
          <span
            onClick={sendEmailConfirmation}
            className="login-btn-ativar-conta"
          >
            Your account has not been activated yet, <span>click here</span> to
            resend the confirmation mail.
          </span>
        )}
      </section>
    </>
  );
};

export default Login;

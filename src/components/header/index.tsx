import React, {
  ComponentPropsWithoutRef,
  ElementType,
  FC,
  useEffect,
  useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'semantic-ui-react';
import currency from 'currency.js';
import Big from 'big.js';

import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo-ft-corpex-header.png';

import { Menu } from './menu';

import { logout } from '../../store/ducks/account/actions';
import { setRate } from '../../store/ducks/rates/actions';
import { checkTermsValidate } from '../../store/ducks/account/actions';

import { ApplicationState } from '../../models';
import { apiSet } from '../../services/api';

const Header: FC<ComponentPropsWithoutRef<ElementType>> = ({ history }) => {
  const dispatch = useDispatch();
  const { data: account, isLoggedIn, selected: selectedRate } = useSelector(
    (state: ApplicationState) => ({ ...state.account, ...state.rates })
  );

  const [photoAvatar, setPhotoAvatar] = useState();

  useEffect(() => {
    if (!isLoggedIn) history.push('login');
  }, [history, isLoggedIn, account]);

  useEffect(() => {
    getPhoto();
  }, [account.id]);

  const handleClick = () => {
    dispatch(logout());
  };

  const toggleMenu = () => {
    const menu = document.getElementsByClassName('nav')[0];
    menu.classList.toggle('is-active');
  };

  const onRateChange = (e: any) => {
    dispatch(setRate(e.target.value));
  };

  const getPhoto = async () => {
    const { id } = account;
    if (!id) return;

    const { data } = await apiSet.get(`customers/${id}/uploadPhoto`);
    setPhotoAvatar(data.image);
  };

  return (
    <>
      <header className="header">
        <div className="header-logo">
          <Link to="dashboard">
            <img src={Logo} alt="PX Investimentos" />
          </Link>
        </div>
        <Button className="header-menu-toggle" onClick={toggleMenu}>
          menu
        </Button>

        {/* {
          Object.keys(exchangeRates).length > 0 &&
          <div className="header-tax-coins">
            <ul>
              <li><span>USD</span> {formatStringToCurrency(exchangeRates["BTC"]["USD"], 2)}</li>
              <li><span>KRW</span> {formatStringToCurrency(exchangeRates["BTC"]["KRW"], 2)}</li>
            </ul>
          </div>
        } */}

        <div className="header-ferramentas">
          <Link to="/my-account" className="header-ferramentas-link">
            {!photoAvatar ? (
              <i className="fas fa-user"></i>
            ) : (
              <img
                className="photo-avatar"
                src={photoAvatar}
                alt="my profile"
              />
            )}

            <span>{account.id ? account.displayName : ''}</span>
          </Link>
          <span
            className="header-ferramentas-link logout"
            onClick={handleClick}
          >
            <i className="fas fa-power-off" />
          </span>
        </div>
      </header>

      <Menu />
    </>
  );
};

export { Header };

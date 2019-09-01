import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { Alert, Header, Loader } from './components';

import { AppReducerState } from './store/ducks/app/types';

import { ApplicationState } from './models';

import Home from './views/Home';
import CreateAccount from './views/CreateAccount';
import Login from './views/Login';
import EmailVerification from './views/EmailVerification';
import DepositWithdraw from './views/DepositWithdraw';
import ResetPassword from './views/ResetPassword';
import Dashboard from './views/Dashboard';
import MyExtract from './views/MyExtract';
import AccountActivity from "./views/AccountActivity";
import DeviceActivity from "./views/DeviceActivity";
import DeviceInfo from './views/Deviceinfo';
import CreateDevice from './views/CreateDevice'
import MyAccount from './views/MyAccount';
import ConfirmWithdrawal from './views/ConfirmWithdrawal';
import Maintenance from './views/Maintenance';
import Contact from "./views/Contact";

// @ts-ignore
const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = useSelector(
    (state: ApplicationState) => state.account.isLoggedIn
  );

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <>
            <Header />
            <Component {...props} />
          </>
        ) : (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          )
      }
    />
  );
};

const Routes: React.FC = () => {
  const appStore: AppReducerState = useSelector(
    (state: ApplicationState) => state.app
  );

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/maintenance" component={Maintenance} />
          <Route path="/reset-password/:token?" component={ResetPassword} />
          <Route path="/create-account" component={CreateAccount} />
          <Route
            path="/email-verification/:token"
            component={EmailVerification}
          />
          <Route path="/device-info/:id" component={DeviceInfo} />
          <Route path="/device-register/:id" component={CreateDevice}/>
          <Route
            path="/confirm-withdrawal/:withdrawal"
            component={ConfirmWithdrawal}
          />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/deposit-withdraw" component={DepositWithdraw} />
          <PrivateRoute path="/my-extract" component={MyExtract} />
          <PrivateRoute path="/my-account" component={MyAccount} />
          <PrivateRoute path="/account-activity" component={AccountActivity} />
          <PrivateRoute path="/contact" component={Contact} />
          <PrivateRoute path="/device-activity" component={DeviceActivity} />
        </Switch>
      </BrowserRouter>
      <Loader visible={appStore.showLoader} />
      <Alert
        className={appStore.alertClass ? appStore.alertClass : undefined}
        visible={appStore.showAlert}
        text={appStore.alertText}
      />
    </>
  );
};

export default Routes;

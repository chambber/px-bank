import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { Alert, Header, Loader } from './components';

import { AppReducerState } from './store/ducks/app/types';

import { ApplicationState } from './models';

import Home from './views/Home';
import CreateAccount from './views/CreateAccount';
import Login from './views/Login';
import Dashboard from './views/Dashboard';

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
          <Route path="/create-account" component={CreateAccount} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
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

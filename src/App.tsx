import React from 'react';
import { Provider } from 'react-redux';
import './styles/Styles.scss';
import './scripts/home';

import store from './store';
import Routes from './routes';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;

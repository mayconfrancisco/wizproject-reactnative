import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { Toast } from 'react-native-redux-toast';
import './config/StatusBarConfig';

import App from './App';
import store from './store';

const Root = () => (
  <Provider store={store}>
    <Fragment>
      <App />
      <Toast />
    </Fragment>
  </Provider>
);

export default Root;

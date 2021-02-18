import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider } from "antd";
import { Provider } from "react-redux";
import configureStore from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Routes from "./components/Routes";
import 'antd/dist/antd.css';
import './index.css';
import App from './App';

ReactDOM.render(
  // <LocaleProvider >
  <Provider store={configureStore.store}>
    <PersistGate loading={null} persistor={configureStore.persistor}>
      <Routes />
    </PersistGate>
  </Provider>, document.getElementById('root')
  //</LocaleProvider> 
)


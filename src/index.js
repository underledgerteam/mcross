import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { NotificationProvider } from "web3uikit";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { WalletProvider } from "./contexts/connect.context";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <NotificationProvider>
    <WalletProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </WalletProvider>
  </NotificationProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

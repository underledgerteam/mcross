import React, { useState, useEffect } from "react";
import Web3 from "web3";

export const Web3Provider = React.createContext();

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(0);

  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      console.log("Non-ethereum browser detected. You should install Metamask");
    }
    return provider;
  };

  const ConnectedWallet = async () => {
    try {
      const currentProvider = detectCurrentProvider();

      await currentProvider.request({ method: 'eth_requestAccounts' });

      const web3 = new Web3(currentProvider);
      const userAccount = await web3.eth.getAccounts();
      const ethBalance = await web3.eth.getBalance(userAccount[0]);

      setAccount(userAccount[0]);
      setBalance(ethBalance);

    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const checkWalletIsConnect = async () => {
    try {
      const currentProvider = detectCurrentProvider();
      if (currentProvider) {

        await currentProvider.request({ method: 'eth_accounts' });

        const web3 = new Web3(currentProvider);
        const userAccount = await web3.eth.getAccounts();
        const ethBalance = await web3.eth.getBalance(userAccount[0]);

        setAccount(userAccount[0]);
        setBalance(ethBalance);
      } else {
        setAccount("");
        setBalance(0);
      }

    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    checkWalletIsConnect();
  });

  return (
    <Web3Provider.Provider
      value={{
        ConnectedWallet,
        balance,
        account,
      }}
    >
      {children}
    </Web3Provider.Provider>
  );



};
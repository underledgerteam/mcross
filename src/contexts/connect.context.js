import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { useNotification } from "web3uikit";
import { nftContractABI, nftContractAddress } from "../utils/constants";

export const Web3Provider = React.createContext();

export const WalletProvider = ({ children }) => {
  const dispatch = useNotification();

  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(0);
  const [nftContract, setNftContract] = useState();
  const [mintProcessing, setMintProcessing] = useState(false);

  const handleNewNotification = (type, icon, position) => {
    dispatch({
      type,
      title: 'New Notification',
      message: 'test message',
      icon,
      position: position || 'topR',
    });
  };

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

  const createNftContract = () => {
    const web3 = new Web3(Web3.givenProvider || detectCurrentProvider());
    const contract = new web3.eth.Contract(nftContractABI, nftContractAddress);
    setNftContract(contract);
  };

  // test
  const getMaxSupply = async () => {
    // get values for each page
    const result = await nftContract.methods.maxSupply().call();
    console.log({ result });
  };

  const mintNft = async (mintAmount = 0) => {
    try {
      setMintProcessing(true);
      const valueWei = Web3.utils.toWei((0.02 * mintAmount).toString(), 'ether');
      const valueHex = Web3.utils.numberToHex(valueWei);

      // console.log("valueHex", valueHex);
      // console.log("value", Web3.utils.numberToHex((20000000000000000 * mintAmount).toString()));

      // const gas = await nftContract.methods.mint(mintAmount).estimateGas({ from: account, value: valueHex });
      // console.log({ gas });

      const tx = {
        from: account,
        gas: (285000 * mintAmount).toString(),
        value: valueHex,
      };

      const mintResult = await nftContract.methods.mint(mintAmount).send(tx);
      console.log({ mintResult });
      handleNewNotification('success');
      return mintResult;
    } catch (error) {
      console.log({ error });
      // manage show error on notification
      handleNewNotification('error');
      return error;
    } finally {
      setMintProcessing(false);
    }
  };

  useEffect(() => {
    checkWalletIsConnect();
    createNftContract();
  }, []);

  return (
    <Web3Provider.Provider
      value={{
        ConnectedWallet,
        balance,
        account,
        mintNft,
        mintProcessing
      }}
    >
      {children}
    </Web3Provider.Provider>
  );



};
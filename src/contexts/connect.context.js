import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { nftContractABI, nftContractAddress } from "../utils/constants";

export const Web3Provider = React.createContext();

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(0);
  const [nftContract, setNftContract] = useState();

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

  const mintNft = async (mintAmount) => {
    try {
      const wei = Web3.utils.toWei((0.02 * mintAmount).toString(), 'ether');
      const hex = Web3.utils.numberToHex(wei);
      const tx = {
        from: account,
        gasPrice: Web3.utils.numberToHex(1000),
        gas: Web3.utils.numberToHex(21000),
        value: hex
      };
      const result = await nftContract.methods.mint(1).send(tx);
      console.log({ result });
    } catch (error) {
      console.log({ error });
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
        mintNft
      }}
    >
      {children}
    </Web3Provider.Provider>
  );



};
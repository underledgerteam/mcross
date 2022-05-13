import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { contractAddress, contractABI } from "../utils/constants";
import { ipfsUriToHttps } from "../utils/ipfsUriToHttps";
export const Web3Provider = React.createContext();

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(0);
  const [myCollection, setMyCollection] = useState({list: [], loading: false});
  const [myCollectionById, setMyCollectionById] = useState({data: [], loading: false});

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
  const GetByIdCollection = async (id) => {
    try {
      const currentProvider = detectCurrentProvider();
      if (currentProvider) {

        await currentProvider.request({ method: 'eth_accounts' });

        const web3 = new Web3(currentProvider);
        const mContract = new web3.eth.Contract(contractABI, contractAddress);
        const uri = await mContract.methods.tokenURI(id).call();
        const responseUri = await fetch(ipfsUriToHttps(uri));
        const objNFT = await responseUri.json();
        setMyCollectionById({ ...myCollectionById, data: objNFT, loading: false});
      } else {
        setAccount("");
        setBalance(0);
      }
    } catch (error) {
      console.log(error);
      throw new Error("Object");
    }
  }
  const GetCollection = async () => {
    try {
      const currentProvider = detectCurrentProvider();
      if (currentProvider) {

        await currentProvider.request({ method: 'eth_accounts' });

        const web3 = new Web3(currentProvider);
        setMyCollection({ ...myCollection, loading: true});
        const mContract = new web3.eth.Contract(contractABI, contractAddress);
        const walletOfOwner = await mContract.methods.walletOfOwner(account).call();
        let objNFTs = [];
        for (var i = 0; i < walletOfOwner.length; i++) {
          const uri = await mContract.methods.tokenURI(walletOfOwner[i]).call();
          const responseUri = await fetch(ipfsUriToHttps(uri));
          let objNFT = await responseUri.json();
          objNFTs = [...objNFTs, {
            ...objNFT, jsonUri: uri
          }];
          setMyCollection({ ...myCollection, list: objNFTs, loading: false});
        }
        console.log(objNFTs)
        // setMyCollection({ ...myCollection, list: objNFTs, loading: false});
      } else {
        setAccount("");
        setBalance(0);
      }

    } catch (error) {
      console.log(error);
      throw new Error("Object");
    }
  };
  
  useEffect(() => {
    checkWalletIsConnect();
  });

  return (
    <Web3Provider.Provider
      value={{
        GetByIdCollection,
        GetCollection,
        ConnectedWallet,
        myCollection,
        myCollectionById,
        balance,
        account,
      }}
    >
      {children}
    </Web3Provider.Provider>
  );



};
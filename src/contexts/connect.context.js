import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { ipfsUriToHttps } from "../utils/ipfsUriToHttps.util";
import { useNotification } from "web3uikit";
import { nftContractABI, nftContractAddress } from "../utils/constants";

export const Web3Provider = React.createContext();

export const WalletProvider = ({ children }) => {
  const dispatch = useNotification();

  const [account, setAccount] = useState("");
  const [owner, setOwner] = useState("");
  const [balance, setBalance] = useState(0);
  const [myCollection, setMyCollection] = useState({list: [], loading: false});
  const [myCollectionById, setMyCollectionById] = useState({data: [], loading: false});
  const [nftContract, setNftContract] = useState();
  const [mintProcessing, setMintProcessing] = useState(false);
  const [ chain, setChain ] = useState("ethereum");

  const handleNewNotification = ({type, icon, title, message, position}) => {
    dispatch({
      type,
      title: title || 'New Notification',
      message: message|| 'test message',
      icon,
      position: position || 'topR',
    });
  };
  const ChangeChain = (chain) => {
    setChain(chain);
  }
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

  const CreateSellCollection = async (objNFT, handleSuccess = ()=>{}, handleError = ()=>{}) => {
    try { 
      console.log("objNFT=>", objNFT);
      console.log("owner=>", owner);
      handleNewNotification({
        type: "success",
        title: 'Success',
        message: `You Success Sell NFT ${objNFT?.name} with 100 WETH`,
      });
      handleSuccess();
    } catch (error) {
      console.log(error);
      handleError();
      handleNewNotification({
        type: "error",
        title: 'Rejected',
        message: `MetaMask Signature. User denied transaction signature`,
      });
      throw new Error("Object");
    }
  };

  const CancelSellCollection = async (objNFT, handleSuccess = ()=>{}, handleError = ()=>{}) => {
    try { 
      console.log("objNFT=>", objNFT);
      console.log("owner=>", owner);
      handleNewNotification({
        type: "success",
        title: 'Success',
        message: `You Cancel Sell NFT ${objNFT?.name}`,
      });
      handleSuccess();
    } catch (error) {
      console.log(error);
      handleError();
      handleNewNotification({
        type: "error",
        title: 'Rejected',
        message: `MetaMask Signature. User denied transaction signature`,
      });
      throw new Error("Object");
    }
  };

  const GetByIdCollection = async (id) => {
    try {
      setMyCollectionById({ ...myCollectionById, data: { }, loading: true});
      const uri = await nftContract.methods.tokenURI(id).call();
      const owner = await nftContract.methods.ownerOf(id).call();
      const responseUri = await fetch(ipfsUriToHttps(uri));
      const objNFT = await responseUri.json();
      setMyCollectionById({ ...myCollectionById, data: {...objNFT, owner: owner}, loading: false});
    } catch (error) {
      console.log(error);
      throw new Error("Get By Id Collection Error");
    }
  };
  
  const GetCollection = async () => {
    try {
      setMyCollection({ ...myCollection, loading: true});
      const walletOfOwner = await nftContract.methods.walletOfOwner(account).call();
      let objNFTs = [];
      for (var i = 0; i < walletOfOwner.length; i++) {
        const uri = await nftContract.methods.tokenURI(walletOfOwner[i]).call();
        const responseUri = await fetch(ipfsUriToHttps(uri));
        let objNFT = await responseUri.json();

        objNFTs = [...objNFTs, {
          ...objNFT, jsonUri: uri
        }];
      }
      setMyCollection({ ...myCollection, list: objNFTs, loading: false});
    } catch (error) {
      console.log(error);
      throw new Error("Get Collection Error");
    }
  };
  
  const createNftContract = async() => {
    const web3 = new Web3(Web3.givenProvider || detectCurrentProvider());
    const contract = new web3.eth.Contract(nftContractABI, nftContractAddress);
    const owner = await contract.methods.owner().call();
    setOwner(owner);
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
        ChangeChain,
        GetByIdCollection,
        GetCollection,
        ConnectedWallet,
        CreateSellCollection,
        CancelSellCollection,
        chain,
        myCollection,
        myCollectionById,
        owner,
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
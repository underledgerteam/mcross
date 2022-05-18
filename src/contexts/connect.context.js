import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { ipfsUriToHttps } from "../utils/ipfsUriToHttps.util";
import { useNotification } from "web3uikit";
import { nftContracts } from "../utils/constants";

export const Web3Provider = React.createContext();

export const WalletProvider = ({ children }) => {
  const dispatch = useNotification();

  const initChainList = {
    3: "Ethereum",
    80001: "Polygon",
    43113: "Avalanche"
  }
  const initCurrencyList = {
    3: "ETH",
    80001: "WETH",
    43113: "AVAX"
  }

  const [account, setAccount] = useState("");
  const [owner, setOwner] = useState("");
  const [balance, setBalance] = useState(0);
  const [myCollection, setMyCollection] = useState({list: [], loading: false});
  const [myCollectionById, setMyCollectionById] = useState({data: [], loading: false});
  const [nftContract, setNftContract] = useState();
  const [mintProcessing, setMintProcessing] = useState(false);
  const [nftConverse, setNftConverse] = useState({data: [], loading: false});
  const [chain, setChain] = useState(3);
  const [isReload, setIsReload] = useState(false);
  /* onEventListenReload use swap true/false isReload in function eventListener
  on function eventListener cant get state current of isReload */
  let onEventListenReload = false;

  const handleNewNotification = ({type, icon, title, message, position}) => {
    dispatch({
      type,
      title: title || 'New Notification',
      message: message|| 'test message',
      icon,
      position: position || 'topR',
    });
  };
  const onSetIsReload = (isReload) => {
    setIsReload(!isReload);
    onEventListenReload = !isReload;
  };
  
  const getNetworkId = async () => {
    const web3 = new Web3(window.ethereum);
    const currentChainId = await web3.eth.net.getId();
    return currentChainId;
  };

  const eventListener = (web3, currentProvider) => {
    currentProvider.on('accountsChanged', (accounts) => {
      if(!accounts){
        setAccount(accounts[0]);
      }else{
        setAccount("");
      }
    });
    currentProvider.on('chainChanged', (chainId) => {
      setChain(web3.utils.hexToNumber(chainId));
      onSetIsReload(onEventListenReload);
    });
    currentProvider.on('message', (message)=>{
      console.log("message=>", message);
    });
  };

  const ChangeChain = async(chainId) => {
    const web3 = new Web3(window.ethereum);
    const currentChainId = await getNetworkId();
    
    if (currentChainId !== chainId) {
      try {
        setChain(chainId);
        await web3.currentProvider.request({
          method: 'wallet_switchEthereumChain', 
          params: [{ chainId: Web3.utils.toHex(chainId) }],
        });
        onSetIsReload(isReload);
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        setChain(currentChainId);
        if (switchError.code === 4902) {
          alert('add this chain id')
        }
      }
    }
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
      eventListener(web3, currentProvider);
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
        eventListener(web3, currentProvider);
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
      setMyCollectionById({ data: {}, loading: false});
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
      setMyCollection({ list: [], loading: false});
      // throw new Error("Get Collection Error");
    }
  };
  
  const ConverseNFT = async (objConverse, handleSuccess = ()=>{}, handleError = ()=>{}) => {
    try {
      setNftConverse({...nftConverse, loading: true});
      setTimeout(() => {
        setNftConverse({...nftConverse, loading: false});
        handleNewNotification({
          type: "success",
          title: 'Success',
          message: `You Success Transfer NFT From ${objConverse?.from} To ${objConverse?.to}`,
        });
        handleSuccess();
      }, 3000);
    } catch (error) {
      console.log(error);
      setNftConverse({...nftConverse, loading: false});
      handleError();
      handleNewNotification({
        type: "error",
        title: 'Rejected',
        message: `MetaMask Signature. User denied transaction signature`,
      });
      throw new Error("Object");
    }
  };

  const createNftContract = async() => {
    const web3 = new Web3(Web3.givenProvider || detectCurrentProvider());
    const currentChainId = await getNetworkId();
    const contract = new web3.eth.Contract(nftContracts[currentChainId]?.ABI, nftContracts[currentChainId]?.Address || {});
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
    async function initFunction() {
      setChain(await getNetworkId());
      checkWalletIsConnect();
      createNftContract();
      console.log("run initFunction");
    }
    initFunction();
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
        ConverseNFT,
        initChainList,
        isReload,
        chain,
        nftConverse,
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
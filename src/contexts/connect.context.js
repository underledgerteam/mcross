import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { ipfsUriToHttps } from "../utils/ipfsUriToHttps.util";
import { useNotification } from "web3uikit";
import {
  ropstenChain,
  avalanchFujiChain,
  polygonMumbiChain,
  nftContractABI,
  nftContractAddress,
  nftCrossContractABI,
  nftContractAvalanhceAddress,
  nftContractMumbaiAddress,
} from "../utils/constants";

export const Web3Provider = React.createContext();

export const WalletProvider = ({ children }) => {
  const dispatch = useNotification();

  const [account, setAccount] = useState("");
  const [owner, setOwner] = useState("");
  const [balance, setBalance] = useState(0);
  const [myCollection, setMyCollection] = useState({ list: [], loading: false });
  const [myCollectionById, setMyCollectionById] = useState({ data: [], loading: false });
  const [nftContract, setNftContract] = useState();
  const [mintProcessing, setMintProcessing] = useState(false);
  // const [mintResult, setMintResult] = useState({ data: [], loading: false });
  const [mintCost, setMintCost] = useState({ token: '', valueEth: '', value: '', feeEth: '', fee: '' });
  const [chain, setChain] = useState("ethereum");

  const handleNewNotification = ({ type, icon, title, message, position }) => {
    dispatch({
      type,
      title: title || 'New Notification',
      message: message || 'test message',
      icon,
      position: position || 'topR',
    });
  };
  const ChangeChain = (chain) => {
    setChain(chain);
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

  const CreateSellCollection = async (objNFT, handleSuccess = () => { }, handleError = () => { }) => {
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

  const CancelSellCollection = async (objNFT, handleSuccess = () => { }, handleError = () => { }) => {
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
      setMyCollectionById({ ...myCollectionById, data: {}, loading: true });
      const uri = await nftContract.methods.tokenURI(id).call();
      const owner = await nftContract.methods.ownerOf(id).call();
      const responseUri = await fetch(ipfsUriToHttps(uri));
      const objNFT = await responseUri.json();
      setMyCollectionById({ ...myCollectionById, data: { ...objNFT, owner: owner }, loading: false });
    } catch (error) {
      console.log(error);
      throw new Error("Get By Id Collection Error");
    }
  };

  const GetCollection = async () => {
    try {
      setMyCollection({ ...myCollection, loading: true });
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
      setMyCollection({ ...myCollection, list: objNFTs, loading: false });
    } catch (error) {
      console.log(error);
      throw new Error("Get Collection Error");
    }
  };

  const createNftContract = async () => {
    // init provider 
    const web3 = new Web3(Web3.givenProvider || detectCurrentProvider());
    // check current network
    const chainId = await web3.eth.net.getId();
    console.log('chainId', chainId);
    let contract, owner, token, extraFee;
    const coreContract = new web3.eth.Contract(nftContractABI, nftContractAddress);
    const mintCost = await coreContract.methods.cost().call();
    console.log(mintCost);
    switch (chainId) {
      case ropstenChain:
        contract = new web3.eth.Contract(nftContractABI, nftContractAddress);
        owner = await contract.methods.owner().call();
        extraFee = '0';
        token = 'ETH';
        break;
      case avalanchFujiChain:
        console.log('avalanchFujiChain');
        contract = new web3.eth.Contract(nftCrossContractABI, nftContractAvalanhceAddress);
        // owner = await contract.methods.owner().call();
        extraFee = await contract.methods.costNFT().call();
        console.log(extraFee);
        token = 'WETH';
        break;
      case polygonMumbiChain:
        console.log('polygonMumbiChain');
        contract = new web3.eth.Contract(nftCrossContractABI, nftContractMumbaiAddress);
        // owner = await contract.methods.owner().call();
        extraFee = await contract.methods.costNFT().call();
        console.log(extraFee);

        token = 'WETH';
        break;
      default:
        console.log('not supported chain');
        break;
    }
    setNftContract(contract);
    setOwner(owner);
    setMintCost({
      token,
      valueEth: web3.utils.fromWei(mintCost, 'ether'),
      value: mintCost,
      feeEth: web3.utils.fromWei(extraFee, 'ether'),
      fee: extraFee
    });
  };

  const getAllTransaction = async () => {
    // contract.getPastEvents('Transfer', {
    //   // filter: { myIndexedParam: [20, 23], myOtherIndexedParam: '0x123456789...' }, // Using an array means OR: e.g. 20 or 23
    //   fromBlock: 0,
    //   toBlock: 'latest'
    // }, function (error, events) { console.log(events); })
    //   .then(function (events) {
    //     console.log(events); // same results as the optional callback above
    //   });
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
      const valueHex = Web3.utils.numberToHex(mintCost.value * mintAmount);
      const tx = {
        from: account,
        gas: (285000 * mintAmount).toString(),
        value: valueHex,
      };
      await nftContract.methods.mint(mintAmount).send(tx);
      const newNft = await getNewMintNft(mintAmount);
      handleNewNotification({ type: 'success' });
      return { success: true, newNft };
    } catch (error) {
      console.log({ error });
      // manage show error on notification
      handleNewNotification({ type: 'error' });
      return { success: false, error };
    } finally {
      setMintProcessing(false);
    }
  };

  const getNewMintNft = async (mintAmount) => {
    try {
      // get all of my nft
      const walletOfOwner = await nftContract.methods.walletOfOwner(account).call();
      // get latest uri by mint amount
      const newNft = walletOfOwner.slice(-mintAmount);
      // transform data
      let nftArr = [];
      for (let tokenIndex of newNft) {
        const uri = await nftContract.methods.tokenURI(tokenIndex).call();
        const responseUri = await fetch(ipfsUriToHttps(uri));
        let nft = await responseUri.json();
        nftArr = [
          ...nftArr,
          {
            ...nft,
            image: ipfsUriToHttps(nft.image),
            jsonUri: uri
          }
        ];
      }
      return nftArr;
    } catch (error) {
      console.log('error getNewMintNft', error);
    }
  };

  useEffect(() => {
    checkWalletIsConnect();
    createNftContract();
    // getTransaction();
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
        mintProcessing,
        mintCost
      }}
    >
      {children}
    </Web3Provider.Provider>
  );



};
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { ipfsUriToHttps } from "../utils/ipfsUriToHttps.util";
import { useNotification } from "web3uikit";
import {
  ROPSTEN_CHAIN,
  AVALANCHE_FUJI_CHAIN,
  POLYGON_MUMBAI_CHAIN,
  NFT_CONTRACTS,
  NFT_CONTRACT_ABI,
  WETH_CONTRACT_ABI,
  NFT_ROPSTEN_ADDRESS,
  WETH_CONTRACT_ADDRESS,
  NFT_CROSS_CONTRACT_ABI,
  NFT_AVALANHCE_FUJI_ADDRESS,
} from "../utils/constants";

export const Web3Provider = React.createContext();


const initiSelectNFT = {
  selected: false,
  approve: false,
  approveLoading: false,
  image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAANlBMVEX///+/v7+8vLzKysr8/Pzg4ODFxcXb29vT09Pj4+P4+PjBwcH6+vry8vLY2NjIyMjs7Ozo6Oia8u11AAAEdUlEQVR4nO2d65bqIAxGp/Smrb34/i971KqlEC7FGuJZ3/7dKewJBgK4/PsDAAAAAAAAAAAAAAAA4KUam5+i3m94UsUPoVoYwlA6MIShfGAIQ/nAEIbyOcBQSeNww9NZGOXBhuq8+w1fxugfDG1gmB0YBoFhdmAYBIbZgWEQGGYHhkFgmB0YBoFhdmAYBIbZyWB4qVI6mgyv4WUeH7u007lL7vFeWA3n8rUFrZqWK5KchnWvPapOTGFkNDQPOJrhk45Hw2d4Ns+oVPlRz2NhMxyawkTtv2OWAJvhSBwzfjBO2+g/5TLs7BDeSF4eDP0Y+yiX4UydFKtT4pRxa3SKTcVchtQgLYrobhq0Kj7+XIb0aX+fZtipHfH/ScPlZZG5Jq9hk2RYP96lTnFPcxnWpGF52d2eNrPGPc5lOJC5NDrl65Sv1fs16nEuw8v20sdCP+9uTh8NZVSuYVvTnKlBmjAdaqu/uH8Qm2FVWuNUJYSwOu3tLV9tcelNw5SF9yZjRaVixvpwbrZRTKnyuyKysRXOGn/QBqpK25QzptVm9598eyfqXDaPnah+GlNmwr/aGOcqYl3DvJtYzXU7jvU1bbVmVdExE+pP7Qjb6TiiOBFmOPuyD7XyC+djWYadGt2KxE5PzMpWluHtXc6KQZ/rNYK5RpThfWXnrGzp6iRcQ0ky7KbHK+iBup3rtQZD6wZJhq+9HDIsri89BBsUZPguIal0Y871K6ECRY6hXkFaimQeXQjVUHIMNwWkuVax5/q1xcC6Rozh0G+7vYmidaqzCaJ/whBjaEZJr608Y7QIHvBIMbR3/dfB55jr3/hrKCGGxMHN+vmi53rtSW+uEWLYUj1/dsY1169tetc1MgwHaw9HU3TN9Svec0huw4os6CZHcO7dcc/163O+XMNteC0JRfdk0Aby6BNfDcW9i1EquzedI4R36vAYLfy5htnwtnBRvaHo/SZxjN8Nz7UO5ltf97WnMgbqHCfhRbmHKa/hdXl2qxjzQQsaunMNr+FzUlD62W8bORD9TM4gshpe3xVg+Z7BonJlmN55mMhpWGkV4GughtacsbgvLnAa6hXga6B666I9OGsoRsPtMbCa7l2q6OVaAs6uMxpejXDdd+SPSTMP+vyGdri6+bAQui8u8BmaIbwxUdcXkg0dNRTjOf6BNiSOGirrXYxjcXQ+632ag6EPE7kMiU/h4dA1FJfhgUnTzZTRkCOEt8apYcpj+P1E6u4+j+H3E+kCdUmKxZAjkS4QrbMY8nwKC7qGYjFkSaQL9rqGw5AthORhIoMhUyJ9ksPwsDI+Brv97xtWY8mJNUwZYtixYu0qyjhd+yYwDALD7MAwCAyzA8MgMMwODIPAMDtHGxZ1JYvjDRvWajCC7SYRfhsBhvKBIQzlA0MYygeGMJQPDGEoHxjCUD4whKF8YAhD+cAQhvKBIQzlA0MYygeGMJQPDGEoHxjCUD4whKF8YAhD+cAQhvJJM/wpEgyv9U+R8iNaAAAAAAAAAAAAAAAAAP4r/gEYCYE2Xwz6DQAAAABJRU5ErkJggg=="
};

export const WalletProvider = ({ children }) => {
  const dispatch = useNotification();

  const [account, setAccount] = useState("");
  const [owner, setOwner] = useState("");
  const [balance, setBalance] = useState(0);
  const [myMarketplace, setMyMarketplace] = useState({
    list: [],
    loading: false,
  });
  const [myCollection, setMyCollection] = useState({
    list: [],
    loading: false,
  });
  const [myCollectionById, setMyCollectionById] = useState({
    data: [],
    loading: false,
  });
  const [listMarketplace, setListMarketplace] = useState({
    list: [],
    loading: false,
  });


  const [selectConverseNFT, setSelectConverseNFT] = useState(initiSelectNFT);
  const [nftContract, setNftContract] = useState();
  const [nftContractCollection, setNftContractCollection] = useState();
  const [nftContractConverse, setNftContractConverse] = useState();
  const [nftContractMarketplace, setNftContractMarketplace] = useState();
  const [nftContractMarketplaceList, setNftContractMarketplaceList] = useState();
  const [mintProcessing, setMintProcessing] = useState(false);
  const [nftConverse, setNftConverse] = useState({ data: [], loading: false });
  const [chain, setChain] = useState(3);
  const [isReload, setIsReload] = useState(false);
  /* onEventListenReload use swap true/false isReload in function eventListener
  on function eventListener cant get state current of isReload */
  let onEventListenReload = false;
  // const [mintResult, setMintResult] = useState({ data: [], loading: false });
  const [mintCost, setMintCost] = useState({
    token: "",
    valueEth: "",
    value: "",
    feeEth: "",
    fee: "",
  });
  const [cost, setCost] = useState({
    mintCost: "",
    feeCost: ""
  });
  const [wethContract, setWethContract] = useState();
  const [coreContract, setCoreContract] = useState();

  const handleNewNotification = ({ type, icon, title, message, position }) => {
    dispatch({
      type,
      title: title || "New Notification",
      message: message || "test message",
      icon,
      position: position || "topR",
    });
  };
  const onSetIsReload = (isReload) => {
    onEventListenReload = !isReload;
    setIsReload(onEventListenReload);
  };

  const getNetworkId = async () => {
    const web3 = new Web3(window.ethereum);
    const currentChainId = await web3.eth.net.getId();
    return currentChainId;
  };

  const eventListener = (web3, currentProvider) => {
    currentProvider.on('accountsChanged', (accounts) => {
      if (accounts) {
        setAccount(accounts[0]);
        onSetIsReload(onEventListenReload);
      } else {
        setAccount("");
      }
    });
    currentProvider.on('chainChanged', (chainId) => {
      setChain(web3.utils.hexToNumber(chainId));
      createNftContract();
      onSetIsReload(onEventListenReload);
    });
    currentProvider.on('message', (message) => {
      console.log("message=>", message);
    });
  };

  const getPriceCryptoCurrency = async () => {
    return 0.0005;
    let res = await fetch('http://rest.coinapi.io/v1/exchangerate/usd?apikey=AB5A6633-A858-4156-AE68-9F4AE466B308&filter_asset_id=ETH,AVAX,MATIC');
    res = await res.json();
    let getPrice = 0;
    for (let i = 0; i < res.rates.length; i++) {
      if (res.rates[i].asset_id_quote === NFT_CONTRACTS[chain].Token) {
        getPrice = res.rates[i].rate;
        return getPrice;
      }
    }
  };

  const ChangeChain = async (chainId) => {
    const web3 = new Web3(window.ethereum);
    const currentChainId = await getNetworkId();

    if (currentChainId !== chainId) {
      try {
        setChain(chainId);
        await web3.currentProvider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: Web3.utils.toHex(chainId) }],
        });
        createNftContract();
        onSetIsReload(isReload);
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        setChain(currentChainId);
        if (switchError.code === 4902) {
          try {
            await web3.currentProvider.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: NFT_CONTRACTS[chainId].chainId,
                  chainName: NFT_CONTRACTS[chainId].Label,
                  nativeCurrency: {
                    name: NFT_CONTRACTS[chainId].nativeCurrency.name,
                    symbol: NFT_CONTRACTS[chainId].nativeCurrency.symbol,
                    decimals: NFT_CONTRACTS[chainId].nativeCurrency.decimals,
                  },
                  rpcUrls: NFT_CONTRACTS[chainId].rpcUrls,
                  blockExplorerUrls: NFT_CONTRACTS[chainId].blockExplorerUrls,
                },
              ],
            });
          } catch (addError) {
            alert(addError.message);
          }
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

      await currentProvider.request({ method: "eth_requestAccounts" });

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
        await currentProvider.request({ method: "eth_accounts" });

        const web3 = new Web3(currentProvider);
        const userAccount = await web3.eth.getAccounts();
        const ethBalance = await web3.eth.getBalance(userAccount[0]);
        eventListener(web3, currentProvider);

        setChain(await web3.eth.getChainId());
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

  const CreateSellCollection = async (
    objNFT,
    nftPrice,
    handleSuccess = () => { },
    handleError = () => { }
  ) => {
    try {
      setSelectConverseNFT({ ...selectConverseNFT, approveLoading: true });
      const web3 = new Web3(window.ethereum);
      const toWei = web3.utils.toWei(nftPrice.toString(), "ether");
      await nftContractMarketplace.methods.listItems(objNFT.edition, toWei).send({ from: account });
      handleNewNotification({
        type: "success",
        title: "Success",
        message: `You Success Sell NFT ${objNFT?.name} with ${nftPrice} WETH`,
      });
      setSelectConverseNFT({ ...selectConverseNFT, approveLoading: false });
      onSetIsReload(isReload);
      handleSuccess();
    } catch (error) {
      console.log(error);
      handleError();
      setSelectConverseNFT({ ...selectConverseNFT, approveLoading: false });
      handleNewNotification({
        type: "error",
        title: "Rejected",
        message: `MetaMask Signature. User denied transaction signature`,
      });
      throw new Error("Object");
    }
  };

  const CancelSellCollection = async (
    objNFT,
    handleSuccess = () => { },
    handleError = () => { }
  ) => {
    try {
      setSelectConverseNFT({ ...selectConverseNFT, approveLoading: true });
      await nftContractMarketplace.methods.cancelListItem(objNFT.edition).send({ from: account });
      handleNewNotification({
        type: "success",
        title: "Success",
        message: `You Cancel Sell NFT ${objNFT?.name}`,
      });
      setSelectConverseNFT({ ...selectConverseNFT, approveLoading: false });
      onSetIsReload(isReload);
      handleSuccess();
    } catch (error) {
      console.log(error);
      handleError();
      setSelectConverseNFT({ ...selectConverseNFT, approveLoading: false });
      handleNewNotification({
        type: "error",
        title: "Rejected",
        message: `MetaMask Signature. User denied transaction signature`,
      });
      throw new Error("Object");
    }
  };

  const getMarketplaceList = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      setListMarketplace({ ...listMarketplace, loading: true });
      const getMyMarketplace = await nftContractMarketplaceList.methods.getAllMarketItems().call();
      const newObjGetMyMarketplace = getMyMarketplace.filter((x) => x.status === "0");
      let objMarkets = [];
      for (var i = 0; i < newObjGetMyMarketplace.length; i++) {

        const uri = await nftContractCollection.methods.tokenURI(newObjGetMyMarketplace[i].tokenId).call();

        const responseUri = await fetch(ipfsUriToHttps(uri));

        let objNFT = await responseUri.json();
        objMarkets = [
          ...objMarkets,
          {
            ...objNFT,
            price: web3.utils.fromWei(newObjGetMyMarketplace[i].price, "ether"),
            owner: newObjGetMyMarketplace[i].owner,
            nftContract: newObjGetMyMarketplace[i].nftContract,
            status: newObjGetMyMarketplace[i].status,
            jsonUri: uri,
          },
        ];
      }
      setListMarketplace({ ...listMarketplace, list: objMarkets, loading: false });

    } catch (error) {
      console.log(error);
      setListMarketplace({ list: [], loading: false });
    }


  };

  const GetMyMarketplace = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      setMyMarketplace({ ...myMarketplace, loading: true });
      // const getAllMarketItems = await nftContractMarketplace.methods.getAllMarketItems().call();
      const getMyMarketplace = await nftContractMarketplace.methods.getMyMarketplace(account).call();
      const newObjMarketplace = getMyMarketplace.filter((x) => x.tokenId !== "0");
      let objMarkets = [];
      for (var i = 0; i < newObjMarketplace.length; i++) {
        const uri = await nftContractCollection.methods.tokenURI(newObjMarketplace[i].tokenId).call();
        const responseUri = await fetch(ipfsUriToHttps(uri));
        let objNFT = await responseUri.json();
        objMarkets = [
          ...objMarkets,
          {
            ...objNFT,
            price: web3.utils.fromWei(newObjMarketplace[i].price, "ether"),
            owner: newObjMarketplace[i].owner,
            nftContract: newObjMarketplace[i].nftContract,
            status: newObjMarketplace[i].status,
            jsonUri: uri,
          },
        ];
      }
      setMyMarketplace({ ...myMarketplace, list: objMarkets, loading: false });
    } catch (error) {
      console.log(error);
      setMyMarketplace({ list: [], loading: false });
      // throw new Error("Get My Marketplace Error");
    }
  };

  const GetByIdCollection = async (id) => {
    try {
      setMyCollectionById({ ...myCollectionById, data: {}, loading: true });
      const uri = await nftContractCollection.methods.tokenURI(id).call();
      const owner = await nftContractCollection.methods.ownerOf(id).call();
      const responseUri = await fetch(ipfsUriToHttps(uri));
      const objNFT = await responseUri.json();
      setMyCollectionById({
        ...myCollectionById,
        data: { ...objNFT, owner: owner },
        loading: false,
      });
    } catch (error) {
      console.log(error);
      setMyCollectionById({ data: {}, loading: false });
      throw new Error("Get By Id Collection Error");
    }
  };

  const GetCollection = async () => {
    try {
      setMyCollection({ ...myCollection, loading: true });
      const walletOfOwner = await nftContractCollection.methods.walletOfOwner(account).call();
      let objNFTs = [];
      for (var i = 0; i < walletOfOwner.length; i++) {
        const uri = await nftContractCollection.methods.tokenURI(walletOfOwner[i]).call();
        const responseUri = await fetch(ipfsUriToHttps(uri));
        let objNFT = await responseUri.json();
        objNFTs = [
          ...objNFTs,
          {
            ...objNFT,
            jsonUri: uri,
          },
        ];
      }
      setMyCollection({ ...myCollection, list: objNFTs, loading: false });
    } catch (error) {
      console.log(error);
      setMyCollection({ list: [], loading: false });
      // throw new Error("Get Collection Error");
    }
  };

  const checkApproved = async (type, nftId) => {
    const isApprove = await nftContractCollection.methods.getApproved(nftId).call();
    let isApproveAssress;
    if (type === "Converse") {
      isApproveAssress = NFT_CONTRACTS[chain].AddressConverse;
    }
    if (type === "Marketplace") {
      isApproveAssress = NFT_CONTRACTS[chain].AddressMarketplace;
    }
    return (isApprove === isApproveAssress) ? true : false;
  };

  const ChangeConverseNFT = async (type, objNFT) => {
    setSelectConverseNFT(initiSelectNFT);
    if (objNFT) {
      objNFT = {
        ...objNFT,
        approve: true,
        approveLoading: false,
        selected: true,
        fee: await getPriceCryptoCurrency()
      };
      if (!NFT_CONTRACTS[chain].CrossChain) {
        objNFT = {
          ...objNFT,
          approve: await checkApproved(type, objNFT.edition),
        };
      }
      setSelectConverseNFT(objNFT);
    }
  };

  const ConverseApproveNFT = async (type, objNFT, handleSuccess = () => { }, handleError = () => { }) => {
    try {
      setSelectConverseNFT({ ...selectConverseNFT, approveLoading: true });
      let approveAssress;
      if (type === "Converse") {
        approveAssress = NFT_CONTRACTS[chain].AddressConverse;
      }
      if (type === "Marketplace") {
        approveAssress = NFT_CONTRACTS[chain].AddressMarketplace;
      }
      await nftContractCollection.methods.approve(approveAssress, objNFT.edition).send({ from: account });
      setSelectConverseNFT({ ...selectConverseNFT, approve: true, approveLoading: false });
      handleNewNotification({
        type: "success",
        title: 'Success',
        message: `You Success Approve NFT`,
      });
      handleSuccess();
    } catch (error) {
      console.log(error);
      setSelectConverseNFT({ ...selectConverseNFT, approveLoading: false });
      handleError();
      handleNewNotification({
        type: "error",
        title: 'Rejected',
        message: `MetaMask Signature. User denied transaction signature`,
      });
      throw new Error("Object");
    }
  };

  const ConverseNFT = async (objConverse, handleSuccess = () => { }, handleError = () => { }) => {
    try {
      const web3 = new Web3(window.ethereum);
      setNftConverse({ ...nftConverse, loading: true });
      let arr = [objConverse.edition, NFT_CONTRACTS[objConverse.to].Icon, account];
      if (!NFT_CONTRACTS[chain].CrossChain) {
        arr = [NFT_ROPSTEN_ADDRESS, ...arr];
      }
      let fee = objConverse.fee;
      fee = web3.utils.toWei(fee.toString(), "ether");
      arr = [...arr, fee];
      let fixGas = "10000000000000000";
      if (NFT_CONTRACTS[chain].CrossChain) {
        fixGas = "2000000000000000";
      }
      await nftContractConverse.methods.sendNFT(...arr).send({ from: account, value: fixGas });
      setNftConverse({ ...nftConverse, loading: false });
      handleNewNotification({
        type: "success",
        title: 'Success',
        message: `You Success Transfer NFT From ${NFT_CONTRACTS[chain].Label} To ${NFT_CONTRACTS[objConverse.to].Label}`,
      });
      setSelectConverseNFT(initiSelectNFT);
      onSetIsReload(isReload);
      handleSuccess();
    } catch (error) {
      console.log(error);
      setNftConverse({ ...nftConverse, loading: false });
      handleError();
      handleNewNotification({
        type: "error",
        title: 'Rejected',
        message: `MetaMask Signature. User denied transaction signature`,
      });
      throw new Error("Object");
    }
  };

  const createNftContract = async () => {
    // init ropsten provider for get data
    const ropstenProvider = new Web3(new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws/v3/1e94515fc5874c4291a6491caeaff8f1'));
    const coreContract = new ropstenProvider.eth.Contract(NFT_CONTRACT_ABI, NFT_ROPSTEN_ADDRESS);
    const mintCost = await coreContract.methods.cost().call();

    const avalancheProvider = new Web3(new Web3.providers.HttpProvider('https://api.avax-test.network/ext/bc/C/rpc'));
    const crossContract = new avalancheProvider.eth.Contract(NFT_CROSS_CONTRACT_ABI, NFT_AVALANHCE_FUJI_ADDRESS);
    const feeCost = await crossContract.methods.costNFT().call();

    const owner = await coreContract.methods.owner().call();
    // init current provider
    const web3 = new Web3(Web3.givenProvider || detectCurrentProvider());

    // get contract by network id
    const chain = await getNetworkId();
    const nftContract = new web3.eth.Contract(NFT_CONTRACTS[chain].ABI, NFT_CONTRACTS[chain].Address);
    let contractCollection, contractMarketplaceList;
    const contractConverse = new web3.eth.Contract(NFT_CONTRACTS[chain].ABIConverse, NFT_CONTRACTS[chain].AddressConverse);
    const contractMarketplace = new web3.eth.Contract(NFT_CONTRACTS[chain].ABIMarketplace, NFT_CONTRACTS[chain].AddressMarketplace);
    let cost;
    switch (chain) {
      case ROPSTEN_CHAIN:
        cost = await nftContract.methods.cost().call();
        contractCollection = new web3.eth.Contract(NFT_CONTRACTS[chain].ABI, NFT_CONTRACTS[chain].Address);
        contractMarketplaceList = new web3.eth.Contract(NFT_CONTRACTS[chain].ABIMarketplace, NFT_CONTRACTS[chain].AddressMarketplace);
        break;
      case AVALANCHE_FUJI_CHAIN:
        cost = await nftContract.methods.costNFT().call();
        contractCollection = new web3.eth.Contract(NFT_CONTRACTS[chain].ABIConverse, NFT_CONTRACTS[chain].AddressConverse);
        break;
      case POLYGON_MUMBAI_CHAIN:
        cost = await nftContract.methods.costNFT().call();
        contractCollection = new web3.eth.Contract(NFT_CONTRACTS[chain].ABIConverse, NFT_CONTRACTS[chain].AddressConverse);
        break;
      default:
        console.log("not supported chain");
        handleNewNotification({ type: "error", message: "Not supported chain" });
        break;
    }
    setCoreContract(coreContract); // ropsten chain
    setNftContract(nftContract);
    setWethContract(new web3.eth.Contract(WETH_CONTRACT_ABI, WETH_CONTRACT_ADDRESS[chain]));
    setNftContractMarketplace(contractMarketplace);
    setNftContractConverse(contractConverse);
    setNftContractCollection(contractCollection);
    setNftContractMarketplaceList(contractMarketplaceList);
    setOwner(owner);
    setMintCost({
      token: NFT_CONTRACTS[chain].MintCost,
      valueEth: web3.utils.fromWei(cost, "ether"),
      value: Number(cost)
    });
    setCost({
      mintCost: web3.utils.fromWei(mintCost, "ether"),
      feeCost: Web3.utils.fromWei(Web3.utils.toBN(feeCost).sub(Web3.utils.toBN(mintCost)), "ether")
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

  const mintNft = async (mintAmount = 0) => {
    try {
      setMintProcessing(true);
      // case cross chain mint
      if (chain === AVALANCHE_FUJI_CHAIN || chain === POLYGON_MUMBAI_CHAIN) {
        // call approve WETH abi
        const allowance = await wethContract.methods.allowance(account, NFT_CONTRACTS[chain].Address).call();
        if (allowance <= 0) {
          // if no rules then user can mint all nft
          const maxSupply = await coreContract.methods.maxSupply().call();
          await wethContract.methods.approve(
            NFT_CONTRACTS[chain].Address,
            Web3.utils.numberToHex(mintCost.value * maxSupply)
          ).send({ from: account });
        }
      }
      // calculate mint cost
      const tx = {
        from: account,
        gas: (285000 * mintAmount).toString(),
        value: Web3.utils.numberToHex(mintCost.value * mintAmount),
      };
      await nftContract.methods.mint(mintAmount).send(tx);
      handleNewNotification({ type: "success", title: "Mint success", message: "Please wait a few minutes for minting precess." });
      return { success: true };
    } catch (error) {
      console.log({ error });
      handleNewNotification({ type: "error", title: "Mint fail", message: error.message });
      return { success: false };
    } finally {
      setMintProcessing(false);
    }
  };

  const getNewMintNft = async (mintAmount) => {
    try {
      // get all of my nft
      const walletOfOwner = await coreContract.methods.walletOfOwner(account).call();
      // get latest uri by mint amount
      const newNft = walletOfOwner.slice(-mintAmount);
      // transform data
      let nftArr = [];
      for (let tokenIndex of newNft) {
        const uri = await coreContract.methods.tokenURI(tokenIndex).call();
        const responseUri = await fetch(ipfsUriToHttps(uri));
        let nft = await responseUri.json();
        nftArr = [
          ...nftArr,
          {
            ...nft,
            image: ipfsUriToHttps(nft.image),
            jsonUri: uri,
          },
        ];
      }
      return nftArr;
    } catch (error) {
      console.log("error getNewMintNft", error);
    }
  };

  const calculateMintCost = (mintCost, mintAmount) => {
    return Web3.utils.fromWei(Web3.utils.toBN(mintCost).mul(Web3.utils.toBN(mintAmount)), "ether");
  };

  useEffect(() => {
    // async function initFunction() {
    checkWalletIsConnect();
    createNftContract();
    // }
    // initFunction();
    // getTransaction();
  }, []);

  return (
    <Web3Provider.Provider
      value={{
        ChangeChain,
        GetMyMarketplace,
        getMarketplaceList,
        GetByIdCollection,
        GetCollection,
        ConnectedWallet,
        CreateSellCollection,
        CancelSellCollection,
        ConverseApproveNFT,
        ChangeConverseNFT,
        ConverseNFT,
        isReload,
        nftContractCollection,
        nftContractMarketplace,
        nftContractMarketplaceList,
        chain,
        nftConverse,
        selectConverseNFT,
        myMarketplace,
        listMarketplace,
        myCollection,
        myCollectionById,
        owner,
        balance,
        account,
        mintNft,
        mintProcessing,
        mintCost,
        calculateMintCost,
        cost
      }}
    >
      {children}
    </Web3Provider.Provider>
  );
};

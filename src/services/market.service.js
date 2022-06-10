import Web3 from "web3";
import { ipfsUriToHttps } from "../utils/ipfsUriToHttps.util";
import {
  NFT_CONTRACTS,
  ROPSTEN_CHAIN,
  AVALANCHE_FUJI_CHAIN,
  POLYGON_MUMBAI_CHAIN,
  NFT_CONTRACT_MARKETPLACE_ABI,
  NFT_ROPSTEN_MARKETPLACE_ADDRESS,
  NFT_AVALANHCE_MARKETPLACE_ADDRESS,
  NFT_POLYGON_MARKETPLACE_ADDRESS,
  NFT_ROPSTEN_ADDRESS,
  NFT_AVALANHCE_CONVERSE_ADDRESS,
  NFT_POLYGON_CONVERSE_ADDRESS
} from "../utils/constants";

// test performance
export const getAllSaleNFT = async () => {
  // setListMarketplace({ list: [], loading: true });

  const ropstenProvider = new Web3(new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws/v3/1e94515fc5874c4291a6491caeaff8f1'));
  const ropstenContract = new ropstenProvider.eth.Contract(NFT_CONTRACT_MARKETPLACE_ABI, NFT_ROPSTEN_MARKETPLACE_ADDRESS);
  const ropstenSaleNft = await ropstenContract.methods.getAllMarketItems().call();

  const avalancheProvider = new Web3(new Web3.providers.HttpProvider('https://api.avax-test.network/ext/bc/C/rpc'));
  const avaxContract = new avalancheProvider.eth.Contract(NFT_CONTRACT_MARKETPLACE_ABI, NFT_AVALANHCE_MARKETPLACE_ADDRESS);
  const avaxSaleNft = await avaxContract.methods.getAllMarketItems().call();

  // https://matic-mumbai.chainstacklabs.com
  // https://api-testnet.polygonscan.com/
  const polygonProvider = new Web3(new Web3.providers.HttpProvider('https://matic-mumbai.chainstacklabs.com'));
  const polygonContract = new polygonProvider.eth.Contract(NFT_CONTRACT_MARKETPLACE_ABI, NFT_POLYGON_MARKETPLACE_ADDRESS);
  const polygonSaleNft = await polygonContract.methods.getAllMarketItems().call();

  const allSaleNft = [...ropstenSaleNft, ...avaxSaleNft, ...polygonSaleNft];
  console.log(allSaleNft);
  return allSaleNft;

  // prepare collection contract
  const ropstenCollection = new ropstenProvider.eth.Contract(NFT_CONTRACTS[ROPSTEN_CHAIN].ABI, NFT_CONTRACTS[ROPSTEN_CHAIN].Address);
  const avaxCollection = new avalancheProvider.eth.Contract(NFT_CONTRACTS[AVALANCHE_FUJI_CHAIN].ABIConverse, NFT_CONTRACTS[AVALANCHE_FUJI_CHAIN].AddressConverse);;
  const polygonCollection = new polygonProvider.eth.Contract(NFT_CONTRACTS[POLYGON_MUMBAI_CHAIN].ABIConverse, NFT_CONTRACTS[POLYGON_MUMBAI_CHAIN].AddressConverse);

  const newObjGetMyMarketplace = allSaleNft.filter((x) => x.status === "0");

  let objMarkets = [];
  let uri;

  for (let nft of newObjGetMyMarketplace) {
    if (nft.nftContract === NFT_ROPSTEN_ADDRESS) {
      uri = await ropstenCollection.methods.tokenURI(nft.tokenId).call();
    } else if (nft.nftContract === NFT_AVALANHCE_CONVERSE_ADDRESS) {
      uri = await avaxCollection.methods.tokenURI(nft.tokenId).call();
    } else if (nft.nftContract === NFT_POLYGON_CONVERSE_ADDRESS) {
      uri = await polygonCollection.methods.tokenURI(nft.tokenId).call();
    }
    const responseUri = await fetch(ipfsUriToHttps(uri));
    let objNFT = await responseUri.json();
    objMarkets = [
      ...objMarkets,
      {
        ...objNFT,
        price: Web3.utils.fromWei(nft.price, "ether"),
        owner: nft.owner,
        nftContract: nft.nftContract,
        status: nft.status,
        jsonUri: uri,
      },
    ];
  }
  console.log('objMarkets', objMarkets);
  // setListMarketplace({ list: objMarkets, loading: false });
  return objMarkets;
};
// test performance
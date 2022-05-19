import nftAbi from "./MCrossCollection.json";
import nftCrossAbi from "./MintNFTCrossChain.json";
import wethAbi from "./WETH.json";

export const NFT_CONTRACT_ABI = nftAbi;
export const NFT_CROSS_CONTRACT_ABI = nftCrossAbi;
export const WETH_CONTRACT_ABI = wethAbi;

export const NFT_ROPSTEN_ADDRESS = "0x670694bEaA4737910669037B55499f47f408c0ca";
export const NFT_AVALANHCE_FUJI_ADDRESS = "0x87D00f9223ebAC32fd1fbdc526D9927774267617";
export const NFT_POLYGON_MUMBAI_ADDRESS = "0xE8bA59F8F566A3F5D3320095dA6CAABC5751ea0C";

export const WETH_AVALANCHE_FUJI_ADDRESS = "0x3613C187b3eF813619A25322595bA5E297E4C08a";
export const WETH_POLYGON_MUMBAI_ADDRESS = "0xfba15fFF35558fE2A469B96A90AeD7727FE38fAE";

export const ROPSTEN_CHAIN = 3;
export const AVALANCHE_FUJI_CHAIN = 43113;
export const POLYGON_MUMBAI_CHAIN = 80001;

export const NFT_CONTRACTS = {
  3: {
    Label: "Ropsten Testnet Network",
    Icon: "ethereum",
    Token: "ETH",
    Address: NFT_ROPSTEN_ADDRESS,
    ABI: NFT_CONTRACT_ABI,
    CrossChain: false,
  },
  43113: {
    Label: "AVAX Testnet Network",
    Icon: "avalanche",
    Token: "WETH",
    Address: NFT_AVALANHCE_FUJI_ADDRESS,
    ABI: NFT_CROSS_CONTRACT_ABI,
    CrossChain: true
  },
  80001: {
    Label: "Polygon Testnet Network",
    Icon: "polygon",
    Token: "WETH",
    Address: NFT_POLYGON_MUMBAI_ADDRESS,
    ABI: NFT_CROSS_CONTRACT_ABI,
    CrossChain: true
  }
};

export const WETH_CONTRACT_ADDRESS = {
  43113: WETH_AVALANCHE_FUJI_ADDRESS,
  80001: WETH_POLYGON_MUMBAI_ADDRESS,
};
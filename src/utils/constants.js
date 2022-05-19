import nftAbi from "./MCrossCollection.json";
import nftCrossAbi from "./MintNFTCrossChain.json";
import nftConverseAbi from "./converseNFT.json";
import nftConverseCrossAbi from "./converseNFTCrossChain.json";
import wethAbi from "./WETH.json";

export const NFT_CONTRACT_ABI = nftAbi;
export const NFT_CONTRACT_CONVERSE_ABI = nftConverseCrossAbi;
export const NFT_CROSS_CONTRACT_ABI = nftCrossAbi;
export const WETH_CONTRACT_ABI = wethAbi;

export const NFT_ROPSTEN_ADDRESS = "0x670694bEaA4737910669037B55499f47f408c0ca";
export const NFT_ROPSTEN_CONVERSE_ADDRESS = "0xB2Af093169b21A9cEFEBC37C9ddf77BC5Ae82e32";
export const NFT_AVALANHCE_FUJI_ADDRESS = "0x87D00f9223ebAC32fd1fbdc526D9927774267617";
export const NFT_AVALANHCE_CONVERSE_ADDRESS = "0x02907A471AC3A90B0AF8029e905eB4B46FdD88b9";
export const NFT_POLYGON_MUMBAI_ADDRESS = "0xE8bA59F8F566A3F5D3320095dA6CAABC5751ea0C";
export const NFT_POLYGON_CONVERSE_ADDRESS = "0xbcf547efcad49795a7557d350cc365524ac7fdc0";

export const WETH_AVALANCHE_FUJI_ADDRESS = "0x3613C187b3eF813619A25322595bA5E297E4C08a";
export const WETH_POLYGON_MUMBAI_ADDRESS = "0xfba15fFF35558fE2A469B96A90AeD7727FE38fAE";

export const ROPSTEN_CHAIN = 3;
export const AVALANCHE_FUJI_CHAIN = 43113;
export const POLYGON_MUMBAI_CHAIN = 80001;

export const NFT_CONTRACTS = {
  3: {
    Label: "Ropsten Testnet Network",
    Icon: "Ethereum",
    Token: "ETH",

    Address: NFT_ROPSTEN_ADDRESS,
    ABI: NFT_CONTRACT_ABI,

    AddressConverse: NFT_ROPSTEN_CONVERSE_ADDRESS,
    ABIConverse: nftConverseAbi,

    CrossChain: false
  },
  43113: {
    Label: "AVAX Testnet Network",
    Icon: "Avalanche",
    Token: "WETH",

    Address: NFT_AVALANHCE_FUJI_ADDRESS,
    ABI: NFT_CROSS_CONTRACT_ABI,

    AddressConverse: NFT_AVALANHCE_CONVERSE_ADDRESS,
    ABIConverse: NFT_CONTRACT_CONVERSE_ABI,

    CrossChain: true
  },
  80001: {
    Label: "Polygon Testnet Network",
    Icon: "Polygon",
    Token: "WETH",

    Address: NFT_POLYGON_MUMBAI_ADDRESS,
    ABI: NFT_CROSS_CONTRACT_ABI,

    AddressConverse: NFT_POLYGON_CONVERSE_ADDRESS,
    ABIConverse: NFT_CONTRACT_CONVERSE_ABI,

    CrossChain: true
  }
};

export const WETH_CONTRACT_ADDRESS = {
  43113: WETH_AVALANCHE_FUJI_ADDRESS,
  80001: WETH_POLYGON_MUMBAI_ADDRESS,
};
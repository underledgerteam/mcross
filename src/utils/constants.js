import nftAbi from "./MCrossCollection.json";
import nftCrossAbi from "./MintNFTCrossChain.json";
import nftConverseAbi from "./converseNFT.json";
import nftMarketplaceAbi from "./marketplaceNFT.json";
import nftConverseCrossAbi from "./converseNFTCrossChain.json";
import mockNftAbi from "./MCrossCollection.json";

import wethAbi from "./WETH.json";

export const NFT_CONTRACT_ABI = nftAbi;
export const NFT_MOCK_ABI = mockNftAbi;
export const NFT_CONTRACT_CONVERSE_ABI = nftConverseAbi;
export const NFT_CROSS_CONTRACT_CONVERSE_ABI = nftConverseCrossAbi;
export const NFT_CONTRACT_MARKETPLACE_ABI = nftMarketplaceAbi;
export const NFT_CROSS_CONTRACT_ABI = nftCrossAbi;
export const WETH_CONTRACT_ABI = wethAbi;

export const NFT_GOERLI_ADDRESS = "0x01398475D55b7382d3dF44cdeF04177d55fe6B34";
export const NFT_GOERLI_CONVERSE_ADDRESS =
  "0x33d0078636A78DbDe42e45BFF7E0a79824C684f1";
export const NFT_GOERLI_MARKETPLACE_ADDRESS =
  "0xC11F3D7F2cbE1b0b1F640E69Df7BDA756755e88B";

export const NFT_AVALANHCE_FUJI_ADDRESS =
  "0x847f14bAbA858d81DC56449EF8C07DB8F8A1dc20";
export const NFT_AVALANHCE_MOCK_COLLECTION_ADDRESS =
  "0x8cfa110e91c99bb74c59b89c351dbd0944d15590";
export const NFT_AVALANHCE_CONVERSE_ADDRESS =
  "0xae6Bee16840278244060A618465C4A4F08EDEd04";
export const NFT_AVALANHCE_MARKETPLACE_ADDRESS =
  "0x1bfcc9cad2a5eba9f9fb2f08b62835fe7dbd7ecd";

export const NFT_POLYGON_MUMBAI_ADDRESS =
  "0xC1123b8A09b2Ec4C4e4f635e68393893b415a677";
export const NFT_POLYGON_MOCK_COLLECTION_ADDRESS =
  "0xf8d99a22b3a6bddd45a1ec65f413d8c59de3b880";
export const NFT_POLYGON_CONVERSE_ADDRESS =
  "0x7bbF0937583BA80c963b06f1b7F945A43F3e364A";
export const NFT_POLYGON_MARKETPLACE_ADDRESS =
  "0x54fc529b9b79bea7fcc892c972c8c2a37a1bafc2";

export const WETH_AVALANCHE_FUJI_ADDRESS =
  "0x3613C187b3eF813619A25322595bA5E297E4C08a";
export const WETH_POLYGON_MUMBAI_ADDRESS =
  "0xfba15fFF35558fE2A469B96A90AeD7727FE38fAE";

export const GOERLI_CHAIN = 5;
export const AVALANCHE_FUJI_CHAIN = 43113;
export const POLYGON_MUMBAI_CHAIN = 80001;

export const NFT_DEFAULT_CHAIN = 3;
export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

export const NFT_CONTRACTS = {
  5: {
    Label: "Goerli Testnet Network",
    ShortLabel: "Goerli",
    Icon: "Ethereum",
    Name: "Ethereum",
    Token: "ETH",
    MintCost: "ETH",

    Address: NFT_GOERLI_ADDRESS,
    ABI: NFT_CONTRACT_ABI,

    AddressConverse: NFT_GOERLI_CONVERSE_ADDRESS,
    ABIConverse: NFT_CONTRACT_CONVERSE_ABI,

    AddressCollection: NFT_GOERLI_ADDRESS,
    ABICollection: NFT_CONTRACT_ABI,

    AddressMarketplace: NFT_GOERLI_MARKETPLACE_ADDRESS,
    ABIMarketplace: NFT_CONTRACT_MARKETPLACE_ABI,

    CrossChain: false,
    GAS_PRICE: 40,
    GAS_TOKEN_PRICE: 4000,
  },
  43113: {
    Label: "AVAX Testnet Network",
    ShortLabel: "Avalanche",
    Icon: "Avalanche",
    Name: "Avalanche",
    Token: "AVAX",
    MintCost: "WETH",

    chainId: "0xA869",
    nativeCurrency: {
      name: "Avalanche",
      symbol: "AVAX",
      decimals: 18,
    },
    rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
    blockExplorerUrls: ["https://testnet.snowtrace.io/"],

    Address: NFT_AVALANHCE_FUJI_ADDRESS,
    ABI: NFT_CROSS_CONTRACT_ABI,

    AddressConverse: NFT_AVALANHCE_CONVERSE_ADDRESS,
    ABIConverse: NFT_CROSS_CONTRACT_CONVERSE_ABI,

    AddressCollection: NFT_AVALANHCE_MOCK_COLLECTION_ADDRESS,
    ABICollection: NFT_MOCK_ABI,

    AddressMarketplace: NFT_AVALANHCE_MARKETPLACE_ADDRESS,
    ABIMarketplace: NFT_CONTRACT_MARKETPLACE_ABI,

    CrossChain: true,
    GAS_PRICE: 30,
    GAS_TOKEN_PRICE: 100,
  },
  80001: {
    Label: "Polygon Testnet Network",
    ShortLabel: "Polygon",
    Icon: "Polygon",
    Name: "Polygon",
    Token: "MATIC",
    MintCost: "WETH",

    chainId: "0x13881",
    nativeCurrency: {
      name: "MATIC Token",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://matic-mumbai.chainstacklabs.com/"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],

    Address: NFT_POLYGON_MUMBAI_ADDRESS,
    ABI: NFT_CROSS_CONTRACT_ABI,

    AddressConverse: NFT_POLYGON_CONVERSE_ADDRESS,
    ABIConverse: NFT_CROSS_CONTRACT_CONVERSE_ABI,

    AddressCollection: NFT_POLYGON_MOCK_COLLECTION_ADDRESS,
    ABICollection: NFT_MOCK_ABI,

    AddressMarketplace: NFT_POLYGON_MARKETPLACE_ADDRESS,
    ABIMarketplace: NFT_CONTRACT_MARKETPLACE_ABI,

    CrossChain: true,
    GAS_PRICE: 30,
    GAS_TOKEN_PRICE: 20,
  },
};

export const WETH_CONTRACT_ADDRESS = {
  43113: WETH_AVALANCHE_FUJI_ADDRESS,
  80001: WETH_POLYGON_MUMBAI_ADDRESS,
};

export const BRIDGE_GAS_LIMIT = 250_000;

import nftAbi from "./MCrossCollection.json";
import nftCrossAbi from "./MintNFTCrossChain.json";

export const nftContractAddress = {
  3: {
    Label: "Ethereum",
    Currency: "ETH",
    Address: "0x1200C9dE9F94F2E031B18C752b06DEe3125Bdf45",
  },
  80001: {
    Label: "Polygon",
    Currency: "WETH",
    Address: "0xE8bA59F8F566A3F5D3320095dA6CAABC5751ea0C",
  },
  43113: {
    Label: "Avalanche",
    Currency: "WETH",
    Address: "0x87D00f9223ebAC32fd1fbdc526D9927774267617",
  }
}

export const nftContractABI = nftAbi.abi;

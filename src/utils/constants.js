import nftAbi from "./MCrossCollection.json";
import nftCrossAbi from "./MintNFTCrossChain.json";

export const nftContract = {
  3: {
    Label: "Ropsten Testnet Network",
    Icon: "ethereum",
    Token: "ETH",
    Address: "0x1200C9dE9F94F2E031B18C752b06DEe3125Bdf45",
    ABI: nftAbi.abi,
    CrossChain: false
    // Address: "0x670694bEaA4737910669037B55499f47f408c0ca" NEW,
  },
  43113: {
    Label: "AVAX Testnet Network",
    Icon: "avalanche",
    Token: "WETH",
    Address: "0x87D00f9223ebAC32fd1fbdc526D9927774267617",
    ABI: nftCrossAbi,
    CrossChain: true
  },
  80001: {
    Label: "Polygon Testnet Network",
    Icon: "polygon",
    Token: "WETH",
    Address: "0xE8bA59F8F566A3F5D3320095dA6CAABC5751ea0C",
    ABI: nftCrossAbi,
    CrossChain: true
  }
}

export const nftContractAddress = "0x670694bEaA4737910669037B55499f47f408c0ca";
export const nftContractABI = nftAbi.abi;

export const nftContractAvalanhceAddress =
  "0x87D00f9223ebAC32fd1fbdc526D9927774267617";
export const nftContractMumbaiAddress =
  "0xE8bA59F8F566A3F5D3320095dA6CAABC5751ea0C";
export const nftCrossContractABI = nftCrossAbi;

export const ropstenChain = 3;
export const avalanchFujiChain = 43113;
export const polygonMumbiChain = 80001;
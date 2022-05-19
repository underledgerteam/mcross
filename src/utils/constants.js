import nftAbi from "./MCrossCollection.json";
import nftCrossAbi from "./MintNFTCrossChain.json";
import nftConverseAbi from "./converseNFT.json";
import nftConverseCrossAbi from "./converseNFTCrossChain.json";

export const nftContract = {
  3: {
    Label: "Ropsten Testnet Network",
    Icon: "Ethereum",
    Token: "ETH",

    Address: "0x670694bEaA4737910669037B55499f47f408c0ca",
    ABI: nftAbi.abi,

    AddressConverse: "0xB2Af093169b21A9cEFEBC37C9ddf77BC5Ae82e32",
    ABIConverse: nftConverseAbi,

    AddressMint: null,
    ABIMint: null,

    CrossChain: false
  },
  43113: {
    Label: "AVAX Testnet Network",
    Icon: "Avalanche",
    Token: "WETH",

    Address: "0x02907A471AC3A90B0AF8029e905eB4B46FdD88b9",
    ABI: nftConverseCrossAbi,

    AddressConverse: "0x02907A471AC3A90B0AF8029e905eB4B46FdD88b9",
    ABIConverse: nftConverseCrossAbi,

    AddressMint: "0x87D00f9223ebAC32fd1fbdc526D9927774267617",
    ABIMint: nftCrossAbi,

    CrossChain: true
  },
  80001: {
    Label: "Polygon Testnet Network",
    Icon: "Polygon",
    Token: "WETH",

    Address: "0xbcf547efcad49795a7557d350cc365524ac7fdc0",
    ABI: nftConverseCrossAbi,

    AddressConverse: "0xbcf547efcad49795a7557d350cc365524ac7fdc0",
    ABIConverse: nftConverseCrossAbi,

    AddressMint: "0xE8bA59F8F566A3F5D3320095dA6CAABC5751ea0C",
    ABIMint: nftCrossAbi,

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
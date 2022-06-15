import Web3 from "web3";
import { NFT_CONTRACTS, BRIDGE_GAS_LIMIT } from "../utils/constants";

const axios = require("axios");
const addressZero = "0x0000000000000000000000000000000000000000";

export const getGasPrice = async (
  sourceChain,
  destinationChain,
  tokenAddress,
  tokenSymbol
) => {
  const api_url = "https://devnet.api.gmp.axelarscan.io";
  // const api_url = "https://testnet.api.gmp.axelarscan.io";
  // const api_url = "https://api.gmp.axelarscan.io";

  const requester = axios.create({ baseURL: api_url });
  const params = {
    method: "getGasPrice",
    destinationChain: destinationChain,
    sourceChain: sourceChain,
  };

  // set gas token address to params
  if (tokenAddress != addressZero) {
    params.sourceTokenAddress = tokenAddress;
  } else {
    params.sourceTokenSymbol = tokenSymbol;
  }
  // send request
  const response = await requester.get("/", { params }).catch((error) => {
    return { data: { error } };
  });

  const result = response.data.result;
  const dest = result.destination_native_token;
  const destPrice = (1e18 * dest.gas_price) * dest.token_price.usd;
  return (destPrice / result.source_token.token_price.usd).toFixed();
};

export const getCrossChainGasPrice = (sourceChain, destinationChain) => {
  // (BRIDGE_GAS_LIMIT * GAS_PRICE[destination_chain]) / 1000000000
  // (gasDestToken * GAS_TOKEN_PRICE[destination_chain]) / GAS_TOKEN_PRICE[source_chain];
  const gasDestToken = ((BRIDGE_GAS_LIMIT * NFT_CONTRACTS[destinationChain].GAS_PRICE) / 1e+9); // 1e+9
  const gasSourceToken = (gasDestToken * NFT_CONTRACTS[destinationChain].GAS_TOKEN_PRICE) / NFT_CONTRACTS[sourceChain].GAS_TOKEN_PRICE;
  console.log(gasSourceToken);
  console.log(Web3.utils.toWei(gasSourceToken.toString()));
  console.log(Web3.utils.toWei(gasSourceToken.toString(), "gwei"));
  return Web3.utils.toWei(gasSourceToken.toString(), "gwei");
};
const axios = require("axios");

const addressZero = "0x0000000000000000000000000000000000000000";

export const getGasPrice = async (
  sourceChain,
  destinationChain,
  tokenAddress,
  tokenSymbol
) => {
  const api_url = "https://devnet.api.gmp.axelarscan.io";

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

  console.log({ response });

  const result = response.data.result;
  const dest = result.destination_native_token;
  const destPrice = 1e18 * dest.gas_price * dest.token_price.usd;
  return destPrice / result.source_token.token_price.usd;
};
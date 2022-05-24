import React, { useState, useContext, Fragment } from "react";
import { Loading } from "web3uikit";
import { Web3Provider } from "../../contexts/connect.context";

import Title from "../../components/shared/Title";
import CardContainerTemplate from "../../components/shared/card/CardContainerTemplate";
import { AVALANCHE_FUJI_CHAIN, POLYGON_MUMBAI_CHAIN } from "../../utils/constants";

const Mint = () => {
  const { account, ConnectedWallet, mintNft, mintProcessing, mintCost, calculateMintCost, cost, chain } = useContext(Web3Provider);
  const { token, value } = mintCost;
  const [mintAmount, setMintAmount] = useState(1);
  const { mintCost: valueEth, feeCost } = cost;

  const nftQty = "1,000";
  // func
  const mint = async () => {
    const { success } = await mintNft(mintAmount);
    if (success) {
      setMintAmount(1);
    }
  };
  // component
  const createSelectOptions = () => {
    let options = [];
    for (let i = 1; i <= 5; i++) {
      options.push(<option key={i} value={i}>{`${i} nft`}</option>);
    }
    return options;
  };

  return (
    <div className="w-full flex flex-col">
      <Title text={"Mint NFT"} />
      <div className="h-full flex flex-col lg:flex-row gap-4 lg:gap-x-8">

        <div className="w-full lg:w-1/2 flex-auto">
          <h1 className="text-white font-bold text-3xl md:text-5xl mb-4 lg:my-8">
            Condition Mint NFT
          </h1>
          <p className="text-white font-semibold text-sm md:text-md lg:text-lg mb-4">
            Mint simplifies the experience for brands to sell NFTs, launch branded marketplaces, and provide seamless transactions, interactions, and utility for collectors.
          </p>
          <p className="text-white font-semibold text-sm md:text-md lg:text-lg mb-4">
            If you Mint NFT with Ropsten Chain, You can pay Ethereum cost {valueEth} ETH per Mint.
          </p>
          <p className="text-white font-semibold text-sm md:text-md lg:text-lg mb-4">
            but You Mint NFT with Other Chain, You can pay WETH cost {valueEth} WETH and extra charged fee {feeCost} WETH per Mint.
          </p>
          <p className="text-white font-bold text-sm md:text-md lg:text-lg">
            Limited {nftQty} NFT only.
          </p>
        </div>

        {!account ? (
          <div className="w-full lg:w-1/2 flex-auto py-8 px-8 text-center">
            <div className="">
              <h1 className="text-white font-bold text-3xl md:text-5xl mb-8">
                Mint Collection
              </h1>
              <button type="button" className="w-full md:w-96 px-10 py-4 btn-home" onClick={ConnectedWallet}>
                Connect Wallet
              </button>
            </div>
          </div>
        ) : (
          <CardContainerTemplate
            text="text-center"
            size="w-full lg:w-1/2 flex-auto"
            padding="py-8 px-8"
          >
            <Fragment>
              <h1 className="text-white font-bold text-3xl md:text-5xl mb-8">
                Mint Collection
              </h1>
              <div className="flex flex-col p-0 lg:px-12">
                <div className="inline-block relative w-full text-gray-700 font-bold text-lg lg:text-xl mb-4">
                  <select
                    name="qty"
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    defaultValue={mintAmount}
                    onChange={(e) => setMintAmount(e.target.value)}
                    disabled={mintProcessing}
                  >
                    {createSelectOptions()}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                  </div>
                </div>
                <div className="flex justify-between font-semibold text-md md:text-lg lg:text-xl mb-4">
                  <div>{`Mint fee:`}</div>
                  <div>{`${valueEth} ${token} / Mint`}</div>
                </div>
                {chain === AVALANCHE_FUJI_CHAIN || chain === POLYGON_MUMBAI_CHAIN ?
                  (
                    <div className="flex justify-between font-semibold text-md md:text-lg lg:text-xl mb-4">
                      <div>{`Other Chain fee:`}</div>
                      <div>{`${feeCost} ${token} / Mint`}</div>
                    </div>
                  ) :
                  (null)
                }
                <div className="flex justify-between font-bold text-md md:text-lg lg:text-xl mb-4">
                  <div className="underline">{`Total fee:`}</div>
                  <div>{`${calculateMintCost(value, mintAmount)} ${token}`}</div>
                </div>
                <button type="button" className="w-full px-10 py-4 btn-home " disabled={mintProcessing} onClick={() => mint()}>
                  <div className="flex justify-center gap-2">
                    {mintProcessing ? <Loading fontSize={20} size={20} direction="right" /> : null}
                    Mint
                  </div>
                </button>
              </div>
            </Fragment>
          </CardContainerTemplate>
        )}
      </div>
    </div>
  );
};

export default Mint;
import React, { useState, useContext } from "react";
import { Web3Provider } from "../../contexts/connect.context";
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
      <div className="mx-auto font-bold text-4xl text-white uppercase pb-4 lg:pb-8">Mint NFT</div>
      <div className="h-full flex flex-col lg:flex-row gap-4 lg:gap-x-8">

        <div className="w-full lg:w-1/2 flex-auto">
          <h1 className="text-gray-100 font-semibold text-3xl md:text-6xl py-8">
            Condition Mint NFT
          </h1>
          <p className="text-gray-100 font-semibold text-sm md:text-md lg:text-lg mb-4">
            Mint simplifies the experience for brands to sell NFTs, launch branded marketplaces, and provide seamless transactions, interactions, and utility for collectors.
          </p>
          <p className="text-gray-100 font-semibold text-sm md:text-md lg:text-lg mb-4">
            If you Mint NFT with Ropsten Chain, You can pay Ethereum cost {valueEth} ETH per Mint.
          </p>
          <p className="text-gray-100 font-semibold text-sm md:text-md lg:text-lg mb-4">
            but You Mint NFT with Other Chain, You can pay WETH cost {valueEth} WETH and extra charged fee {feeCost} WETH per Mint.
          </p>
          <p className="text-gray-100 font-bold text-sm md:text-md lg:text-lg">
            Limited {nftQty} NFT only.
          </p>
        </div>

        {!account ? (
          <div className="w-full lg:w-1/2 flex-auto py-8 px-8 text-center">
            <div className="">
              <h1 className="text-gray-100 font-semibold text-3xl md:text-6xl mb-8">
                Mint Collection
              </h1>
              <button type="button" className="w-96 px-10 py-4 btn-home" onClick={ConnectedWallet}>
                Connect Wallet
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full lg:w-1/2 flex-auto py-8 px-8 shadow-lg rounded-lg backdrop-blur-lg bg-[#323652]/50 text-center">
            <h1 className="text-gray-100 font-semibold text-3xl md:text-6xl mb-8">
              Mint Collection
            </h1>
            <div className="flex flex-col p-0 lg:px-12">
              <select name="qty" className="text-black mb-4" value={mintAmount} onChange={(e) => setMintAmount(e.target.value)} disabled={mintProcessing}>
                {createSelectOptions()}
              </select>
              <div className="flex justify-between mb-4">
                <div>{`Mint fee:`}</div>
                <div>{`${valueEth} ${token} / Mint`}</div>
              </div>
              {chain === AVALANCHE_FUJI_CHAIN || chain === POLYGON_MUMBAI_CHAIN ?
                (
                  <div className="flex justify-between mb-4">
                    <div>{`Other Chain fee:`}</div>
                    <div>{`${feeCost} ${token} / Mint`}</div>
                  </div>
                ) :
                (null)
              }
              <div className="flex justify-between mb-4">
                <div className="underline">{`Total fee:`}</div>
                <div>{`${calculateMintCost(value, mintAmount)} ${token}`}</div>
              </div>
              <div className="m-auto">
                <div>
                  <button type="button" className="w-full lg:w-96 px-10 py-4 btn-home " disabled={mintProcessing} onClick={() => mint()}>
                    Mint
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mint;
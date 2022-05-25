import { Fragment, useRef, useContext, useEffect, useState } from "react";

import { CryptoLogos, Loading } from "web3uikit";

import { Web3Provider } from "../../contexts/connect.context";
import Title from "../../components/shared/Title";
import CardContainerTemplate from "../../components/shared/card/CardContainerTemplate";
import { shortenAddress } from "../../utils/shortenAddress.util";
import { ipfsUriToHttps } from "../../utils/ipfsUriToHttps.util";

import { NFT_CONTRACTS as nftContractAddress } from "../../utils/constants";

const Converse = () => {
  const {
    chain,
    isReload,
    account,
    nftConverse,
    selectConverseNFT,
    ChangeChain,
    myCollection,
    GetCollection,
    ConverseNFT,
    ConverseApproveNFT,
    ChangeConverseNFT,
    nftContractCollection,
    ConnectedWallet
  } = useContext(Web3Provider);

  const refSelectFromChain = useRef();
  const refSelectNFT = useRef();
  const refSelectToChain = useRef();

  const onChangeFromChain = async () => {
    ChangeChain(Number.parseInt(refSelectFromChain.current.value));
  };

  const onChangeNFT = () => {
    const getNFT = myCollection.list.find((x) => x.edition === Number.parseInt(refSelectNFT.current.value));
    ChangeConverseNFT("Converse", getNFT);
  };

  const onChangeToChain = () => {
    console.log(refSelectToChain.current.value);
  };

  const onApprove = (isApprove) => {
    if (isApprove) {
      ConverseNFT({
        ...selectConverseNFT,
        to: Number.parseInt(refSelectToChain.current.value)
      });
    } else {
      ConverseApproveNFT("Converse", selectConverseNFT);
    }
  };

  useEffect(() => {
    if (refSelectFromChain?.current?.value) {
      refSelectFromChain.current.value = chain;
    }
  }, [chain]);

  useEffect(() => {
    if (account && nftContractCollection) {
      ChangeConverseNFT("Converse", null);
      GetCollection();
    }
  }, [account, isReload, nftContractCollection]);

  return (
    <Fragment>
      <div className="container md:container md:mx-auto">
        <Title text={"NFT Converse"} />

        <div className="flex">
          {!account ? (
            <div className="w-full flex-auto py-8 px-8 text-center">
              <div className="">
                <button type="button" className="w-full md:w-96 px-10 py-4 btn-home" onClick={ConnectedWallet}>
                  Connect Wallet
                </button>
              </div>
            </div>
          ) : (
            <div className="lg:w-1/3 md:w-2/3 w-3/3 mx-auto mt-8">
              <CardContainerTemplate
                padding="py-4 px-8"
                margin="my-10"
              >
                <Fragment>
                  <div className="flex justify-center -mt-16">
                    <CryptoLogos
                      chain={nftContractAddress[chain]?.Icon.toLowerCase()}
                      size="6.5rem"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="bg-slate-400/20 py-5 -mt-7 rounded-3xl">
                      <h2 className="text-2xl font-semibold mt-2 text-center">Address Wallet</h2>
                      <h2 className="text-2xl font-semibold mt-2 text-center">{shortenAddress(account)}</h2>
                    </div>
                    <div className="flex items-end mt-3 mx-auto">
                      <div className="text-white text-xl lg:text-3xl font-bold mr-4">From: </div>
                      <div className="inline-block relative w-full text-gray-700 mt-4">
                        <select
                          disabled={selectConverseNFT?.approveLoading || nftConverse?.loading}
                          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                          ref={refSelectFromChain}
                          onChange={() => onChangeFromChain()}
                          defaultValue={chain}
                        >
                          {Object.keys(nftContractAddress).map((key, index) => {
                            return (<option key={index} value={key}>{nftContractAddress[key]?.Label}</option>);
                          })}
                        </select>

                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-end mt-3 mx-auto">
                      <div className="text-white text-xl lg:text-3xl font-bold mr-4">NFT: </div>
                      <div className="inline-block relative w-full text-gray-700 mt-4">
                        <select
                          disabled={selectConverseNFT?.approveLoading || nftConverse?.loading}
                          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                          ref={refSelectNFT}
                          onChange={() => onChangeNFT()}
                        >
                          <option>{myCollection.loading ? "Loading..." : (myCollection?.list.length > 0) ? "Please Select NFT" : "NFT No Record!"}</option>
                          {!myCollection.loading && myCollection?.list.map((data, key) => {
                            return (<option key={key} value={data.edition}>{data.name}</option>);
                          })}
                        </select>

                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center mt-5">
                      <img
                        className="w-48 h-48 lg:w-72 lg:h-72 object-cover border-4 border-purple-500"
                        src={ipfsUriToHttps(selectConverseNFT?.image)}
                        alt="selected_nft"
                      />
                    </div>

                    <div className="flex items-end mt-3 mx-auto">
                      <div className="text-white text-xl lg:text-3xl font-bold mr-4">To: </div>
                      <div className="inline-block relative w-full text-gray-700 mt-4">
                        <select
                          disabled={selectConverseNFT?.approveLoading || nftConverse?.loading}
                          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                          ref={refSelectToChain}
                          onChange={() => onChangeToChain()}
                        >
                          {Object.keys(nftContractAddress).map((key, index) => {
                            return (chain !== Number.parseInt(key) ? <option key={index} value={key}>{nftContractAddress[key]?.Label}</option> : "");
                          })}
                        </select>

                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                      </div>
                    </div>
                    {selectConverseNFT?.selected && (
                      <div className="bg-slate-400/20 p-5 mt-8 mb-3 rounded-3xl">
                        {/* <div className="flex mb-1">
                          <div className="w-1/2">
                            Fee
                          </div>
                          <div className="w-1/2 text-right">
                            { `${selectConverseNFT?.fee / 2} ${nftContractAddress[chain].Token}` }
                          </div>
                        </div> */}
                        <div className="flex">
                          <div className="w-1/2">
                            Estimated Time
                          </div>
                          <div className="w-1/2 text-right">
                            5-20 minutes
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-end my-5 mx-auto">
                      <button
                        disabled={!selectConverseNFT?.selected || selectConverseNFT?.approveLoading || nftConverse?.loading}
                        className="w-48 px-4 py-2 btn-connect btn-converse disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => onApprove(selectConverseNFT?.approve)}
                      >
                        <div className="flex justify-center gap-2">
                          {selectConverseNFT?.approveLoading || nftConverse?.loading && <Loading fontSize={20} direction="right" />}
                          {selectConverseNFT?.approve ? "Transfer" : "Approve"}
                        </div>
                      </button>
                    </div>
                  </div>
                </Fragment>
              </CardContainerTemplate>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Converse;
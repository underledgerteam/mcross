import { Fragment, useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loading, CryptoLogos } from "web3uikit";

import { Web3Provider } from "../../contexts/connect.context";

import CardContainerTemplate from "../../components/shared/card/CardContainerTemplate";
import Title from "../../components/shared/Title";
import { shortenAddress } from "../../utils/shortenAddress.util";
import { ipfsUriToHttps } from "../../utils/ipfsUriToHttps.util";

import { NFT_CONTRACTS as nftContractAddress } from "../../utils/constants";

const MarketDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const {
    chain,
    owner,
    account,
    myCollectionById,
    nftContractCollection,
    ConnectedWallet,
    GetByIdCollection,
    getMarketplaceDetail,
    detailMarketplace } = useContext(Web3Provider);

  const onHistoryBack = () => {
    navigate("/market");
  };
  const onOpenModal = () => {
    console.log(1);
  };

  useEffect(() => {
    if (account && nftContractCollection) {
      GetByIdCollection(params.id);
      getMarketplaceDetail(params.id);
    }
  }, [account, nftContractCollection]);

  return (
    <Fragment>
      <div className="container md:container md:mx-auto">
        <Title text={"Marketplace Detail"} />
        {!account ? (
          <div className="w-full flex-auto py-8 px-8 text-center">
            <div className="">
              <button type="button" className="w-full md:w-96 px-10 py-4 btn-home" onClick={ConnectedWallet}>
                Connect Wallet
              </button>
            </div>
          </div>
        ) : (
          myCollectionById.loading ? (
            <div className="flex justify-center h-60">
              <Loading
                fontSize={20}
                size={100}
                spinnerColor="#fff"
              /></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="w-full">
                <CardContainerTemplate
                  padding="py-8 px-8"
                  margin="md:my-5 lg:my-15"
                >
                  <Fragment>
                    <div className="flex justify-center">
                      <img className="w-48 h-48 lg:w-72 lg:h-72 object-cover border-8 border-purple-500" src={detailMarketplace?.data?.image && ipfsUriToHttps(detailMarketplace?.data.image)} alt={detailMarketplace?.data?.name} />
                    </div>
                    <div className="grid justify-items-center">
                      <h2 className="text-2xl font-semibold mt-2">Chain : {nftContractAddress[chain]?.ShortLabel}</h2>
                    </div>
                  </Fragment>
                </CardContainerTemplate>
                <CardContainerTemplate
                  padding="py-8 px-8"
                  margin="md:my-5 lg:my-15"
                >
                  <Fragment>
                    <div className="flex flex-col">
                      <div className="grid md:grid-cols-sm md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-2">

                        {myCollectionById.data.attributes.map((item, key) => {
                          return (
                            <div className="mt-2 px-2 py-2  bg-[#C0C9F6]/30 rounded-lg text-center" key={key}>
                              <div>
                                <p className="text-sm">{item.trait_type} : {item.value}</p>
                              </div>
                            </div>
                          );

                        })}

                      </div>
                    </div>
                  </Fragment>
                </CardContainerTemplate>
              </div>
              <CardContainerTemplate
                padding="p-6"
                margin="md:my-5 lg:my-15"
              >
                <Fragment>
                  <h5 className="text-4xl text-extrabold text-center leading-tight font-bold mb-2">{detailMarketplace?.data?.name}</h5>

                  <div className="lg:flex justify-center">
                    <div className="flex mt-2 mr-1 ml-1 items-center px-2 py-2 bg-[#C0C9F6]/30 rounded-lg">
                      <div>
                        <p className="text-lg">Owner By : {detailMarketplace?.data?.owner && shortenAddress(detailMarketplace?.data?.owner)}</p>
                      </div>
                    </div>

                    <div className="flex mt-2 mr-1 ml-1 items-center px-2 py-2 bg-[#C0C9F6]/30 rounded-lg">
                      <div>
                        <p className="text-lg">Creator By : {owner && shortenAddress(owner)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5">
                    <h5 className="text-2xl">Detail : </h5>
                    <p className="text-lg">{detailMarketplace?.data?.description}</p>
                  </div>

                  <div className="mt-5">
                    <h5 className="text-2xl flex">
                      <CryptoLogos
                        chain={nftContractAddress[chain]?.Icon.toLowerCase()}
                        size="24px"
                      />&nbsp;Price : {detailMarketplace?.data?.price} {nftContractAddress[chain]?.MintCost}</h5>
                  </div>
                  <div className="flex justify-between mt-5 absolute inset-x-5 bottom-5">
                    <div className="w-56">
                      <button
                        type="button"
                        className="btn-menu-profile border border-gray-300"
                        onClick={() => onHistoryBack()}
                      >
                        Back
                      </button>
                    </div>
                    <div className="w-56">
                      <button
                        type="button"
                        className="w-full font-bold py-3 px-12 mt-4 rounded bg-gradient-to-r from-custom-purple1 to-pink-500 hover:from-custom-purple1/90 hover:to-pink-500/90 text-white"
                        onClick={() => onOpenModal()}
                      >
                        Buy
                      </button>
                    </div>
                  </div>
                </Fragment>
              </CardContainerTemplate>
            </div>
          )
        )}
      </div>
    </Fragment>
  );
};

export default MarketDetail;
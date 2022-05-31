import { Fragment } from "react";
import { CryptoLogos } from "web3uikit";

import CardContainerTemplate from "./CardContainerTemplate";
import { shortenAddress } from "../../../utils/shortenAddress.util";
import { ipfsUriToHttps } from "../../../utils/ipfsUriToHttps.util";

import { NFT_CONTRACTS as nftContractAddress } from "../../../utils/constants";


const CardDetailTemplate = ({ name, image, chain, nft_owner, nft_creator, description, price, attributes, onOpenModal, onHistoryBack }) => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="w-full">
        <CardContainerTemplate
          padding="py-8 px-8"
          margin="md:my-5 lg:my-15"
        >
          <Fragment>
            <div className="flex justify-center">
              <img className="w-48 h-48 lg:w-72 lg:h-72 object-cover border-8 border-purple-500" src={image && ipfsUriToHttps(image)} alt={name} />
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

                {attributes.map((item, key) => {
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
          <h5 className="text-4xl text-extrabold text-center leading-tight font-bold mb-2">{name}</h5>

          <div className="lg:flex justify-center">
            <div className="flex mt-2 mr-1 ml-1 items-center px-2 py-2 bg-[#C0C9F6]/30 rounded-lg">
              <div>
                <p className="text-lg">Owner By : {nft_owner && shortenAddress(nft_owner)}</p>
              </div>
            </div>

            <div className="flex mt-2 mr-1 ml-1 items-center px-2 py-2 bg-[#C0C9F6]/30 rounded-lg">
              <div>
                <p className="text-lg">Creator By : {nft_creator && shortenAddress(nft_creator)}</p>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <h5 className="text-2xl">Detail : </h5>
            <p className="text-lg">{description}</p>
          </div>

          <div className="mt-10">
            {price && (
              <div className="flex justify-between mt-2 items-center px-2 py-2 bg-[#C0C9F6]/30 rounded-lg text-xl font-bold">
                <div>Price</div>

                <div className="flex">
                  <CryptoLogos
                    chain={nftContractAddress[chain]?.Icon.toLowerCase()}
                    size="28px"
                  />&nbsp;{price} {nftContractAddress[chain]?.MintCost}
                </div>
              </div>
            )}

          </div>
          <div className="flex justify-between mt-2">
            <div className="w-56">
              <button
                type="button"
                className="btn-menu-profile border border-gray-300"
                onClick={onHistoryBack}
              >
                Back
              </button>
            </div>
            <div className="w-56">
              <button
                type="button"
                className="w-full font-bold py-3 px-12 mt-4 rounded bg-gradient-to-r from-custom-purple1 to-pink-500 hover:from-custom-purple1/90 hover:to-pink-500/90 text-white"
                onClick={onOpenModal}
              >
                Buy
              </button>
            </div>
          </div>
        </Fragment>
      </CardContainerTemplate>
    </div>
  );


};

export default CardDetailTemplate;
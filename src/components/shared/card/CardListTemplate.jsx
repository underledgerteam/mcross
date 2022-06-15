import React, { useContext } from "react";
import { Icon, CryptoLogos } from "web3uikit";
import NftImage from "../../shared/NftImage";
import { shortenAddress } from "../../../utils/shortenAddress.util";
import { Web3Provider } from "../../../contexts/connect.context";
import { NFT_CONTRACTS as nftContractAddress } from "../../../utils/constants";

const CardListTemplate = ({ id, name, owner, textAction, price, image, rarity, chain, sell = false, onClick, onClickAction }) => {
  const { chain: chainId, account } = useContext(Web3Provider);
  const colorButton = {
    "buy": "from-green-500 to-blue-600 text-white hover:from-pink-500 hover:to-yellow-500",
    "sell": "from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700"
  };
  return (
    <div className="w-full rounded overflow-hidden shadow-md hover:shadow-xl bg-[#292929] relative group">
      <NftImage
        className="w-full cursor-pointer"
        src={image}
        alt={name}
        onClick={onClick}
      />
      {owner && (
        <div className="flex justify-center px-3 py-3 bg-[#C0C9F6]/30">
          <Icon
            fill="#ffffff"
            svg="user"
            size="20px"
          />&nbsp;Owner By : {owner && shortenAddress(owner)}
        </div>
      )}
      <div className="px-6 py-4">
        {/* <div className="grid grid-cols-2">
          <p><span className="bg-slate-100 text-slate-800 text-xs font-semibold px-1.5 py-0.5 rounded">🔗{chain}</span></p>
          <p className="text-right"><span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded">{rarity} #{id}</span></p>
        </div> */}
        <div className="grid-cols-2 flex mt-3 mb-3">
          <div className="font-bold text-white text-xl cursor-pointer" onClick={onClick}>{name}</div>
          <p className="ml-auto"><span className="bg-slate-100 text-slate-800 text-xs font-semibold px-1.5 py-0.5 rounded">🔗{chain}</span></p>
        </div>
        {price && (
          <div className="grid mt-3">
            <hr />
            <div>
              <div className="text-xl text-gray-500 font-bold mb-2 mt-3 font-">

              </div>
              <div className="text-base font-bold text-white mb-2">
                Price :<br />
                <div className="flex mt-2">
                  <CryptoLogos
                    chain={nftContractAddress[chainId]?.Icon.toLowerCase()}
                    size="28px"
                  />
                  <div className="ml-2">{price} {nftContractAddress[chainId]?.MintCost}</div>
                </div>
              </div>
            </div>
          </div>
        )}
        {((owner && account?.toLowerCase() !== owner?.toLowerCase()) || !owner) && (
          <div className="mt-5">
            <button
              className={`w-full font-bold py-3 px-12 rounded bg-gradient-to-r ${colorButton[(sell) ? "sell" : "buy"]} z-50`}
              onClick={onClickAction}
            >
              {textAction}
            </button>
          </div>
        )}
      </div>
    </div >
  );
};

export default CardListTemplate;
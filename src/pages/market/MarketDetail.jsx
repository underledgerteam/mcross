import { Fragment, useEffect, useContext, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Loading } from "web3uikit";

import { Web3Provider } from "../../contexts/connect.context";

import Title from "../../components/shared/Title";

import CardDetailTemplate from "../../components/shared/card/CardDetailTemplate";
import ModalConfirm from "../../components/shared/ModalConfirm";
import { NFT_CONTRACTS as nftContractAddress } from "../../utils/constants";

const MarketDetail = () => {
  const params = useParams();
  const location = useLocation();
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
    detailMarketplace,
    BuyNFT
  } = useContext(Web3Provider);
  const [openModalBuyConfirm, setOpenModalBuyConfirm] = useState(false);
  const onHistoryBack = () => {
    if(location?.state?.isMyMarket){
      return navigate("/profile");
    }
    navigate("/market");
  };
  const onOpenModal = () => {
    setOpenModalBuyConfirm(true);
  };
  const onBuyConfirm = (objNFT) => {
    BuyNFT(objNFT,()=> { setOpenModalBuyConfirm(false) },()=> {});
  };
  const onCloseModalBuyConfirm = () => {
    setOpenModalBuyConfirm(false);
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
            <CardDetailTemplate
              image={detailMarketplace?.data?.image}
              name={detailMarketplace?.data?.name}
              nft_owner={detailMarketplace?.data?.owner}
              nft_creator={owner}
              description={detailMarketplace?.data?.description}
              price={detailMarketplace?.data?.price}
              chain={chain}
              attributes={myCollectionById.data.attributes}
              onOpenModal={() => onOpenModal()}
              onHistoryBack={() => onHistoryBack()}
              textAction={"Buy"}
            />
          )
        )}
      </div>
      {openModalBuyConfirm && (
        <ModalConfirm
          iconColor="text-purple-500"
          title="Confirm Buy NFT"
          desc={`Are you sure to Buy ${detailMarketplace?.data?.name} with ${detailMarketplace?.data?.price} ${nftContractAddress[chain]?.MintCost}?`}
          textAction="Confirm Buy"
          buttonColor="btn-confirm-sell"
          objNFT={detailMarketplace?.data}
          onConfirm={onBuyConfirm}
          onClose={onCloseModalBuyConfirm}
        />
      )}
    </Fragment>
  );
};

export default MarketDetail;
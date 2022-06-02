import { Fragment, useEffect, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Loading } from "web3uikit";

import { Web3Provider } from "../../contexts/connect.context";

import Title from "../../components/shared/Title";

import CardDetailTemplate from "../../components/shared/card/CardDetailTemplate";

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
    detailMarketplace } = useContext(Web3Provider);
  const onHistoryBack = () => {
    if(location?.state?.isMyMarket){
      return navigate("/profile");
    }
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
    </Fragment>
  );
};

export default MarketDetail;
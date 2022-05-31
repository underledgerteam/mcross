import { Fragment, useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loading } from "web3uikit";

import { Web3Provider } from "../../contexts/connect.context";

import ModalSell from "../../components/profile/ModalSell";
import Title from "../../components/shared/Title";
import CardDetailTemplate from "../../components/shared/card/CardDetailTemplate";

const CollectionDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const {
    chain,
    owner,
    account,
    selectConverseNFT,
    myCollectionById,
    nftContractCollection,
    ConnectedWallet,
    ChangeConverseNFT,
    GetByIdCollection,
    ConverseApproveNFT,
    CreateSellCollection } = useContext(Web3Provider);

  const onHistoryBack = () => {
    navigate("/profile");
  };
  const onOpenModal = () => {
    setOpenModal(true);
    ChangeConverseNFT("Marketplace", myCollectionById.data);
  };
  const onConfirmSellNFT = (isApprove, nftPrice) => {
    if (isApprove) {
      CreateSellCollection(
        selectConverseNFT,
        nftPrice,
        () => {
          setOpenModal(false);
          setTimeout(() => {
            navigate('/profile');
          }, 2000);
          localStorage.setItem("myTab", "My Marketplace");
        }
      );
    } else {
      ConverseApproveNFT("Marketplace", selectConverseNFT);
    }
  };
  const onCloseModal = () => {
    setOpenModal(false);
  };
  useEffect(() => {
    if (account && nftContractCollection) {
      ChangeConverseNFT("Marketplace", null);
      GetByIdCollection(params.id);
    }
  }, [account, nftContractCollection]);

  return (
    <Fragment>
      <div className="container md:container md:mx-auto">
        <Title text={"Collection Detail"} />
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
              image={myCollectionById?.data?.image}
              name={myCollectionById?.data?.name}
              nft_owner={myCollectionById?.data?.owner}
              nft_creator={owner}
              description={myCollectionById?.data?.description}
              price={myCollectionById?.data?.price}
              chain={chain}
              attributes={myCollectionById.data.attributes}
              onOpenModal={() => onOpenModal()}
              onHistoryBack={() => onHistoryBack()}
              textAction={"Sell"}
            />
          )
        )}


      </div>
      {openModal && (
        <ModalSell
          objNFT={selectConverseNFT}
          onConfirm={onConfirmSellNFT}
          onClose={onCloseModal}
        />
      )}
    </Fragment>
  );
};

export default CollectionDetail;
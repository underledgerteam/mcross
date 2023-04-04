import { useState, useMemo, Fragment, useRef, useContext, useEffect } from "react";
import { Table, CryptoLogos, Loading } from "web3uikit";
import { useNavigate } from "react-router-dom";

import { Web3Provider } from "../../contexts/connect.context";
import { NFT_CONTRACTS as nftContractAddress, NFT_DEFAULT_CHAIN } from "../../utils/constants";
import Title from "../../components/shared/Title";
import CardContainerTemplate from "../../components/shared/card/CardContainerTemplate";
import CardListTemplate from "../../components/shared/card/CardListTemplate";
import ModalSell from "../../components/profile/ModalSell";
import ModalConfirm from "../../components/shared/ModalConfirm";

import { shortenAddress } from "../../utils/shortenAddress.util";

const menuProfile = [{
  text: "My Collection"
}, {
  text: "My Marketplace"
}, {
  text: "My Transaction"
}];

const data = [...Array(32)].map((v, key) => {
  return [
    key,
    'Buy NFT Name : Doctor strange ' + key,
    '0x19...x25e',
    '0x18...130e',
    '0.1000 WETH',
    '30/04/2022 08:09:54'
  ];
});

const ProfilePage = () => {
  const history = useNavigate();
  const {
    chain,
    account,
    isReload,
    myCollection,
    nftContractMarketplace,
    selectConverseNFT,
    ChangeChain,
    GetMyMarketplace,
    myMarketplace,
    ConverseApproveNFT,
    GetCollection,
    ChangeConverseNFT,
    CreateSellCollection,
    CancelSellCollection,
    ConnectedWallet,
    nftContractCollection,
    checkConnectChain,
    isConnectChain
  } = useContext(Web3Provider);

  const refSelectChain = useRef();

  const [tab, setTab] = useState(localStorage.getItem("myTab") || "My Collection");
  const [openModalSell, setOpenModalSell] = useState(false);
  const [openModalCancelSell, setOpenModalCancelSell] = useState(false);

  const onChangeChain = async () => {
    ChangeChain(Number.parseInt(refSelectChain.current.value));
  };

  const onClickTab = (tab) => {
    setTab(tab);
    localStorage.setItem("myTab", tab);
  };
  // for open Modal Sell
  const handleClickName = (id, isSell = false) => {
    if(isSell){
      return history(`/market/detail/${id}`, {state: { isMyMarket: true }});
    }
    history(`/profile/collection/${id}`);
  };
  const onOpenModalSell = (objNFT) => {
    setOpenModalSell(true);
    ChangeConverseNFT("Marketplace", objNFT);
  };
  const onConfirmSellNFT = (isApprove, nftPrice) => {
    if (isApprove) {
      CreateSellCollection(
        selectConverseNFT,
        nftPrice,
        () => {
          setOpenModalSell(false);
          setTab("My Marketplace");
        }
      );
    } else {
      ConverseApproveNFT("Marketplace", selectConverseNFT);
    }
  };
  const onCloseModalSell = () => {
    setOpenModalSell(false);
  };
  // for open Modal Cancel Sell
  const onOpenModalCancelSell = (objNFT) => {
    ChangeConverseNFT("Marketplace", objNFT);
    setOpenModalCancelSell(true);
  };
  const onConfirmCancelSell = (objNFT) => {
    // alert("Process MetaMask Sell NFT");
    CancelSellCollection(objNFT, () => {
      setOpenModalCancelSell(false);
      setTab("My Collection");
    });
  };
  const onCloseModalCancelSell = () => {
    setOpenModalCancelSell(false);
  };

  const onChangeNetwork = () => {
    ChangeChain(NFT_DEFAULT_CHAIN);
  };

  const columns = useMemo(() => [
    'ID',
    'Event',
    'From',
    'To',
    'Amount',
    'Date UTC',
  ], []);

  useEffect(() => {
    if (refSelectChain?.current?.value) {
      refSelectChain.current.value = chain;
    }
  }, [chain]);

  useEffect(() => {
    if (account && nftContractCollection && nftContractMarketplace) {
      ChangeConverseNFT("Marketplace", null);
      GetCollection();
      GetMyMarketplace();
    }
    checkConnectChain();
  }, [account, isReload, nftContractCollection, nftContractMarketplace]);

  return (
    <Fragment>
      <div className="container md:container md:mx-auto">
        <Title text={"My Profile"} />

        {!account ? (
          <div className="w-full flex-auto py-8 px-8 text-center">
            <div className="">
              <button type="button" className="w-full md:w-96 px-10 py-4 btn-home" onClick={ConnectedWallet}>
                Connect Wallet
              </button>
            </div>
          </div>
        ) : (

          !isConnectChain ? (
            <div className="w-full flex-auto py-8 px-8 text-center">
              <div className="">
                <button type="button" className="w-full md:w-96 px-10 py-4 btn-home" onClick={onChangeNetwork}>
                  Switch to Goerli
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="w-full">
                <CardContainerTemplate
                  padding="py-8 px-8"
                  margin="my-20"
                >
                  <Fragment>
                    <div className="flex justify-center -mt-16">
                      <CryptoLogos
                        chain={nftContractAddress[chain]?.Icon.toLowerCase()}
                        size="7.5rem"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h2 className="text-3xl font-semibold mt-4 text-center">{shortenAddress(account)}</h2>
                      <div className="flex items-end mt-3 mx-auto">
                        <div className="text-white text-xl lg:text-3xl font-bold mr-4">Chain: </div>
                        <div className="inline-block relative w-full text-gray-700 mt-4">
                          <select
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            ref={refSelectChain}
                            onChange={() => onChangeChain()}
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
                      {menuProfile.map((item, key) => {
                        return (
                          <button
                            type="button"
                            className={`btn-menu-profile ${tab === item.text && ("active")}`}
                            onClick={() => onClickTab(item.text)}
                            key={key}
                          >
                            {item.text}
                          </button>
                        );
                      })}

                    </div>
                  </Fragment>
                </CardContainerTemplate>
              </div>

              {tab === "My Collection" && (
                <CardContainerTemplate
                  title="My Collection"
                  padding="p-6"
                  margin="my-0 md:my-20"
                >
                  {/* No Record! */}
                  <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
                    {myCollection.loading ? (<div className="col-span-3 mx-auto">
                      <Loading
                        fontSize={20}
                        size={100}
                        spinnerColor="#fff"
                        text="Loading...."
                      /></div>) :
                      (myCollection?.list.length > 0) ? myCollection.list.map((item, key) => {
                        return (
                          // <CardNFT
                          //   key={key}
                          //   objNFT={{
                          //     ...item,
                          //     chain: nftContractAddress[chain]?.ShortLabel
                          //   }}
                          //   onClickSell={(objNFT) => onOpenModalSell(objNFT)}
                          // />
                          <CardListTemplate
                            key={key}
                            id={item.edition}
                            name={item.name}
                            price={item.price}
                            image={item.image}
                            rarity={'Common'}
                            chain={nftContractAddress[chain]?.ShortLabel}
                            textAction={`Sell ${item.name}`}
                            onClick={() => handleClickName(item.edition, false)}
                            onClickAction={() => onOpenModalSell(item)}
                          />
                        );
                      }) : (<h5 className="text-center text-2xl col-span-3 text-gray-200">My Collection No Result...</h5>)
                    }
                  </div>
                </CardContainerTemplate>
              )}

              {tab === "My Marketplace" && (
                <CardContainerTemplate
                  title="My Marketplace"
                  padding="p-6"
                  margin="my-0 md:my-20"
                >
                  <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
                    {myMarketplace.loading ? (<div className="col-span-3 mx-auto">
                      <Loading
                        fontSize={20}
                        size={100}
                        spinnerColor="#fff"
                        text="Loading...."
                      /></div>) :
                      (myMarketplace?.list.length > 0) ? myMarketplace.list.map((item, key) => {
                        return (
                          <CardListTemplate
                            key={key}
                            id={item.edition}
                            name={item.name}
                            price={item.price}
                            image={item.image}
                            rarity={'Common'}
                            chain={nftContractAddress[chain]?.ShortLabel}
                            textAction={`Cancel Sell`}
                            sell={true}
                            onClick={() => handleClickName(item.edition, true)}
                            onClickAction={() => onOpenModalCancelSell(item)}
                          />
                        );
                      }) : (<h5 className="text-center text-2xl col-span-3 text-gray-200">My Collection No Result...</h5>)
                    }
                  </div>
                </CardContainerTemplate>
              )}

              {tab === "My Transaction" && (
                <CardContainerTemplate
                  title="My Transaction"
                  padding="p-6"
                  margin="my-0 md:my-20"
                >
                  <Table
                    columnsConfig="80px 3fr 2fr 2fr 2fr 3fr"
                    data={data}
                    header={columns}
                    maxPages={3}
                    onPageNumberChanged={(number) => console.log(number)}
                    pageSize={5}
                  />
                </CardContainerTemplate>
              )}

            </div>
          )
        )}

        {openModalSell && (
          <ModalSell
            objNFT={selectConverseNFT}
            onConfirm={onConfirmSellNFT}
            onClose={onCloseModalSell}
          />
        )}

        {openModalCancelSell && (
          <ModalConfirm
            iconColor="text-red-500"
            title="Are you sure?"
            desc={`Do you really want to cancel sale NFT ${selectConverseNFT?.name} ?`}
            textAction="Cancel Sell"
            buttonColor="btn-cancel-sell"
            objNFT={selectConverseNFT}
            onConfirm={onConfirmCancelSell}
            onClose={onCloseModalCancelSell}
          />
        )}

      </div>
    </Fragment>
  );
};

export default ProfilePage;
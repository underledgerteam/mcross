import React, { useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "web3uikit";
import { Web3Provider } from "../../contexts/connect.context";

import marketReducer from "./market.reducer";
import { getAllSaleNFT } from "../../services/market.service";

import Title from "../../components/shared/Title";
import CardContainerTemplate from "../../components/shared/card/CardContainerTemplate";
import CardListTemplate from "../../components/shared/card/CardListTemplate";

import { NFT_CONTRACTS as nftContractAddress, NFT_DEFAULT_CHAIN } from "../../utils/constants";

const { TYPES, defaultValue, reducer } = marketReducer;

const AllMarket = () => {
  const history = useNavigate();

  const {
    chain,
    account,
    ConnectedWallet,
    nftContractMarketplace,
    isReload,
    listMarketplace,
    ChangeChain,
    isConnectChain,
    checkConnectChain
  } = useContext(Web3Provider);

  const [marketState, dispatch] = useReducer(reducer, defaultValue);
  const { loading, data } = marketState;
  console.log('loading', loading);
  console.log('data', data);

  useEffect(() => {
    const init = async () => {
      if (account && nftContractMarketplace) {
        dispatch({ type: TYPES.START_INIT });
        const payload = await getAllSaleNFT();
        dispatch({ type: TYPES.FINISH_INIT, payload });
      }
    };
    init();
    checkConnectChain();
    return () => {

    };
  }, [account, isReload, nftContractMarketplace]);

  const handleClickName = (id) => {
    history(`/market/detail/${id}`);
  };

  const handleClickAction = (id) => {
    console.log(id);
  };

  const onChangeNetwork = () => {
    ChangeChain(NFT_DEFAULT_CHAIN);
  };

  return (
    <div className="w-full flex flex-col">
      <Title text={"Marketplace"} />

      <div className="h-full flex gap-x-4 lg:gap-x-8 justify-center">

        {!account ? (
          <div className="w-full lg:w-1/2 flex-auto py-8 px-8 text-center">
            <div className="">
              <button type="button" className="w-full md:w-96 px-10 py-4 btn-home" onClick={ConnectedWallet}>
                Connect Wallet
              </button>
            </div>
          </div>
        ) : (

          !isConnectChain ? (
            <div className="w-full lg:w-1/2 flex-auto py-8 px-8 text-center">
              <div className="">
                <button type="button" className="w-full md:w-96 px-10 py-4 btn-home" onClick={onChangeNetwork}>
                  Switch to Ropsten
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full">
              <CardContainerTemplate
                padding="py-8 px-8"
                margin="my-8"
              >
                <div className="flex flex-col">
                  <div className="grid md:grid-cols-sm md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {loading ? (<div className="col-span-4 mx-auto">
                      <Loading
                        fontSize={20}
                        size={100}
                        spinnerColor="#fff"
                        text="Loading...."
                      /></div>) :
                      (data.length > 0) ? data.map((item, key) => {
                        return (<div className="w-full rounded overflow-hidden shadow-md hover:shadow-xl bg-[#292929] relative group" key={key} >
                          <CardListTemplate
                            id={item.edition}
                            name={item.name}
                            price={item.price}
                            image={item.image}
                            rarity={'Common'}
                            chain={nftContractAddress[chain]?.ShortLabel}
                            owner={item.owner}
                            textAction={'Buy'}
                            onClick={() => handleClickName(item.edition)}
                            onClickAction={() => handleClickAction(item.edition)}
                          />
                        </div>
                        );
                      }) : (<h5 className="text-center text-2xl col-span-4 text-gray-200">Marketplace List No Result...</h5>)
                    }
                  </div>
                </div>
              </CardContainerTemplate>
            </div>
          )
        )}

      </div>

    </div >
  );
};

export default AllMarket;
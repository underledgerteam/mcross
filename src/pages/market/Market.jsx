import React, { useContext } from "react";
import { Web3Provider } from "../../contexts/connect.context";

import { NFT_DATA } from "../../assets/data/mockUpData";
import CardDetail from "../../components/shared/card/CardDetail";

const Market = () => {

  const { account, ConnectedWallet } = useContext(Web3Provider);

  const data = NFT_DATA;

  const handleClickName = (id) => {
    console.log(id);
  };

  const handleClickAction = (id) => {
    console.log(id);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="mx-auto font-bold text-4xl text-white uppercase">Marketplace</div>
      <div className="h-full flex gap-x-4 lg:gap-x-8 justify-center">

        {!account ? (
          <div className="w-full lg:w-1/2 flex-auto py-8 px-8 text-center">
            <div className="">
              <button type="button" className="w-96 px-10 py-4 btn-home" onClick={ConnectedWallet}>
                Connect Wallet
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full">
            <div className="py-8 px-8 shadow-lg rounded-lg my-20 backdrop-blur-lg bg-[#323652]/50">
              <div className="flex flex-col">
                <div className="grid lg:grid-cols-4 grid-cols-1 gap-4">
                  {data?.map((item) => (
                    <div className="w-full rounded overflow-hidden shadow-md hover:shadow-xl bg-[#292929] relative group" key={item.id} >
                      <CardDetail
                        id={item.id}
                        name={item.title}
                        price={item.currentBid}
                        image={item.imgUrl}
                        rarity={'Common'}
                        chain={'Ethereum'}
                        textAction={'Buy'}
                        onClick={() => handleClickName(item.id)}
                        onClickAction={() => handleClickAction(item.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

    </div >
  );
};

export default Market;
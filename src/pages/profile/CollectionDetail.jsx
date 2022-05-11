import { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ModelSell from "../../components/profile/ModelSell";
import NotificationSellNFT from "../../components/profile/Notification";

const CollectionDetail = () => {
  const params = useParams();

  const [ openModel, setOpenModel ] = useState(false);
  const [ notification, setNotification ] = useState(false);
  
  const onOpenModel = () => {
    setOpenModel(true);
  }
  const onConfirmSellNFT = () => {
    // alert("Process MetaMask Sell NFT");
    setOpenModel(false);
    setNotification(true);
    setTimeout(()=>{
      setNotification(false);
    }, 3500);
  }
  const onCloseModel = () => {
    setOpenModel(false);
  }

  return (
    <Fragment>
      <div className="h-screen w-screen">
        <div className="container md:container md:mx-auto">

        { notification && (
          <NotificationSellNFT />
        ) }
      
          <div className="text-7xl font-dark font-extrabold mb-8">Collection Detail #{params.id}</div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="w-full">
              <div className="py-8 px-8 shadow-lg rounded-lg my-20 backdrop-blur-lg bg-[#323652]/50">
                <div className="flex justify-center">
                  <img className="w-72 h-72 object-cover border-8 border-purple-500" src="https://th.jobsdb.com/en-th/cms/employer/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png" alt="collection" />
                </div>
                <div className="grid justify-items-center">
                  <h2 className="text-2xl font-semibold mt-4">Rarity : <span className="py-2 px-3 bg-purple-400 text-purple-900 text-base rounded-lg">Legend</span> </h2>
                  <h2 className="text-2xl font-semibold mt-2">Chain : Polygon</h2>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2 w-full p-6 rounded-lg shadow-lg backdrop-blur-lg bg-[#323652]/50 my-0 md:my-20">
              <h5 className="text-4xl text-extrabold text-center leading-tight font-bold mb-2">Pikachu #5135879852</h5>
              
              <div className="md:flex justify-around">
                <div className="flex mt-8 items-center px-5 py-5 bg-[#C0C9F6]/30 rounded-lg">
                  <img className="w-24 h-24 object-cover border-purple-500" src="https://th.jobsdb.com/en-th/cms/employer/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png" alt="owner_avatar" />
                  <div className="ml-5">
                    <h5 className="text-xl">Owner By</h5>
                    <p className="text-xl">0x586F...40dd</p>
                  </div>
                </div>
                
                <div className="flex mt-8 items-center px-5 py-5 bg-[#C0C9F6]/30 rounded-lg">
                  <img className="w-24 h-24 object-cover border-purple-500" src="https://th.jobsdb.com/en-th/cms/employer/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png" alt="creator_avatar" />
                  <div className="ml-5">
                    <h5 className="text-xl">Creator By</h5>
                    <p className="text-xl">0x586F...40dd</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-5">
                <h5 className="text-2xl">Detail : </h5>
                <p className="text-lg">An AxelarSea sample NFT for Moonbeam testnet 
                  (Moonbase alpha). AxelarSea is the First Cross-Chain 
                  NFT Marketplace where you can Trade NFTs. 
                  Using Any Token. From Any Chain
                </p>
              </div>
              <div className="flex justify-center mt-5">
                <div className="w-56">
                  <button 
                    type="button" 
                    className="btn-menu-profile active"
                    onClick={()=> onOpenModel()}
                  >
                    Sale
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        { openModel && (
          <ModelSell 
            onConfirm={onConfirmSellNFT}
            onClose={onCloseModel}
          />
        ) }
      </div>
    </Fragment>
  )
}

export default CollectionDetail;
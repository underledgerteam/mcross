import { Fragment, useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Web3Provider } from "../../contexts/connect.context";

import ModelSell from "../../components/profile/ModelSell";
import NotificationSellNFT from "../../components/profile/Notification";

import { ipfsUriToHttps } from "../../utils/ipfsUriToHttps";

const CollectionDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [ openModel, setOpenModel ] = useState(false);
  const [ notification, setNotification ] = useState(false);
  const [ myCollectionSell, setMyCollectionSell ] = useState({});
  const { myCollectionById, GetByIdCollection } = useContext(Web3Provider);
 
  const onHistoryBack = () => {
    navigate("/profile");
  }
  const onOpenModel = () => {
    setOpenModel(true);
  }
  const onConfirmSellNFT = () => {
    // alert("Process MetaMask Sell NFT");
    setOpenModel(false);
    setNotification(true);
    setTimeout(()=>{
      setNotification(false);
    }, 1500);
    setTimeout(()=>{
      navigate('/profile');
    }, 2000);
    localStorage.setItem("myTab", "My Marketplace");
  }
  const onCloseModel = () => {
    setOpenModel(false);
  }

  useEffect(()=>{
    GetByIdCollection(params.id);
  },[]);

  return (
    <Fragment>
      <div className="h-screen w-screen">
        <div className="container md:container md:mx-auto">

        { notification && (
          <NotificationSellNFT objData={myCollectionById.data} />
        ) }
      
          <div className="text-6xl font-dark font-extrabold mb-8">Collection Detail</div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="w-full">
              <div className="py-8 px-8 shadow-lg rounded-lg md:my-5 lg:my-15 backdrop-blur-lg bg-[#323652]/50">
                <div className="flex justify-center">
                  <img className="w-48 h-48 lg:w-72 lg:h-72 object-cover border-8 border-purple-500" src={myCollectionById?.data?.image && ipfsUriToHttps(myCollectionById?.data.image)} alt={myCollectionById?.data?.name} />
                </div>
                <div className="grid justify-items-center">
                  <h2 className="text-2xl font-semibold mt-4">Rarity : <span className="py-2 px-3 bg-purple-400 text-purple-900 text-base rounded-lg">Legend</span> </h2>
                  <h2 className="text-2xl font-semibold mt-2">Chain : Polygon</h2>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2 w-full p-6 rounded-lg shadow-lg backdrop-blur-lg bg-[#323652]/50 md:my-5 lg:my-15">
              <h5 className="text-4xl text-extrabold text-center leading-tight font-bold mb-2">{myCollectionById?.data?.name}</h5>
              
              <div className="lg:flex justify-around">
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
                <p className="text-lg">{myCollectionById?.data?.description}</p>
              </div>
              <div className="flex justify-between mt-5">
                <div className="w-56">
                  <button 
                    type="button" 
                    className="btn-menu-profile border border-gray-300"
                    onClick={()=> onHistoryBack()}
                  >
                    Back
                  </button>
                </div>
                <div className="w-56">
                  <button 
                    type="button" 
                    className="w-full font-bold py-3 px-12 mt-4 rounded bg-gradient-to-r from-custom-purple1 to-pink-500 hover:from-custom-purple1/90 hover:to-pink-500/90 text-white"
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
            objData={myCollectionById.data}
            onConfirm={onConfirmSellNFT}
            onClose={onCloseModel}
          />
        ) }
      </div>
    </Fragment>
  )
}

export default CollectionDetail;
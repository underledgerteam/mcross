import { Fragment, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const CollectionDetail = () => {
  // set default fees
  const serviceFee = 3, axelarFee = 2, creatorFee = 10;

  const params = useParams();

  const refPrice = useRef();
  const [ price, setPrice ] = useState(0);
  const [ openModel, setOpenModel ] = useState(true);
  const [ notification, setNotification ] = useState(false);

  const onClickSale = () => {
    setOpenModel(true);
  }
  const onClose = () => {
    setPrice(0);
    setOpenModel(false);
  }
  const onChangePrice = () => {
    const priceVal = Number(refPrice.current.value);
    const amount = priceVal-((priceVal*serviceFee/100)+(priceVal*axelarFee/100));
    const total = amount-(amount*creatorFee/100);
    setPrice(total);
  }
  const onConfirm = () => {
    alert("Process MetaMask Sell NFT");
    setOpenModel(false);
    setNotification(true);
    setTimeout(()=>{
      setNotification(false);
    }, 3500);
  }

  return (
    <Fragment>
      <div className="h-screen w-screen">
        <div className="container md:container md:mx-auto">
          { notification && (
            <Fragment>
              <div class="fixed mx-5 top-10 right-auto md:right-5 bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md z-[1]" role="alert">
                <div class="flex">
                  <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                  <div>
                    <p class="font-bold">Success</p>
                    <p class="text-sm">You Success Sell NFT <span className="font-bold">Pikachu #513587985</span> with 100 WETH</p>
                  </div>
                </div>
              </div>
              <div class="fixed mx-5 top-[130px] right-auto md:right-5 bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md z-[1]" role="alert">
                <div class="flex">
                  <div class="py-1"><svg class="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                  <div>
                    <p class="font-bold">Rejected</p>
                    <p class="text-sm">MetaMask Signature. User denied transaction signature</p>
                  </div>
                </div>
              </div>
              <div class="fixed mx-5 top-[220px] right-auto md:right-5 bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md z-[1]" role="alert">
                <div class="flex">
                  <div class="py-1"><svg class="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                  <div>
                    <p class="font-bold">Rejected</p>
                    <p class="text-sm">MetaMask Signature. User denied transaction signature</p>
                  </div>
                </div>
              </div>
            </Fragment>
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
                    onClick={()=> onClickSale()}
                  >
                    Sale
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        { openModel && (
          <div className="min-w-screen h-screen fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none">
            <div className="absolute bg-black opacity-70 inset-0 z-0" />
            <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
              <div className="text-gray-500 ">
                <div className="text-center p-5 flex-auto justify-center">
                  <h2 className="text-xl font-bold py-4 text-gray-800">Sale NFT</h2>
                  <div>
                    <div className="flex">
                      <h5 className="text-warmGray-200 text-2xl">Price: </h5>
                      <input 
                        type="number" 
                        className="mx-3 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        ref={refPrice} 
                        onChange={onChangePrice}
                      />
                      
                      <div className="inline-block relative w-64 text-gray-700">
                        <select 
                          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        >
                          <option selected>WETH</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                      </div>
                    </div>
                    
                    <h5 className="text-warmGray-200 text-2xl text-left mt-3 mb-2">Fees:</h5>
                    <div className="ml-8 mr-5 text-2xl text-warmGray-200 text-left">
                      
                      <div className="grid grid-cols-2 text-xl">
                        <p>Service Fee : </p>
                        <p className="text-right">{serviceFee}%</p>
                        <p>Axelar Fee : </p>
                        <p className="text-right">{axelarFee}%</p>
                        <p>Creator Fee : </p>
                        <p className="text-right">{creatorFee}%</p>
                      </div>
                    </div>
                    
                    <div className="flex border-b-4 border-warmGray-300 rounded-lg my-5"></div>
                    
                    <div className="ml-8 text-2xl text-warmGray-200 text-left">
                      You Recieve : {price} Weth
                      <div className="text-sm mt-3">
                        <p className="text-lg">Example</p>
                        <p>1. Amount = Price - (Service Fee + Axelar Fee)(%)</p>
                        <p>2. Total = Amount - Creator Fee(%)</p>
                      </div>
                    </div>
                  </div>    
                </div>
                <div className="p-3  mt-2 text-center space-x-4 md:block">
                  <button 
                    className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                    onClick={()=> onClose()}
                  >
                    Close
                  </button>
                  <button 
                    className="mb-2 text-white md:mb-0 bg-yellow-500 border border-yellow-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider rounded-full hover:shadow-lg hover:bg-yellow-600"
                    onClick={()=> onConfirm()}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) }
      </div>
    </Fragment>
  )
}

export default CollectionDetail;
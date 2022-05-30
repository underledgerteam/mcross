import { useState, useRef, Fragment, useContext } from "react";
import { Loading } from "web3uikit";
import { Web3Provider } from "../../contexts/connect.context";
import {
  NFT_CONTRACTS,
} from "../../utils/constants";

const ModalSell = ({ objNFT, onConfirm, onClose }) => {
  // set default fees
  const serviceFee = 3, axelarFee = 2, creatorFee = 10;
  const refPrice = useRef();
  const [ price, setPrice ] = useState(0);
  const { chain } = useContext(Web3Provider);
  const onChangePrice = () => {
    const priceVal = Number(refPrice?.current?.value || 0);
    // const amount = priceVal-((priceVal*serviceFee/100)+(priceVal*axelarFee/100));
    const amount = priceVal-(priceVal*serviceFee/100);
    const total = amount-(amount*creatorFee/100);
    setPrice(total.toFixed(7));
  }

  return(
    <Fragment>
      <div className="min-w-screen h-screen fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none">
        <div className="absolute bg-black opacity-70 inset-0 z-0" />
        <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
          <div className="text-gray-500">
            <div className="text-center p-5 flex-auto justify-center">
              <h2 className="text-xl font-bold pt-4 text-gray-800">Sale NFT</h2>
              <h2 className="text-xl font-bold pt-2 pb-4">{objNFT?.name}</h2>
              { !objNFT?.name? (<div className="flex justify-center items-center mb-3"><Loading size={50} spinnerColor="#6b7280" fontSize={18} text="Loading NFT ..." /></div>)
                :<div>
                  <div className="flex">
                    <h5 className="text-warmGray-200 text-2xl">Price: </h5>
                    <input 
                      type="number" 
                      disabled={objNFT?.approveLoading}
                      className="mx-3 shadow appearance-none w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                      ref={refPrice} 
                      onChange={onChangePrice}
                    />
                    
                    <div className="inline-block relative mr-5 text-gray-500">
                      <h5 className="text-warmGray-200 text-2xl text-left">{ NFT_CONTRACTS[chain].MintCost }</h5>
                    </div>
                  </div>
                  
                  <h5 className="text-warmGray-200 text-2xl text-left mt-3 mb-2">Fees:</h5>
                  <div className="ml-8 mr-5 text-2xl text-warmGray-200 text-left">
                    
                    <div className="grid grid-cols-2 text-xl">
                      <p>Service Fee : </p>
                      <p className="text-right">{serviceFee}%</p>
                      {/* <p>Axelar Fee : </p>
                      <p className="text-right">{axelarFee}%</p> */}
                      <p>Creator Fee : </p>
                      <p className="text-right">{creatorFee}%</p>
                    </div>
                  </div>
                  
                  <div className="flex border-b-4 border-warmGray-300 rounded-lg my-5"></div>
                  
                  <div className="ml-8 text-2xl text-warmGray-200 text-left">
                    You Receive : {price} { NFT_CONTRACTS[chain].MintCost }
                    <div className="text-sm mt-3">
                      <p className="text-lg">Example</p>
                      {/* <p>1. Amount = Price - (Service Fee + Axelar Fee)(%)</p> */}
                      <p>1. Amount = Price - Service Fee(%)</p>
                      <p>2. You Receive = Amount - Creator Fee(%)</p>
                    </div>
                  </div>
                </div>   
              } 
            </div>
            <div className="p-3  mt-2 text-center space-x-4 md:block">
              <button 
                className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                onClick={()=> onClose()}
              >
                Close
              </button>
              <button 
                disabled={!objNFT?.name || objNFT?.approveLoading || (Number(refPrice?.current?.value || 0) <= 0 && objNFT?.approve)}
                className="mb-2 btn-confirm-sell"
                onClick={()=> {
                  if(Number(refPrice?.current?.value || 0) <= 0 && objNFT?.approve){
                    refPrice.current.focus();
                  }else{
                    onConfirm(objNFT?.approve, Number(refPrice.current.value));
                  }
                }}
              >
                <div className="flex justify-center gap-2">
                  { objNFT?.approveLoading && <Loading size={14} direction="right" />}
                  { objNFT?.approve?"Confirm": "Approve" }
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default ModalSell;
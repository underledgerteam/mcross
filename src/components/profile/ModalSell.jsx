import { useState, Fragment, useContext } from "react";
import { Loading, Input } from "web3uikit";
import { Web3Provider } from "../../contexts/connect.context";
import { numberToBigNumber } from "../../utils/calculator"; 
import {
  NFT_CONTRACTS,
} from "../../utils/constants";

const ModalSell = ({ objNFT, onConfirm, onClose }) => {
  // set default fees
  const serviceFee = numberToBigNumber(3), axelarFee = numberToBigNumber(2), creatorFee = numberToBigNumber(10), percent = numberToBigNumber(100);
  const [ price, setPrice ] = useState({ value: 0, fee: 0});
  const { chain } = useContext(Web3Provider);

  const onChangePrice = (e) => {
    const priceVal = numberToBigNumber(e.target.value);
    const amount = priceVal.minus(priceVal.times(serviceFee).div(percent));
    const total = amount.minus(amount.times(creatorFee).div(percent));
    setPrice({
      value: numberToBigNumber(e.target.value),
      fee: !total.isNaN() && total.isPositive() ? total.toFixed(7): 0
    });
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
                    <Input
                      type="number"
                      autoFocus
                      disabled={objNFT?.approveLoading}
                      step={0.0000001}
                      value={price.value}
                      validation={{
                        numberMin: 0.0000001,
                      }}
                      style={{marginLeft: '1rem', marginRight: '1rem'}}
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
                      <p className="text-right">{serviceFee.toFixed()}%</p>
                      {/* <p>Axelar Fee : </p>
                      <p className="text-right">{axelarFee}%</p> */}
                      <p>Creator Fee : </p>
                      <p className="text-right">{creatorFee.toFixed()}%</p>
                    </div>
                  </div>
                  
                  <div className="flex border-b-4 border-warmGray-300 rounded-lg my-5"></div>
                  
                  <div className="ml-8 text-2xl text-warmGray-200 text-left">
                    You Receive : {price.fee} { NFT_CONTRACTS[chain].MintCost }
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
                disabled={!objNFT?.name || objNFT?.approveLoading || price.fee <= 0}
                className="mb-2 btn-confirm-sell"
                onClick={()=> {
                  onConfirm(objNFT?.approve, price.value.toFixed(7));
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
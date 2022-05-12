import { useState, useRef, Fragment } from "react";

const ModelSell = ({ onConfirm, onClose }) => {
  // set default fees
  const serviceFee = 3, axelarFee = 2, creatorFee = 10;
  const refPrice = useRef();
  const [ price, setPrice ] = useState(0);

  const onChangePrice = () => {
    const priceVal = Number(refPrice.current.value);
    const amount = priceVal-((priceVal*serviceFee/100)+(priceVal*axelarFee/100));
    const total = amount-(amount*creatorFee/100);
    setPrice(total);
  }

  return(
    <Fragment>
      <div className="min-w-screen h-screen fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none">
        <div className="absolute bg-black opacity-70 inset-0 z-0" />
        <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
          <div className="text-gray-500 ">
            <div className="text-center p-5 flex-auto justify-center">
              <h2 className="text-xl font-bold pt-4 text-gray-800">Sale NFT</h2>
              <h2 className="text-xl font-bold pt-2 pb-4">Pikachu #513587985</h2>
              <div>
                <div className="flex">
                  <h5 className="text-warmGray-200 text-2xl">Price: </h5>
                  <input 
                    type="number" 
                    className="mx-3 shadow appearance-none w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    ref={refPrice} 
                    onChange={onChangePrice}
                  />
                  
                  <div className="inline-block relative w-64 text-gray-700">
                    <select 
                      className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option>WETH</option>
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
                className="mb-2 text-white md:mb-0 bg-custom-purple2/90 border border-custom-purple1 px-5 py-2 text-sm shadow-sm font-medium tracking-wider rounded-full hover:shadow-lg hover:bg-custom-purple2"
                onClick={()=> onConfirm()}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default ModelSell;
import { Fragment } from "react";
import { Loading } from "web3uikit";

const ModelCancelSell = ({ objNFT, onConfirm, onClose }) => {
  return(
    <Fragment>
      <div className="min-w-screen h-screen fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none">
        <div className="absolute bg-black opacity-70 inset-0 z-0" />
        <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
          <div className="text-gray-500 ">
            <div className="text-center p-5 flex-auto justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 flex items-center text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-xl font-bold py-4 ">Are you sure?</h2>
              <p className="text-sm text-gray-500 px-8">Do you really want to cancel sale NFT {objNFT?.name} ?
              </p>    
            </div>
          </div>
          <div className="p-3  mt-2 text-center space-x-4 md:block">
            <button 
              className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
              onClick={()=> onClose()}
            >
              Cancel
            </button>
            <button 
              disabled={objNFT?.approveLoading}
              className={`mb-2 md:mb-0 ${objNFT?.approveLoading && "w-36"} btn-cancel-sell`}
              onClick={()=> onConfirm(objNFT)}
            >
              { objNFT?.approveLoading?(
                <Loading fontSize={14} size={14} text="Cancel Sell" direction="right" />
              ):"Cancel Sell" }
            </button>
            
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default ModelCancelSell;
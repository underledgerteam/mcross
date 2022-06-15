import { Fragment } from "react";
import { Loading } from "web3uikit";

const ModalConfirm = ({ iconColor, title, desc, textAction, buttonColor, objNFT, onConfirm, onClose }) => {
  return(
    <Fragment>
      <div className="min-w-screen h-screen fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none">
        <div className="absolute bg-black opacity-70 inset-0 z-0" />
        <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
          <div className="text-gray-500 ">
            <div className="text-center p-5 flex-auto justify-center">
              { !objNFT?.name? <div className="flex justify-center items-center mb-3"><Loading size={50} spinnerColor="#6b7280" fontSize={18} text="Loading NFT ..." /></div>
                :<Fragment>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`w-20 h-20 flex items-center ${iconColor} mx-auto`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg> 
                  <h2 className="text-xl font-bold py-4 ">{title}</h2>
                  <p className="text-sm text-gray-500 px-8" style={{whiteSpace: 'pre-line'}}>{desc}</p>  
                </Fragment>  
              }
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
              disabled={!objNFT?.name || objNFT?.approveLoading}
              className={`md:mb-0 ${buttonColor}`}
              onClick={()=> onConfirm(objNFT)}
            >
              <div className="flex justify-center gap-2">
                { objNFT?.approveLoading &&(<Loading size={14} direction="right" />) } 
                { textAction }
              </div>
            </button>
            
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default ModalConfirm;
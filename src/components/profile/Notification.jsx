import { Fragment } from "react";

const NotificationSellNFT = ({objData}) => {
  return(
    <Fragment>
      <div className="fixed mx-5 top-10 right-auto md:right-5 bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md z-[1]" role="alert">
        <div className="flex">
          <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
          <div>
            <p className="font-bold">Success</p>
            <p className="text-sm">You Success Sell NFT <span className="font-bold">{objData?.name}</span> with 100 WETH</p>
          </div>
        </div>
      </div>
      <div className="fixed mx-5 top-[130px] right-auto md:right-5 bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md z-[1]" role="alert">
        <div className="flex">
          <div className="py-1"><svg className="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
          <div>
            <p className="font-bold">Rejected</p>
            <p className="text-sm">MetaMask Signature. User denied transaction signature</p>
          </div>
        </div>
      </div>
      <div className="fixed mx-5 top-[220px] right-auto md:right-5 bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md z-[1]" role="alert">
        <div className="flex">
          <div className="py-1"><svg className="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
          <div>
            <p className="font-bold">Rejected</p>
            <p className="text-sm">MetaMask Signature. User denied transaction signature</p>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default NotificationSellNFT;
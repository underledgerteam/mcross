import { Link } from "react-router-dom";

const CardNFT = ({objData, sell = false, onClickSell = ()=>{}, onClickCancelSell = ()=> {}}) => {
  return(
      <div className="w-full rounded overflow-hidden shadow-md hover:shadow-xl cursor-pointer bg-[#292929] relative group">
        {/* { sell && (
          <div className="hover:bg-gray-800 rounded h-full w-full hover:bg-opacity-80 absolute ">
            <button 
              className={`w-56 font-bold py-3 px-12 rounded bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700 absolute top-3/4 left-1/2 -translate-y-2/4 -translate-x-2/4 invisible group-hover:visible`}
              onClick={onClickCancelSell}
            >
              Cancel Sell
            </button>
          </div>
        ) } */}
        <Link to={`/profile/collection/${objData.id}`}>
          <img className="w-full" src={`https://picsum.photos/id/8${objData.id}/200`} alt="Sunset in the mountains" />
          <div className="px-6 py-4">
            <div className="grid grid-cols-2">
              <p><span className="bg-slate-100 text-slate-800 text-xs font-semibold px-1.5 py-0.5 rounded">🔗{objData.china.charAt(0).toUpperCase() + objData.china.slice(1)}</span></p>
              <p className="text-right"><span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">Legend</span></p>
            </div>
            <div className="font-bold text-white text-xl mb-2">Name: The Coldest Sunset {objData.id}</div>
            { sell && (<div className="font-bold text-white text-right text-xl">🪙: 0.01 WETH</div>) }
            {/* <div className="grid grid-cols-2">
              <p>a</p>
              <p className="text-right">b</p>
            </div> */}
          </div>
        </Link>
        
        <div className="px-6 mb-5">
          { sell ? (
            <button 
              className={`w-full font-bold py-3 px-12 rounded bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700 z-50`}
              onClick={onClickCancelSell}
            >
              Cancel Sell
            </button>
          ): (
            <button 
              className={`w-full font-bold py-3 px-12 rounded bg-gradient-to-r from-green-500 to-blue-600 text-white hover:from-pink-500 hover:to-yellow-500 z-50`}
              onClick={onClickSell}
            >
              Sell #292929{objData.id}
            </button>
          ) }
        </div>
      </div>
  )
}

export default CardNFT;
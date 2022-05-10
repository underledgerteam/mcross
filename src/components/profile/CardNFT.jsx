import { Link } from "react-router-dom";

const CardNFT = ({id, sell = false}) => {
  return(
    <Link to={`${!sell?`/profile/collection/${id}`: `#`}`}>
      <div className="max-w-sm rounded overflow-hidden shadow-md hover:shadow-xl cursor-pointer bg-[#292929] relative group">
        { sell && (
          <div className="hover:bg-gray-800 rounded h-full w-full hover:bg-opacity-80 absolute ">
            <button 
              className={`w-56 font-bold py-3 px-12 rounded bg-gradient-to-r from-green-500 to-blue-600 text-white hover:from-pink-500 hover:to-yellow-500 absolute top-3/4 left-1/2 -translate-y-2/4 -translate-x-2/4 invisible group-hover:visible`}
            >
              Cancel Sell
            </button>
          </div>
        ) }
        <img className="w-full" src={`https://picsum.photos/id/8${id}/200`} alt="Sunset in the mountains" />
        <div className="px-6 py-4">
          <div className="grid grid-cols-2">
            <p><span className="bg-slate-100 text-slate-800 text-xs font-semibold px-1.5 py-0.5 rounded">🔗Ethereum</span></p>
            <p className="text-right"><span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">Legend</span></p>
          </div>
          <div className="font-bold text-white text-xl mb-2">Name: The Coldest Sunset {id}</div>
          {/* <div className="grid grid-cols-2">
            <p>a</p>
            <p className="text-right">b</p>
          </div> */}
        </div>
      </div>
    </Link>
  )
}

export default CardNFT;
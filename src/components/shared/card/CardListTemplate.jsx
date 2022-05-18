import React from "react";


const CardListTemplate = ({ name, textAction, price, image, rarity, chain, onClick, onClickAction }) => {

  return (
    <div className="w-full rounded overflow-hidden shadow-md hover:shadow-xl bg-[#292929] relative group">
      <img className="w-full cursor-pointer" src={image} alt={name} onClick={onClick} />
      <div className="px-6 py-4">
        <div className="grid grid-cols-2">
          <p><span className="bg-slate-100 text-slate-800 text-xs font-semibold px-1.5 py-0.5 rounded">🔗{chain}</span></p>
          <p className="text-right"><span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">{rarity} #</span></p>
        </div>
        <div className="grid grid-cols-2">
          <div className="font-bold text-white text-xl mb-2 mt-3 cursor-pointer" onClick={onClick}>{name}</div>
          {price && (<div className="font-bold text-white text-right justify-right text-xl mb-2 mt-3">🪙: {price} ETH</div>)}
        </div>
        <div className="mt-5">
          <button
            className={`w-full font-bold py-3 px-12 rounded bg-gradient-to-r from-green-500 to-blue-600 text-white hover:from-pink-500 hover:to-yellow-500 z-50`}
            onClick={onClickAction}
          >
            {textAction}
          </button>
        </div>

      </div>

    </div >
  );
};

export default CardListTemplate;
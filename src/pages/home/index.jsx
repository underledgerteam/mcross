import { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [ account, setAccount ] = useState(true);
  return (
    <Fragment>
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="container flex flex-col md:flex-row items-center justify-between px-5 text-gray-700">
          <div className="w-full lg:w-1/2 mx-8">

            <div className="text-7xl text-gray-100 font-dark font-extrabold mb-8"> First Cross-Chain</div>
            {/* <h1 className="text-3xl md:text-3xl font-light mb-8">
              First Cross-Chain
            </h1> */}
            <h1 className="text-3xl text-gray-100 md:text-6xl font-light mb-8">
              <span className="font-semibold">NFT</span> Marketplace
            </h1>
            <h1 className="text-3xl text-gray-100 md:text-4xl font-light mb-8">
              Discover & Sell NFTs From Any Chain
            </h1>

            { account? (
              <button 
                type="button" 
                className="w-96 py-4 px-10 btn-home"
                onClick={()=> setAccount(false) }
                >
                  Connect Wallet
                </button>
            ): (
              <Fragment>
                <button 
                  type="button" 
                  className="w-60 my-4 py-4 px-12 mr-4 btn-home"
                  onClick={()=> navigate('/mint')}
                >
                  Mint
                </button>
                <button 
                  type="button" 
                  className="w-60 my-4 py-4 px-12 btn-home"
                  onClick={()=> navigate('/market')}
                >
                  Market
                </button>
              </Fragment>
            ) }
          </div>

          <div className="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
            <img src="https://miro.medium.com/max/600/1*28Ve9dqkisZZ01B8dhdHOg.png" className="" alt="Page not found" />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default HomePage;
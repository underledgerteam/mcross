import { Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Web3Provider } from "../../contexts/connect.context";

const HomePage = () => {

  const navigate = useNavigate();
  const { account, ConnectedWallet } = useContext(Web3Provider);

  return (
    <Fragment>
      <div className="container flex flex-col lg:flex-row items-center justify-between px-5 text-gray-700 mx-auto">
        <div className="w-full lg:w-1/2 mx-8 text-center">

          <div className="mt-5 md:mt-0 text-5xl md:text-6xl lg:text-7xl text-gray-100 font-dark font-extrabold mb-8"> First Cross-Chain</div>
          {/* <h1 className="text-3xl md:text-3xl font-light mb-8">
            First Cross-Chain
          </h1> */}
          <h1 className="text-4xl text-gray-100 lg:text-5xl font-light mb-8">
            <span className="font-semibold">NFT</span> Marketplace
          </h1>
          <h1 className="text-3xl text-gray-100 lg:text-4xl font-light mb-8">
            Discover & Sell NFTs From Any Chain
          </h1>


          {!account ? (
            <button
              type="button"
              className="md:w-96 w-72 py-4 px-10 btn-home"
              onClick={ConnectedWallet}
            >
              Connect Wallet
            </button>
          ) : (
            <Fragment>
              <button
                type="button"
                className="w-60 my-4 py-4 px-12 mx-4 btn-home"
                onClick={() => navigate('/mint')}
              >
                Mint
              </button>
              <button
                type="button"
                className="w-60 my-4 py-4 px-12 mx-4 btn-home"
                onClick={() => navigate('/market')}
              >
                Market
              </button>
            </Fragment>
          )}
        </div>

        <div className="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
          <img src="https://miro.medium.com/max/600/1*28Ve9dqkisZZ01B8dhdHOg.png" className="mx-auto" alt="Page not found" />
        </div>
      </div>
    </Fragment>
  );
};

export default HomePage;
import { Fragment, useContext } from 'react';
import { shortenAddress } from "../../utils/shortenAddress.util";
import { Web3Provider } from "../../contexts/connect.context";


const ConnectWallet = () => {

  const { account, ConnectedWallet, balance } = useContext(Web3Provider);

  return (
    <Fragment>
      <div className="h-screen w-screen">
        <div className="container md:container md:mx-auto">

          <div className="text-7xl font-dark font-extrabold mb-8">My Profile</div>
          {!account && (
            <button
              type="button"
              className="w-96 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white font-bold py-4 px-10 text-2xl rounded"
              onClick={ConnectedWallet}
            >
              Connect Wallet
            </button>
          )}

          {account && (
            <div className="app-details text-white">
              <h2> {shortenAddress(account)}</h2>
              <div className="app-balance">
                <span>Balance: </span>
                {balance}
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>


  );
};

export default ConnectWallet;
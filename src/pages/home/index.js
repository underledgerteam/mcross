import { useState, Fragment } from "react";

import Button from "../../components/Button";

const HomePage = () => {
  const [ account, setAccount ] = useState(true);
  return (
    <Fragment>
      <div className="h-screen w-screen bg-gray-50 flex items-center justify-center">
        <div className="container flex flex-col md:flex-row items-center justify-between px-5 text-gray-700">
          <div className="w-full lg:w-1/2 mx-8">

            <div className="text-7xl text-gray-900 font-dark font-extrabold mb-8"> First Cross-Chain</div>
            {/* <h1 className="text-3xl md:text-3xl font-light mb-8">
              First Cross-Chain
            </h1> */}
            <h1 className="text-3xl md:text-6xl font-light mb-8">
              NFT Marketplace
            </h1>
            <h1 className="text-3xl md:text-4xl font-light mb-8">
              Discover & Sell NFTs From Any Chain
            </h1>

            { account? (
              <Button
                text="Connect Wallet"
                textSize="text-2xl"
                textColor="text-white"
                buttonColor="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
                buttonStyle="py-4 px-10"
                size="w-96"
                onClick={()=> setAccount(false) }
              />
              
            ): (
              <Fragment>
                <Button
                  text="Mint"
                  textSize="text-2xl"
                  textColor="text-white"
                  buttonColor="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
                  buttonStyle="my-4 py-4 py-3 px-12 mr-4"
                  size="w-60"
                />
                <Button
                  text="Market"
                  textSize="text-2xl"
                  textColor="text-white"
                  buttonColor="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
                  buttonStyle="my-4 py-4 py-3 px-12"
                  size="w-60"
                />
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
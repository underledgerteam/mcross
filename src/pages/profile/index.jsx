import { useState, useMemo, Fragment, useRef, useContext, useEffect } from "react";

import { Table, CryptoLogos, Loading, useNotification } from "web3uikit";

import { Web3Provider } from "../../contexts/connect.context";

import CardNFT from "../../components/profile/CardNFT";
import TabCardProfile from "../../components/profile/TabCardProfile";
import ModelSell from "../../components/profile/ModelSell";
import ModelCancelSell from "../../components/profile/ModelCancelSell";

import { shortenAddress } from "../../utils/shortenAddress.util";

const menuProfile = [{
  text: "My Collection"
},{
  text: "My Marketplace"
},{
  text: "My Transaction"
}];

const data = [...Array(32)].map((v, key)=>{
  return [
    key,
    'Buy NFT Name : Doctor strange '+key,
    '0x19...x25e',
    '0x18...130e',
    '0.1000 WETH',
    '30/04/2022 08:09:54'
  ]
});

const ProfilePage = () => {
  const { chain, account, myCollection, ChangeChain, GetCollection, CreateSellCollection, CancelSellCollection } = useContext(Web3Provider);

  const refSelectChain = useRef();
  
  const [ tab, setTab ] = useState(localStorage.getItem("myTab") || "My Collection");
  const [ openModelSell, setOpenModelSell ] = useState(false);
  const [ myCollectionSell, setMyCollectionSell ] = useState({});
  const [ openModelCancelSell, setOpenModelCancelSell ] = useState(false);

  const onChangeChain = () => {
    ChangeChain(refSelectChain.current.value.toLowerCase());
  };
  const onClickTab = (tab) => {
    setTab(tab);
    localStorage.setItem("myTab", tab);
  };
  // for open Model Sell
  const onOpenModelSell = (objNFT) => {
    setOpenModelSell(true);
    setMyCollectionSell(objNFT);
  };
  const onConfirmSellNFT = () => {
    // alert("Process MetaMask Sell NFT");
    CreateSellCollection(
      myCollectionSell,
      ()=> {
        setOpenModelSell(false);
        setTab("My Marketplace");
      }
    );
  };
  const onCloseModelSell = () => {
    setOpenModelSell(false);
  };
  // for open Model Cancel Sell
  const onOpenModelCancelSell = () => {
    setOpenModelCancelSell(true);
  };
  const onConfirmCancelSell = () => {
    // alert("Process MetaMask Sell NFT");
    setOpenModelCancelSell(false);
    CancelSellCollection();
  };
  const onCloseModelCancelSell = () => {
    setOpenModelCancelSell(false);
  };

  const columns = useMemo(() => [
    'ID',
    'Event',
    'From',
    'To',
    'Amount',
    'Date UTC',
  ], []);

  useEffect(()=>{
    if(account){
      GetCollection();
    }
  },[account]);
  return (
    <Fragment>
      <div className="h-screen w-screen">
        <div className="container md:container md:mx-auto">
          <div className="text-7xl font-dark font-extrabold mb-8">My Profile</div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div  className="w-full">
              <div className="py-8 px-8 shadow-lg rounded-lg my-20 backdrop-blur-lg bg-[#323652]/50">
                <div className="flex justify-center -mt-16">
                  <CryptoLogos
                    chain={chain}
                    size="7.5rem"
                  />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-3xl font-semibold mt-4 text-center">{shortenAddress(account)}</h2>
                  <div className="flex items-end mt-3 mx-auto">
                    <div className="text-white text-xl lg:text-3xl font-bold mr-4">Chain: </div>
                    <div className="inline-block relative w-full text-gray-700 mt-4">
                      <select 
                        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        ref={refSelectChain}
                        onChange={()=> onChangeChain()}
                      >
                        <option selected={chain === "ethereum"}>Ethereum</option>
                        <option selected={chain === "polygon"}>Polygon</option>
                        <option selected={chain === "avalanche"}>Avalanche</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                  </div>
                  { menuProfile.map((item, key)=>{
                    return(
                      <button 
                        type="button" 
                        className={`btn-menu-profile ${tab===item.text && ("active")}`}
                        onClick={()=> onClickTab(item.text)}
                        key={key}
                      >
                        {item.text}
                      </button>
                    )
                  }) }
    
                </div>
              </div>
            </div>
            
            { tab === "My Collection" && ( 
              <TabCardProfile
                title="My Collection"
              >
                {/* No Record! */}
                <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
                { myCollection.loading? (<div className="col-span-3 mx-auto">
                  <Loading
                    fontSize={20}
                    size={100}
                    spinnerColor="#fff"
                    text="Loading...."
                  /></div>): 
                  (myCollection?.list.length > 1) ? myCollection.list.map((item, key) => {
                    return(
                      <CardNFT 
                        key={key}
                        objNFT={{
                          ...item,
                          chain: chain
                        }}
                        onClickSell={(objNFT)=> onOpenModelSell(objNFT)}
                      />
                    )
                  }) : (<h5 className="text-center text-2xl col-span-3 text-gray-200">My Collection No Result...</h5>)
                }
                </div>
              </TabCardProfile>
            )}

            { tab === "My Marketplace" && ( 
              <TabCardProfile
                title="My Marketplace"
              >
                <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
                { [...Array(10)].length > 0 ? [...Array(10)].map((v, key) => {
                  return(
                    <CardNFT 
                      key={key}
                      objNFT={{
                        id: key,
                        chain: chain
                      }}
                      sell={true}
                      onClickCancelSell={onOpenModelCancelSell}
                    />
                  )
                }): (<h5 className="text-center text-2xl col-span-3 text-gray-200">Marketplace No Result...</h5>)}
                </div>
              </TabCardProfile>
            )}

            { tab === "My Transaction" && ( 
              <TabCardProfile
                title="My Transaction"
              >
                <Table
                  columnsConfig="80px 3fr 2fr 2fr 2fr 3fr"
                  data={data}
                  header={columns}
                  maxPages={3}
                  onPageNumberChanged={(number)=> console.log(number)}
                  pageSize={5}
                />
              </TabCardProfile>
            )}

          </div>
              
          { openModelSell && (
            <ModelSell 
              objNFT={myCollectionSell}
              onConfirm={onConfirmSellNFT}
              onClose={onCloseModelSell}
            />
          ) }

          { openModelCancelSell && (
            <ModelCancelSell 
              onConfirm={onConfirmCancelSell}
              onClose={onCloseModelCancelSell}
            />
          ) }


        </div>
      </div>
    </Fragment>
  )
};

export default ProfilePage;
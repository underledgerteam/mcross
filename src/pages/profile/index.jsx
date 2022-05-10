import { useState, useMemo, Fragment } from "react";

import { Table } from "web3uikit";

import CardNFT from "../../components/profile/CardNFT";
import TabCardProfile from "../../components/profile/TabCardProfile";

const menuProfile = [{
  text: "My Collection"
},{
  text: "My Marketplace"
},{
  text: "My Transaction"
}]

const data = [...Array(32)].map((v, key)=>{
  return [
    key,
    'Buy NFT Name : Doctor strange '+key,
    '0x19...x25e',
    '0x18...130e',
    '0.1000 WETH',
    '30/04/2022 08:09:54'
  ]
})

const ProfilePage = () => {
  
  const [ tab, setTab ] = useState("My Transaction");

  const columns = useMemo(() => [
    'ID',
    'Event',
    'From',
    'To',
    'Amount',
    'Date UTC',
  ], []);

  return (
    <Fragment>
      <div className="h-screen w-screen">
        <div className="container md:container md:mx-auto">

          <div className="text-7xl font-dark font-extrabold mb-8">My Profile</div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div  className="w-full">
              <div className="py-8 px-8 shadow-lg rounded-lg my-20 backdrop-blur-lg bg-[#323652]/50">
                <div className="flex justify-center -mt-16">
                  <img className="w-20 h-20 object-cover rounded-full  border-2 border-purple-500" src="https://th.jobsdb.com/en-th/cms/employer/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png" alt="avatar" />
                </div>
                <div className="grid justify-items-center">
                  <h2 className="text-3xl font-semibold mt-4">0x58...40dd</h2>

                  { menuProfile.map((item, key)=>{
                    return(
                      <button 
                        type="button" 
                        className={`btn-menu-profile ${tab===item.text && ("active")}`}
                        onClick={()=> setTab(item.text)}
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
                <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                { [...Array(10)].map((v, key) => {
                  return(
                    <CardNFT 
                      id={key}
                      key={key}
                    />
                  )
                })}
                </div>
              </TabCardProfile>
            )}

            { tab === "My Marketplace" && ( 
              <TabCardProfile
                title="My Marketplace"
              >
                <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                { [...Array(10)].map((v, key) => {
                  return(
                    <CardNFT 
                      id={key}
                      key={key}
                      sell={true}
                    />
                  )
                })}
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

        </div>
      </div>
    </Fragment>
  )
}

export default ProfilePage;
import { useState, Fragment } from "react";

import Button from "../../components/Button";

const TabProfile = (props) => {
  return(
    <div className="md:col-span-2 w-full p-6 rounded-lg shadow-lg bg-white my-0 md:my-20">
      <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">{ props.title }</h5>
      <p className="text-gray-700 text-base mb-4">
        { props.children }
      </p>
    </div>
  )
}

const ProfilePage = () => {
  const buttonStyle = {
    active: "bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500",
    default: "bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
  }
  const [ tab, setTab ] = useState("My Collection");

  return (
    <Fragment>
      <div className="h-screen w-screen bg-gray-50">
        <div className="container md:container md:mx-auto">

          <div className="text-7xl text-gray-900 font-dark font-extrabold mb-8">My Profile</div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div  className="w-full">
              <div className="py-4 px-8 bg-white shadow-lg rounded-lg my-20">
                <div className="flex justify-center -mt-16">
                  <img className="w-20 h-20 object-cover rounded-full border-2 border-emerald-500" src="https://th.jobsdb.com/en-th/cms/employer/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png" />
                </div>
                <div className="grid justify-items-center">
                  <h2 className="text-gray-800 text-3xl font-semibold mt-4">0x58...40dd</h2>
                  <Button
                    text="My Collection"
                    textColor={`${(tab === "My Collection") && 'text-white'}`}
                    buttonColor={`${(tab === "My Collection")?buttonStyle['active'] :buttonStyle['default']}`}
                    onClick={()=> setTab("My Collection")}
                  />

                  <Button
                    text="My Marketplace"
                    textColor={`${(tab === "My Marketplace") && 'text-white'}`}
                    buttonColor={`${(tab === "My Marketplace")?buttonStyle['active'] :buttonStyle['default']}`}
                    onClick={()=> setTab("My Marketplace")}
                  />

                  <Button
                    text="My Transaction"
                    textColor={`${(tab === "My Transaction") && 'text-white'}`}
                    buttonColor={`${(tab === "My Transaction")?buttonStyle['active'] :buttonStyle['default']}`}
                    onClick={()=> setTab("My Transaction")}
                  />

                </div>
              </div>
            </div>
            
            { tab === "My Collection" && ( 
              <TabProfile
                title="My Collection"
              >
                No Record!
              </TabProfile>
            )}

            { tab === "My Marketplace" && ( 
              <TabProfile
                title="My Marketplace"
              >
                No Record!
              </TabProfile>
            )}

            { tab === "My Transaction" && ( 
              <TabProfile
                title="My Transaction"
              >
                No Record!
              </TabProfile>
            )}
           

          </div>

        </div>
      </div>
    </Fragment>
  )
}

export default ProfilePage;
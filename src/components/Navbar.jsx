import React, { Fragment, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Web3Provider } from "../contexts/connect.context";
import { AiOutlineWallet, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { shortenAddress } from "../utils/shortenAddress.util";

const navData = [
  {
    name: "home",
    href: "/",
  },
  {
    name: "mint nft",
    href: "/mint",
  },
  {
    name: "marketplace",
    href: "/market",
  },
  {
    name: "nft converse",
    href: "/converse",
  },
  {
    name: "profile",
    href: "/profile",
  }
];

const dropdownMenu = (toggleMenu, pathname) => {
  if (!toggleMenu) {
    return (null);
  }
  return (
    <div className="fixed -top-0 -right-0 mt-20 p-4 flex flex-col gap-4 md:hidden justify-start items-end animate-slide-in bg-custom-navbar drop-shadow-navbar">
      {navData.map((item) => {
        const isActive = (pathname === item.href) ? "text-white" : "text-custom-gray1 opacity-70";
        return (
          <Link key={item.name} to={item.href}>
            <div className={`text-xl uppercase ${isActive} hover:opacity-100 hover:text-white active:bg-pink-500 active:opacity-100 cursor-pointer`}>
              {item.name}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

const Navbar = () => {

  const { account, ConnectedWallet } = useContext(Web3Provider);
  const { pathname } = useLocation();
  const [toggleMenu, setToggleMenu] = React.useState(false);

  return (
    <>
      <div className="bg-custom-navbar drop-shadow-navbar">
        <div className="flex container w-full mx-auto justify-between items-center font-bold px-5 py-6">
          <Link to='/'>
            <div
              className="flex text-center text-2xl text-white uppercase cursor-pointer"
              alt="logo"
            >
              <AiOutlineWallet fontSize={32} className="cursor-pointer" />
              mcross
            </div>
          </Link>

          <nav className="hidden md:flex space-x-10 items-center">
            {navData.map((item) => {
              const isActive = (pathname === item.href) ? "text-white" : "text-custom-gray1 opacity-70";
              return (
                <Link key={item.name} to={item.href}>
                  <div className={`text-xl uppercase ${isActive} hover:opacity-100 hover:text-white active:bg-pink-500 active:opacity-100 cursor-pointer`}>
                    {item.name}
                  </div>
                </Link>
              );
            })}
            {!account ? (
              <button
                type="button"
                className="w-48 px-4 py-2 btn-connect"
                onClick={ConnectedWallet}
              >
                Connect Wallet
              </button>
            ) : (
              <Fragment>
                <div className={`inline-block text-2xl px-4 py-2 leading-none border rounded-full text-white mt-4 lg:mt-0 cursor-pointer`}>
                  {shortenAddress(account)}
                </div>
              </Fragment>
            )}
          </nav>
          <div className="flex md:hidden text-white">
            {!toggleMenu && (
              <AiOutlineMenu fontSize={28} className="md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
            )}
            {toggleMenu && (
              <AiOutlineClose fontSize={28} className="md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
            )}
          </div>
        </div>
      </div>
      {dropdownMenu(toggleMenu, pathname)}
    </>
  );
};

export default Navbar;
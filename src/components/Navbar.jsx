import React from "react";
import { Link, useLocation } from "react-router-dom";

// use context store wallet data to render wallet adress

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

const Navbar = () => {
  const { pathname } = useLocation();
  return (
    <div className="bg-custom-navbar drop-shadow-navbar">
      <div className="flex container w-full mx-auto justify-between items-center font-bold px-5 py-6">
        <Link to='/'>
          <div
            className="h-[2rem] flex text-center text-2xl text-white uppercase cursor-pointer"
            alt="logo"
          >
            mcross
          </div>
        </Link>

        <nav className="md:flex space-x-10 items-center">
          {navData.map((item) => {
            const isActive = (pathname === item.href) ? "text-white" : "text-custom-gray1 opacity-70";
            return (
              <Link key={item.name} to={item.href}>
                <div className={`bg-custom-navbar text-xl uppercase ${isActive} hover:opacity-100 hover:text-white active:bg-pink-500 active:opacity-100 cursor-pointer`}>
                  {item.name}
                </div>
              </Link>
            );
          })}
          <button
            type="button"
            className="btn-connect"
          >
            Connect Wallet
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
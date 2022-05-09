import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

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
    return (
        <div className="bg-primary">
            <div className="flex container w-full mx-auto justify-between items-center font-bold px-5 py-6">
                <Link to='/'>
                    <div
                        className="h-[2rem] flex text-center text-2xl text-white uppercase cursor-pointer"
                        alt="logo"
                    >
                        mcross
                    </div>
                </Link>

                <nav className="md:flex space-x-10 items-center text-white">
                    {navData.map((item) => {
                        return (
                            <Link key={item.name} to={item.href}>
                                <div className="text-xl uppercase hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 cursor-pointer">
                                    {item.name}
                                </div>
                            </Link>
                        );
                    })}
                    <Button
                        text="Connect Wallet"
                        textSize="text-xl"
                        textColor="text-white"
                        buttonColor="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
                        buttonStyle="py-2 px-4"
                        size="w-48"
                    />
                </nav>
            </div>
        </div>
    )
}

export default Navbar;
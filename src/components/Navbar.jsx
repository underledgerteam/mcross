import React from "react";
import { Link } from "react-router-dom";
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
            <div className="flex container w-full mx-auto justify-between items-center font-bold text-2xl px-5 py-6">
                <Link to='/'>
                    <div
                        className="h-[2rem] flex items-center text-center text-white uppercase cursor-pointer"
                        alt="logo"
                    >
                        mcross
                    </div>
                </Link>

                <nav className="hidden md:flex space-x-10 items-center text-white">
                    {navData.map((item) => {
                        return (
                            <Link key={item.name} to={item.href}>
                                <div className="text-xl uppercase cursor-pointer">
                                    {item.name}
                                </div>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    )
}

export default Navbar;
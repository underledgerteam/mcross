import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
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
    const ref = useRef();
    let navigate = useNavigate();

    const redirectTo = (path) => {
        navigate(path);
    }

    return (
        <div className="bg-primary">
            <div className="flex container w-full mx-auto justify-between items-center font-bold text-2xl px-5 py-6">
                <div
                    className="h-[2rem] flex items-center text-center text-white uppercase cursor-pointer"
                    alt="logo"
                    onClick={(e) => {
                        e.preventDefault();
                        redirectTo("/");
                    }}
                >
                    mcross
                </div>

                <nav className="hidden md:flex space-x-10 items-center text-white">
                    {navData.map((item) => {
                        return (
                            <div
                                key={item.name}
                                className="text-xl uppercase cursor-pointer"
                                onClick={(e) => {
                                    e.preventDefault();
                                    redirectTo(item.href);
                                }}
                            >
                                {item.name}
                            </div>
                        );
                    })}
                </nav>
            </div>
        </div>
    )
}

export default Navbar;
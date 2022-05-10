import React from 'react';
import { Outlet } from "react-router-dom";
import Navbar from '../../components/Navbar';

const Layout = () => {
  return (
    <div className="min-h-screen min-w-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow bg-custom-black text-white">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
import React from 'react';
import { Outlet } from "react-router-dom";
import Navbar from '../../components/Navbar';

const Layout = () => {
  return (
    <div className="min-h-screen min-w-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow text-white p-4 md:p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
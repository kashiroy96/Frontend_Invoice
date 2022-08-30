import React from "react";
import { Outlet } from "react-router-dom";
// import Navbar from '../components/Navbar';
import Sidebar from "./Sidebar/Sidebar";
const SharedLayout = () => {
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  );
};
export default SharedLayout;
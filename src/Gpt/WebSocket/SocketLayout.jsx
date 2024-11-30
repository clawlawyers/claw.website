import React from "react";
import { Outlet } from "react-router-dom";
import SocketSidebar from "./SocketSidebar";

const SocketLayout = () => {
  return (
    <div className="flex h-screen">
      <SocketSidebar />
      <div className="flex-1">
        <Outlet className="" />
      </div>
    </div>
  );
};

export default SocketLayout;

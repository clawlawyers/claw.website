import React from "react";
import { Outlet } from "react-router-dom";

const SocketLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default SocketLayout;

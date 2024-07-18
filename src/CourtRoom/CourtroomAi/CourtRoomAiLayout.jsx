import React from "react";
import AiSidebar from "./AiSidebar";
import { Outlet } from "react-router-dom";
import Styles from "./CourtroomAiLayout.module.css";

const CourtRoomAiLayout = () => {
  return (
    <div className={Styles.mainContainer}>
      <AiSidebar />
      <div className={Styles.rightContainer}>
        <Outlet />
      </div>
    </div>
  );
};

export default CourtRoomAiLayout;

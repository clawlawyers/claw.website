import React, { useEffect } from 'react';
import { Outlet, useLocation } from "react-router-dom";

import Style from "./LegalGPT.module.css";
import Sidebar from './Sidebar';

export default function LegalGptLayout() {
    const location = useLocation();
    return (
        <div style={{ position: "relative", height: "100vh", overflowY: "hidden", width: "100%" }}>
            <Sidebar search={location.search} />
            <div className={Style.container}>
                <div className={Style.gptContainer}>
                    {<Outlet />}
                </div>
            </div>
        </div>
    )
}

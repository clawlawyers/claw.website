import React from 'react';
import Style from "./Sidebar.module.css";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import StarIcon from '@mui/icons-material/Star';

export default function Sidebar({ retrieveChat }) {
    return (
        <div className={Style.sidebar}>
            <div style={{ display: "flex", flexDirection: 'column', height: "100%", padding: "16px", width: "100%", justifyContent: "space-between", alignItems: "center", color: "white" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 25, width: "100%" }}>
                    <div style={{ display: "flex", backgroundColor: "rgba(255,255,255,0.05)", padding: 10, gap: 5 }}>
                        <div><StarIcon style={{ height: "100%" }} /></div>
                        <div style={{ flex: 1 }}>
                            <div>
                                Guest
                            </div>
                            <div>
                                Free account
                            </div>
                        </div>
                    </div>
                    <div>
                        <div style={{ display: "flex" }}>
                            <div>icon</div>
                            <div>What is legalGPT</div>
                        </div>
                        <div style={{ display: "flex" }}>
                            <div>icon</div>
                            <div>Start a new chat</div>
                        </div>
                    </div>
                </div>
                <div style={{ borderTop: "1px solid white", width: "100%", padding: 10, backgroundColor: "transparent" }}>
                    <button onClick={retrieveChat} style={{ display: "flex", gap: 12, color: "white", alignItems: "center", border: "none", backgroundColor: "transparent" }}>
                        <DeleteOutlineOutlinedIcon style={{ backgroundColor: "transparent" }} />
                        <div style={{ backgroundColor: "transparent" }}>Clear all conversations</div>
                    </button>
                </div>
            </div>
        </div>
    )
}

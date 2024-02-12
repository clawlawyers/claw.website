import React from 'react';
import Style from "./Sidebar.module.css";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import StarIcon from '@mui/icons-material/Star';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AddIcon from '@mui/icons-material/Add';

export default function Sidebar({ retrieveChat }) {
    return (
        <div className={Style.sidebar}>
            <div style={{ display: "flex", flexDirection: 'column', height: "100%", padding: "16px", width: "100%", justifyContent: "space-between", alignItems: "center", color: "white" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 25, width: "100%" }}>
                    <div style={{ display: "flex", backgroundColor: "rgba(255,255,255,0.05)", padding: 15, gap: 15, borderRadius: 10 }}>
                        <div style={{ display: "flex", height: "100%", alignItems: "center" }}>
                            <div style={{ height: 40, width: 40, borderRadius: 40, backgroundColor: "#8940FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <StarIcon style={{ backgroundColor: "transparent" }} />
                            </div>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 16 }}>
                                Guest
                            </div>
                            <div style={{ fontSize: 14, color: "#777" }}>
                                Free account
                            </div>
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        <div style={{ display: "flex", padding: 12, gap: 15 }}>
                            <div>
                                <ChatBubbleOutlineIcon style={{ backgroundColor: "transparent" }} />
                            </div>
                            <div>What is legalGPT</div>
                        </div>
                        <div style={{ display: "flex", padding: 12, gap: 15, borderRadius: 10, backgroundColor: "#8940FF" }}>
                            <div>
                                <AddIcon style={{ backgroundColor: "transparent" }} />
                            </div>
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

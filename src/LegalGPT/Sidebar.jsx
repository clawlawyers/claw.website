import React, { useEffect, useState } from 'react';
import Style from "./Sidebar.module.css";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import StarIcon from '@mui/icons-material/Star';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AddIcon from '@mui/icons-material/Add';
import { useMediaQuery } from 'react-responsive';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuthState } from '../hooks/useAuthState';
import CircularProgress from '@mui/material/CircularProgress';

export default function Sidebar({ search }) {
    const isPhoneMode = useMediaQuery({ query: '(max-width:768px)' });
    const [collapsed, setCollapsed] = useState(false);
    const currentUser = useSelector(state => state.auth.user);
    const { isAuthError, isAuthLoading } = useAuthState();
    const navigate = useNavigate();

    function handleAccount() {
        if (!currentUser) navigate("/login");
    }
    function handleClearConversations() {
        if (search) navigate('/legalGPT')
        navigate(0);
    }
    function handleNewConversation() {
        if (search) navigate('/legalGPT?')
        navigate(0);
    }
    useEffect(() => {
        setCollapsed(isPhoneMode);
    }, [isPhoneMode])
    return (
        <div className={Style.sidebarContainer}>
            {collapsed && (
                <div style={{ position: "absolute", top: 20, left: 10, backgroundColor: "transparent", zIndex: 4 }}>

                    <MenuOutlinedIcon onClick={() => setCollapsed((collapsed) => !collapsed)} style={{ color: "white", fontSize: 40, backgroundColor: "inherit" }} />
                </div>
            )}
            {!collapsed && (
                <div style={{ width: "100%", height: "100%", display: "flex", backgroundColor: "transparent" }}>
                    <div className={Style.sidebar}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 25, width: "100%" }}>
                            <button onClick={handleAccount} style={{ display: "flex", color: "white", border: "none", backgroundColor: "rgba(255,255,255,0.05)", padding: 15, gap: 15, borderRadius: 10 }}>
                                <div style={{ display: "flex", height: "100%", alignItems: "center" }}>
                                    <div style={{ height: 40, width: 40, borderRadius: 40, backgroundColor: "#8940FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <StarIcon style={{ backgroundColor: "transparent" }} />
                                    </div>
                                </div>
                                {!isAuthLoading ? (
                                    <div style={{ flex: 1, textAlign: "left" }}>
                                        <div style={{ fontSize: 16 }}>
                                            {currentUser ? currentUser.phoneNumber : <>Guest</>}
                                        </div>
                                        <div style={{ fontSize: 14, color: "#777" }}>
                                            Free account
                                        </div>
                                    </div>
                                ) : (
                                    <div style={{ flex: 1, textAlign: "left" }}>
                                        <CircularProgress style={{ color: "white" }} size={14} />
                                    </div>
                                )}

                            </button>
                            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                <div style={{ display: "flex", padding: 12, gap: 15 }}>
                                    <div>
                                        <ChatBubbleOutlineIcon style={{ backgroundColor: "transparent" }} />
                                    </div>
                                    <div>What is legalGPT</div>
                                </div>
                                <button
                                    style={{ display: "flex", color: "white", border: "none", padding: 12, gap: 15, borderRadius: 10, backgroundColor: "#8940FF" }}
                                    onClick={handleNewConversation}
                                >
                                    <div>
                                        <AddIcon style={{ backgroundColor: "transparent" }} />
                                    </div>
                                    <div>Start a new chat</div>
                                </button>
                            </div>
                        </div>
                        <div style={{ borderTop: "1px solid white", width: "100%", padding: 10, backgroundColor: "transparent" }}>
                            <button onClick={handleClearConversations} style={{ display: "flex", gap: 12, color: "white", alignItems: "center", border: "none", backgroundColor: "transparent" }}>
                                <DeleteOutlineOutlinedIcon style={{ backgroundColor: "transparent" }} />
                                <div style={{ backgroundColor: "transparent", fontSize: 15 }}>Clear all conversations</div>
                            </button>
                        </div>
                    </div>
                    <div style={{ flex: 1, zIndex: 6, backgroundColor: "transparent" }} onClick={() => setCollapsed(true)} />
                </div>

            )}

        </div>
    )
}

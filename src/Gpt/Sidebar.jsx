import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';
import CircularProgress from '@mui/material/CircularProgress';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


import Style from "./Sidebar.module.css";
import { UserSessions } from './UserSessions';
import clawLogo from "../assets/icons/clawlogo.png";
import { useAuthState } from '../hooks/useAuthState';
import HeaderStyles from "../Header/Header.module.css";
import { collapse, expand, toggle } from "../features/sidebar/sidebarSlice";
import { open } from '../features/popup/popupSlice';
import { NODE_API_ENDPOINT } from '../utils/utils';


export default function Sidebar({ keyword, primaryColor, model }) {
    const isPhoneMode = useMediaQuery({ query: '(max-width:768px)' });
    const collapsed = useSelector(state => state.sidebar.collapsed);
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.auth.user);
    const plan = useSelector(state => state.gpt.plan);
    const token = useSelector(state => state.gpt.token);
    const { isAuthLoading } = useAuthState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function handleAccount() {
        if (!currentUser) navigate("/login");
    }
    async function handleClearConversations() {
        try {
            setLoading(true);
            await fetch(`${NODE_API_ENDPOINT}/gpt/sessions/legalGPT`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${currentUser.jwt}`,
                    "Content-Type": "application/json",
                }
            });
            if (keyword === 'Legal') navigate('/gpt/legalGPT')
            else navigate('/gpt/finGPT');
        } catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    }
    function handleNewConversation() {
        if (keyword === 'Legal') navigate('/gpt/legalGPT')
        else navigate('/gpt/finGPT');
    }
    useEffect(() => {
        if (isPhoneMode) dispatch(collapse());
        else dispatch(expand())
    }, [isPhoneMode])
    return (
        <div className={Style.sidebarContainer}>
            {collapsed && (
                <button style={{ position: "absolute", top: 20, left: 12, backgroundColor: "transparent", zIndex: 4, border: "none", backgroundImage: "none" }}>
                    <MenuOutlinedIcon onClick={() => dispatch(toggle())} style={{ color: "white", fontSize: 40, backgroundColor: "inherit" }} />
                </button>
            )}
            {!isPhoneMode && !collapsed && (
                <button style={{ position: "absolute", top: 40, left: 240, backgroundColor: "transparent", backgroundImage: "none", zIndex: 8, border: "none" }}>
                    <MenuOutlinedIcon onClick={() => dispatch(toggle())} style={{ color: "white", fontSize: 40, backgroundColor: "inherit" }} />
                </button>
            )}
            {!collapsed && (
                <div style={{ width: "100%", height: "100%", display: "flex", backgroundColor: "transparent" }}>
                    <div className={Style.sidebar}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 25, width: "100%", flex: 1, overflow: "hidden" }}>
                            <div onClick={handleAccount} style={{ display: "flex", color: "white", border: "none", backgroundColor: "rgba(255,255,255,0.05)", padding: 15, gap: 15, borderRadius: 10 }}>
                                <div style={{ display: "flex", height: "100%", alignItems: "center" }}>
                                    <div style={{ height: 40, width: 40, borderRadius: 40, backgroundColor: primaryColor, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <StarIcon style={{ backgroundColor: "transparent" }} />
                                    </div>
                                </div>
                                {!isAuthLoading ? (
                                    <div style={{ flex: 1, textAlign: "left" }}>
                                        <div style={{ fontSize: 16 }}>
                                            {currentUser ? currentUser.phoneNumber : <>Guest</>}
                                        </div>
                                        <div style={{ fontSize: 14, color: "#777" }}>
                                            {plan ? <>
                                                <div>Plan - <span style={{ textTransform: 'capitalize' }}>{plan.split("_")[0]}</span></div>
                                                <div>Token - {token.used}/{token.total} </div>
                                                <button
                                                    style={{ display: "flex", color: "white", border: "none", padding: "6px 10px", marginTop: 5, borderRadius: 5, backgroundColor: primaryColor }}
                                                    onClick={() => dispatch(open())}
                                                >Upgrade</button>
                                            </> : <CircularProgress style={{ padding: 10, color: "white" }} />}

                                        </div>
                                    </div>
                                ) : (
                                    <div style={{ flex: 1, textAlign: "left" }}>
                                        <CircularProgress style={{ color: "white" }} size={14} />
                                    </div>
                                )}

                            </div>
                            <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: 10, overflow: "hidden" }}>
                                <div style={{ display: "flex", padding: 12, gap: 15 }}>
                                    <div>
                                        <ChatBubbleOutlineIcon style={{ backgroundColor: "transparent" }} />
                                    </div>
                                    <div>What is {keyword}GPT</div>
                                </div>
                                <button
                                    style={{ display: "flex", color: "white", border: "none", padding: 12, gap: 15, borderRadius: 10, backgroundColor: primaryColor }}
                                    onClick={handleNewConversation}
                                >
                                    <div>
                                        <AddIcon style={{ backgroundColor: "transparent" }} />
                                    </div>
                                    <div>Start a new chat</div>
                                </button>
                                <div style={{ flex: 1, overflow: "scroll" }}>
                                    {(currentUser && !isAuthLoading && !loading) &&
                                        <UserSessions model={model} jwt={currentUser.jwt} />
                                    }
                                </div>
                            </div>
                        </div>
                        <div style={{ borderTop: "1px solid white", width: "100%", padding: 10, backgroundColor: "transparent", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                            <div className={HeaderStyles.headerLogo} >
                                <Link to='/' style={{ textDecoration: "none", color: "white", backgroundColor: "transparent" }}>
                                    <img alt="Claw" style={{ backgroundColor: "transparent", height: 53 }} src={clawLogo} />
                                </Link>
                            </div>
                            <button onClick={handleClearConversations} style={{ display: "flex", color: "white", alignItems: "center", border: "none", backgroundColor: "transparent", backgroundImage: "none" }}>
                                <DeleteOutlineOutlinedIcon style={{ backgroundColor: "transparent" }} />
                            </button>
                        </div>
                    </div>
                    <div style={{ flex: 1, zIndex: 6, backgroundColor: "transparent" }} onClick={() => dispatch(collapse())} />
                </div>

            )}

        </div>
    )
}

import React, { useEffect } from 'react';
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from './Sidebar';
import Style from "./LegalGPT.module.css";
import { NODE_API_ENDPOINT } from '../utils/utils';
import { setPlan, setToken } from '../features/gpt/gptSlice';

export default function GPTLayout(props) {
    const location = useLocation();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.auth.user);
    useEffect(() => {
        async function fetchGptUser() {
            try {
                const res = await fetch(`${NODE_API_ENDPOINT}/gpt/user`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${currentUser.jwt}`,
                        "Content-Type": "application/json",
                    }
                });
                const parsed = await res.json();

                dispatch(setPlan({ plan: parsed.data.plan }));
                dispatch(setToken({ token: parsed.data.token }));
            } catch (error) {
                console.log(error);
            }
        }

        if (currentUser && !currentUser.newGptUser) fetchGptUser();
    }, [currentUser, dispatch])
    return (
        <div style={{ position: "relative", height: "100vh", overflowY: "hidden", width: "100%" }}>
            <Sidebar {...props} search={location.search} />
            <div className={Style.container}>
                <div className={Style.gptContainer}>
                    {<Outlet />}
                </div>
            </div>
        </div>
    )
}

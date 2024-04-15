import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useAuthState } from '../hooks/useAuthState';
import { useLocation, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

import { Outlet } from 'react-router-dom';

export default function Ambassador() {
    const currentUser = useSelector(state => state.auth.user);
    const currentUserProps = useSelector(state => state.auth.props);
    const { isAuthLoading } = useAuthState();
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthLoading) {
            if (!currentUser) {
                // USER NOT LOGGED IN
                // const searchParams = new URLSearchParams({ callbackUrl: pathname }).toString();
                navigate('apply')
            }
            else {
                // USER LOGGED IN

                // USER HAS OLD SESSION OBJECT (EDGE CASE)
                if (currentUserProps.ambassador) {
                    navigate('dashboard')
                }
                else {
                    navigate('apply')
                }
            }
        }
    }, [currentUser, isAuthLoading, navigate, pathname])

    if (isAuthLoading) {
        return (
            <div style={{ width: "100%", height: "100vh", display: "flex", alignItems: "center", flexDirection: "column", gap: 10, justifyContent: "center" }}>
                <CircularProgress style={{ color: "white" }} />
                <div>Loading Auth...</div>
            </div>
        )
    }
    else return <Outlet />

    return <div>Unexpected Error Occured</div>
}

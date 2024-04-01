import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useAuthState } from '../hooks/useAuthState';
import { useLocation, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

import { logout } from '../features/auth/authSlice';
import { Outlet } from 'react-router-dom';

export default function Ambassador() {
    const currentUser = useSelector(state => state.auth.user);
    const { isAuthLoading } = useAuthState();
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthLoading) {
            if (!currentUser) {
                // USER NOT LOGGED IN
                const searchParams = new URLSearchParams({ callbackUrl: pathname }).toString();
                navigate(`/login?${searchParams}`);
            }
            else {
                // USER LOGGED IN

                // USER HAS OLD SESSION OBJECT (EDGE CASE)
                if (!currentUser.hasOwnProperty('ambassador')) {
                    const searchParams = new URLSearchParams({ callbackUrl: pathname }).toString();
                    dispatch(logout());
                    navigate(`/login?${searchParams}`);
                }
                else if (currentUser.ambassador){
                    navigate('dashboard')
                }
                else {
                    navigate('apply')
                }
            }
        }
    }, [currentUser, isAuthLoading, pathname, navigate, dispatch])

    if (isAuthLoading) {
        return (
            <div style={{ width: "100%", height: "100vh", display: "flex", alignItems: "center", flexDirection: "column", gap: 10, justifyContent: "center" }}>
                <CircularProgress style={{ color: "white" }} />
                <div>Loading Auth...</div>
            </div>
        )
    }
    else if (currentUser) {
        return <Outlet />
    }
    return <div>Unexpected Error Occured</div>
}

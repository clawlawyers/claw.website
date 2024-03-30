import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useAuthState } from '../hooks/useAuthState';
import { useLocation, Outlet, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { logout } from "../features/auth/authSlice";

export default function AuthWall() {
  const currentUser = useSelector(state => state.auth.user);
  const { isAuthLoading } = useAuthState();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthLoading && !currentUser) {
      const searchParams = new URLSearchParams({ callbackUrl: pathname }).toString();
      navigate(`/login?${searchParams}`);
    }
    else if (!isAuthLoading && !currentUser.hasOwnProperty('ambassador')) {
      const searchParams = new URLSearchParams({ callbackUrl: pathname }).toString();
      dispatch(logout());
      navigate(`/login?${searchParams}`);
    }
    else if (!isAuthLoading && !currentUser.ambassador && pathname.includes('ambassador')) {
      navigate('/')
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

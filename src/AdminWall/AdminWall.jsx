import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from 'react-router-dom';

export default function AdminWall() {
    const phoneNumber = useSelector(state => state.auth.user.phoneNumber);
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (!["+916280645248", "+919950866260","+916352321550","+917787938922"].includes(phoneNumber)) {
    //         navigate(`/`);
    //     }
    // }, [navigate, phoneNumber])

    return <Outlet />
}

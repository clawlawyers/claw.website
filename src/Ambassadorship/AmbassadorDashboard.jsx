import React, { useCallback, useEffect, useState } from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useSelector } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';

import comingsoon from '../assets/images/comingsoon.png';
import trophy from '../assets/images/trophy.png';
import toast from "react-hot-toast";
import { NODE_API_ENDPOINT } from '../utils/utils';

export default function AmbassadorDashboard() {
    const { jwt } = useSelector(state => state.auth.user);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState({});
    const fetchAmbassadorDetails = useCallback(async (controller) => {
        try {
            setLoading(true)
            const response = await fetch(`${NODE_API_ENDPOINT}/gpt/referralCode/`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    "Content-Type": "application/json",
                },
                signal: controller ? controller.signal : null,
            });
            const parsed = await response.json();
            setDetails(parsed.data);
            toast.success("Fetched Details")
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
        finally {
            setLoading(false);
        }
    }, [jwt])
    useEffect(() => {
        const controller = new AbortController();
        fetchAmbassadorDetails(controller);
        return () => controller.abort()
    }, [fetchAmbassadorDetails]);

    async function generateReferralCode() {
        try {
            setLoading(true)
            const response = await fetch(`${NODE_API_ENDPOINT}/gpt/referralCode/generate`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    "Content-Type": "application/json",
                }
            });
            const parsed = await response.json();
            setDetails(parsed.data);
            toast.success("Generated")
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ width: "80%", margin: "auto", position: "relative", zIndex: 2 }}>
            <div>
                <h3 style={{ fontWeight: 600 }}>Dashboard</h3>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 30, marginBottom: 30 }}>
                <div>Date</div>
                <button
                    disabled={loading}
                    style={{ color: "black", borderRadius: 50, border: "none", padding: "10px 18px", fontSize: 18, fontWeight: 600, display: "flex", gap: 8, alignItems: "center" }}
                    onClick={fetchAmbassadorDetails}
                >
                    <RefreshIcon />
                    Refresh
                </button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
                <div style={{ backgroundColor: "white", color: "black", borderRadius: 23, padding: "18px 12px", width: '100%' }}>
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: 130, height: 130 }}>photo</div>
                        {loading ? <CircularProgress style={{ color: "#008080" }} /> :
                            <div style={{ fontSize: 18, fontWeight: 500 }}>
                                <div>Name: {details.client?.firstName + " " + details.client?.lastName}</div>
                                <div>Referral Code: {details.referralCode ? details.referralCode.id : <button onClick={generateReferralCode} style={{ backgroundColor: "#008080", color: "white", border: 'none', borderRadius: 5, }}>Generate</button>}</div>
                                <div>College Name: {details.client?.collegeName}</div>
                                <div>.....</div>
                            </div>
                        }
                    </div>
                    <div style={{ width: '80%', margin: 'auto' }}>
                        <button style={{ borderRadius: 15, backgroundColor: "#008080", color: "white", border: 'none', width: '100%', padding: "18px 0px", fontSize: 18, fontWeight: 500 }}>Update Bank Details</button>

                    </div>
                </div>
                <div style={{ backgroundColor: "#008080", borderRadius: 23, padding: "18px 12px", }}>
                    <div><h5>Upcoming events</h5></div>
                    <div style={{ display: "flex", flexDirection: 'column', alignItems: "center", justifyContent: "center" }}>
                        <img alt='calendar' src={comingsoon} />
                        <div>Coming soon..</div>
                    </div>
                </div>
                <div style={{ backgroundColor: "black", borderRadius: 23, padding: 30 }}>
                    <div>
                        <h5>Understand</h5>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24, marginTop: 20 }}>
                        <Capsule value={details.redeemCount !== null ? details.redeemCount : "-"} loading={loading} label="Student enrolled" />
                        <Capsule value={null} loading={loading} label="All india rank" />
                        <Capsule value={null} loading={loading} label="Zonal rank" />
                    </div>
                </div>
                <div style={{ backgroundColor: "black", borderRadius: 23, padding: 30 }}>
                    <div><h5>Awards won</h5></div>
                    <div style={{ display: "flex", flexDirection: 'column', alignItems: "center", justifyContent: "center" }}>
                        <img alt="trophy" src={trophy} />
                        Take participate to win prizes
                    </div>
                </div>
            </div>
        </div >
    )
}


function Capsule({ value, label, loading }) {
    return <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", borderRadius: 22, backgroundColor: "#008080", padding: "23px 0px" }}>
        {loading ? <CircularProgress style={{ padding: 5, color: "white" }} /> : <h4 style={{ fontWeight: 600, fontSize: 29 }}>
            {value === null ? "-" : value}
        </h4>}
        <h5 style={{ fontSize: 16 }}>{label}</h5>
    </div>
}
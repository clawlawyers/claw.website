import React, { useCallback, useEffect, useState } from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useSelector } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';

import comingsoon from '../assets/images/comingsoon.png';
import trophy from '../assets/images/trophy.png';
import toast from "react-hot-toast";
import { NODE_API_ENDPOINT } from '../utils/utils';
import { ClearIcon } from '@mui/x-date-pickers';
import Styles from "./AmbassadorDashboard.module.css"

export default function AmbassadorDashboard() {
    const { jwt } = useSelector(state => state.auth.user);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState({});
    const [accountNumber, setAccountNumber] = useState();
    const [accountName, setAccountName] = useState();
    const [ifscCode, setIfscCode] = useState();
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

    const handleClose = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${NODE_API_ENDPOINT}/client/update/bankdetails`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ account: { holderName: accountName, number: accountNumber, ifsc: ifscCode } })
            });
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
            setOpen(false);
        }
    };
    const handleOpen = async () => {
        try {
            setLoading(true);
            setOpen(true);
            const response = await fetch(`${NODE_API_ENDPOINT}/client/auth/me`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    "Content-Type": "application/json",
                },
            });
            const { data } = await response.json();
            setAccountName(data.account.holderName);
            setAccountNumber(data.account.number);
            setIfscCode(data.account.ifsc);
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

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
        <div className={Styles.container} >
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 30, marginBottom: 30, alignItems: "center" }}>
                <div><h3 style={{ fontWeight: 600 }}>Dashboard</h3></div>
                <button
                    disabled={loading}
                    style={{ color: "black", borderRadius: 50, border: "none", padding: "10px 18px", fontSize: 18, fontWeight: 600, display: "flex", gap: 8, alignItems: "center" }}
                    onClick={fetchAmbassadorDetails}
                >
                    <RefreshIcon />
                    Refresh
                </button>
            </div>
            <div className={Styles.grid}>
                <div style={{ backgroundColor: "white", color: "black", borderRadius: 23, padding: "20px 40px", display: "flex", flexDirection: "column" }}>
                    <div style={{ display: 'flex', flex: 1 }}>
                        {loading ? <CircularProgress style={{ color: "#008080" }} /> :
                            <div style={{ fontSize: 18, fontWeight: 600 }}>
                                <div>Name: {details.client?.firstName + " " + details.client?.lastName}</div>
                                <div>Referral Code: {details.referralCode ? details.referralCode.id : <button onClick={generateReferralCode} style={{ backgroundColor: "#008080", color: "white", border: 'none', borderRadius: 5, }}>Generate</button>}</div>
                                <div>College Name: {details.client?.collegeName}</div>
                                <div>.....</div>
                            </div>
                        }
                    </div>
                    <div style={{ marginTop: 20 }}>
                        <button onClick={handleOpen} style={{ borderRadius: 15, backgroundColor: "#008080", color: "white", border: 'none', width: '100%', padding: "18px 0px", fontSize: 18, fontWeight: 500 }}>Update Bank Details</button>
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
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="child-modal-title"
            >
                <div className={Styles.modal} style={{
                    backgroundColor: "white", position: "absolute", top: '50%',
                    left: '50%',
                    color: "black",
                    borderRadius: 10,
                    overflowY: "scroll",
                    padding: 10,
                    transform: 'translate(-50%, -50%)', boxShadow: 24
                }}>
                    <div style={{ top: 0, display: "flex", alignItems: "center" }}>
                        <div style={{ flex: 1, textAlign: "center", fontSize: 42, fontWeight: 600 }} >Bank Details</div>
                        <button disabled={loading} onClick={() => setOpen(false)} style={{ border: "none", background: "none" }}><ClearIcon style={{ fontSize: 30 }} /></button>
                    </div>
                    {loading ? <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}> <CircularProgress style={{ color: "white" }} /></div> :
                        <form style={{ display: "flex", flexDirection: 'column', gap: 35 }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                <label style={{ fontSize: 22, fontWeight: 600 }}>Account Name:</label>
                                <input
                                    type="text"
                                    value={accountName}
                                    onChange={(e) => setAccountName(e.target.value)}
                                    style={{ width: "80%", borderRadius: 20, padding: 8, outline: "none", border: "1px solid #008080" }}
                                />
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

                                <label style={{ fontSize: 22, fontWeight: 600 }}>Account Number:</label>
                                <input
                                    value={accountNumber}
                                    onChange={(e) => setAccountNumber(e.target.value)}
                                    type="number"
                                    style={{ width: "80%", borderRadius: 20, padding: 8, outline: "none", border: "1px solid #008080" }}
                                />
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

                                <label style={{ fontSize: 22, fontWeight: 600 }}>IFSC Code:</label>
                                <input
                                    value={ifscCode}
                                    onChange={e => setIfscCode(e.target.value)}
                                    type="text"
                                    style={{ width: "80%", borderRadius: 20, padding: 8, outline: "none", border: "1px solid #008080" }}
                                />
                            </div>

                        </form>
                    }
                    <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>

                        <button disabled={loading} onClick={handleClose} style={{ border: "none", padding: "14px 55px", backgroundColor: "#008080", borderRadius: 30, color: "white", fontSize: 28, fontWeight: 600 }}>{loading ? <CircularProgress style={{ color: "white" }} /> : "Save"}</button>
                    </div>
                </div>
            </Modal>
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
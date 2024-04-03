import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import Styles from "./AddLeaders.module.css"
import { NODE_API_ENDPOINT } from '../../utils/utils';

export default function AddLeaders() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [collegeName, setCollegeName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const jwt = useSelector(state => state.auth.user.jwt);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${NODE_API_ENDPOINT}/client/leaders`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ firstName, lastName, phoneNumber, collegeName })
            });
            const { data } = await res.json();
            console.log(data);
            toast.success("Success")
        } catch (error) {
            console.log(error);
            toast.error("Failed")
        }
        finally {
            setLoading(false);
            setCollegeName("");
            setFirstName("");
            setLastName("");
            setPhoneNumber("");
        }
    }
    return (
        <div className={Styles.main}>
            <form onSubmit={handleSubmit} style={{ display: "flex", width: "80%", flexDirection: "column", gap: 15 }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label>First Name</label>
                    <input value={firstName} onChange={(e) => setFirstName(e.target.value)} style={{ width: "100%", outline: "none", border: "1px solid rgba(255, 255, 255, 0.15)", backgroundColor: "#2d2d2d", color: "white" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label>Last Name</label>
                    <input value={lastName} onChange={(e) => setLastName(e.target.value)} style={{ width: "100%", outline: "none", border: "1px solid rgba(255, 255, 255, 0.15)", backgroundColor: "#2d2d2d", color: "white" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label>College Name</label>
                    <input value={collegeName} onChange={(e) => setCollegeName(e.target.value)} style={{ width: "100%", outline: "none", border: "1px solid rgba(255, 255, 255, 0.15)", backgroundColor: "#2d2d2d", color: "white" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label>Phone Number</label>
                    <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} style={{ width: "100%", outline: "none", border: "1px solid rgba(255, 255, 255, 0.15)", backgroundColor: "#2d2d2d", color: "white" }} />
                </div>
                <button disabled={loading} type='submit' style={{ borderRadius: 15, backgroundColor: "#008080", color: "white", textDecoration: "none", padding: "10px 25px", width: "fit-content", border: "none" }}>
                    {loading ? <CircularProgress style={{ color: "white", padding: 5 }} /> : "Add"}
                </button>
            </form>
        </div>
    )
}

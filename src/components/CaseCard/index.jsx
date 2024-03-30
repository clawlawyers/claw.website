import { useState } from 'react';
import { useSelector } from "react-redux";
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import { NODE_API_ENDPOINT } from '../../utils/utils';
import ClearIcon from '@mui/icons-material/Clear';

import Styles from "./index.module.css";

export function CaseCard({ name, date, court, citations, caseId }) {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState();
    const jwt = useSelector(state => state.auth.user.jwt);
    const [loading, setLoading] = useState(false);
    async function handleOpen() {
        try {
            setLoading(true);
            setOpen(true)
            const response = await fetch(`${NODE_API_ENDPOINT}/gpt/case/${caseId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    "Content-Type": "application/json",
                }
            })
            const parsed = await response.json();
            setContent(parsed.data.content)
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }
    const handleClose = () => setOpen(false);
    return (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 10, alignItems: "center", padding: 16, backgroundColor: "#8940FF", borderRadius: 10 }}>
            <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: 23, fontWeight: 700 }}>{name}</h2>
                <div style={{ fontSize: 13, color: '#DBD8D8' }}>
                    <span>{date}</span>,
                    <span>{' ' + court}</span>
                </div>
                <p style={{ fontSize: 13, color: '#DBD8D8', margin: 0 }}>Number of citations- {citations}</p>
            </div>

            <button onClick={handleOpen} style={{ border: "none", padding: "10px 12px", minWidth: 'fit-content', backgroundColor: "white", borderRadius: 10, fontWeight: 700, fontSize: 14, textDecoration: "none", color: "black" }}>
                View document
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
            >
                <div className={Styles.scrollable} style={{
                    backgroundColor: "#171e26", position: "absolute", top: '50%',
                    left: '50%',
                    width: "80%",
                    height: "90%",
                    color: "white",
                    borderRadius: 10,
                    overflowY: "scroll",
                    padding: 10,
                    transform: 'translate(-50%, -50%)', boxShadow: 24
                }}>
                    <div style={{ position: "sticky", top: 0, display: "flex" }}>
                        <div style={{ flex: 1 }} />
                        <button onClick={handleClose} style={{ border: "none" }}><ClearIcon style={{ fontSize: 30 }} /></button>
                    </div>

                    {loading ? <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}> <CircularProgress style={{ color: "white" }} /></div> :
                        <div style={{ whiteSpace: "pre-line", textAlign: "center" }}>{content}</div>
                    }
                </div>
            </Modal>
        </div>
    )
}
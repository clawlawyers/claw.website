import React, { useState } from 'react';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';

import Styles from "./SearchGPT.module.css";
import { generateResponse, setGpt } from '../../features/gpt/gptSlice';
import { NODE_API_ENDPOINT } from '../../utils/utils';

export default function SearchGPT() {
    const [query, setQuery] = useState("");
    const currentUser = useSelector(state => state.auth.user);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function onSubmitPrompt() {
        setIsLoading(true);
        if (currentUser) {
            const res = await fetch(`${NODE_API_ENDPOINT}/gpt/session`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${currentUser.jwt}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt: query, model: "legalGPT" }),
            });
            const { data } = await res.json();
            dispatch(setGpt({ prompt: query }))
            dispatch(generateResponse(data.id));
            navigate(`/legalGPT/session/${data.id}`);
        }
        else {
            dispatch(setGpt({ prompt: query }));
            dispatch(generateResponse());
            navigate('/legalGPT/conversation')
        }
    }
    return (
        <div className={Styles.searchContainer}>
            <div className={Styles.searchContent}>
                <div style={{ backgroundColor: "transparent", display: "flex", padding: 10 }}>
                    <div style={{ flex: 1, backgroundColor: "transparent", display: "flex", alignItems: "center" }}>
                        <SearchOutlined style={{ backgroundColor: "transparent", color: "#777", paddingRight: 5 }} />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            style={{ backgroundColor: "transparent", width: "100%", fontSize: 14, outline: "none", border: "none" }}
                            placeholder='Ask Your Legal Questions Here ...'
                        />
                    </div>
                    <div className={Styles.buttonContainer}>
                        {
                            isLoading ? <CircularProgress style={{ padding: 12, fontSize: 14, color: "#8940ff" }} /> :
                                <button onClick={onSubmitPrompt}>
                                    Ask LegalGPT
                                </button>
                        }

                    </div>
                </div>
            </div>

        </div>
    )
}

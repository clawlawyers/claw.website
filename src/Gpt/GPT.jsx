import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';

import Welcome from "./Welcome";
import { generateResponse, setGpt } from "../features/gpt/gptSlice";
import { NODE_API_ENDPOINT } from "../utils/utils";
import { gptUserCreated } from "../features/auth/authSlice";
import { useAuthState } from "../hooks/useAuthState";

function GPT({ keyword, model, primaryColor, textGradient, backgroundGradient }) {
    const [isLoading, setIsLoading] = useState();

    const currentUser = useSelector(state => state.auth.user);
    const { isAuthLoading } = useAuthState();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        async function createGptUser() {
            try {
                setIsLoading(true);
                const res = await fetch(`${NODE_API_ENDPOINT}/gpt/user`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${currentUser.jwt}`,
                        "Content-Type": "application/json",
                    }
                });
                if (res.ok) dispatch(gptUserCreated());
                else throw new Error("Failed to create gpt user")
            } catch (error) {
                console.log(error);
            }
            finally {
                setIsLoading(false);
            }
        }
        if (currentUser && currentUser.newGptUser) createGptUser();
        else if (!isAuthLoading && !currentUser) {
            console.log(isAuthLoading, currentUser)
            navigate("/login");
        }
    }, [navigate, model, dispatch, currentUser, isAuthLoading])



    async function submitPrompt({ query }) {
        if (currentUser) {
            setIsLoading(true);
            const res = await fetch(`${NODE_API_ENDPOINT}/gpt/session`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${currentUser.jwt}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt: query, model }),
            });
            const { data } = await res.json();
            dispatch(setGpt({ prompt: query }))
            dispatch(generateResponse({ sessionId: data.id, model }));
            navigate(`session/${data.id}`);
        }
    }

    return (
        <div style={{ position: "relative", height: "100%", width: "100%" }}>
            <div style={{ position: "absolute", height: 894, width: 886, bottom: "-750px", marginLeft: "calc(50% - 443px)", background: `radial-gradient(circle, ${backgroundGradient[0]} 0%, ${backgroundGradient[1]} 5%)`, boxShadow: `0 0 100px 100px ${backgroundGradient[1]}`, borderRadius: 500 }} />
            <Welcome keyword={keyword} textGradient={textGradient} primaryColor={primaryColor} submitPrompt={submitPrompt} />
            {isLoading && <div style={{ zIndex: 2 }}><CircularProgress /></div>}
        </div>
    )
};

export default GPT;
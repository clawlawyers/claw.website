import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import Style from "./LegalGPT.module.css";
import { Prompt } from './components/Prompt';
import clawImg from "../assets/images/gptclaw.PNG";
import { NODE_API_ENDPOINT } from '../utils/utils';
import { useAuthState } from '../hooks/useAuthState';
import { CustomLoader } from './components/CustomLoader';
import CustomInputForm from './components/CustomInputForm';
import { generateResponse, resetGpt, setGpt } from "../features/gpt/gptSlice";

export default function SessionGPT({ keyword, model, primaryColor }) {
    const { prompt, status, response, error } = useSelector(state => state.gpt);
    const currentUser = useSelector(state => state.auth.user);
    const [prompts, setPrompts] = useState([]);
    const { isAuthLoading } = useAuthState();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const promptsRef = useRef(null);
    const dispatch = useDispatch();
    const { sessionId } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        if (status === "succeeded" && response) {
            setIsLoading(false);
            setPrompts((prompts) => ([...prompts, { text: response, isUser: false }]));
        }
        else if (status === 'failed') {
            setIsLoading(false);
            setIsError(true);
        }
    }, [status])

    useEffect(() => {
        if (prompt) {
            setIsLoading(true);
            setPrompts([{ text: prompt, isUser: true }]);
        }
    }, [])

    useEffect(() => {
        if (promptsRef.current) {
            promptsRef.current.scrollTop = promptsRef.current.scrollHeight;
        }
    }, [prompts]);

    useEffect(() => {
        if (!prompt && currentUser) {

            async function fetchSessionMessages() {
                setIsLoading(true);
                const res = await fetch(`${NODE_API_ENDPOINT}/gpt/session/${sessionId}`, {
                    headers: {
                        Authorization: `Bearer ${currentUser.jwt}`,
                        "Content-Type": "application/json",
                    }
                });
                const { data } = await res.json();
                setPrompts(data.messages);
                setIsLoading(false);
            }
            fetchSessionMessages();
        }
        else if (!currentUser) navigate("/legalGPT")

    }, [sessionId, isAuthLoading, navigate])

    useEffect(() => {
        return () => dispatch(resetGpt());
    }, [sessionId])


    async function submitPrompt({ query }) {
        setIsLoading(true);
        setPrompts(prompts => [...prompts, { text: query, isUser: true }]);
        dispatch(setGpt({ prompt: query }))
        dispatch(generateResponse({ sessionId, model }));
    }

    return (
        <div className={Style.formContainer}>

            <div ref={promptsRef} className={Style.prompts}>
                <div className={Style.clawBackdrop}><img alt="claw icon" src={clawImg} /></div>
                <div className={Style.subContainer} >
                    <div style={{ width: "100%", height: "100%" }}>
                        {prompts.map(({ text, isUser }, idx) => <Prompt primaryColor={primaryColor} key={idx} text={text} isUser={isUser} />)}

                        {isLoading && (
                            <div style={{ width: "100%", height: "100%" }}>
                                <CustomLoader />
                            </div>
                        )}
                        {isError && (
                            <Prompt primaryColor={"red"} key={'error'} text={error.message} isUser={false} />
                        )}
                    </div>

                </div>
            </div>
            <CustomInputForm primaryColor={primaryColor} isError={isError} isLoading={isLoading} onSubmit={submitPrompt} />
        </div>
    )
}

import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Style from "./LegalGPT.module.css";
import { Prompt } from './components/Prompt';
import { CustomLoader } from './components/CustomLoader';
import CustomInputForm from './components/CustomInputForm';
import clawImg from "../assets/images/gptclaw.PNG";
import { generateResponse, resetGpt, setGpt } from "../features/gpt/gptSlice";

export default function ConversationLegalGPT() {
    const { prompt, status, response } = useSelector(state => state.gpt);
    const [prompts, setPrompts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const promptsRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        if (status === "succeeded" && response) {
            setIsLoading(false);
            setPrompts((prompts) => ([...prompts, { text: response, isUser: false }]));
        }
    }, [status])

    useEffect(() => {
        if (promptsRef.current) {
            promptsRef.current.scrollTop = promptsRef.current.scrollHeight;
        }
    }, [prompts]);

    useEffect(() => {
        if (!prompt) navigate('/legalGPT');
        else {
            setPrompts([{ text: prompt, isUser: true }])
            setIsLoading(true);
        }

        return () => dispatch(resetGpt());
    }, [])



    async function submitPrompt({ query }) {
        setPrompts(prompts => [...prompts, { text: query, isUser: true }]);
        dispatch(setGpt({ prompt: query }));
        setIsLoading(true)
        dispatch(generateResponse());
    }

    return (
        <div className={Style.formContainer}>

            <div ref={promptsRef} className={Style.prompts}>
                <div className={Style.clawBackdrop}><img alt="claw icon" src={clawImg} /></div>
                <div className={Style.subContainer} >
                    <div style={{ width: "100%", height: "100%" }}>
                        {prompts.map(({ text, isUser }, idx) => <Prompt key={idx} text={text} isUser={isUser} />)}

                        {isLoading && (
                            <div style={{ width: "100%", height: "100%" }}>
                                <CustomLoader />
                            </div>
                        )}
                    </div>

                </div>
            </div>
            <CustomInputForm isLoading={isLoading} onSubmit={submitPrompt} />
        </div>
    )
}

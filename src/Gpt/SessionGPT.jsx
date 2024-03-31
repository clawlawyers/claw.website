import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import React, { useEffect, useState, useRef } from 'react';

import Style from "./LegalGPT.module.css";
import { Prompt } from './components/Prompt';
import clawImg from "../assets/images/gptclaw.PNG";
import { NODE_API_ENDPOINT } from '../utils/utils';
import { useAuthState } from '../hooks/useAuthState';
import { CustomLoader } from './components/CustomLoader';
import CustomInputForm from './components/CustomInputForm';
import { generateResponse, resetGpt, setGpt, setRelatedCases } from "../features/gpt/gptSlice";
import { CaseCard } from "../components/CaseCard";

export default function SessionGPT({ model, primaryColor }) {
    const { prompt, status, response, error, relatedCases } = useSelector(state => state.gpt);
    const currentUser = useSelector(state => state.auth.user);
    const [prompts, setPrompts] = useState([]);
    const { isAuthLoading } = useAuthState();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const promptsRef = useRef(null);
    const dispatch = useDispatch();
    const { sessionId } = useParams();
    const navigate = useNavigate();
    const [value, setValue] = useState(2);
    const [hover, setHover] = useState(-1);
    const [caseCount, setCaseCount] = useState(2);


    useEffect(() => {
        if (status === "succeeded" && response) {
            setIsLoading(false);
            setPrompts((prompts) => ([...prompts, { id: response.gptResponse.messageId, text: response.gptResponse.message, isUser: false }]));
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

    async function fetchRelatedCases() {
        setIsLoading(true);
        try {
            const res = await fetch(`${NODE_API_ENDPOINT}/gpt/case/related/${sessionId}`, {
                headers: {
                    Authorization: `Bearer ${currentUser.jwt}`,
                    "Content-Type": "application/json",
                }
            });
            const { data } = await res.json();
            dispatch(setRelatedCases({ messageId: data.messageId, cases: data.relatedCases }))
        } catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
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
                        {!isLoading && relatedCases.messageId && prompts.length > 0 && prompts[prompts.length - 1].id !== relatedCases.messageId && <button style={{ borderRadius: 15, backgroundColor: "#8940ff", color: "white", textDecoration: "none", padding: 10, width: "fit-content", border: "none" }} onClick={fetchRelatedCases}>Load cases</button>}
                        <div >
                            {relatedCases.messageId && prompts.length > 0 && prompts[prompts.length - 1].id === relatedCases.messageId && relatedCases.cases.length > 0 && (
                                <div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 5 }}>
                                        {relatedCases.cases.slice(0, caseCount).map((relatedCase) => {
                                            return <CaseCard
                                                messageId={relatedCases.messageId}
                                                name={relatedCase.title}
                                                caseId={relatedCase.id}
                                                citations={relatedCase.numCites}
                                                date={relatedCase.date}
                                                court={relatedCase.court}
                                                key={relatedCase.id}
                                            />
                                        })}
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
                                        <Link style={{ borderRadius: 15, backgroundColor: "#8940ff", color: "white", textDecoration: "none", padding: 10, width: "fit-content", border: "none" }} to={`/case/search?id=${relatedCases.messageId}`}>Case search</Link>
                                        <button style={{ borderRadius: 15, backgroundColor: "#8940ff", color: "white", textDecoration: "none", padding: 10, width: "fit-content", border: "none" }} onClick={() => setCaseCount(caseCount => caseCount + 2)}>Load more</button>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                    {/* <div>
                        <Rating
                            name="hover-feedback"
                            value={value}
                            precision={1}

                            getLabelText={getLabelText}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            onChangeActive={(event, newHover) => {
                                setHover(newHover);
                            }}
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" sx={{ color: "white" }} />}
                        />
                    </div> */}
                </div>
            </div>
            <CustomInputForm primaryColor={primaryColor} isError={isError} isLoading={isLoading} onSubmit={submitPrompt} />
        </div>
    )
}

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const labels = {
    1: 'Useless',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent',
};
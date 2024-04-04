import Modal from '@mui/material/Modal';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import LockIcon from '@mui/icons-material/Lock';
import ClearIcon from '@mui/icons-material/Clear';
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState, useRef } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams, useNavigate, Link } from "react-router-dom";

import Style from "./LegalGPT.module.css";
import { Prompt } from './components/Prompt';
import { CaseCard } from "../components/CaseCard";
import clawImg from "../assets/images/gptclaw.PNG";
import { NODE_API_ENDPOINT } from '../utils/utils';
import { useAuthState } from '../hooks/useAuthState';
import { CustomLoader } from './components/CustomLoader';
import CustomInputForm from './components/CustomInputForm';
import { generateResponse, resetGpt, setGpt, setPlan, setRelatedCases, setToken } from "../features/gpt/gptSlice";

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
    const [open, setOpen] = useState(false);


    useEffect(() => {
        if (status === "succeeded" && response) {
            setIsLoading(false);
            setPrompts((prompts) => ([...prompts, { id: response.gptResponse.messageId, text: response.gptResponse.message, isUser: false }]));
        }
        else if (status === 'failed') {
            setIsLoading(false);
            setIsError(true);
            setOpen(true)
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
                        {!isLoading && prompts.length > 0 && prompts[prompts.length - 1].id !== relatedCases.messageId && isError ? <button style={{ borderRadius: 15, backgroundColor: "#008080", color: "white", textDecoration: "none", padding: 10, width: "fit-content", border: "none" }} onClick={() => setOpen(true)}>Upgrade</button> : <button style={{ borderRadius: 15, backgroundColor: "#008080", color: "white", textDecoration: "none", padding: 10, width: "fit-content", border: "none" }} onClick={fetchRelatedCases}>Load cases</button>}
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
                                        <Link style={{ borderRadius: 15, backgroundColor: "#008080", color: "white", textDecoration: "none", padding: 10, width: "fit-content", border: "none" }} to={`/case/search?id=${relatedCases.messageId}`}>Case search</Link>
                                        <button style={{ borderRadius: 15, backgroundColor: "#008080", color: "white", textDecoration: "none", padding: 10, width: "fit-content", border: "none" }} onClick={() => setCaseCount(caseCount => caseCount + 2)}>Load more</button>
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
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <div style={{
                    backgroundColor: "white", position: "absolute", top: '50%',
                    left: '50%',
                    color: "black",
                    borderRadius: 10,
                    overflowY: "scroll",
                    padding: 10,
                    transform: 'translate(-50%, -50%)', boxShadow: 24
                }}>
                    <div style={{ position: "sticky", top: 0, display: "flex", justifyContent: "flex-end" }}>
                        <button onClick={() => setOpen(false)} style={{ border: "none", backgroundColor: "inherit" }}><ClearIcon style={{ fontSize: 30, color: "black" }} /></button>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 10, padding: 50 }}>
                        <LockIcon style={{ fontSize: 80 }} />
                        <h3 style={{ fontSize: 28 }}>No More Token's Left</h3>
                        <div style={{ display: "flex", gap: 5 }}>
                            <StudentReferralModal />
                            <Link to='/pricing' style={{ borderRadius: 15, backgroundColor: "#008080", color: "white", textDecoration: "none", padding: 10, width: "fit-content", border: "none" }}>Buy Credits</Link>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

function StudentReferralModal() {
    const [open, setOpen] = useState(false);
    const [referralCode, setReferralCode] = useState("");
    const [loading, setLoading] = useState(false);
    const jwt = useSelector(state => state.auth.user.jwt);
    const dispatch = useDispatch();

    async function handleRedeem(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${NODE_API_ENDPOINT}/gpt/referralCode/redeem`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ referralCode })
            });
            const { data } = await res.json();
            dispatch(setPlan({ plan: data.plan }));
            dispatch(setToken({ token: data.token }));
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
            setReferralCode("");
        }
    }
    return (
        <>
            <Modal open={open} onClose={() => { if (!loading) setOpen(false) }}>
                <div style={{
                    backgroundColor: "#1e1e1e", position: "absolute", top: '50%',
                    left: '50%',
                    color: "white",
                    borderRadius: 10,
                    overflowY: "scroll",
                    padding: 10,
                    transform: 'translate(-50%, -50%)', boxShadow: 24
                }}>
                    <div style={{ position: "sticky", top: 0, display: "flex", justifyContent: "flex-end" }}>
                        <button disabled={loading} onClick={() => setOpen(false)} style={{ border: "none", backgroundColor: "inherit" }}><ClearIcon style={{ fontSize: 30, color: "white" }} /></button>
                    </div>
                    <form onSubmit={handleRedeem} style={{ padding: 40, display: "flex", flexDirection: "column", gap: 15, alignItems: "center" }}>
                        <h3 >Redeem Referral Code</h3>
                        <input
                            value={referralCode}
                            onChange={e => setReferralCode(e.target.value)}
                            placeholder="Referral Code"
                            style={{ width: "100%", outline: "none", border: "1px solid rgba(255, 255, 255, 0.15)", backgroundColor: "#2d2d2d", color: "white" }}
                        />
                        <button
                            disabled={loading}
                            type='submit'
                            style={{ borderRadius: 15, backgroundColor: "#008080", color: "white", textDecoration: "none", padding: 10, width: "fit-content", border: "none" }}
                        >
                            {loading ? <CircularProgress style={{ color: "white", padding: 10 }} /> : "Redeem"}
                        </button>
                    </form>
                </div>
            </Modal>
            <button
                onClick={() => setOpen(true)}
                style={{ borderRadius: 15, backgroundColor: "#008080", color: "white", textDecoration: "none", padding: 10, width: "fit-content", border: "none" }}
            >
                Student Referral
            </button>

        </>
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
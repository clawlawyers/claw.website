import { useEffect, useRef, useState } from "react";
import Style from "./LegalGPT.module.css";
import { Prompt } from "./Prompt";
import { CustomLoader } from "./CustomLoader";
import { API_ENDPOINT } from "../utils/utils";

import Sidebar from "./Sidebar";
import Welcome from "./Welcome";
import CustomInputForm from "./CustomInputForm";
import clawImg from "../assets/images/gptclaw.PNG";
class FatalError extends Error { }

function LegalGPT() {
    const [prompts, setPrompts] = useState([]);
    const [isLoading, setIsLoading] = useState();
    const [threadId, setThreadId] = useState();
    const promptsRef = useRef(null);
    const [query, setQuery] = useState("");
    const [userId, setUserId] = useState(null);
    const [sessionId, setSessionId] = useState(null);
    useEffect(() => {
        const storedUserId = localStorage.getItem("claw_user_id");
        const storedSessionId = localStorage.getItem("claw_session_id");
        if (storedUserId) setUserId(storedUserId);
        if (storedSessionId) setSessionId(storedSessionId);
    }, [])
    // async function stream() {
    //     await fetchEventSource(`${API_ENDPOINT}api/v1/legalGPT/stream`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Accept: "text/event-stream"
    //         },
    //         body: JSON.stringify({
    //             assistant_id: "asst_lRfVIFyhHb5icI9FETGabYB3",
    //             thread_id: threadId,
    //             question: "hello gpt"
    //         }),
    //         onopen(res) {
    //             if (res.ok && res.status === 200) {
    //                 console.log("Connection made ", res);
    //             } else if (
    //                 res.status >= 400 &&
    //                 res.status < 500 &&
    //                 res.status !== 429
    //             ) {
    //                 console.log("Client side error ", res);
    //             }
    //         },
    //         onmessage(event) {
    //             try {
    //                 if (event.event === 'completed') console.log(JSON.parse(event.data));
    //             } catch (error) {
    //                 console.log(error)
    //             }
    //         },
    //         onclose() {
    //             console.log("Connection closed by the server");
    //         },
    //         onerror(err) {
    //             if (err instanceof FatalError) {
    //                 throw err; // rethrow to stop the operation
    //             } else {
    //                 // do nothing to automatically retry. You can also
    //                 // return a specific retry interval here.
    //                 console.log("retrying.......")
    //             }
    //         },
    //     })
    // }

    async function getGPTReponse(query) {
        try {
            const formData = new FormData();
            formData.append("user_input", query);
            formData.append("user_id", userId ? userId : parseInt(Math.random() * 100000));
            if (sessionId) formData.append("session_id", sessionId);

            const res = await fetch(`${API_ENDPOINT}api/v1/gpt/chat`, {
                method: "POST",
                body: formData
            })
            const parsed = await res.json();
            if (!sessionId) {
                localStorage.setItem("claw_session_id", parsed.session_id);
                setSessionId(parsed.session_id);
            }
            if (!userId) {
                localStorage.setItem("claw_user_id", parsed.user_id);
                setUserId(parsed.user_id);
            }
            const text = parsed.gptResponse.message;
            const role = parsed.gptResponse.sender;
            setPrompts((prompts) => [...prompts, { text, role }]);
        }
        catch (err) {
            console.log(err)
        }
    }

    async function getChatHistory() {
        try {
            const res = await fetch(`${API_ENDPOINT}api/v1/legalGPT/conversationHistory`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({
                    thread_id: threadId,
                })
            })
            const parsed = await res.json();
            setPrompts([...parsed.conversationHistory]);
        } catch (error) {
            console.log(error)
        }
    }
    async function submitPrompt(e) {
        // do the api call for prompt

        setPrompts((prompts) => [...prompts, { role: 'user', text: e.query }]);
        setIsLoading(true);
        getGPTReponse(e.query).then(() => setIsLoading(false));
    }


    function retrieveChat() {
        setQuery("");
        setIsLoading(true);
        getChatHistory().then(setIsLoading(false));
    }

    useEffect(() => {
        if (promptsRef.current) {
            promptsRef.current.scrollTop = promptsRef.current.scrollHeight;
        }
    }, [prompts]);

    return (
        <div style={{ position: "relative", height: "100%", width: "100%" }}>
            <Sidebar retrieveChat={retrieveChat} />
            <div className={Style.container}>
                <div className={Style.gptContainer}>

                    {prompts.length === 0 ? (
                        <>
                            <div style={{ position: "absolute", height: 894, width: 886, bottom: "-750px", marginLeft: "calc(50% - 443px)", background: "radial-gradient(circle, rgba(137, 64, 255,0.45) 0%, rgba(137, 64, 255, 0.1) 5%)", boxShadow: "0 0 100px 100px rgba(137, 64, 255, 0.1)", borderRadius: 500 }} />
                            <Welcome submitPrompt={submitPrompt} />
                        </>
                    ) : (
                        <div className={Style.formContainer}>
                            <div ref={promptsRef} className={Style.prompts}>
                                <div className={Style.clawBackdrop}><img src={clawImg} /></div>
                                <div className={Style.subContainer} >
                                    <div style={{ width: "100%", height: "100%" }}>
                                        {prompts.map(({ text, role }, idx) => <Prompt key={idx} text={text} role={role} />)}

                                        {isLoading && (
                                            <div style={{ width: "100%", height: "100%" }}>
                                                <CustomLoader />
                                            </div>
                                        )}
                                    </div>

                                </div>
                            </div>
                            <CustomInputForm containerStyles={{ paddingTop: "10px" }} onSubmit={submitPrompt} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
};

export default LegalGPT;
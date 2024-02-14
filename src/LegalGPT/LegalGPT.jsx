import { useEffect, useRef, useState } from "react";
import Style from "./LegalGPT.module.css";
import { Prompt } from "./Prompt";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faPaperPlane, faPlus, faSun } from '@fortawesome/free-solid-svg-icons'
import { CustomPrompt } from "./CustomPrompt";
import { CustomLoader } from "./CustomLoader";
import { API_ENDPOINT } from "../utils/utils";

import Sidebar from "./Sidebar";
import Welcome from "./Welcome";
import CustomInputForm from "./CustomInputForm";
class FatalError extends Error { }

function LegalGPT() {
    const [prompts, setPrompts] = useState([]);
    const [isLoading, setIsLoading] = useState();
    const [threadId, setThreadId] = useState();
    const promptsRef = useRef(null);
    const [query, setQuery] = useState("");
    useEffect(() => {
        const createThread = async function () {
            try {
                const res = await fetch(`${API_ENDPOINT}api/v1/legalGPT/createThread`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    }
                })
                const newThread = await res.json();
                localStorage.setItem("thread_id_claw", newThread.thread.id);
                setThreadId(newThread.thread.id);
            }
            catch (err) {
                console.log(err)
            }
        }
        const storedThread = localStorage.getItem("thread_id_claw");
        if (storedThread) setThreadId(storedThread);
        else createThread();
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
            const res = await fetch(`${API_ENDPOINT}api/v1/legalGPT/generateResponse`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({
                    assistant_id: "asst_lRfVIFyhHb5icI9FETGabYB3",
                    thread_id: threadId,
                    question: query
                })
            })
            const parsed = await res.json();
            setPrompts((prompts) => [...prompts, parsed.gptResponse[0]]);
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

        setPrompts((prompts) => [...prompts, { role: 'user', text: e.query, id: Math.random() * 1000 }]);
        setIsLoading(true);
        getGPTReponse(e.query).then(() => setIsLoading(false));
    }

    function submitCustomPrompt(customPrompt) {
        setQuery("");
        setIsLoading(true);
        setPrompts([...prompts, { role: 'user', text: customPrompt, id: Math.random() * 1000 }]);
        getGPTReponse(customPrompt).then(() => setIsLoading(false));
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
                                <div className={Style.subContainer} >
                                    <div style={{ width: "100%", height: "100%" }}>
                                        {prompts.map(({ id, text, role }) => <Prompt key={id} text={text} role={role} />)}

                                        {isLoading && (
                                            <div style={{ width: "100%", height: "100%" }}>
                                                <Prompt role={'gpt'} />
                                                <CustomLoader />
                                            </div>
                                        )}
                                    </div>

                                </div>
                            </div>
                            <CustomInputForm onSubmit={submitPrompt} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
};

export default LegalGPT;
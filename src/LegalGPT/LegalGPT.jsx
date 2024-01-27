import { useEffect, useRef, useState } from "react";
import Style from "./LegalGPT.module.css";
import { Prompt } from "./Prompt";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faPaperPlane, faPlus, faSun } from '@fortawesome/free-solid-svg-icons'
import { CustomPrompt } from "./CustomPrompt";

function LegalGPT() {
    const [prompts, setPrompts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const promptsRef = useRef(null);
    const [query, setQuery] = useState("");

    async function getGPTReponse(query) {
        try {
            const res = await fetch("http://localhost:5000/api/v1/legalGPT/generateResponse", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({
                    assistant_id: "asst_sroPU88IYxF153uSSqhrfy9b",
                    thread_id: "thread_Muo4zyiGt0UKvCGoOKZSFAkM",
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
            const res = await fetch("http://localhost:5000/api/v1/legalGPT/conversationHistory", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({
                    thread_id: "thread_Muo4zyiGt0UKvCGoOKZSFAkM",
                })
            })
            const parsed = await res.json();
            setPrompts([...parsed.conversationHistory]);
        } catch (error) {
            console.log(error)
        }
    }
    async function submitPrompt(e) {
        e.preventDefault();
        // do the api call for prompt
        setPrompts((prompts) => [...prompts, { role: 'user', text: query, id: Math.random() * 1000 }]);
        setIsLoading(true);
        getGPTReponse(query).then(() => setIsLoading(false));
        setQuery("");
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
        <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", width: "260px", height: "100%", backgroundColor: "rgb(96,44,164)" }}>
                <div style={{ display: "flex", flexDirection: 'column', height: "100%", padding: "15px", justifyContent: "space-between", alignItems: "center" }}>
                    <button style={{ padding: 10, borderRadius: "6px", width: "100%", border: "1px solid white", backgroundColor: "transparent" }}>
                        <div style={{ display: "flex", gap: 12, alignItems: "center", color: "white", justifyContent: "start" }}>
                            <FontAwesomeIcon icon={faPlus} />
                            <div>New Chat</div>
                        </div>
                    </button>
                    <div style={{ borderTop: "1px solid white", width: "100%", padding: 10 }}>
                        <button onClick={retrieveChat} style={{ display: "flex", gap: 12, color: "white", alignItems: "center", border: "none", backgroundColor: "transparent" }}>
                            <FontAwesomeIcon icon={faArrowDown} />
                            <div>Retrieve Chat</div>
                        </button>
                    </div>
                </div>
            </div>
            <div className={Style.container}>
                <div ref={promptsRef} className={Style.prompts}>
                    <div style={{ width: "80%", margin: "auto" }}>
                        {prompts.length === 0 ? (
                            <div className={Style.welcome}>
                                <div>Legal GPT</div>
                            </div>
                        ) : (
                            <div style={{ width: "100%", height: "100%" }}>
                                {prompts.map(({ id, text, role }) => <Prompt key={id} text={text} role={role} />)}
                                {/* TODO: implement custom loading to show facts */}
                                {isLoading && (<div style={{ width: "100%", height: "100%" }}>Loading ......</div>)}
                            </div>
                        )}
                    </div>
                </div>

                <div className={Style.promptInput}>
                    {prompts.length === 0 && (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", gap: 10 }}>
                            <div style={{ fontSize: "20px", display: "flex", gap: 20, alignItems: "center" }}>
                                <FontAwesomeIcon icon={faSun} />
                                <div>Prompt Examples</div>
                            </div>
                            <div className={Style.customPrompts}>
                                <div>
                                    <CustomPrompt
                                        onClick={() => submitCustomPrompt("Explain: Fundamental Rights in the Indian Constitution")}
                                        heading={"Fundamental Rights in the Indian Constitution"}
                                    />
                                    <CustomPrompt
                                        onClick={() => submitCustomPrompt("Directive Principles of State Policy in the Indian Constitution")}
                                        heading={"Directive Principles of State Policy in the Indian Constitution"}
                                    />
                                </div>
                                <div>
                                    <CustomPrompt
                                        onClick={() => submitCustomPrompt("Explain: Fundamental Rights in the Indian Constitution")}
                                        heading={"Fundamental Rights in the Indian Constitution"}
                                    />
                                    <CustomPrompt
                                        onClick={() => submitCustomPrompt("Directive Principles of State Policy in the Indian Constitution")}
                                        heading={"Directive Principles of State Policy in the Indian Constitution"}
                                    />
                                </div>
                            </div>
                        </div>)}
                    <form onSubmit={submitPrompt}>
                        <textarea
                            value={query}
                            style={{ backgroundColor: "transparent", color: "white" }}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Message LegalGPT..."
                            rows="2"
                        />
                        <button disabled={isLoading} style={{ backgroundColor: "transparent", border: "none", borderRadius: "5px", padding: "10px" }} type="submit">
                            <FontAwesomeIcon style={{ height: 20, width: 24 }} icon={faPaperPlane} color="white" />
                        </button>
                    </form>
                </div>

            </div>
        </div>
    )
};

export default LegalGPT;
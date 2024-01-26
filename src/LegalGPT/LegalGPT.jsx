import { useEffect, useRef, useState } from "react";
import Style from "./LegalGPT.module.css";
import clawLogo from '../assets/icons/logoIcon.jpeg';
import { Prompt } from "./Prompt";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { CustomPrompt } from "./CustomPrompt";

function LegalGPT() {
    const [prompts, setPrompts] = useState([]);
    const promptsRef = useRef(null);
    const [query, setQuery] = useState("");

    function submitPrompt(e) {
        e.preventDefault();
        // do the api call for prompt
        setPrompts([...prompts, { isUser: true, text: query, id: Math.random() * 1000 }]);
        setQuery("");
    }

    function submitCustomPrompt(customPrompt) {
        setQuery("");
        setPrompts([...prompts, { isUser: true, text: customPrompt, id: Math.random() * 1000 }]);
    }

    useEffect(() => {
        if (promptsRef.current) {
            promptsRef.current.scrollTop = promptsRef.current.scrollHeight;
        }
    }, [prompts])
    return (
        <div className={Style.container}>
            <div ref={promptsRef} className={Style.prompts}>
                <div style={{ width: "80%", margin: "auto" }}>
                    {prompts.length === 0 ? (
                        <div className={Style.welcome}>
                            <div className={Style.logo}><img src={clawLogo} /></div>
                            <div>
                                <h2>How can I help you today?</h2>
                            </div>
                        </div>
                    ) : (
                        <div style={{ width: "100%", height: "100%" }}>
                            {prompts.map(({ id, text, isUser }) => <Prompt key={id} text={text} isUser={isUser} />)}
                        </div>
                    )}
                </div>
            </div>

            <div className={Style.promptInput}>
                {prompts.length === 0 && (<div className={Style.customPrompts}>
                    <div>
                        <CustomPrompt onClick={() => submitCustomPrompt("Main Prompt heading")} heading={"Main Prompt heading"} subHeading={"subheading giving some explaination"} />
                        <CustomPrompt onClick={() => submitCustomPrompt("Main Prompt heading")} heading={"Main Prompt heading"} subHeading={"subheading giving some explaination"} />
                    </div>
                    <div>
                        <CustomPrompt onClick={() => submitCustomPrompt("Main Prompt heading")} heading={"Main Prompt heading"} subHeading={"subheading giving some explaination"} />
                        <CustomPrompt onClick={() => submitCustomPrompt("Main Prompt heading")} heading={"Main Prompt heading"} subHeading={"subheading giving some explaination"} />
                    </div>
                </div>)}
                <form onSubmit={submitPrompt}>
                    <textarea
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Message LegalGPT..."
                        rows="3"
                    />
                    <button style={{ backgroundColor: "black", border: "none", borderRadius: "5px", padding: "10px" }} type="submit">
                        <FontAwesomeIcon style={{ height: 20, width: 24 }} icon={faArrowUp} color="white" />
                    </button>
                </form>
            </div>

        </div>
    )
};

export default LegalGPT;
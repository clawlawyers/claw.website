import clawLogo from '../assets/icons/logoIcon.jpeg';

export function Prompt({ isUser, text }) {
    return (
        <div style={{ padding: "4px 8px 4px 8px", marginBottom: 2 }}>
            <div style={{ display: "flex" }}>
                <div style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    marginRight: "15px",
                    border: "1px solid black",
                    overflow: "hidden",
                    position: "relative"
                }}>
                    <img alt="source image" style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: "100%",
                        height: "auto",
                        display: "block",
                        transform: "translate(-50%, -50%)",
                    }} src={clawLogo} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                    <div style={{ fontWeight: 500, fontSize: "20px" }}>{isUser ? "User" : "GPT"}</div>
                    <div style={{ overflowWrap: "break-word" }}>{text}</div>
                </div>
            </div>
        </div>
    )
};

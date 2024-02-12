import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clawLogo from '../assets/icons/logoIcon.jpeg';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export function Prompt({ role, text }) {
    console.log(role, text)
    return (
        <div style={{ padding: "4px 8px 4px 8px", marginBottom: 2 }}>
            <div style={{ display: "flex" }}>
                <div style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    marginRight: "15px",
                    backgroundColor: 'white',
                    overflow: "hidden",
                    position: "relative",
                    backgroundColor: "#5536DA",
                }}>
                    {role === 'user' ? (
                        <FontAwesomeIcon style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            height: "auto",
                            display: "block",
                            backgroundColor: "#5536DA",
                            transform: "translate(-50%, -50%)",
                        }} color='white' icon={faUser} />
                    ) : (
                        <img alt="source image" style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            width: "100%",
                            height: "auto",
                            display: "block",
                            transform: "translate(-50%, -50%)",
                        }} src={clawLogo} />
                    )}

                </div>
                <div style={{ display: "flex", flexDirection: "column", flex: 1, color: "white" }}>
                    <div style={{ fontWeight: 500, fontSize: "20px" }}>{role === 'user' ? "User" : "GPT"}</div>
                    <div style={{ overflowWrap: "break-word", whiteSpace: "pre-line" }}>{text}</div>
                </div>
            </div>
        </div>
    )
};

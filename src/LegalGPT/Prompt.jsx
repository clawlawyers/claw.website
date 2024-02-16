import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clawLogo from '../assets/icons/logoIcon.jpeg';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Styles from "./Prompt.module.css";

export function Prompt({ role, text }) {
    const highlighted = role !== 'user';
    return (
        <div className={Styles.container} style={(highlighted ? { backgroundColor: "#8940FF", padding: 25 } : {})}>
            <div style={{ display: "flex" }}>
                <div style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    marginRight: "25px",
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
                            backgroundColor:"#0FA47F",
                            left: "50%",
                            width: "100%",
                            height: "auto",
                            display: "block",
                            transform: "translate(-50%, -50%)",
                        }} src={clawLogo} />
                    )}

                </div>
                <div style={{ overflowWrap: "break-word", width: "100%", whiteSpace: "pre-line" }}>{text}</div>
            </div>

        </div>
    )
};

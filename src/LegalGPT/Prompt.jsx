import { faUser } from '@fortawesome/free-solid-svg-icons';
import Styles from "./Prompt.module.css";
import AssistantIcon from '@mui/icons-material/Assistant';
import PersonIcon from '@mui/icons-material/Person';

export function Prompt({ role, text }) {
    const highlighted = role !== 'user';
    return (
        <div className={Styles.container} style={(highlighted ? { backgroundColor: "#8940FF", padding: "15px 10px" } : { padding: "5px 10px" })}>
            <div style={{ display: "flex" }}>
                <div style={{
                    width: 30,
                    height: 30,
                    marginRight: "25px",
                    display: "flex",
                    alignItems: 'center',
                    justifyContent: "center",
                    backgroundColor: (role === 'user') ? "#5536DA" : "#0FA47F",
                }}>
                    {role === 'user' ? (
                        <PersonIcon style={{
                            fontSize: 20
                        }} color='white' icon={faUser} />
                    ) : (
                        <AssistantIcon alt="claw icon" style={{
                            fontSize: 20,
                            backgroundColor: "#0FA47F"
                        }} />
                    )}

                </div>
                <div className={Styles.promptText}>{text}</div>
            </div>

        </div>
    )
};

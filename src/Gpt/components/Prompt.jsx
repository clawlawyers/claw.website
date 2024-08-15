import { faUser } from "@fortawesome/free-solid-svg-icons";
import Styles from "./Prompt.module.css";
import AssistantIcon from "@mui/icons-material/Assistant";
import PersonIcon from "@mui/icons-material/Person";
import personIcon from "../../assets/images/Vector.png";

export function Prompt({ isUser, text, primaryColor }) {
  const highlighted = !isUser;
  return (
    <div
      className={Styles.container}
      style={
        highlighted
          ? {
              backgroundColor: "#303030",
              border: "2px solid #018081",
              margin: "15px",
              padding: "10px",
            }
          : { padding: "5px 10px" }
      }
    >
      <div className="flex items-start gap-2">
        <div className="flex items-center">
          {isUser ? (
            // <PersonIcon style={{
            //     fontSize: 30
            // }} color='white' icon={faUser} />
            <img className="w-7 h-[27px]" src={personIcon} />
          ) : (
            ""
          )}
        </div>
        <div className={Styles.promptText}>{text}</div>
      </div>
    </div>
  );
}

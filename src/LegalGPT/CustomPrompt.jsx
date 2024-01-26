import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

import Style from "./LegalGPT.module.css";

export function CustomPrompt({ heading, subHeading, onClick }) {
    return (
        <div onClick={onClick} className={Style.customPrompt}>
            <button>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", textAlign: "left" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div>{heading}</div>
                        <div>{subHeading}</div>
                    </div>
                    <div className={Style.sendCustomPrompt}>
                        <span >
                            <FontAwesomeIcon style={{ height: 16, width: 16 }} icon={faArrowUp} color="white" />
                        </span>
                    </div>
                </div>
            </button>
        </div>
    )
};
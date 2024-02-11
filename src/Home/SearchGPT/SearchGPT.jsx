import React from 'react';
import SearchOutlined from '@mui/icons-material/SearchOutlined';

import Styles from "./SearchGPT.module.css";

export default function SearchGPT() {
    return (
        <div className={Styles.searchContainer}>
            <div className={Styles.searchContent}>
                <div style={{ backgroundColor: "transparent", display: "flex", padding: 10 }}>
                    <div style={{ flex: 1, backgroundColor: "transparent", display: "flex", alignItems: "center" }}>
                        <SearchOutlined style={{ backgroundColor: "transparent", color: "#777", paddingRight: 5 }} />
                        <input
                            style={{ backgroundColor: "transparent", width: "100%", fontSize: 14, outline: "none", border: "none" }}
                            placeholder='Ask Your Legal Questions Here...'
                        />
                    </div>
                    <div style={{ backgroundColor: "#8940ff", borderRadius: 24, overflow: "hidden", padding: 8 }}>
                        <button style={{ fontWeight: 600, fontSize: 14, width: "100%", height: "100%", backgroundColor: "transparent", color: "white", border: "none" }}>Ask LegalGPT</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

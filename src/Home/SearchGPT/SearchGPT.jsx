import React, { useState } from 'react';
import SearchOutlined from '@mui/icons-material/SearchOutlined';

import Styles from "./SearchGPT.module.css";
import { Link } from 'react-router-dom';

export default function SearchGPT() {
    const [query, setQuery] = useState("");
    return (
        <div className={Styles.searchContainer}>
            <div className={Styles.searchContent}>
                <div style={{ backgroundColor: "transparent", display: "flex", padding: 10 }}>
                    <div style={{ flex: 1, backgroundColor: "transparent", display: "flex", alignItems: "center" }}>
                        <SearchOutlined style={{ backgroundColor: "transparent", color: "#777", paddingRight: 5 }} />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            style={{ backgroundColor: "transparent", width: "100%", fontSize: 14, outline: "none", border: "none" }}
                            placeholder='Ask Your Legal Questions Here ...'
                        />
                    </div>
                    <div className={Styles.buttonContainer}>
                        <Link to={`/legalGPT?query=${query}`} style={{ border: "none", color: "inherit", backgroundColor: "inherit", textDecoration: "none", width: "100%", height: "100%" }}>
                            <button>
                                Ask LegalGPT
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

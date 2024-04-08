import React from 'react';


import Styles from "./index.module.css";
import { Link } from 'react-router-dom';
import Header from '../Header/Header';

export default function NotFound() {
    return (
        <div className={Styles.container}>
            <Header />
            <div className={Styles.subContainer}>
                <Link
                    to="/"
                    style={{ borderRadius: 15, backgroundColor: "#008080", color: "white", textDecoration: "none", padding: 10, width: "fit-content", border: "none" }}
                >
                    Take me home
                </Link>
                <form style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
                    <h3>Guess the number for confetti</h3>
                    <h5 style={{ color: "red", fontWeight: 600, fontSize: 14 }}>Hint: Its pretty obvious</h5>
                    <input
                        type='number'
                        style={{ background: "#32353c", color: "white", padding: 10, fontSize: 15, borderRadius: 2, outline: "none", border: "none" }}
                    />
                    <button
                        style={{ borderRadius: 15, backgroundColor: "#008080", color: "white", textDecoration: "none", padding: 10, width: "fit-content", border: "none" }}
                    >
                        Guess
                    </button>
                </form>
            </div>
        </div>
    )
}

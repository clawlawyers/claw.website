import { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import clawLogo from "../assets/icons/clawlogo.png";
import Styles from "./Login.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { login } from "../features/user/userSlice";
import CircularProgress from '@mui/material/CircularProgress';

export default function Login() {
    const [otp, setOtp] = useState("");
    const [hasFilled, setHasFilled] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("+91");
    const [isLoading, setIsLoading] = useState(false);
    const currentUser = useSelector(state => state.user.current);
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) return navigate("/");
    }, [])

    const dispatch = useDispatch();

    const generateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
        });
    }

    const handleSend = (e) => {
        e.preventDefault();
        setHasFilled(true);
        generateRecaptcha();
        let appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, phoneNumber, appVerifier).then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
        }).catch((error) => console.log(error));
    }

    const verifyOtp = (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (otp.length === 6) {
            const confirmationResult = window.confirmationResult;
            confirmationResult.confirm(otp).then((result) => {
                const { uid, phoneNumber, stsTokenManager } = result.user;
                const { accessToken, expirationTime, refreshToken } = stsTokenManager;
                dispatch(login({ uid, phoneNumber, sessionTokens: { accessToken, expirationTime, refreshToken } }));
                navigate("/");
            }).catch((error) => console.log(error)).finally(setIsLoading(false));
        }
    }

    return (
        <div style={{ width: "100%" }}>
            <div style={{ backgroundColor: "#13161f", position: "relative", borderRadius: 30, padding: 50, zIndex: 2, width: "80%", margin: "auto", display: "flex", gap: 10 }}>
                <div style={{ flex: 1 }}>

                    <h1 style={{ fontSize: 60, fontWeight: 700, marginBottom: 25, textAlign: "center" }}>
                        Welcome back!
                    </h1>
                    {hasFilled && (
                        <form style={{ width: "50%" }} onSubmit={verifyOtp}>
                            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                                <label style={{ color: "#8940ff", fontWeight: 600, fontSize: 14 }}>OTP</label>
                                <input style={{ background: "#32353c", color: "white", padding: 10, fontSize: 15, borderRadius: 2, outline: "none", border: "none" }} type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
                            </div>
                            <button disabled={isLoading} style={{ backgroundColor: "#8940ff", color: "white", border: "none", marginTop: 45, padding: "10px 45px", fontSize: 15, fontWeight: 600 }} type="submit">
                                {isLoading ? <CircularProgress color="secondary" /> : <>Verify otp</>}
                            </button>
                        </form>
                    )}

                    {!hasFilled && (
                        <form style={{}} onSubmit={handleSend}>
                            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                                <label style={{ color: "#8940ff", fontWeight: 600, fontSize: 14 }}>PHONE NUMBER</label>
                                <input style={{ background: "#32353c", color: "white", padding: 10, fontSize: 15, borderRadius: 2, outline: "none", border: "none" }} type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                            </div>
                            <button disabled={isLoading} style={{ backgroundColor: "#8940ff", color: "white", border: "none", marginTop: 45, padding: "10px 45px", fontSize: 15, fontWeight: 600 }} type="submit">
                                {isLoading ? <CircularProgress color="secondary" /> : <>Send otp</>}
                            </button>
                        </form>
                    )}
                </div>
                <div className={Styles.iconContainer}>
                    <img style={{ width: "60%" }} src={clawLogo} />
                </div>
            </div>
            <div id="recaptcha" />
        </div>
    )
}
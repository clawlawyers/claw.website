import { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import clawLogo from "../assets/icons/clawlogo.png";
import Styles from "./Login.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom"
import { login } from "../features/auth/authSlice";
import CircularProgress from '@mui/material/CircularProgress';
import ErrorIcon from '@mui/icons-material/Error';
import { NODE_API_ENDPOINT } from "../utils/utils";

export default function Login() {
    const [otp, setOtp] = useState("");
    const [hasFilled, setHasFilled] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [countryCode, setCountryCode] = useState("+91");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const currentUser = useSelector(state => state.auth.user);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();


    const dispatch = useDispatch();

    useEffect(() => {
        if (currentUser) {
            if (searchParams.get("callbackUrl")) navigate(searchParams.get("callbackUrl"));
            else navigate("/");
        }
    }, [navigate, searchParams, currentUser])

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
        signInWithPhoneNumber(auth, countryCode + phoneNumber, appVerifier).then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
        }).catch((error) => console.log(error));
    }

    const verifyOtp = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (otp.length === 6) {
                const confirmationResult = window.confirmationResult;
                const result = await confirmationResult.confirm(otp)
                const { uid, phoneNumber } = result.user;
                const response = await fetch(`${NODE_API_ENDPOINT}/client/verify`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ phoneNumber: phoneNumber.slice(3), verified: true })
                })
                const { data } = await response.json();
                dispatch(login({ uid, phoneNumber, jwt: data.jwt, expiresAt: data.expiresAt, newGptUser: data.newGptUser, ambassador: data.ambassador }));
            }
            else throw new Error("Otp length should be of 6")
        } catch (error) {
            setError(error.message || "Invalid Otp!")
        }
        finally {
            setIsLoading(false);
        }
    }
    return (
        <div style={{ width: "100%" }}>
            <div style={{ backgroundColor: "#13161f", position: "relative", borderRadius: 30, padding: 50, zIndex: 2, width: "80%", margin: "auto", display: "flex", gap: 10 }}>
                <div style={{ flex: 1 }}>

                    <h1 className={Styles.loginHeader} >
                        Welcome back!
                    </h1>
                    <div>
                        {error ? <div style={{ display: "flex", fontSize: 13, paddingBottom: 5, color: "red", alignItems: "center" }}>
                            <ErrorIcon style={{ fontSize: 13 }} />
                            {error}
                        </div>
                            : null}
                    </div>
                    {hasFilled && (
                        <form style={{ width: "50%" }} onSubmit={verifyOtp}>
                            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                                <label style={{ color: "#8940ff", fontWeight: 600, fontSize: 14 }}>OTP</label>
                                <input pattern="[0-9]{6}" style={{ background: "#32353c", color: "white", padding: 10, fontSize: 15, borderRadius: 2, outline: "none", border: "none" }} type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
                            </div>
                            <button disabled={isLoading} style={{ backgroundColor: "#8940ff", color: "white", border: "none", marginTop: 45, padding: "10px 45px", fontSize: 15, fontWeight: 600 }} type="submit">
                                {isLoading ? <CircularProgress size={15} style={{ color: "white" }} /> : <>Verify otp</>}
                            </button>
                        </form>
                    )}

                    {!hasFilled && (
                        <form style={{}} onSubmit={handleSend}>
                            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                                <label style={{ color: "#8940ff", fontWeight: 600, fontSize: 14 }}>PHONE NUMBER</label>
                                <div style={{ display: "flex" }}>
                                    <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)} style={{ backgroundColor: "inherit", border: "none", color: "white", outline: "none" }}>
                                        <option style={{ color: "black" }} value={"+91"}>+91</option>
                                    </select>
                                    <input pattern="[0-9]{10}" style={{ background: "#32353c", color: "white", padding: 10, fontSize: 15, borderRadius: 2, outline: "none", border: "none" }} type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                </div>
                            </div>
                            <button disabled={isLoading} style={{ backgroundColor: "#8940ff", color: "white", border: "none", marginTop: 45, padding: "10px 45px", fontSize: 15, fontWeight: 600 }} type="submit">
                                Send otp
                            </button>
                        </form>
                    )}
                </div>
                <div className={Styles.iconContainer}>
                    <img alt="Claw Logo" style={{ width: "60%" }} src={clawLogo} />
                </div>
            </div>
            <div id="recaptcha" />
        </div>
    )
}
import { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import clawLogo from "../assets/icons/clawlogo.png";
import Styles from "./Login.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { login } from "../features/auth/authSlice";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorIcon from "@mui/icons-material/Error";
import { NODE_API_ENDPOINT } from "../utils/utils";
import axios from "axios";
import { Helmet } from "react-helmet";
import {
  generateResponse,
  setGpt,
  setPlan,
  setToken,
} from "../features/gpt/gptSlice";

export default function Login() {
  const [otp, setOtp] = useState("");
  const [hasFilled, setHasFilled] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const currentUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  let area;
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  console.log(location);
  const [areaName, setAreaName] = useState(null);

  const dispatch = useDispatch();
  const { prompt } = useSelector((state) => state.gpt);

  useEffect(() => {
    const callbackfunction = async () => {
      if (currentUser) {
        console.log(prompt);
        if (searchParams.get("callbackUrl")) {
          if (searchParams.get("callbackUrl") == "/gpt/legalGPT") {
            const res = await fetch(`${NODE_API_ENDPOINT}/gpt/session`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${currentUser.jwt}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ prompt: prompt, model: "legalGPT" }),
            });
            const { data } = await res.json();
            console.log(data);
            console.log("hi");

            dispatch(
              generateResponse({ sessionId: data.id, model: "legalGPT" })
            );

            navigate(`/gpt/legalGPT/session/${data.id}`);
          } else {
            navigate(searchParams.get("callbackUrl"));
          }
        } else navigate("/");
      }
    };
    callbackfunction();
  }, [navigate, searchParams, currentUser]);

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
      size: "invisible",
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      },
    });
  };

  const handleSend = (e) => {
    e.preventDefault();
    setHasFilled(true);
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, countryCode + phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => console.log(error));
  };

  function extractState(addressComponents) {
    for (const component of addressComponents) {
      if (component.types.includes("administrative_area_level_1")) {
        return component.long_name;
      }
    }
    return null;
  }

  const getAreaName = async (latitude, longitude) => {
    const API_KEY = "AIzaSyB2FE83jbNZ8_dREtBnzEwG-XH5E831NAA";
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`
    );
    const { results } = response.data;
    console.log(results);
    if (results && results.length > 0) {
      const state = extractState(results[0].address_components);
      if (state) {
        console.log(state);
        localStorage.setItem("userLocation", state);
        return state;
      } else {
        throw new Error("State not found in the address components");
      }
    } else {
      throw new Error("No results found");
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (otp.length === 6) {
        const confirmationResult = window.confirmationResult;
        const result = await confirmationResult.confirm(otp);
        const { uid, phoneNumber } = result.user;
        const response = await fetch(`${NODE_API_ENDPOINT}/client/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber: phoneNumber.slice(3),
            verified: true,
          }),
        });
        console.log(response);
        const { data } = await response.json();
        console.log(data);
        const userMongoId = data.mongoId;

        if (
          data?.sessions % 5 === 0 ||
          !data?.sessions ||
          !data?.stateLocation
        ) {
          if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
              async (position) => {
                const { latitude, longitude } = position.coords;
                console.log(latitude + " " + longitude);
                setLocation({ latitude, longitude });

                try {
                  area = await getAreaName(latitude, longitude);
                  setAreaName(area);
                  // console.log(area);

                  console.log(areaName);

                  const response = await fetch(
                    `${NODE_API_ENDPOINT}/client/setState`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        id: userMongoId,
                        location: area,
                      }),
                    }
                  );
                  const { data } = await response.json();
                  // console.log(data);

                  // console.log(area);
                } catch (error) {
                  setError("Failed to get area name");
                }
              },
              (error) => {
                setError(error.message);
              }
            );
          } else {
            setError("Geolocation not supported");
          }
        } else {
          localStorage.setItem("userLocation", data.stateLocation);
        }
        dispatch(
          login({
            uid,
            phoneNumber,
            jwt: data.jwt,
            expiresAt: data.expiresAt,
            newGptUser: data.newGptUser,
            ambassador: data.ambassador,
            stateLocation: area ? area : data.stateLocation,
          })
        );
      } else throw new Error("Otp length should be of 6");
    } catch (error) {
      setError(error.message || "Invalid Otp!");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div style={{ width: "100%" }}>
      <Helmet>
        <title>Login</title>
        <meta
          name="description"
          content="Join us to access comprehensive legal resources, expert insights, and efficient case management tools."
        />
        {/* <meta
          name="keywords"
          content=""
        /> */}
      </Helmet>
      <div
        style={{
          backgroundColor: "#13161f",
          position: "relative",
          borderRadius: 30,
          padding: 30,
          zIndex: 2,
          width: "80%",
          margin: "auto",
          display: "flex",
          gap: 10,
        }}
      >
        <div style={{ flex: 1 }}>
          <h1 className={Styles.loginHeader}>Welcome back!</h1>
          <div>
            {error ? (
              <div
                style={{
                  display: "flex",
                  fontSize: 13,
                  paddingBottom: 5,
                  color: "red",
                  alignItems: "center",
                }}
              >
                <ErrorIcon style={{ fontSize: 13 }} />
                {error}
              </div>
            ) : null}
          </div>
          {hasFilled && (
            <form style={{ width: "50%" }} onSubmit={verifyOtp}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label
                  style={{ color: "#008080", fontWeight: 600, fontSize: 14 }}
                >
                  OTP
                </label>
                <input
                  pattern="[0-9]{6}"
                  style={{
                    background: "#32353c",
                    color: "white",
                    padding: 10,
                    fontSize: 15,
                    borderRadius: 2,
                    outline: "none",
                    border: "none",
                  }}
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <button
                disabled={isLoading}
                style={{
                  backgroundColor: "#008080",
                  color: "white",
                  border: "none",
                  marginTop: 45,
                  padding: "10px 45px",
                  fontSize: 15,
                  fontWeight: 600,
                }}
                type="submit"
              >
                {isLoading ? (
                  <CircularProgress size={15} style={{ color: "white" }} />
                ) : (
                  <>Verify otp</>
                )}
              </button>
            </form>
          )}

          {!hasFilled && (
            <form style={{}} onSubmit={handleSend}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label
                  style={{ color: "#008080", fontWeight: 600, fontSize: 14 }}
                >
                  PHONE NUMBER
                </label>
                <div style={{ display: "flex" }}>
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    style={{
                      backgroundColor: "inherit",
                      border: "none",
                      color: "white",
                      outline: "none",
                    }}
                  >
                    <option style={{ color: "black" }} value={"+91"}>
                      +91
                    </option>
                  </select>
                  <input
                    pattern="[0-9]{10}"
                    style={{
                      background: "#32353c",
                      color: "white",
                      padding: 10,
                      fontSize: 15,
                      borderRadius: 2,
                      outline: "none",
                      border: "none",
                    }}
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
              <button
                disabled={isLoading}
                style={{
                  backgroundColor: "#008080",
                  color: "white",
                  border: "none",
                  marginTop: 45,
                  padding: "10px 45px",
                  fontSize: 15,
                  fontWeight: 600,
                }}
                type="submit"
              >
                Send otp
              </button>
            </form>
          )}
        </div>
        <div className={Styles.iconContainer}>
          <img
            alt="Claw Logo"
            style={{ width: "60%", height: "100%" }}
            src={clawLogo}
          />
        </div>
      </div>
      <div id="recaptcha" />
    </div>
  );
}

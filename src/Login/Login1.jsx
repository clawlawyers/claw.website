import React, { useState, useEffect } from "react";
import loginIcon from "../assets/images/loginIcon.gif";
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
import toast from "react-hot-toast";

const Login1 = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  let area;

  const [otp, setOtp] = useState("");
  const [hasFilled, setHasFilled] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [isLoading, setIsLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [areaName, setAreaName] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [countdown, setCountdown] = useState(30);

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const { prompt } = useSelector((state) => state.gpt);

  useEffect(() => {
    const callbackfunction = async () => {
      if (currentUser) {
        console.log(prompt);
        if (prompt && searchParams.get("callbackUrl")) {
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
    setOtpLoading(true);
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, countryCode + phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        toast.success("OTP sent successfully !");
        setHasFilled(true);
        setOtpLoading(false);
        setIsDisabled(true);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error during OTP request");
        setOtpLoading(false);
      });
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

  useEffect(() => {
    let intervalId;
    if (isDisabled && countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    if (countdown === 0) {
      clearInterval(intervalId);
      setIsDisabled(false);
      setCountdown(30); // Reset countdown
    }

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [isDisabled, countdown]);

  const handleRetryClick = (e) => {
    e.preventDefault();
    setIsDisabled(true);

    //  API call here
  };

  return (
    <div className="w-[80%] m-auto">
      <div className="flex justify-center pb-10">
        <h1 className="text-5xl font-bold">Welcome Back</h1>
      </div>
      <div className="bg-white bg-opacity-10 p-3 grid md:grid-cols-2 rounded-lg border">
        <img className="w-auto h-auto rounded-none" src={loginIcon} />
        {!hasFilled ? (
          <form onSubmit={handleSend} className="flex flex-col gap-3 py-5">
            <p className="m-0 flex-none">Phone Number</p>
            <input
              required
              className="px-2 py-3 rounded text-black"
              placeholder="Enter Your Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded px-5"
                style={{ background: "linear-gradient(90deg,#1D2330,#00C37B)" }}
              >
                {otpLoading ? (
                  <CircularProgress size={15} color="inherit" />
                ) : (
                  "Send OTP"
                )}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={verifyOtp} className="flex flex-col gap-3 py-5">
            <p className="m-0 flex-none">OTP</p>
            <input
              required
              className="px-2 py-3 rounded text-black"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={handleRetryClick}
                disabled={isDisabled}
                className="bg-transparent border rounded px-5"
              >
                {isDisabled ? `Wait ${countdown} seconds...` : "Retry"}
              </button>
              <button
                type="submit"
                className="rounded px-5"
                style={{ background: "linear-gradient(90deg,#1D2330,#00C37B)" }}
              >
                {isLoading ? (
                  <CircularProgress size={15} color="inherit" />
                ) : (
                  "Verify OTP"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
      <div id="recaptcha" />
    </div>
  );
};

export default Login1;

import React, { useState, useEffect } from "react";
import loginIcon from "../assets/images/loginIcon.gif";
import {
  auth,
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithCredential,
  signInWithPhoneNumber,
} from "../utils/firebase";
import clawLogo from "../assets/icons/clawlogo.png";
import Styles from "./Login.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { login } from "../features/auth/authSlice";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorIcon from "@mui/icons-material/Error";
import { NODE_API_ENDPOINT, OTP_ENDPOINT } from "../utils/utils";
import axios from "axios";
import { Helmet } from "react-helmet";
import {
  generateResponse,
  retrieveActivePlanUser,
  setGpt,
  setPlan,
  setToken,
} from "../features/gpt/gptSlice";
import toast from "react-hot-toast";
import { AutoFixHighOutlined } from "@mui/icons-material";
import { retrieveActiveAdiraPlan } from "../features/payment/paymentSlice";

const Login1 = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [verificationId, setVerificationId] = useState("");
  const [isFirst, setIsfirst] = useState(true);
  const [otpToken, setOtpToken] = useState("");
  const [verifyToken, setVerifyToken] = useState("");

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

  const handleSend = async (e) => {
    e.preventDefault();
    setOtpLoading(true);

    console.log(window.recaptchaVerifier);

    if (isFirst) {
      console.log("recaptchaVerifier");
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          console.log(response);
        },
        auth,
      });
      setIsfirst(false);
    } else if (!window.recaptchaVerifier) {
      console.log("recaptchaVerifier");
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          console.log(response);
        },
        auth,
      });
    }

    // const response =await  fetch(`${OTP_ENDPOINT}/generateOTPmobile`, {
    //   method:'POST',
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body:JSON.stringify({
    //     phone:phoneNumber
    //   })

    // })
    // if(response.status ==200){
    //   const data= await response.json()
    //   console.log(data.authtoken);
    //   setOtpToken(data.authtoken)
    //   // setVerificationId(confirmationResult?.verificationId);
    //       toast.success("OTP sent successfully !");
    //       setHasFilled(true);
    //       setOtpLoading(false);
    //       setIsDisabled(true);
    // }
    // else{
    //   toast.error("Error during OTP request");
    //   //     setOtpLoading(false);
    // }

    console.log(window.recaptchaVerifier);
    console.log("i am here");
    console.log(auth);
    console.log(phoneNumber);

    signInWithPhoneNumber(
      auth,
      countryCode + phoneNumber,
      window.recaptchaVerifier
    )
      .then((confirmationResult) => {
        setVerificationId(confirmationResult?.verificationId);
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
        const credential = PhoneAuthProvider.credential(verificationId, otp);
        await signInWithCredential(auth, credential);
        // var response = await fetch(`${OTP_ENDPOINT}/verifyotpmobile`, {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //     "auth-token":otpToken
        //   },
        //   body: JSON.stringify({
        //     phone: phoneNumber,
        //    otp:otp
        //   }),
        // });
        // console.log(response)
        // if(response.status !=200){
        //   setError(error.message || "Invalid Otp!");
        //   setIsLoading(false);
        //   toast.error("invaid otp")
        //   return
        // }
        // var data =await  response.json()
        // console.log(data)

        const response = await fetch(`${NODE_API_ENDPOINT}/client/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // "auth-token":data.authtoken
          },
          body: JSON.stringify({
            phoneNumber: phoneNumber,
            verified: true,
          }),
        });
        console.log(response);
        var { data } = await response.json();
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

  const retryOTP = async (e) => {
    try {
      e.preventDefault();
      setIsDisabled(true);
      const handleOTPsend = await fetch(`${OTP_ENDPOINT}/generateOTPmobile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: phoneNumber,
          siteName: "www.clawlaw.in",
        }),
      });
      if (!handleOTPsend.ok) {
        console.error("Failed to send OTP");
        toast.error("Failed to send OTP");
        throw new Error("Failed to send OTP");
      }
      const data = await handleOTPsend.json();
      if (data.authtoken) {
        setOtpToken(data.authtoken);
      }
      // setVerificationId(confirmationResult?.verificationId);
      toast.success("OTP sent successfully !");
      setHasFilled(true);
      setOtpLoading(false);
      setIsDisabled(true);
    } catch (error) {
      console.error(error);
      setOtpLoading(false);
      toast.error("Failed to retry OTP");
    }
  };

  const sendOTP = async (e) => {
    e.preventDefault();

    setOtpLoading(true);

    try {
      const handleOTPsend = await fetch(`${OTP_ENDPOINT}/generateOTPmobile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: phoneNumber,
          siteName: "www.clawlaw.in",
        }),
      });
      if (!handleOTPsend.ok) {
        console.error("Failed to send OTP");
        toast.error("Failed to send OTP");
        throw new Error("Failed to send OTP");
      }
      const data = await handleOTPsend.json();
      if (data.authtoken) {
        setOtpToken(data.authtoken);
      }
      toast.success("OTP sent successfully");
      setHasFilled(true);
      setOtpLoading(false);
      setIsDisabled(true);
    } catch (error) {
      toast.error("Failed to send OTP");
      setOtpLoading(false);
      console.error(error);
    }
  };

  console.log(otpToken);
  console.log(otp);

  const verifyOTP = async (e) => {
    e.preventDefault();
    try {
      if (otp.length === 6) {
        setIsLoading(true);

        const verifyOTPResponse = await fetch(
          `${OTP_ENDPOINT}/verifyotpmobile`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": otpToken,
            },
            body: JSON.stringify({
              otp: otp,
            }),
          }
        );

        if (!verifyOTPResponse.ok) {
          const err = verifyOTPResponse.json();
          setIsLoading(false);
          toast.error(err.error);
          return;
        }

        const OTPdata = await verifyOTPResponse.json();
        console.log(OTPdata);
        if (OTPdata.authtoken) {
          console.log(verifyToken);
          await loginToUser(OTPdata.authtoken);

          // setVerifyToken(OTPdata.authtoken);
        }
        console.log(verifyToken);
      } else throw new Error("Otp length should be of 6");
    } catch (error) {
      toast.error("Failed to verify OTP");
      setIsLoading(false);

      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loginToUser = async (authT) => {
    try {
      const response = await fetch(`${NODE_API_ENDPOINT}/client/verifyCleint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authT,
        },
        // body: JSON.stringify({
        //   phoneNumber: phoneNumber.slice(3),
        //   verified: true,
        // }),
      });
      console.log(response);
      const { data } = await response.json();
      console.log(data);
      const userMongoId = data.mongoId;

      if (data?.sessions % 5 === 0 || !data?.sessions || !data?.stateLocation) {
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
          // uid,
          phoneNumber,
          jwt: data.jwt,
          expiresAt: data.expiresAt,
          newGptUser: data.newGptUser,
          ambassador: data.ambassador,
          stateLocation: area ? area : data.stateLocation,
        })
      );
      dispatch(retrieveActivePlanUser());
      dispatch(retrieveActiveAdiraPlan());
    } catch (error) {}
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

  const handleRetryClick = async (e) => {
    e.preventDefault();

    try {
      setIsDisabled(true);
      const handleOTPsend = await fetch(`${OTP_ENDPOINT}/generateOTPmobile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: phoneNumber,
          siteName: "www.clawlaw.in",
        }),
      });
      if (!handleOTPsend.ok) {
        console.error("Failed to send OTP");
        toast.error("Error during OTP request");
        setOtpLoading(false);
        throw new Error("Failed to send OTP");
      }
      const data = await handleOTPsend.json();
      console.log(data.authtoken);
      if (data.authtoken) {
        setOtpToken(data.authtoken);
      }

      toast.success("OTP sent successfully !");
      setHasFilled(true);
      setOtpLoading(false);
      setIsDisabled(true);
    } catch (error) {
      console.log(error);
      toast.error("Error during OTP request");
      setOtpLoading(false);
    }
  };

  return (
    <div className="w-[80%] m-auto">
      <Helmet>
        <title>Login</title>
        <meta
          name="description"
          content="Join us to access comprehensive legal resources, expert insights, and efficient case management tools."
        />
        <meta
          name="keywords"
          content="digital legal transformation, privacy policies, business law services, comprehensive, data-driven law, access, legal news insights, legal compliance, AI legal solutions"
        />
      </Helmet>
      <div className="flex justify-center pb-10">
        <h1 className="text-5xl font-bold">Welcome Back</h1>
      </div>
      <div className="bg-white bg-opacity-10 p-3 grid md:grid-cols-2 rounded-lg border">
        <img
          className="w-auto h-auto rounded-none"
          alt="login-img"
          src={loginIcon}
        />
        {!hasFilled ? (
          <form onSubmit={sendOTP} className="flex flex-col gap-3 py-5">
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
          <form onSubmit={verifyOTP} className="flex flex-col gap-3 py-5">
            <p className="m-0 flex-none">OTP</p>
            <input
              required
              className="px-2 py-3 rounded text-black"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <div className="flex flex-col md:flex-row justify-end gap-3">
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

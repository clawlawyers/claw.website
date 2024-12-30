import loginIcon from "../assets/images/loginIcon.gif";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google"; // Import from react-oauth/google

import React, { useState, useEffect } from "react";

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

const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [verificationId, setVerificationId] = useState("");
  const [isFirst, setIsfirst] = useState(true);
  const [otpToken, setOtpToken] = useState("");
  const [verifyToken, setVerifyToken] = useState("");
  const [otpSent, SetOtpSent] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profession: "",
    industry: "",
    purpose: "",
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value, // Update the specific field using its name
    });
  };

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
  const [googleAuthLoading, setGoogleAuthLoading] = useState(false);

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
      const isValidUser = await fetch(
        `${NODE_API_ENDPOINT}/client/validate-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // email: formData.email,
            phoneNumber: phoneNumber,
          }),
        }
      );

      if (!isValidUser.ok) {
        const error = await isValidUser.json();
        throw new Error(error.message);
      }

      const respo = await isValidUser.json();
      console.log(respo);
      if (respo.message === "Invalid user credentials") {
        setIsDisabled(false);
        setOtpLoading(false);
        toast.error("This Number not registered. Signup First");
        navigate("/signup");
        return;
      }

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
      SetOtpSent(true);
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
          setVerifyToken(OTPdata.authtoken);
        }
        // console.log(verifyToken);
        toast.success("Mobile number verified");
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
    setIsLoading(true);

    try {
      const response = await fetch(`${NODE_API_ENDPOINT}/client/verifyCleint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authT,
        },
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
      setIsLoading(false);
    } catch (error) {
      toast.error("Failed to login");
      setIsLoading(false);
      console.error(error);
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

  const responseGoogle = (response) => {
    setGoogleAuthLoading(true);
    console.log("Google response:", response); // Log the entire Google response object

    if (response.credential) {
      const token = response.credential;

      // Send the token to the backend for validation
      fetch(`${NODE_API_ENDPOINT}/client/google/callback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }), // Send token as JSON body
      })
        .then((res) => {
          console.log("Backend response:", res); // Log the response object from backend
          return res.json(); // Convert response to JSON
        })
        .then((data) => {
          console.log("Authentication successful:", data); // Log the response data
          if (data.message === "User not found") {
            toast.error("User not found. Please sign up first.");
            navigate("/signup");
            return;
          }
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
              // uid,
              phoneNumber: data.phoneNumber,
              jwt: data.jwt,
              expiresAt: data.expiresAt,
              newGptUser: data.newGptUser,
              ambassador: data.ambassador,
              stateLocation: area ? area : data.stateLocation,
            })
          );
          dispatch(retrieveActivePlanUser());
          dispatch(retrieveActiveAdiraPlan());
          setGoogleAuthLoading(false);
          // Handle success (e.g., save user data, redirect, etc.)
        })
        .catch((err) => {
          console.log("Error:", err); // Handle errors
          setGoogleAuthLoading(false);
        });
    }
  };

  return (
    <div className=" min-h-screen flex items-center justify-center">
      {/* Main Card */}
      <div className="bg-white bg-opacity-25  w-[85%] md:w-[80%] rounded-lg shadow-lg overflow-hidden border ">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-white py-6">
          Log In to Claw Legaltech
        </h2>

        <div className="flex flex-col md:flex-row">
          {/* Left Section: Image */}
          <div className="flex items-center justify-center md:w-1/2">
            <img
              src={loginIcon}
              alt="Login Illustration"
              className="p-3 h-auto w-auto rounded-none"
            />
          </div>

          {/* Right Section: Form */}
          <div className="flex-1 p-6 md:p-10">
            {!hasFilled ? (
              <form onSubmit={sendOTP}>
                <div className="mb-6">
                  <input
                    type="number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter Valid Mobile Number *"
                    className="w-full p-3 border border-gray-300 text-gray-700 bg-[rgba(195,255,255,1)] rounded-md focus:ring-2 focus:ring-teal-600 focus:outline-none"
                  />
                </div>

                {/* Continue Button */}
                <button
                  type="submit"
                  className="w-full bg-teal-700 text-white p-3 rounded-md hover:bg-teal-800 transition duration-300"
                >
                  {otpLoading ? (
                    <CircularProgress size={15} color="inherit" />
                  ) : (
                    "Send OTP"
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={verifyOTP}>
                <div className="mb-6">
                  <input
                    type="number"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="w-full p-3 border border-gray-300 text-gray-700 bg-[rgba(195,255,255,1)] rounded-md focus:ring-2 focus:ring-teal-600 focus:outline-none"
                  />
                </div>

                {/* Continue Button */}
                <div className="flex flex-col md:flex-row justify-end gap-3">
                  <button
                    onClick={handleRetryClick}
                    disabled={isDisabled}
                    className="w-full bg-transparent border rounded px-5"
                  >
                    {isDisabled ? `Wait ${countdown} seconds...` : "Retry"}
                  </button>
                  <button
                    type="submit"
                    className="w-full bg-teal-700 text-white p-3 rounded-md hover:bg-teal-800 transition duration-300"
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
            {/* Input: Mobile Number */}

            {/* Divider */}
            <div className="flex items-center my-4">
              <hr className="flex-grow border-white" />
              <span className="mx-2 text-white">OR</span>
              <hr className="flex-grow border-white" />
            </div>

            {/* Google Sign-In */}
            {/* <button className="w-full flex items-center justify-center border border-white p-3 rounded-md text-white bg-teal-700 hover:bg-teal-800 transition">
              <img
                src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                alt="Google Logo"
                className="w-5 h-5 mr-2"
              />
              Sign Up with Google
            </button> */}
            <div className="w-full flex justify-center">
              {googleAuthLoading ? (
                <button className="bg-white rounded-lg w-44">
                  <CircularProgress size={15} sx={{ color: "#055151" }} />
                </button>
              ) : (
                <GoogleLogin
                  onSuccess={responseGoogle}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              )}
            </div>

            {/* Footer Links */}
            <div className="text-center mt-6">
              <p className="text-white">
                New to Claw Legal Tech?{" "}
                <Link
                  to="/signup"
                  className="text-teal-600 font-semibold hover:underline"
                >
                  Register Now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

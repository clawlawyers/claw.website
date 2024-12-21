import React, { useState, useEffect } from "react";
import loginIcon from "../assets/images/loginIcon.gif";
import { Link } from "react-router-dom";

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

const SignUpPage = () => {
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
  const [otpVerified, setOtpVerified] = useState(false);

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
      if (respo.message === "User is valid") {
        setIsDisabled(false);
        setOtpLoading(false);
        toast.error("This Number is already registered");
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
        setOtpLoading(true);

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
          setOtpLoading(false);
          toast.error(err.error);
          return;
        }

        const OTPdata = await verifyOTPResponse.json();
        console.log(OTPdata);
        if (OTPdata.authtoken) {
          console.log(verifyToken);
          // await loginToUser(OTPdata.authtoken);
          setVerifyToken(OTPdata.authtoken);
          setOtpVerified(true);
        }
        console.log(verifyToken);
        toast.success("Mobile number verified");
      } else throw new Error("Otp length should be of 6");
    } catch (error) {
      toast.error("Failed to verify OTP");
      setOtpLoading(false);

      console.error(error);
    } finally {
      setOtpLoading(false);
    }
  };

  const loginToUser = async () => {
    setIsLoading(true);

    try {
      const isValidUser = await fetch(
        `${NODE_API_ENDPOINT}/client/validate-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            // phoneNumber: phoneNumber,
          }),
        }
      );

      if (!isValidUser.ok) {
        const error = await isValidUser.json();
        throw new Error(error.message);
      }

      const respo = await isValidUser.json();
      if (respo.message === "User is valid") {
        setIsDisabled(false);
        setOtpLoading(false);
        toast.error("This Email is already registered");
        return;
      }

      const response = await fetch(`${NODE_API_ENDPOINT}/client/verifyCleint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": verifyToken,
        },
        body: JSON.stringify(formData),
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

  const showVerificationToast = () => {
    toast.error("Please verify your phone number first!");
  };

  return (
    <div className="  bg-white bg-opacity-25 rounded-md mx-auto my-0 w-[80%] border">
      {/* Title */}
      <h2 className="text-3xl pt-3 font-bold text-white mb-6 text-center">
        Sign Up to Claw Legaltech
      </h2>

      {/* Card Container */}
      <div className="flex flex-col items-center justify-center mx-auto my-0 md:flex-row rounded-md  w-full">
        {/* Left Section: Image */}
        <div className="w-full md:w-1/2  flex justify-center rounded-md items-center p-6 ">
          <img
            src={loginIcon}
            alt="Login Illustration"
            className="w-auto h-auto rounded-none"
          />
        </div>

        {/* Right Section: Form */}
        <div className="w-full  p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
            {/* Input Fields */}
            <input
              type="text"
              value={formData.firstName}
              name="firstName"
              onChange={handleOnChange}
              placeholder="Enter First Name"
              className="col-span-2 md:col-span-1 p-2 border text-black border-gray-300 rounded-lg  bg-[rgba(195,255,255,1)] focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="text"
              value={formData.lastName}
              name="lastName"
              onChange={handleOnChange}
              placeholder="Enter Last Name"
              className="col-span-2 md:col-span-1 p-2 border border-gray-300 text-black rounded-lg  bg-[rgba(195,255,255,1)] focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="email"
              value={formData.email}
              name="email"
              onChange={handleOnChange}
              placeholder="Enter Valid Email ID *"
              className=" p-2 border border-gray-300 rounded-lg text-black  bg-[rgba(195,255,255,1)] focus:outline-none focus:ring-2 focus:ring-teal-500 col-span-2"
            />

            {!hasFilled ? (
              <div className="flex flex-col md:flex-row gap-2 col-span-2">
                <input
                  type="number"
                  value={phoneNumber}
                  // name="email"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter Your Mobile Number *"
                  className="w-full p-2 flex-1 border border-gray-300 text-black bg-[rgba(195,255,255,1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                  className="w-full md:w-2/6 bg-teal-700 text-white px-4 py-2   rounded-lg hover:bg-teal-800 transition"
                  onClick={sendOTP}
                >
                  {otpLoading ? (
                    <CircularProgress size={15} color="inherit" />
                  ) : (
                    "Send OTP"
                  )}
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 w-full col-span-2">
                <div className="w-full flex flex-col md:flex-row gap-2">
                  <input
                    readOnly
                    type="number"
                    value={phoneNumber}
                    placeholder="Enter Your Mobile Number *"
                    className="w-full p-2 flex-1 border border-gray-300 text-black bg-[rgba(195,255,255,1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    className="w-full md:w-2/6  bg-teal-700 text-white px-4 py-2  rounded-lg hover:bg-teal-800 transition"
                    onClick={() => {
                      setPhoneNumber("");
                      setHasFilled(false);
                      setOtpVerified(false);
                      setOtp("");
                    }}
                  >
                    Change
                  </button>
                </div>
                <input
                  className="w-full p-2 border border-gray-300 text-black bg-[rgba(195,255,255,1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  type="number"
                  placeholder="Enter the OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleRetryClick}
                    disabled={isDisabled}
                    className="w-full bg-transparent border rounded px-5"
                  >
                    {isDisabled ? `Wait ${countdown} seconds...` : "Retry"}
                  </button>
                  <button
                    className="w-full bg-teal-700 text-white px-4 py-2  rounded-lg hover:bg-teal-800 transition"
                    onClick={verifyOTP}
                  >
                    {otpLoading ? (
                      <CircularProgress size={15} color="inherit" />
                    ) : (
                      <>{otpVerified ? "Verified" : "Verify OTP"}</>
                    )}
                  </button>
                </div>
              </div>
            )}
            {/* {otpSent && (
            )} */}
            <input
              type="text"
              placeholder="Profession"
              value={formData.profession}
              name="profession"
              onChange={handleOnChange}
              className="p-2 border border-gray-300 text-black bg-[rgba(195,255,255,1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 col-span-2"
            />
            <div className="col-span-2">
              <input
                type="text"
                placeholder="Industry"
                value={formData.industry}
                name="industry"
                onChange={handleOnChange}
                className="p-2 border border-gray-300 rounded-lg text-black bg-[rgba(195,255,255,1)] focus:outline-none focus:ring-2 focus:ring-teal-500 w-full"
              />
            </div>
            <div className="col-span-2">
              <select
                className="p-2 border border-gray-300 rounded-lg text-black bg-[rgba(195,255,255,1)] focus:outline-none focus:ring-2 focus:ring-teal-500 w-full"
                value={formData.purpose} // Bind the value to formData.email
                name="purpose" // Set the name of the field
                onChange={handleOnChange} // Handle changes
              >
                <option value="" disabled selected>
                  Purpose
                </option>
                <option value="LegalGPT">LegalGPT</option>
                <option value="Case Search">Case Search</option>
                <option value="Adira AI">Adira AI</option>
                <option value="Case Prediction">Case Prediction</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            // disabled={!otpVerified}
            onClick={() =>
              otpVerified ? loginToUser() : showVerificationToast()
            }
            className="w-full bg-teal-700 text-white py-2 rounded-lg hover:bg-teal-800 transition"
          >
            {isLoading ? (
              <CircularProgress size={15} color="inherit" />
            ) : (
              "Signup"
            )}
          </button>

          {/* Footer */}
          <div className="text-center mt-4">
            <span className="text-white">Registered Already? </span>
            <Link
              to="/login"
              className="text-teal-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

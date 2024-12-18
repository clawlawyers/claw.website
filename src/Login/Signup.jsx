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
          // await loginToUser(OTPdata.authtoken);
          setVerifyToken(OTPdata.authtoken);
        }
        console.log(verifyToken);
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

  const loginToUser = async () => {
    setIsLoading(true);

    try {
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

  return (
    <div className="  bg-white max-w-4xl min-h-96 rounded-md mx-auto my-0">
      {/* Title */}
      <h2 className="text-3xl pt-3 font-bold text-teal-800 mb-6 text-center">
        Sign Up to Claw Legaltech
      </h2>

      {/* Card Container */}
      <div className="flex flex-col mx-auto my-0 md:flex-row bg-white rounded-md  w-full max-w-5xl">
        {/* Left Section: Image */}
        <div className="w-full md:w-1/2 bg-white flex justify-center rounded-md items-center p-6 ">
          <img
            src={loginIcon}
            alt="Login Illustration"
            className="w-[50%] h-[50%] md:w-[90%] lg:w-[100%] "
          />
        </div>

        {/* Right Section: Form */}
        <div className="w-100%  p-6 md:p-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
            {/* Input Fields */}
            <input
              type="text"
              value={formData.firstName}
              name="firstName"
              onChange={handleOnChange}
              placeholder="Enter First Name"
              className="p-2 border text-black border-gray-300 rounded-lg  bg-[rgba(195,255,255,1)] focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="text"
              value={formData.lastName}
              name="lastName"
              onChange={handleOnChange}
              placeholder="Enter Last Name"
              className="p-2 border border-gray-300 text-black rounded-lg  bg-[rgba(195,255,255,1)] focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="email"
              value={formData.email}
              name="email"
              onChange={handleOnChange}
              placeholder="Enter Valid Email ID *"
              className=" p-2 border border-gray-300 rounded-lg text-black  bg-[rgba(195,255,255,1)] focus:outline-none focus:ring-2 focus:ring-teal-500 col-span-2"
            />

            {/* Mobile Number Input with Verification */}
            <div className="flex gap-2 col-span-2">
              <input
                type="number"
                value={phoneNumber}
                // name="email"
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter Your Mobile Number *"
                className="p-2 flex-1 border border-gray-300 text-black bg-[rgba(195,255,255,1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                className="bg-teal-700 text-white px-4 py-2  rounded-lg hover:bg-teal-800 transition"
                onClick={sendOTP}
              >
                Send OTP
              </button>
            </div>
            {otpSent && (
              <div className="flex gap-2 col-span-2">
                <input
                  className="p-2 flex-1 border border-gray-300 text-black bg-[rgba(195,255,255,1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  type="number"
                  placeholder="Enter the OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button
                  className="bg-teal-700 text-white px-4 py-2  rounded-lg hover:bg-teal-800 transition"
                  onClick={verifyOTP}
                >
                  Verify OTP
                </button>
              </div>
            )}
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
            onClick={loginToUser}
            className="w-full bg-teal-700 text-white py-1 rounded-lg hover:bg-teal-800 transition"
          >
            {isLoading ? "Signup....." : "Signup"}
          </button>

          {/* Footer */}
          <div className="text-center mt-4">
            <span className="text-gray-500">Registered Already? </span>
            <Link
              to="/login2"
              className="text-teal-700 font-semibold hover:underline"
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

import React, { useEffect, useState } from "react";
import balances from "../../assets/images/BalanceScales.png";
import clawLogo from "../../assets/images/claw-login.png";
import Styles from "./LoginToCourtRoom.module.css";
import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
import axios from "axios";
import { NODE_API_ENDPOINT } from "../../utils/utils";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../features/bookCourtRoom/LoginReducreSlice";
import { useSelector } from "react-redux";
// import { setUser } from "../../features/bookCourtRoom/LoginReducreSlice";

function LoginToCourtRoom() {
  const [isHovered, setIsHovered] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  // const currentUser = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const loginTime = new Date().toISOString();
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [currentTime]);
  const navigate = useNavigate();
  // const currentTime = new Date();

  // Import the action creator from the slice

  const handleSave = (e) => {
    e.preventDefault();
    // Get current time in ISO format

    axios
      .post(`${NODE_API_ENDPOINT}/courtroom/login`, {
        phoneNumber: phone,
        password: password,
      })
      .then((response) => {
        console.log(response);
        dispatch(setUser(response.data));

        if (response.data === "No bookings found for the current time slot.") {
          console.log("No bookings found for the current time slot");
          setErrorState(true);
          toast.error(response.data);
        } else if (response.data === "Invalid phone number or password.") {
          console.log("Invalid phone number or password");
          setErrorState(true);
          toast.error(response.data);
        } else {
          toast.success("You have successfully logged in");
          console.log(response.data.data);
          dispatch(login(response.data.data));
          // console.log(currentUser);
          navigate("/courtroom-ai");
        }

        // navigate("/courtroom-ai");
      })
      .catch((error) => {
        setErrorState(true);
        toast.error(error.message);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {/* top cont */}
      <div className="grid grid-cols-2 items-center">
        <div>
          <img
            style={{ width: "100%", height: "100%" }}
            src={balances}
            alt="balance"
          />
        </div>
        <form style={{ position: "relative" }} onSubmit={handleSave}>
          <div style={{ marginRight: "140px" }}>
            <div
              className={`${
                errorState
                  ? "bg-slate-400"
                  : "bg-gradient-to-br from-[#006E6E] to-[#09FFFF]"
              }`}
              style={{
                // background: errorState
                //   ? "gray"
                //   : "linear-gradient(to bottom, #006E6E, #09FFFF)",
                padding: "40px",
                // border: "3px solid white",
                border: errorState ? "3px solid red" : "3px solid white",
                borderRadius: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  className={Styles.topContainerImage}
                  src={clawLogo}
                  alt="logo"
                />
                <h1 style={{ fontSize: "15px" }}>COURTROOM</h1>
              </div>
              <div style={{ margin: "20px 0px" }}>
                <h1 style={{ fontSize: "15px", marginTop: "25px" }}>
                  Enter your Mobile Number and Password that you used to book
                  your Courtroom
                </h1>
                <div className={Styles.phoneContainer}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  >
                    <path d="M8.26 1.289l-1.564.772c-5.793 3.02 2.798 20.944 9.31 20.944.46 0 .904-.094 1.317-.284l1.542-.755-2.898-5.594-1.54.754c-.181.087-.384.134-.597.134-2.561 0-6.841-8.204-4.241-9.596l1.546-.763-2.875-5.612zm7.746 22.711c-5.68 0-12.221-11.114-12.221-17.832 0-2.419.833-4.146 2.457-4.992l2.382-1.176 3.857 7.347-2.437 1.201c-1.439.772 2.409 8.424 3.956 7.68l2.399-1.179 3.816 7.36s-2.36 1.162-2.476 1.215c-.547.251-1.129.376-1.733.376" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Enter your Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className={Styles.phoneContainer}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  >
                    <path d="M16 1c-4.418 0-8 3.582-8 8 0 .585.063 1.155.182 1.704l-8.182 7.296v5h6v-2h2v-2h2l3.066-2.556c.909.359 1.898.556 2.934.556 4.418 0 8-3.582 8-8s-3.582-8-8-8zm-6.362 17l3.244-2.703c.417.164 1.513.703 3.118.703 3.859 0 7-3.14 7-7s-3.141-7-7-7c-3.86 0-7 3.14-7 7 0 .853.139 1.398.283 2.062l-8.283 7.386v3.552h4v-2h2v-2h2.638zm.168-4l-.667-.745-7.139 6.402v1.343l7.806-7zm10.194-7c0-1.104-.896-2-2-2s-2 .896-2 2 .896 2 2 2 2-.896 2-2zm-1 0c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.448 1-1z" />
                  </svg>
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Enter your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {showPass ? (
                    <div className="absolute right-[50px] top-[50%] flex items-center">
                      <svg
                        onClick={() => setShowPass(false)}
                        style={{
                          cursor: "pointer",
                        }}
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                        stroke-linejoin="round"
                        stroke-miterlimit="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="m11.998 5c-4.078 0-7.742 3.093-9.853 6.483-.096.159-.145.338-.145.517s.048.358.144.517c2.112 3.39 5.776 6.483 9.854 6.483 4.143 0 7.796-3.09 9.864-6.493.092-.156.138-.332.138-.507s-.046-.351-.138-.507c-2.068-3.403-5.721-6.493-9.864-6.493zm.002 3c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm0 1.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5z"
                          fill-rule="nonzero"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div className="absolute right-[50px] top-[50%] flex items-center">
                      <svg
                        onClick={() => setShowPass(true)}
                        style={{
                          cursor: "pointer",
                        }}
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                        stroke-linejoin="round"
                        stroke-miterlimit="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="m17.069 6.546 2.684-2.359c.143-.125.32-.187.497-.187.418 0 .75.34.75.75 0 .207-.086.414-.254.562l-16.5 14.501c-.142.126-.319.187-.496.187-.415 0-.75-.334-.75-.75 0-.207.086-.414.253-.562l2.438-2.143c-1.414-1.132-2.627-2.552-3.547-4.028-.096-.159-.144-.338-.144-.517s.049-.358.145-.517c2.111-3.39 5.775-6.483 9.853-6.483 1.815 0 3.536.593 5.071 1.546zm2.318 1.83c.967.943 1.804 2.013 2.475 3.117.092.156.138.332.138.507s-.046.351-.138.507c-2.068 3.403-5.721 6.493-9.864 6.493-1.298 0-2.553-.313-3.73-.849l2.624-2.307c.352.102.724.156 1.108.156 2.208 0 4-1.792 4-4 0-.206-.016-.408-.046-.606zm-4.932.467c-.678-.528-1.53-.843-2.455-.843-2.208 0-4 1.792-4 4 0 .741.202 1.435.553 2.03l1.16-1.019c-.137-.31-.213-.651-.213-1.011 0-1.38 1.12-2.5 2.5-2.5.474 0 .918.132 1.296.362z"
                          fill-rule="nonzero"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", fontSize: "5px" }}>
                    <h1 style={{ fontSize: "20px" }}>Current Time:</h1>
                    <h1 style={{ fontSize: "20px" }}>
                      {currentTime.getHours()}:{currentTime.getMinutes()}:
                      {currentTime.getSeconds()}
                    </h1>
                  </div>
                  {/* <Link to={"/courtroom-ai"}> */}
                  <motion.button
                    type="submit"
                    whileTap={{ scale: "0.95" }}
                    style={{
                      background: "none",
                      border: "2px solid white",
                      borderRadius: "5px",
                    }}
                  >
                    Enter Courtroom Now
                  </motion.button>
                  {/* </Link> */}
                </div>
                <hr
                  style={{
                    height: "0px",
                    border: "none",
                    borderTop: "5px solid white",
                  }}
                />
                <h1 style={{ fontSize: "15px" }}>
                  By signing up,you agree to our Terms of Service & Privacy
                  Policy
                </h1>
              </div>
            </div>
          </div>
          {errorState ? (
            <div
              style={{
                position: "absolute",
                // backgroundColor: "rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(3px)",
                top: "0px",
                left: "-115px",
                width: "110%",
                height: "95%",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  background: "white",
                  border: "2px solid black",
                  borderRadius: "10px",
                  width: "90%",
                  padding: "20px 15px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: "10px",
                  }}
                >
                  <svg
                    onClick={() => setErrorState(false)}
                    style={{ cursor: "pointer" }}
                    width="24"
                    height="24"
                    stroke="#008080"
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    stroke-linejoin="round"
                    stroke-miterlimit="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 1.5c-4.69 0-8.497 3.807-8.497 8.497s3.807 8.498 8.497 8.498 8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497zm0 7.425 2.717-2.718c.146-.146.339-.219.531-.219.404 0 .75.325.75.75 0 .193-.073.384-.219.531l-2.717 2.717 2.727 2.728c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.384-.073-.53-.219l-2.729-2.728-2.728 2.728c-.146.146-.338.219-.53.219-.401 0-.751-.323-.751-.75 0-.192.073-.384.22-.531l2.728-2.728-2.722-2.722c-.146-.147-.219-.338-.219-.531 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"
                      fill-rule="nonzero"
                    />
                  </svg>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h1
                    style={{ margin: "0", fontSize: "20px", color: "#008080" }}
                  >
                    You're Entering The Courtroom in wrong Date/Time
                  </h1>
                  <p style={{ color: "gray" }}>
                    Please comeback in your Booked Slot Timings
                  </p>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </form>
      </div>
      {/* bottom cont */}
      <div
        className="w-full"
        style={{ display: "grid", placeItems: "center", marginTop: "80px" }}
      >
        <motion.div
          className={Styles.third}
          style={{
            width: "75%",
            position: "relative",
            overflow: "hidden",
          }}
          whileHover="hover"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <motion.div
            variants={{
              hover: { x: "100%" },
            }}
            initial={{ x: "0%" }}
            transition={{ type: "tween", duration: 0.5 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 1,
              background: "white",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "linear-gradient(to right, #00ffa3, #008080)",
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ width: "50%" }}>
              <h1
                style={{
                  color: "#008080",
                  fontWeight: 800,
                  textWrap: "wrap",
                }}
              >
                Experience the AI Courtroom
              </h1>
            </div>
            <button
              style={{
                backgroundColor: isHovered ? "white" : "#008080",
                color: isHovered ? "#008080" : "white",
                margin: "15px",
                padding: "12px 40px",
                borderRadius: 10,
                border: "none",
                fontSize: 27,
              }}
            >
              Contact us
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default LoginToCourtRoom;

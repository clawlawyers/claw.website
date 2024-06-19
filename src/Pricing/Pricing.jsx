import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import Styles from "./Pricing.module.css";
import { setCart } from "../features/cart/cartSlice";

export default function Pricing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleCartAdditionn() {
    dispatch(
      setCart({
        request: 5,
        session: 1,
        total: 25,
        plan: "LIFETIME",
        type: "PRO",
      })
    );
    navigate("/paymentgateway");
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        zIndex: 2,
      }}
    >
      <div
        style={{
          width: "90%",
          margin: "auto",
          flex: 1,
          color: "white",
          paddingBottom: 25,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 10,
          }}
        >
          <h1 className={Styles.heading}>
            Find the Perfect Pricing Option for Your Legal Needs
          </h1>
          <div style={{ width: "80%" }}>
            <h5 className={Styles.subHeading}>
              Explore our flexible pricing options designed to cater to a range
              of legal requirements. Select the plan that best fits your needs
              and budget.{" "}
            </h5>
          </div>
        </div>
      </div>
      <div style={{ width: "80%", margin: "auto" }}>
        <div className={Styles.pricingContainer}>
          <div className={Styles.first}>
            <PricingCard duration="Monthly" sliderMap={sliders} />
          </div>
          <div className={Styles.second}>
            <PricingCard duration="Yearly" sliderMap={sliders} />
          </div>

          <div className={Styles.third}>
            <h1 style={{ color: "#008080", fontWeight: 800 }}>
              Top UP {""} 25/-{" "}
            </h1>
            <h4 style={{ color: "black", fontWeight: 800 }}>
              Max Request-5 , Max User Session-1{" "}
            </h4>
            <button
              onClick={handleCartAdditionn}
              style={{
                backgroundColor: "#008080",
                color: "white",
                padding: "12px 40px",
                borderRadius: 10,
                border: "none",
                fontSize: 27,
              }}
            >
              Get it Now
            </button>
          </div>

          <div className={Styles.third}>
            <h1 style={{ color: "#008080", fontWeight: 800 }}>Enterprise</h1>
            <button
              style={{
                backgroundColor: "#008080",
                color: "white",
                padding: "12px 40px",
                borderRadius: 10,
                border: "none",
                fontSize: 27,
              }}
            >
              Contact us
            </button>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
const sliders = {
  request: {
    marks: [
      {
        value: 0,
        label: "500",
      },
      {
        value: 33,
        label: "1000",
      },
      {
        value: 66,
        label: "5000",
      },
      {
        value: 100,
        label: "Unlimited",
      },
    ],
    map: { 0: 500, 33: 1000, 66: 5000, 100: 9999 },
  },
  session: {
    marks: [
      { value: 0, label: 1 },
      { value: 33, label: 2 },
      { value: 66, label: 3 },
      { value: 100, label: 4 },
    ],
    map: { 0: 1, 33: 2, 66: 3, 100: 4 },
  },
};

//for limited pricing offer
//monthly

// const priceMap = {
//   500: { 1: 199, 2: 249, 3: 299, 4: 349 },
//   1000: { 1: 349, 2: 399, 3: 449, 4: 499 },
//   5000: { 1: 499, 2: 599, 3: 699, 4: 799 },
//   9999: { 1: 999, 2: 1499, 3: 1999, 4: 2999 },
// };

const priceMap = {
  500: { 1: 499, 2: 699, 3: 799, 4: 999 },
  1000: { 1: 999, 2: 1099, 3: 1299, 4: 1399 },
  5000: { 1: 1399, 2: 1699, 3: 1999, 4: 2299 },
  9999: { 1: 2899, 2: 4399, 3: 5899, 4: 8899 },
};

// yearly price

const YearlypriceMap = {
  500: { 1: 5299, 2: 6699, 3: 7999, 4: 9399 },
  1000: { 1: 9399, 2: 10699, 3: 12099, 4: 13399 },
  5000: { 1: 13399, 2: 16099, 3: 18799, 4: 21499 },
  9999: { 1: 26899, 2: 40399, 3: 53899, 4: 79999 },
};

const PricingCard = ({ duration, sliderMap }) => {
  const [request, setRequest] = useState(0);
  const [session, setSession] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const currentUser = useSelector((state) => state.auth.user);
  let price =
    priceMap[sliderMap.request.map[request]][sliderMap.session.map[session]];
  //   if (duration === "Yearly") price = price * 9;
  if (duration === "Yearly") {
    price =
      YearlypriceMap[sliderMap.request.map[request]][
        sliderMap.session.map[session]
      ];
  }

  function handleCartAddition() {
    if (!currentUser) {
      const searchParams = new URLSearchParams({
        callbackUrl: pathname,
      }).toString();
      navigate(`/login?${searchParams}`);
    } else {
      dispatch(
        setCart({
          request: sliderMap.request.map[request],
          session: sliderMap.session.map[session],
          total: price,
          plan: duration,
          type: "PRO",
        })
      );
      navigate("/paymentgateway");
    }
  }

  return (
    <div
      style={{
        border: "1px solid white",
        backgroundColor: "white",
        color: "black",
        borderRadius: 8,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          alignItems: "center",
        }}
      >
        <h3
          style={{ fontSize: 45, color: "#008080", fontWeight: 700, margin: 0 }}
        >
          {duration}
        </h3>
      </div>
      <div style={{ width: "80%", margin: "auto", textAlign: "center" }}>
        <div>
          <h3 style={{ fontSize: 27 }}>Request</h3>
          <Slider
            value={request}
            step={null}
            style={{ color: "#008080" }}
            marks={sliderMap.request.marks}
            valueLabelDisplay="off"
            onChange={(_, val) => setRequest(val)}
          />
        </div>
        <div style={{ width: "80%", margin: "auto" }}>
          <h3 style={{ fontSize: 27 }}>Users/Sessions</h3>
          <Slider
            value={session}
            style={{ color: "#008080" }}
            step={null}
            onChange={(_, val) => setSession(val)}
            marks={sliderMap.session.marks}
            valueLabelDisplay="off"
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <h5>You're paying</h5>
        <div
          style={{
            padding: "10px 50px",
            border: "1px solid #008080",
            borderRadius: 10,
          }}
        >
          {/* <span
            style={{
              textDecoration: "line-through",
              marginRight: 5,
              fontSize: 14,
            }}
          >
            <span>₹</span>
            <span>{price * 3}</span>
          </span> */}
          <span style={{ borderRadius: 10, fontWeight: 600, fontSize: 18 }}>
            <span>₹</span>
            <span>{price}</span>
          </span>
        </div>
        {/* <h5 style={{ fontWeight: 700, color: "red", margin: 0, fontSize: 12 }}>
          Limited Time Offer!
        </h5> */}
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", paddingTop: 15 }}
      >
        <button
          onClick={handleCartAddition}
          style={{
            padding: "16px 44px",
            border: "none",
            backgroundColor: "#008080",
            borderRadius: 8,
            color: "white",
            fontSize: 27,
          }}
        >
          Get it now
        </button>
      </div>
    </div>
  );
};

// const Timer = () => {
//     const [days, setDays] = useState(0);
//     const [hours, setHours] = useState(0);
//     const [minutes, setMinutes] = useState(0);
//     const [seconds, setSeconds] = useState(0);

//     const deadline = "March, 31, 2024";

//     const getTime = () => {
//         const time = Date.parse(deadline) - Date.now();

//         setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
//         setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
//         setMinutes(Math.floor((time / 1000 / 60) % 60));
//         setSeconds(Math.floor((time / 1000) % 60));
//     }

//     useEffect(() => {
//         const interval = setInterval(() => getTime(), 1000);
//         return () => clearInterval(interval);
//     }, [])

//     return <div>
//         {days} : {hours} : {minutes} : {seconds}
//     </div>
// }

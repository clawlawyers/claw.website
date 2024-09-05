import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import Styles from "./Pricing.module.css";
import { setCart } from "../features/cart/cartSlice";
import OneTime from "./Addone/OneTime";
import Monthly from "./Addone/Monthly";
import Yearly from "./Addone/Yearly";
import HoverCard from "./Addone/HoveredCard";
import { setPriceDetails } from "../features/payment/pricingSlice";

const couponCodes = [
  {
    name: "EXAM50",
    priceDropMonthly: {
      basic: [50, 199],
      essential: [40, 699],
      premium: [35, 1199],
    },
    priceDropYearly: {
      basic: [50, 1999],
      essential: [40, 6999],
      premium: [35, 11999],
    },
  },
];

export default function Pricing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null); // State to track hovered card

  const [activeTab, setActiveTab] = useState(1);
  const [couponApplied, setCouponApplied] = useState("");
  const [monthlyDiscounts, setMonthlyDiscounts] = useState(null);
  const [yearlyDiscounts, setYearlyDiscounts] = useState(null);
  const [couponFound, setCouponFound] = useState(false);

  const { pathname } = useLocation();
  const currentUser = useSelector((state) => state.auth.user);

  const handleApplyCoupon = () => {
    const findCoupon = couponCodes.find(
      (x) => x.name.toUpperCase() === couponApplied.toUpperCase()
    );
    if (findCoupon) {
      setCouponFound(true);
      setMonthlyDiscounts(findCoupon.priceDropMonthly);
      setYearlyDiscounts(findCoupon.priceDropYearly);
    } else {
      alert("No Coupons found for this Code");
    }
  };

  const handleRemoveCoupon = () => {
    setMonthlyDiscounts(null);
    setYearlyDiscounts(null);
    setCouponFound(false);
    setCouponApplied("");
  };

  const handlePricingSelect = (plan, planType, sessions, totalPrice) => {
    dispatch(
      setPriceDetails({
        plan,
        planType,
        sessions,
        totalPrice,
        discount: couponApplied !== "" ? true : false,
      })
    );
    navigate("/payment");
  };

  // console.log(hoveredCard);
  function handleCartAdditionTrail(request, session, total, plan, type) {
    dispatch(
      setCart({
        request,
        session,
        total,
        plan,
        type,
      })
    );
    navigate("/paymentgateway");
  }

  function handleCartAddition(noOfRequests, noOfSessions, price, duration) {
    if (!currentUser) {
      const searchParams = new URLSearchParams({
        callbackUrl: pathname,
      }).toString();
      navigate(`/login?${searchParams}`);
    } else {
      let type;
      if (duration === "AddOn") {
        type = "PROC";
      } else {
        type = "PRO";
      }
      dispatch(
        setCart({
          request: noOfRequests,
          session: noOfSessions,
          total: price,
          plan: duration === "AddOn" ? "LIFETIME" : duration,
          type: type,
        })
      );
      navigate("/paymentgateway");
    }
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
      <div className="flex flex-col justify-center items-center gap-10">
        <div className="flex justify-center items-center gap-24">
          <button
            onClick={() => setActiveTab(1)}
            style={{
              backgroundColor: activeTab === 1 ? "#008080" : "transparent",
            }}
            className="rounded px-5 py-2 cursor-pointer"
          >
            Monthly
          </button>
          <button
            onClick={() => setActiveTab(2)}
            style={{
              backgroundColor: activeTab === 2 ? "#008080" : "transparent",
            }}
            className="rounded px-5 py-2 cursor-pointer"
          >
            Yearly
          </button>
        </div>
        <div className="w-full flex justify-center items-center relative">
          <input
            className="w-2/4 p-3 rounded text-black"
            placeholder="Have A Coupon ?"
            value={couponApplied}
            onChange={(e) => setCouponApplied(e.target.value)}
          />
          {!couponFound ? (
            <button
              onClick={handleApplyCoupon}
              className="absolute right-1/4 mx-2 bg-[#055151] rounded px-5 py-2 cursor-pointer"
            >
              Apply Coupon
            </button>
          ) : (
            <button
              onClick={handleRemoveCoupon}
              className="absolute right-1/4 mx-2 bg-[#055151] rounded px-5 py-2 cursor-pointer"
            >
              Remove Coupon
            </button>
          )}
        </div>
        {activeTab === 1 ? (
          <div className="flex flex-col md:flex-row gap-5">
            {/* basic */}
            <div className="border border-black rounded-lg bg-[#008080]">
              <div className="h-3"></div>
              <div className="bg-white text-black p-3 rounded-lg flex flex-col justify-center text-center">
                {!monthlyDiscounts ? (
                  <div className="">
                    <h2 className="text-lg font-bold text-[#008080] pb-10">
                      BASIC
                    </h2>
                  </div>
                ) : (
                  <div className="w-full flex justify-between items-center gap-4  pb-[3rem]">
                    <h2 className="m-0 text-lg font-bold text-[#008080]">
                      BASIC
                    </h2>
                    <p className="m-0 py-1 bg-[#055151] text-white  rounded-full">
                      {monthlyDiscounts.basic[0]}% OFF
                    </p>
                  </div>
                )}
                <div className="px-4 pb-[7.5rem]">
                  <h1 className="font-bold text-[#055151] pb-6">
                    {monthlyDiscounts ? monthlyDiscounts.basic[1] : "₹ 399"}{" "}
                    <span className="text-lg">/month</span>
                  </h1>
                  <div>
                    <p className="text-black">
                      Access to <span className="font-bold">LegalGPT</span>
                    </p>
                    <p className="text-black">
                      Access to <span className="font-bold">1 User</span>
                    </p>
                    <p className="text-black">
                      Ability to Purchase{" "}
                      <span className="font-bold">Add-on</span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handlePricingSelect(
                      "Monthly",
                      "Basic",
                      1,
                      monthlyDiscounts ? monthlyDiscounts.basic[1] : 399
                    );
                  }}
                  className="rounded"
                >
                  Get It Now
                </button>
              </div>
            </div>
            {/* essential */}
            <div className="border border-black rounded-lg bg-[#008080]">
              <div className="h-3"></div>
              <div className="bg-white text-black p-3 rounded-lg flex flex-col justify-center text-center">
                {!monthlyDiscounts ? (
                  <div className="">
                    <h2 className="text-lg font-bold text-[#008080]">
                      ESSENTIAL
                    </h2>
                  </div>
                ) : (
                  <div className="w-full flex justify-between items-center gap-4 pb-[0.5rem]">
                    <h2 className="m-0 text-lg font-bold text-[#008080]">
                      ESSENTIAL
                    </h2>
                    <p className="m-0 py-1 bg-[#055151] text-white  rounded-full">
                      {monthlyDiscounts.essential[0]}% OFF
                    </p>
                  </div>
                )}
                <div className="flex justify-center w-full">
                  <p className="mx-4 p-1 bg-[#00808080] text-white rounded">
                    Recommended
                  </p>
                </div>
                <div className="px-4 pb-10">
                  <h1 className="font-bold text-[#055151] pb-6">
                    {monthlyDiscounts
                      ? monthlyDiscounts.essential[1]
                      : "₹ 1199"}{" "}
                    <span className="text-lg">/month</span>
                  </h1>
                  <div>
                    <p className="text-black">
                      Access to <span className="font-bold">LegalGPT</span>
                    </p>
                    <p className="text-black">
                      Access to{" "}
                      <span className="font-bold">AI Case Search</span>
                    </p>
                    <p className="text-black">
                      Access to <span className="font-bold">AI Summarizer</span>
                    </p>
                    <p className="text-black">
                      Access to <span className="font-bold">2 Users</span>
                    </p>
                    <p className="text-black">
                      Ability to Purchase{" "}
                      <span className="font-bold">Add-on</span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handlePricingSelect(
                      "Monthly",
                      "Essential",
                      2,
                      monthlyDiscounts ? monthlyDiscounts.essential[1] : 1199
                    );
                  }}
                  className="rounded"
                >
                  Get It Now
                </button>
              </div>
            </div>
            {/* premium */}
            <div className="border border-black rounded-lg bg-[#008080]">
              <div className="h-3"></div>
              <div className="bg-white text-black p-3 rounded-lg flex flex-col justify-center text-center">
                {!monthlyDiscounts ? (
                  <div className="">
                    <h2 className="text-lg font-bold text-[#008080] pb-10">
                      PREMIUM
                    </h2>
                  </div>
                ) : (
                  <div className="w-full flex justify-between items-center gap-4 pb-[3rem]">
                    <h2 className="m-0 text-lg font-bold text-[#008080]">
                      PREMIUM
                    </h2>
                    <p className="m-0 py-1 bg-[#055151] text-white  rounded-full">
                      {monthlyDiscounts.premium[0]}% OFF
                    </p>
                  </div>
                )}
                <div className="px-4 pb-[2.9rem]">
                  <h1 className="font-bold text-[#055151] pb-6">
                    {monthlyDiscounts ? monthlyDiscounts.premium[1] : "₹ 1999"}{" "}
                    <span className="text-lg">/month</span>
                  </h1>
                  <div>
                    <p className="text-black">
                      Access to <span className="font-bold">LegalGPT</span>
                    </p>
                    <p className="text-black">
                      Access to{" "}
                      <span className="font-bold">AI Case Search</span>
                    </p>
                    <p className="text-black">
                      Access to <span className="font-bold">AI Summarizer</span>
                    </p>
                    <p className="text-black">
                      Access to <span className="font-bold">4 Users</span>
                    </p>
                    <p className="text-black">
                      Ability to Purchase{" "}
                      <span className="font-bold">Add-on</span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handlePricingSelect(
                      "Monthly",
                      "Premium",
                      4,
                      monthlyDiscounts ? monthlyDiscounts.premium[1] : 1999
                    );
                  }}
                  className="rounded"
                >
                  Get It Now
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-5">
            {/* basic */}
            <div className="border border-black rounded-lg bg-[#008080]">
              <div className="h-3"></div>
              <div className="bg-white text-black p-3 rounded-lg flex flex-col justify-center text-center">
                {!yearlyDiscounts ? (
                  <div className="">
                    <h2 className="text-lg font-bold text-[#008080] pb-10">
                      BASIC
                    </h2>
                  </div>
                ) : (
                  <div className="w-full flex justify-between items-center gap-4  pb-[3rem]">
                    <h2 className="m-0 text-lg font-bold text-[#008080]">
                      BASIC
                    </h2>
                    <p className="m-0 py-1 bg-[#055151] text-white  rounded-full">
                      {yearlyDiscounts.basic[0]}% OFF
                    </p>
                  </div>
                )}
                <div className="px-4 pb-[7.5rem]">
                  <h1 className="font-bold text-[#055151] pb-6">
                    {yearlyDiscounts ? yearlyDiscounts.basic[1] : "₹ 3999"}{" "}
                    <span className="text-lg">/year</span>
                  </h1>
                  <div>
                    <p className="text-black">
                      Access to <span className="font-bold">LegalGPT</span>
                    </p>
                    <p className="text-black">
                      Access to <span className="font-bold">1 User</span>
                    </p>
                    <p className="text-black">
                      Ability to Purchase{" "}
                      <span className="font-bold">Add-on</span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handlePricingSelect(
                      "Yearly",
                      "Basic",
                      1,
                      yearlyDiscounts ? yearlyDiscounts.basic[1] : 3999
                    );
                  }}
                  className="rounded"
                >
                  Get It Now
                </button>
              </div>
            </div>
            {/* essential */}
            <div className="border border-black rounded-lg bg-[#008080]">
              <div className="h-3"></div>
              <div className="bg-white text-black p-3 rounded-lg flex flex-col justify-center text-center">
                {!yearlyDiscounts ? (
                  <div className="">
                    <h2 className="text-lg font-bold text-[#008080]">
                      ESSENTIAL
                    </h2>
                  </div>
                ) : (
                  <div className="w-full flex justify-between items-center gap-4 pb-[0.5rem]">
                    <h2 className="m-0 text-lg font-bold text-[#008080]">
                      ESSENTIAL
                    </h2>
                    <p className="m-0 py-1 bg-[#055151] text-white  rounded-full">
                      {yearlyDiscounts.essential[0]}% OFF
                    </p>
                  </div>
                )}
                <div className="flex justify-center w-full">
                  <p className="mx-4 p-1 bg-[#00808080] text-white rounded">
                    Recommended
                  </p>
                </div>
                <div className="px-4 pb-10">
                  <h1 className="font-bold text-[#055151] pb-6">
                    {yearlyDiscounts ? yearlyDiscounts.essential[1] : "₹ 11999"}{" "}
                    <span className="text-lg">/year</span>
                  </h1>
                  <div>
                    <p className="text-black">
                      Access to <span className="font-bold">LegalGPT</span>
                    </p>
                    <p className="text-black">
                      Access to{" "}
                      <span className="font-bold">AI Case Search</span>
                    </p>
                    <p className="text-black">
                      Access to <span className="font-bold">AI Summarizer</span>
                    </p>
                    <p className="text-black">
                      Access to <span className="font-bold">2 Users</span>
                    </p>
                    <p className="text-black">
                      Ability to Purchase{" "}
                      <span className="font-bold">Add-on</span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handlePricingSelect(
                      "Yearly",
                      "Essential",
                      2,
                      yearlyDiscounts ? yearlyDiscounts.essential[1] : 11999
                    );
                  }}
                  className="rounded"
                >
                  Get It Now
                </button>
              </div>
            </div>
            {/* premium */}
            <div className="border border-black rounded-lg bg-[#008080]">
              <div className="h-3"></div>
              <div className="bg-white text-black p-3 rounded-lg flex flex-col justify-center text-center">
                {!yearlyDiscounts ? (
                  <div className="">
                    <h2 className="text-lg font-bold text-[#008080] pb-10">
                      PREMIUM
                    </h2>
                  </div>
                ) : (
                  <div className="w-full flex justify-between items-center gap-4 pb-[3rem]">
                    <h2 className="m-0 text-lg font-bold text-[#008080]">
                      PREMIUM
                    </h2>
                    <p className="m-0 py-1 bg-[#055151] text-white  rounded-full">
                      {yearlyDiscounts.premium[0]}% OFF
                    </p>
                  </div>
                )}
                <div className="px-4 pb-[2.9rem]">
                  <h1 className="font-bold text-[#055151] pb-6">
                    {yearlyDiscounts ? yearlyDiscounts.premium[1] : "₹ 19999"}{" "}
                    <span className="text-lg">/year</span>
                  </h1>
                  <div>
                    <p className="text-black">
                      Access to <span className="font-bold">LegalGPT</span>
                    </p>
                    <p className="text-black">
                      Access to{" "}
                      <span className="font-bold">AI Case Search</span>
                    </p>
                    <p className="text-black">
                      Access to <span className="font-bold">AI Summarizer</span>
                    </p>
                    <p className="text-black">
                      Access to <span className="font-bold">4 Users</span>
                    </p>
                    <p className="text-black">
                      Ability to Purchase{" "}
                      <span className="font-bold">Add-on</span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handlePricingSelect(
                      "Yearly",
                      "Premium",
                      4,
                      yearlyDiscounts ? yearlyDiscounts.premium[1] : 19999
                    );
                  }}
                  className="rounded"
                >
                  Get It Now
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="w-full flex justify-center">
          <div className="w-4/5 flex flex-col bg-white rounded py-3">
            <h3 className="text-[#008080] text-xl font-bold px-3">
              Available Add-On
            </h3>
            <div className="w-[98%] flex justify-between items-center px-3 py-2 border-black border-t-2 border-b-2 m-2.5">
              <p className="m-0 text-[#008080]">Case Search (Monthly)</p>
              <p className="m-0 text-[#008080] font-semibold">₹ 899</p>
              <button className="px-5 py-1 rounded">Get It Now</button>
            </div>
          </div>
        </div>
        <div className="w-4/5 flex justify-between items-center bg-white rounded p-5">
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
    </div>
  );
}

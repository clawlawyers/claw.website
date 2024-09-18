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
import { CircularProgress } from "@mui/material";
import toast from "react-hot-toast";
import { NODE_API_ENDPOINT } from "../utils/utils";
import axios from "axios";

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

// const planNamesquence = [
//   { name: "BASIC_M", price: 399, index: 0 },
//   { name: "BASIC_Y", price: 3999, index: 1 },
//   { name: "ESSENTIAL_M", price: 1199, index: 2 },
//   { name: "ESSENTIAL_Y", price: 11999, index: 3 },
//   { name: "PREMIUM_M", price: 1999, index: 4 },
//   { name: "PREMIUM_Y", price: 19999, index: 5 },
// ];

const planNamesquence = [
  { name: "BASIC_M", price: 399, index: 0 },
  { name: "ESSENTIAL_M", price: 1199, index: 1 },
  { name: "PREMIUM_M", price: 1999, index: 2 },
  { name: "BASIC_Y", price: 3999, index: 3 },
  { name: "ESSENTIAL_Y", price: 11999, index: 4 },
  { name: "PREMIUM_Y", price: 19999, index: 5 },
];

export default function Pricing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null); // State to track hovered card
  const { plan: existingPlan } = useSelector((state) => state.gpt);
  // console.log(planDetails);

  const [activeTab, setActiveTab] = useState(1);
  const [couponApplied, setCouponApplied] = useState("");
  const [monthlyDiscounts, setMonthlyDiscounts] = useState(null);
  const [yearlyDiscounts, setYearlyDiscounts] = useState(null);
  const [couponFound, setCouponFound] = useState(false);
  const [trialDays, setTrialDays] = useState(1);
  const [isCouponCode, setIsCouponCode] = useState("");
  const [isReferralCode, setIsReferralCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);

  const { pathname } = useLocation();
  const currentUser = useSelector((state) => state.auth.user);
  console.log(currentUser);

  const handleApplyCoupon = async () => {
    // const findCoupon = couponCodes.find(
    //   (x) => x.name.toUpperCase() === couponApplied.toUpperCase()
    // );
    if (couponApplied.toUpperCase() === "EXAM50") {
      setIsCouponCode(couponApplied);
      setCouponFound(true);
      setMonthlyDiscounts(couponCodes[0].priceDropMonthly);
      setYearlyDiscounts(couponCodes[0].priceDropYearly);
    } else {
      setCouponLoading(true);
      try {
        // Request the backend to create a subscription
        const result = await axios.post(
          `${NODE_API_ENDPOINT}/gpt/verifyReferralCode`,
          {
            referralCode: couponApplied,
          },
          {
            headers: {
              Authorization: `Bearer ${currentUser.jwt}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(result);
        if (result.data.data.message === "Referral code valid") {
          setCouponLoading(false);
          setCouponFound(true);
          setMonthlyDiscounts(couponCodes[0].priceDropMonthly);
          setYearlyDiscounts(couponCodes[0].priceDropYearly);
          setTrialDays(result.data.data.trialDays);
          setIsReferralCode(couponApplied);
        } else {
          setCouponLoading(false);
          if (result.data.data.reason) {
            alert(`${result.data.data.message}.${result.data.data.reason}`);
          } else {
            alert(`${result.data.data.message}`);
          }
        }
      } catch (error) {
        alert(error.message);
      }
    }

    // if (findCoupon) {
    //   setCouponFound(true);
    //   setMonthlyDiscounts(findCoupon.priceDropMonthly);
    //   setYearlyDiscounts(findCoupon.priceDropYearly);
    // } else {
    //   alert("No Coupons found for this Code");
    // }
  };

  const handleRemoveCoupon = () => {
    setMonthlyDiscounts(null);
    setYearlyDiscounts(null);
    setCouponFound(false);
    setCouponApplied("");
  };

  const handleAddonPricingSelect = (plan, planType, sessions, totalPrice) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const isoString = now.toISOString();
    if (totalPrice < 0) {
      toast("Cannot Buy This Plan.Please try another Plan");
      return;
    } else {
      dispatch(
        setPriceDetails({
          plan,
          planType,
          sessions,
          totalPrice,
          isDiscount: couponApplied !== "" ? true : false,
          createdAt: new Date().toISOString(),
          // isUpgrade: "",
          trialDays,
          refferalCode: isReferralCode,
          couponCode: isCouponCode,
          refundAmount: 0,
        })
      );

      navigate("/payment");
    }
  };

  const handlePricingSelect = (plan, planType, sessions, totalPrice) => {
    const planName = `${planType.toUpperCase()}_${plan[0]}`;

    let existing;
    if (existingPlan.length > 0) {
      if (existingPlan[0].planName === "ADDON_M" && existingPlan.length > 1) {
        existing = planNamesquence.find(
          (p) => p.name === existingPlan[1]?.plan?.name
        );
      } else {
        existing = planNamesquence.find(
          (p) => p.name === existingPlan[0]?.plan?.name
        );
      }
    }

    //  existing = planNamesquence.find(
    //     (p) => p.name === existingPlan[0]?.plan?.name
    //   );
    const newOne = planNamesquence.find((p) => p.name === planName);

    // console.log(existing);
    // console.log(newOne);

    if (!existing) {
      dispatch(
        setPriceDetails({
          plan,
          planType,
          sessions,
          totalPrice,
          isDiscount: couponApplied !== "" ? true : false,
          createdAt: new Date().toISOString(),
          // isUpgrade: "",
          trialDays,
          refferalCode: isReferralCode,
          couponCode: isCouponCode,
          refundAmount: 0,
        })
      );
      navigate("/payment");
    } else {
      if (newOne.index > existing.index) {
        console.log("new plan will added");
        // const existingPrice = planNamesquence[existing.index].price;
        const existingPrice = existing.price;
        const newPrice = newOne.price;
        const duration = existingPlan[0]?.plan?.duration;
        const planCreateData = new Date(existingPlan[0]?.createdAt);
        const now = new Date();
        const daysUsed = Math.floor(
          (now - planCreateData) / (1000 * 60 * 60 * 24)
        ); // Days used

        console.log(planCreateData, now);

        console.log(daysUsed);

        const durationInDays = duration === "monthly" ? 30 : 360;

        console.log(durationInDays);

        const remainingDays = durationInDays - daysUsed;

        console.log(remainingDays);

        // Calculate the prorated remaining value of the current plan
        const remainingValue = (remainingDays / durationInDays) * existingPrice;

        // Final price for the upgraded plan
        const finalPrice = newPrice - remainingValue;

        // console.log(finalPrice);

        // console.log({
        //   finalPrice: parseInt(finalPrice),
        //   isUpgrade: existingPlan[0]?.plan?.name,
        // });

        dispatch(
          setPriceDetails({
            plan,
            planType,
            sessions,
            totalPrice,
            discount: couponApplied !== "" ? true : false,
            // isUpgrade: existing.name,
            createdAt: new Date().toISOString(),
            trialDays,
            refferalCode: isReferralCode,
            couponCode: isCouponCode,
            refundAmount: parseInt(remainingValue),
            existingSubscription: existingPlan[0]?.subscriptionId,
          })
        );
        navigate("/payment");
      } else {
        // let createdAt;
        // if (
        //   existingPlan[existingPlan.length - 1].planName === "ADDON_M" &&
        //   existingPlan.length > 1
        // ) {
        //   createdAt = new Date(
        //     existingPlan[existingPlan.length - 2]?.createdAt
        //   );
        // } else {
        //   createdAt = new Date(
        //     existingPlan[existingPlan.length - 1]?.createdAt
        //   );
        // }
        // const duration = existingPlan[existingPlan.length - 1]?.plan?.duration;
        // const expiryDate =
        //   duration === "monthly"
        //     ? new Date(
        //         new Date(createdAt).getTime() + 30 * 24 * 60 * 60 * 1000
        //       ).toISOString()
        //     : new Date(
        //         new Date(createdAt).setFullYear(
        //           new Date(createdAt).getFullYear() + 1
        //         )
        //       ).toISOString();

        // console.log({
        //   finalPrice: newOne.price,
        //   isUpgrade: "",
        //   createdAt: expiryDate,
        // });
        // dispatch(
        //   setPriceDetails({
        //     plan,
        //     planType,
        //     sessions,
        //     totalPrice: newOne.price,
        //     discount: couponApplied !== "" ? true : false,
        //     isUpgrade: "",
        //     createdAt: expiryDate,
        //   })
        // );
        // navigate("/payment");
        toast.error("Please Subscribe To a Higher Plan than your Active Plan");
      }
    }

    // dispatch(
    //   setPriceDetails({
    //     plan,
    //     planType,
    //     sessions,
    //     totalPrice,
    //     discount: couponApplied !== "" ? true : false,
    //   })
    // );
    // navigate("/payment");
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
        <div className=" flex  justify-center items-center gap-16">
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
            className="w-[90%] md:w-2/4 p-3 rounded text-black"
            placeholder="Have A Coupon ?"
            value={couponApplied}
            onChange={(e) => setCouponApplied(e.target.value)}
          />
          {!couponFound ? (
            <>
              {!couponLoading ? (
                <button
                  disabled={couponApplied === ""}
                  onClick={handleApplyCoupon}
                  className="absolute right-[5%] md:right-1/4 mx-2 bg-[#055151] rounded px-3 md:px-5 py-2 cursor-pointer"
                >
                  Apply Coupon
                </button>
              ) : (
                <button className="absolute right-[5%] md:right-1/4 mx-2 bg-[#055151] rounded px-3 md:px-5 py-2 cursor-pointer">
                  <CircularProgress size={15} color="inherit" />
                </button>
              )}
            </>
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
            <div className="w-[98%] gap-2 flex justify-between items-center px-3 py-2 border-black border-t-2 border-b-2 md:m-2.5">
              <p className="m-0 text-[#008080]">Case Search (Monthly)</p>
              <p className="m-0 text-[#008080] font-semibold">₹ 899</p>
              {existingPlan ? (
                <button
                  disabled={
                    !existingPlan.filter((x) => x.isActive)[0]?.plan
                      ?.AddOnAccess
                  }
                  onClick={() => {
                    handleAddonPricingSelect(
                      "Monthly",
                      "Addon",
                      existingPlan[0]?.plan?.session,
                      899
                    );
                  }}
                  className="px-3 md:px-5 py-1 rounded"
                >
                  Get It Now
                </button>
              ) : (
                <button className="px-3 md:px-5 py-1 rounded">
                  <CircularProgress size={20} color="inherit" />
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="w-4/5 flex flex-col md:flex-row justify-between items-center bg-white rounded p-5">
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

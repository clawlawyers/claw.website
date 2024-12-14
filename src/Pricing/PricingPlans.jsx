import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setPaymentDetails,
  setTalkToExpert,
} from "../features/payment/paymentSlice";
import toast from "react-hot-toast";
import { useAdiraAuthState } from "../hooks/useAuthState";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";

const plansArr = {
  Daily: [
    {
      type: "Free",
      features: [
        "Access to LegalGPT(15 Mins/Day)",
        "Access to WarRoom(30 Mins/Day)",
        "Full Access to Case Search",
      ],
    },
    {
      type: "Basic",
      price: "299",
      originalPrice: "349",
      discount: "10% DISCOUNT",
      features: [
        "All Ready-Made Templates",
        "Prompt Drafting",
        "Download with Watermark",
        "Summarize Document",
        "Full Access to Case Search",
        "Unlimited Access to LegalGPT",
        "Access to WarRoom(30 Mins/Day)",
      ],
    },
    {
      type: "Pro",
      price: "499",
      originalPrice: "599",
      discount: "10% DISCOUNT",
      features: [
        "All Ready-Made Templates",
        "Prompt Drafting",
        "Download without Watermark",
        "Summarize Document",
        "Summarize Each Clause Individually",
        "Edit Document with AI",
        "Upload Your Own Document",
        "Analyze Any Document",
        "Upload Document Along with Prompt",
        "Full Access to Case Search",
        "Unlimited Access to LegalGPT",
        "Access to WarRoom(30 Mins/Day)",
      ],
      badge: "Most Opted Subscription",
    },
  ],
  Weekly: [
    // {
    //   type: "Free",
    //   features: [
    //     "Access to LegalGPT(15 Mins/Day)",
    //     "Access to WarRoom(30 Mins/Day)",
    //     "Full Access to Case Search",
    //   ],
    // },
    {
      type: "Basic",
      price: "1999",
      originalPrice: "2399",
      discount: "15% DISCOUNT",
      features: [
        "All Ready-Made Templates",
        "Prompt Drafting",
        "Download with Watermark",
        "Summarize Document",
        "Full Access to Case Search",
        "Unlimited Access to LegalGPT",
        "Access to WarRoom(30 Mins/Day)",
      ],
    },
    {
      type: "Pro",
      price: "2999",
      originalPrice: "3499",
      discount: "15% DISCOUNT",
      features: [
        "All Ready-Made Templates",
        "Prompt Drafting",
        "Download without Watermark",
        "Summarize Document",
        "Summarize Each Clause Individually",
        "Edit Document with AI",
        "Upload Your Own Document",
        "Analyze Any Document",
        "Upload Document Along with Prompt",
        "Full Access to Case Search",
        "Unlimited Access to LegalGPT",
        "Access to WarRoom(30 Mins/Day)",
      ],
      badge: "Most Opted Subscription",
    },
  ],
  Monthly: [
    // {
    //   type: "Free",
    //   features: [
    //     "Access to LegalGPT(15 Mins/Day)",
    //     "Access to WarRoom(30 Mins/Day)",
    //     "Full Access to Case Search",
    //   ],
    // },
    {
      type: "Basic",
      price: "4999",
      originalPrice: "5999",
      discount: "25% DISCOUNT",
      features: [
        "All Ready-Made Templates",
        "Prompt Drafting",
        "Download with Watermark",
        "Summarize Document",
        "Full Access to Case Search",
        "Unlimited Access to LegalGPT",
        "Access to WarRoom(30 Mins/Day)",
      ],
    },
    {
      type: "Pro",
      price: "8999",
      originalPrice: "11999",
      discount: "25% DISCOUNT",
      features: [
        "All Ready-Made Templates",
        "Prompt Drafting",
        "Download without Watermark",
        "Summarize Document",
        "Summarize Each Clause Individually",
        "Edit Document with AI",
        "Upload Your Own Document",
        "Analyze Any Document",
        "Upload Document Along with Prompt",
        "Full Access to Case Search",
        "Unlimited Access to LegalGPT",
        "Access to WarRoom(30 Mins/Day)",
      ],
      badge: "Most Opted Subscription",
    },
  ],
};

const PricingPlans = () => {
  const [activeTab, setActiveTab] = useState("Daily");
  const [isModalOpen, setModalOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    query: "",
    comments: "",
    hour: null,
    enddate: null,
    startdate: null,
    date: null,
  });

  const [Hour, setHour] = useState(null);

  const currentUser = useSelector((state) => state.auth.user);
  const activePlan = useSelector((state) => state.payments.activePlan);
  console.log(activePlan);

  const { isAdiraLoading } = useAdiraAuthState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const rows = [];
  for (let i = 0; i < 20; i++) {
    const time = 10 + Number((i / 2).toFixed());
    const time1 = 10 + Number(((i + 1) / 2).toFixed());

    rows.push(
      <div
        onClick={() =>
          handleDateChange(
            time + ":" + `${i % 2 == 0 ? "30" : "00"}:00`,
            time1 + ":" + `${(i + 1) % 2 == 0 ? "30" : "00"}:00`,
            i
          )
        }
        className={`border text-center cursor-pointer ${
          Hour == i ? "bg-teal-500 " : "border-white"
        }  rounded p-1`}
      >
        <span className="rounded">
          {time + ":" + `${i % 2 == 0 ? "30" : "00"}`}
        </span>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleDateChange = (date, date2, i) => {
    setFormData({ ...formData, ["enddate"]: date2, ["startdate"]: date });
    setHour(i);
    console.log(formData);
  };

  const handleGetNowClick = (newSelectedPlan) => {
    if (newSelectedPlan.type === "Free") {
      toast.success("This plan is already active. Renews everyday !");
    } else {
      if (activePlan && activePlan.isActive) {
        const durationDays =
          activePlan.plan.duration === "Daily"
            ? 1
            : activePlan.plan.duration === "Weekly"
            ? 7
            : 30;
        if (newSelectedPlan.price > activePlan.plan.price) {
          const checkCurrentPlanUsage = parseInt(
            (new Date() - new Date(activePlan.createdAt)) /
              (24 * 60 * 60 * 1000)
          );
          const totalPriceForUsedDays = Math.floor(
            (activePlan.plan.price / durationDays) * checkCurrentPlanUsage
          );

          const totalRefundableAmount = Math.floor(
            parseInt(newSelectedPlan.price) - totalPriceForUsedDays
          );
          const newObj = {
            amount: totalRefundableAmount,
            planName: `${newSelectedPlan.type}_${activeTab[0]}`,
            billingCycle: activeTab.toUpperCase(),
            createdAt: new Date().toISOString(),
            expiresAt:
              activeTab === "Daily"
                ? new Date().toISOString()
                : activeTab === "Weekly"
                ? new Date(
                    new Date().getTime() + 7 * 24 * 60 * 60 * 1000
                  ).toISOString()
                : new Date(
                    new Date().getTime() + 30 * 24 * 60 * 60 * 1000
                  ).toISOString(),
            refferalCode: "",
            couponCode: "",
            existingSubscription: activePlan.subscriptionId,
          };
          console.log(newObj);
          dispatch(setPaymentDetails(newObj));
          navigate("/payment");
        } else {
          toast.error("Please choose a higher plan than existing one!");
        }
      } else {
        const newObj = {
          amount: newSelectedPlan.price,
          planName: `${newSelectedPlan.type}_${activeTab[0]}`,
          billingCycle: activeTab.toUpperCase(),
          createdAt: new Date().toISOString(),
          expiresAt:
            activeTab === "Daily"
              ? new Date().toISOString()
              : activeTab === "Weekly"
              ? new Date(
                  new Date().getTime() + 7 * 24 * 60 * 60 * 1000
                ).toISOString()
              : new Date(
                  new Date().getTime() + 30 * 24 * 60 * 60 * 1000
                ).toISOString(),
          refferalCode: "",
          couponCode: "",
          existingSubscription: "",
        };
        console.log(newObj);
        dispatch(setPaymentDetails(newObj));
        navigate("/payment");
      }
    }
  };

  const goToPaymentPage = () => {
    const newObj1 = {
      amount: 699,
      planName: "Talk to Expert",
      billingCycle: activeTab.toUpperCase(),
      createdAt: new Date().toISOString(),
      expiresAt:
        activeTab === "Daily"
          ? new Date().toISOString()
          : activeTab === "Weekly"
          ? new Date(
              new Date().getTime() + 7 * 24 * 60 * 60 * 1000
            ).toISOString()
          : new Date(
              new Date().getTime() + 30 * 24 * 60 * 60 * 1000
            ).toISOString(),
      refferalCode: "",
      couponCode: "",
      existingSubscription: "",
    };
    console.log(newObj1);
    dispatch(setPaymentDetails(newObj1));
    const newObj = {
      ...formData,
      constomerType: "",
    };
    console.log(newObj);
    dispatch(setTalkToExpert(newObj));
    console.log("Hello");
    navigate("/payment");
  };

  return (
    <>
      {isAdiraLoading ? (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: 10,
            justifyContent: "center",
          }}
        >
          <CircularProgress style={{ color: "white" }} />
          <div>Pricing Plans Loading...</div>
        </div>
      ) : (
        <div className="min-h-screen text-white flex flex-col items-center py-8 px-4">
          <div
            className={`${
              isModalOpen ? "filter blur-md pointer-events-none" : ""
            } w-full`}
          >
            <h1 className="text-5xl text-center font-bold mb-4">
              Find the Perfect Pricing Option{" "}
              {/* <span className="text-teal-400">Adira AI</span> */}
            </h1>
            <p className="text-center mx-auto max-w-2xl mb-6">
              Explore our flexible pricing options designed to cater to a range
              of legal requirements. Select the plan that best fits your needs
              and budget.
            </p>

            <div className="flex justify-center  space-x-4 mb-6">
              {["Daily", "Weekly", "Monthly"].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 rounded-full ${
                    activeTab === tab
                      ? "bg-teal-500 text-white"
                      : "bg-gray-700 text-gray-300"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-6 px-4 py-6">
              {plansArr[activeTab].map((plan, index) => (
                <div
                  key={index}
                  className="bg-[#00808033] rounded-lg shadow-lg p-6 w-80 relative flex flex-col justify-between border-4 border-white"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-center mb-2">
                      {plan.type.toUpperCase()}
                    </h2>
                    {plan.discount && (
                      <div className="bg-teal-500 text-white text-center text-sm font-semibold px-4 py-2 mb-4 rounded">
                        {plan.discount}
                      </div>
                    )}
                    <div className="flex-grow flex flex-col items-center justify-center space-y-2 mb-6 text-sm text-gray-300">
                      {plan.features.map((feature, idx) => (
                        <div key={idx}>{feature}</div>
                      ))}
                    </div>
                  </div>
                  <div className="text-center">
                    {plan.type !== "Free" && (
                      <div className="flex gap-3 justify-center">
                        <p className="text-2xl font-bold text-white mb-4">
                          ₹ {plan.price} /-
                        </p>
                        <p className="text-2xl font-bold text-white mb-4 line-through">
                          ₹ {plan.originalPrice} /-
                        </p>
                      </div>
                    )}
                    <button
                      disabled={
                        plan.type === activePlan?.planName?.split("_")[0] &&
                        activeTab === activePlan?.plan?.duration
                      }
                      className="w-full bg-[#055151] text-white font-bold py-2 rounded hover:bg-teal-600 transition mb-4"
                      onClick={() =>
                        currentUser
                          ? handleGetNowClick(plan)
                          : navigate("/login")
                      }
                    >
                      {plan.type === activePlan?.planName?.split("_")[0] &&
                      activeTab === activePlan?.plan?.duration
                        ? "Currently Active"
                        : "Get It Now"}
                    </button>
                  </div>
                  {plan.type !== "Free" && plan.badge && (
                    <div className="absolute bottom-0 left-0 w-full bg-teal-500 text-white text-center text-sm font-semibold py-2 rounded-b">
                      {plan.badge}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <hr className="w-4/6 mx-auto mt-8 border-teal-500 border-3" />

            <div className="text-center w-4/6 mx-auto px-1 sm:px-6 lg:px-8">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Personalized{" "}
                <span className="text-teal-400">Legal Consultation</span>
              </h2>
              <div className="bg-[#5b5b5b]  rounded-lg transition border-2 border-white shadow-md  p-4 flex flex-col sm:flex-row justify-between items-center sm:items-start mt-6">
                {/* Left Section */}
                <div className="sm:w-2/3">
                  <h3 className="text-lg sm:text-xl flex justify-start font-bold mb-2">
                    TALK TO A LAWYER
                  </h3>
                  <p className="text-gray-300 max-w-md text-left">
                    Connect with experienced lawyers at your convenience. Book a
                    time slot and get personalized legal advice tailored to your
                    needs.
                  </p>
                </div>
                {/* Right Section */}
                <div className="  sm:w-1/3 text-center">
                  <p className="text-xl sm:text-2xl font-bold text-teal-400">
                    ₹ 699/-
                  </p>
                  <button
                    className=" px-4 py-1 w-full sm:w-auto bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition border border-white"
                    onClick={() => setModalOpen(true)}
                  >
                    Get It Now
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Modal for Lawyer Consultation */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-[#333333] border-white border-2 text-white mx-4 sm:mx-8 md:mx-12 rounded-lg shadow-lg p-6 w-full max-w-3xl relative flex flex-col md:flex-row space-y-4 md:space-y-0">
                {/* Close Button */}
                <button
                  className="absolute w-7 h-7 top-2 right-2 rounded-full text-gray-400 hover:text-gray-200 text-sm p-1"
                  onClick={() => setModalOpen(false)}
                >
                  ✕
                </button>

                {/* Left Section (Text) */}
                <div className="w-full md:w-1/2 md:pr-6">
                  <h2 className="text-xl sm:text-2xl text-teal-700 font-bold mb-4">
                    Talk To A Lawyer
                  </h2>
                  <p className="text-gray-300 mb-4">
                    Connect with experienced lawyers at your convenience. Book a
                    time slot and get personalized legal advice tailored to your
                    needs.
                  </p>
                </div>

                {/* Right Section (Form) */}
                <div className="w-full md:w-1/2">
                  <form
                    className="flex flex-col space-y-3"
                    onSubmit={() => {
                      setModalOpen(false);
                      setFormOpen(true);
                    }}
                  >
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter Your Full Name"
                      className="w-full px-4 py-2 text-gray-800 bg-gray-200 rounded border border-gray-700 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter Your Email ID"
                      className="w-full px-4 py-2 text-gray-800 bg-gray-200 rounded border border-gray-700 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                    <input
                      type="tel"
                      name="mobile"
                      required
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Enter Your Mobile Number"
                      className="w-full px-4 py-2 text-gray-800 bg-gray-200 rounded border border-gray-700 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      name="query"
                      required
                      value={formData.query}
                      onChange={handleChange}
                      placeholder="Enter Your Query Heading"
                      className="w-full px-4 py-2 text-gray-800 bg-gray-200 rounded border border-gray-700 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                    <textarea
                      placeholder="Explain Your Query"
                      rows="4"
                      name="comments"
                      required
                      value={formData.comments}
                      onChange={handleChange}
                      className="w-full px-4 py-2 text-gray-800 bg-gray-200 rounded border border-gray-700 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    ></textarea>
                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-teal-500 text-white border-white border-2 rounded font-bold hover:bg-teal-600 transition-colors duration-300"
                    >
                      Proceed
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {formOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
              <div className="bg-[#333333] border-white border-2 text-white rounded-lg shadow-lg p-6 w-11/12 max-w-3xl relative flex flex-col md:flex-row md:h-[480px]">
                {/* Close Button */}
                <button
                  className="absolute w-7 h-7 top-2 right-2 rounded-full text-gray-400 hover:text-gray-200 text-sm p-1"
                  onClick={() => setFormOpen(false)}
                >
                  ✕
                </button>

                {/* Left Section (Text) */}
                <div className="w-full md:w-1/2 md:pr-6">
                  <h2 className="text-xl sm:text-2xl text-teal-700 font-bold mb-4">
                    Talk To A Lawyer
                  </h2>
                  <p className="text-gray-300 mb-4">
                    Connect with experienced lawyers at your convenience. Book a
                    time slot and get personalized legal advice tailored to your
                    needs.
                  </p>
                </div>

                {/* Right Section (Form) */}
                <div className="w-full md:w-1/2 flex flex-col p-4 relative space-y-4">
                  {/* Date Input */}
                  <input
                    type="date"
                    name="date"
                    onChange={handleChange}
                    className="bg-[#3f4040] w-full text-sm text-white focus:outline-none p-3 rounded-md"
                  />

                  {/* Accordion */}
                  <div>
                    <Accordion
                      style={{
                        backgroundColor: "#3f4040",
                        boxShadow: "0px",
                        borderRadius: "5px",
                      }}
                      className="rounded-md bg-[#3f4040]"
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon className="text-white" />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        style={{
                          backgroundColor: "rgba(34, 34, 34, 0.8)",
                          fontSize: 14,
                          color: "white",
                        }}
                      >
                        Select A Time Slot
                      </AccordionSummary>
                      <AccordionDetails
                        style={{ maxHeight: "150px", overflowY: "auto" }}
                      >
                        <div className="grid text-xs text-white grid-cols-4 gap-1">
                          {rows.map((val, index) => (
                            <div key={index} className="text-center">
                              {val}
                            </div>
                          ))}
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </div>

                  {/* Next Button */}
                  <div className="mt-auto">
                    <button
                      className="w-full bg-logo-gradient px-4 py-2 my-1 rounded-md text-white font-semibold hover:bg-teal-700 transition-colors duration-300"
                      onClick={goToPaymentPage}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PricingPlans;

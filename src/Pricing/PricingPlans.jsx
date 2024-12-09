import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { setPaymentDetails } from "../features/payment/paymentSlice";
import toast from "react-hot-toast";

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
  const [isModalOpen, setModalOpen] = useState(false); // State for modal visibility

  const activePlan = useSelector((state) => state.payments.activePlan);
  console.log(activePlan);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGetNowClick = (newSelectedPlan) => {
    if (activePlan && activePlan.isActive) {
      const durationDays =
        activePlan.plan.duration === "Daily"
          ? 1
          : activePlan.plan.duration === "Weekly"
          ? 7
          : 30;
      if (newSelectedPlan.price > activePlan.plan.price) {
        const checkCurrentPlanUsage = parseInt(
          (new Date() - new Date(activePlan.createdAt)) / (24 * 60 * 60 * 1000)
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
  };

  return (
    <div className="min-h-screen text-white flex flex-col items-center py-8 px-4">
      <div
        className={`${
          isModalOpen ? "filter blur-md pointer-events-none" : ""
        } w-full`}>
        <h1 className="text-5xl text-center font-bold mb-4">
          Find the Perfect Pricing Option for{" "}
          <span className="text-teal-400">Adira AI</span>
        </h1>
        <p className="text-center mx-auto max-w-2xl mb-6">
          Explore our flexible pricing options designed to cater to a range of
          legal requirements. Select the plan that best fits your needs and
          budget.
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
              onClick={() => setActiveTab(tab)}>
              {tab}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-6 px-4 py-6">
          {plansArr[activeTab].map((plan, index) => (
            <div
              key={index}
              className="bg-[#00808033] rounded-lg shadow-lg p-6 w-80 relative flex flex-col justify-between border-4 border-white">
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
                  className="w-full bg-[#055151] text-white font-bold py-2 rounded hover:bg-teal-600 transition mb-4"
                  onClick={() => handleGetNowClick(plan)}>
                  Get It Now
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
        <hr className="w-3/4 mx-auto mt-8 border-teal-500 border-3" />

        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">
            Personalized{" "}
            <span className="text-teal-400">Legal Consultation</span>
          </h2>
          <div className="bg-[#5b5b5b] rounded-lg   transition border-2 border-white shadow-md p-2 flex justify-between  mt-6">
            <div className="mx-2">
              <h3 className="text-xl  flex justify-start font-semibold mb-1 mx-2">
                TALK TO A LAWYER
              </h3>
              <p className="text-gray-300  max-w-md">
                Connect with experienced lawyers at your convenience. Book a
                time slot and get personalized legal advice tailored to your
                needs.
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-teal-400">₹ 699/-</p>
              <button
                className="mt-2 px-4 py-1 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition border border-white"
                onClick={() => setModalOpen(true)} // Show modal on click
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
          <div className="bg-[#333333] border-white border-2 text-white my-12 mx-10 rounded-lg shadow-lg p-6 w-full max-w-5xl relative flex">
            {/* Close Button */}
            <button
              className="absolute w-4 h-4 top-1 right-1 rounded-full text-gray-400 hover:text-gray-200 text-sm p-1"
              onClick={() => setModalOpen(false)}>
              ✕
            </button>

            {/* Left Section (Text) */}
            <div className="w-1/2 pr-6">
              <h2 className="text-2xl text-teal-700 font-bold mb-4">
                Talk To A Lawyer
              </h2>
              <p className="text-gray-300 max-w-96 mb-4">
                Connect with experienced lawyers at your convenience. Book a
                time slot and get personalized legal advice tailored to your
                needs.
              </p>
            </div>

            {/* Right Section (Form) */}
            <div className="w-1/2">
              <form className="flex flex-col space-y-4">
                <input
                  type="text"
                  placeholder="Enter Your Full Name"
                  className="w-full px-4 py-2 text-gray-800 bg-gray-200 rounded border border-gray-700 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Enter Your Email ID"
                  className="w-full px-4 py-2 text-gray-800 bg-gray-200 rounded border border-gray-700 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
                <input
                  type="tel"
                  placeholder="Enter Your Mobile Number"
                  className="w-full px-4 py-2 text-gray-800 bg-gray-200 rounded border border-gray-700 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Enter Your Query Heading"
                  className="w-full px-4 py-2 text-gray-800 bg-gray-200 rounded border border-gray-700 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
                <textarea
                  placeholder="Explain Your Query"
                  rows="4"
                  className="w-full px-4 py-2 text-gray-800 bg-gray-200 rounded border border-gray-700 focus:ring-2 focus:ring-teal-500 focus:outline-none"></textarea>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-teal-500 text-white border-white border-2  rounded font-bold hover:bg-teal-600 transition-colors duration-300">
                  Proceed
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingPlans;

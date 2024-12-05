import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { setPaymentDetails } from "../features/payment/paymentSlice";
import toast from "react-hot-toast";

const plansArr = {
  Daily: [
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
      ],
      badge: "Most Opted Subscription",
    },
  ],
  Weekly: [
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
      ],
      badge: "Most Opted Subscription",
    },
  ],
  Monthly: [
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
      ],
      badge: "Most Opted Subscription",
    },
  ],
};

const PricingPlans = () => {
  const [activeTab, setActiveTab] = useState("Daily");

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
      <h1 className="text-5xl font-bold mb-4">
        Find the Perfect Pricing Option for{" "}
        <span className="text-teal-400">Adira AI</span>
      </h1>
      <p className="text-center max-w-2xl mb-6">
        Explore our flexible pricing options designed to cater to a range of
        legal requirements. Select the plan that best fits your needs and
        budget.
      </p>

      <div className="flex space-x-4 mb-6">
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

      <div className="flex flex-wrap justify-center h-[550px] gap-6">
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
              <div className="flex gap-3">
                <p className="text-2xl font-bold text-white mb-4">
                  ₹ {plan.price} /-
                </p>
                <p className="text-2xl font-bold text-white mb-4 line-through">
                  ₹ {plan.originalPrice} /-
                </p>
              </div>
              <button
                className="w-full bg-[#055151] text-white font-bold py-2 rounded hover:bg-teal-600 transition mb-4"
                onClick={() => handleGetNowClick(plan)}
              >
                Get It Now
              </button>
            </div>
            {plan.badge && (
              <div className="absolute bottom-0 left-0 w-full bg-teal-500 text-white text-center text-sm font-semibold py-2 rounded-b">
                {plan.badge}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPlans;

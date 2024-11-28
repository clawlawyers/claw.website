import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const PricingPlans = () => {
  const [activeTab, setActiveTab] = useState("Daily");
  const navigate = useNavigate(); 

  const plans = {
    Daily: [
      {
        type: "BASIC",
        price: "₹ 299 /-",
        features: [
          "All Ready-Made Templates",
          "Prompt Drafting",
          "Download with Watermark",
          "Summarize Document",
        ],
      },
      {
        type: "PRO",
        price: "₹ 499 /-",
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
        type: "BASIC",
        price: "₹ 1,999 /-",
        discount: "15% DISCOUNT",
        features: [
          "All Ready-Made Templates",
          "Prompt Drafting",
          "Download with Watermark",
          "Summarize Document",
        ],
      },
      {
        type: "PRO",
        price: "₹ 2,999 /-",
        discount: "15% DISCOUNT",
        features: [
          "All Ready-Made Templates",
          "Prompt Drafting",
          "Download without Watermark",
          "Summarize Document",
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
        type: "BASIC",
        price: "₹ 4,999 /-",
        discount: "25% DISCOUNT",
        features: [
          "All Ready-Made Templates",
          "Prompt Drafting",
          "Download with Watermark",
          "Summarize Document",
        ],
      },
      {
        type: "PRO",
        price: "₹ 8,999 /-",
        discount: "25% DISCOUNT",
        features: [
          "All Ready-Made Templates",
          "Prompt Drafting",
          "Download with Watermark",
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

  const handleGetNowClick = () => {
    navigate("/payment");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">
        Find the Perfect Pricing Option for <span className="text-teal-400">Adira AI</span>
      </h1>
      <p className="text-center max-w-2xl mb-6">
        Explore our flexible pricing options designed to cater to a range of legal requirements.
        Select the plan that best fits your needs and budget.
      </p>

      <div className="flex space-x-4 mb-6">
        {["Daily", "Weekly", "Monthly"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-full ${
              activeTab === tab ? "bg-teal-500 text-white" : "bg-gray-700 text-gray-300"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {plans[activeTab].map((plan, index) => (
          <div
            key={index}
            className="bg-[#00808033] rounded-lg shadow-lg p-6 w-80 relative flex flex-col justify-between border-4 border-white"
           
          >
            <div>
              <h2 className="text-2xl font-bold text-center mb-2">{plan.type}</h2>
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
              <p className="text-3xl font-bold text-white mb-4">{plan.price}</p>
              <button
                className="w-full bg-[#055151] text-white font-bold py-2 rounded hover:bg-teal-600 transition mb-4"
                onClick={handleGetNowClick}
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

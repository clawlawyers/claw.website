import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPriceDetails } from "../features/payment/pricingSlice";
import axios from "axios";
import { NODE_API_ENDPOINT } from "../utils/utils";
import { retrieveActivePlanUser } from "../features/gpt/gptSlice";

const paymentDetails = {
  plan: "Monthly",
  planType: "Essential",
  sessions: 2,
  totalPrice: 99,
  isDiscount: false,
  createdAt: "2024-10-01T05:27:56.247Z",
  trialDays: 0,
  refferalCode: null,
  couponCode: "",
  refundAmount: 0,
  existingSubscription: "",
  paymentProceedType: "regular",
};

const TestSubscription = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [receipt, setReceipt] = useState(`receipt_${Date.now()}`);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const currentUser = useSelector((state) => state.auth.user);
  // console.log(paymentDetails);
  const [paymentMethod, setPaymentMethod] = useState("card");
  console.log(paymentMethod);
  const handlePaymentMethodChange = (event) => {
    const selectedMethod = event.target.value;
    setPaymentMethod(selectedMethod);

    // Optionally, you can take further actions based on selected payment method
    console.log(`Selected Payment Method: ${selectedMethod}`);

    if (selectedMethod === "card") {
      // Handle card payment logic here
      console.log("Card payment selected");
    } else if (selectedMethod === "upi") {
      // Handle UPI payment logic here
      console.log("UPI payment selected");
    }
  };

  const loadRazorpay = async () => {
    setLoading(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => {
      alert("Razorpay SDK failed to load. Are you online?");
    };
    script.onload = async () => {
      try {
        const planeName = `${paymentDetails?.planType}_${paymentDetails?.plan[0]}`;
        let expiryTotalDays;
        if (paymentDetails?.plan === "Monthly") {
          if (paymentDetails?.isDiscount) {
            expiryTotalDays = 37;
          } else {
            expiryTotalDays = 30;
          }
        } else {
          if (paymentDetails?.isDiscount) {
            expiryTotalDays = 372;
          } else {
            expiryTotalDays = 365;
          }
        }

        const result = await axios.post(
          `${NODE_API_ENDPOINT}/payment/test-create-subscription`,
          {
            // amount: paymentDetails?.refundAmount
            //   ? paymentDetails?.refundAmount
            //   : paymentDetails?.totalPrice,
            // currency: "INR",
            // receipt: receipt,
            plan: planeName?.toUpperCase(),
            billingCycle: paymentDetails?.plan.toUpperCase(),
            session: paymentDetails?.sessions,
            phoneNumber: "9027640571",
          }
        );

        console.log(result);

        const { amount, id, currency } = result.data.razorpayOrder;
        const { _id } = result.data.createdOrder;

        const options = {
          key: "rzp_test_UWcqHHktRV6hxM",
          amount: String(amount),
          currency: currency,
          name: "CLAW LEGALTECH PRIVATE LIMITED",
          description: "Transaction",
          order_id: id,
          handler: async function (response) {
            console.log(response);
            const createdAt = new Date(paymentDetails?.createdAt);
            const resultDate = new Date(createdAt);
            const data = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              _id,
              // createdAt: resultDate,
              // expiresAt:
              //   paymentDetails.plan === "Monthly"
              //     ? new Date(
              //         new Date(createdAt).getTime() +
              //           expiryTotalDays * 24 * 60 * 60 * 1000
              //       ).toISOString()
              //     : new Date(
              //         new Date(createdAt).getTime() +
              //           expiryTotalDays * 24 * 60 * 60 * 1000
              //       ).toISOString(),
              // refferalCode: paymentDetails?.refferalCode,
              // couponCode: paymentDetails?.couponCode,
              // existingSubscription: paymentDetails?.existingSubscription,
              // amount: paymentDetails?.refundAmount
              //   ? paymentDetails?.refundAmount
              //   : paymentDetails?.totalPrice,
              // amount: paymentDetails?.totalPrice,
              // trialDays: paymentDetails?.trialDays,
            };

            console.log(response);

            const result = await axios.post(
              `${NODE_API_ENDPOINT}/payment/test-verify-subscription`,
              data
            );
            alert(result.data.status);
            setPaymentVerified(true);
          },
          prefill: {
            name: currentUser?.name,
            email: currentUser?.email,
            contact: currentUser?.phoneNumber,
          },
          theme: {
            color: "#3399cc",
          },
        };

        console.log(options);

        const paymentObject = new window.Razorpay(options);

        console.log(paymentObject);
        paymentObject.open();
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };
    document.body.appendChild(script);
  };

  const loadRazorpaySubscription = async () => {
    setLoading(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => {
      alert("Razorpay SDK failed to load. Are you online?");
    };
    script.onload = async () => {
      try {
        const planeName = `${paymentDetails?.planType}_${paymentDetails?.plan[0]}`;

        // Request the backend to create a subscription
        const result = await axios.post(
          `${NODE_API_ENDPOINT}/payment/test-create-subscription`,
          {
            // amount: paymentDetails?.totalPrice,
            // currency: "INR",
            // receipt: receipt,
            plan: "Test",
            billingCycle: paymentDetails?.plan.toUpperCase(),
            session: paymentDetails?.sessions,
            phoneNumber: "9027640571",
            paymentOptionCard: paymentMethod === "card" ? true : false,
            // trialDays: paymentDetails?.trialDays,
            // isDiscount: paymentDetails?.isDiscount,
          }
        );

        console.log(result);

        const { id: subscription_id } = result.data.razorpaySubscription;
        const { _id } = result.data.createdOrder;

        console.log(subscription_id);

        const options = {
          key: "rzp_live_vlDmt5SV4QPDhN",
          // key: "rzp_test_UWcqHHktRV6hxM",
          subscription_id: subscription_id, // Pass the subscription_id instead of order_id
          name: "CLAW LEGALTECH PRIVATE LIMITED",
          description: "Subscription",
          handler: async function (response) {
            console.log(response);
            const createdAt = new Date(paymentDetails?.createdAt);
            const resultDate = new Date(createdAt);
            resultDate.setDate(createdAt.getDate() + paymentDetails?.trialDays);
            const data = {
              razorpay_subscription_id: response.razorpay_subscription_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              _id,
              // isUpgrade: paymentDetails?.isUpgrade,
              // createdAt: paymentDetails?.createdAt,
              // createdAt: resultDate,
              // trialDays: paymentDetails?.trialDays,
              // refferalCode: paymentDetails?.refferalCode,
              // couponCode: paymentDetails?.couponCode,
              // refundAmount: paymentDetails?.refundAmount,
              // existingSubscription: paymentDetails?.existingSubscription,
              // isDiscount: paymentDetails?.isDiscount,
            };

            console.log(response);

            // Verify the subscription payment with the backend
            const result = await axios.post(
              `${NODE_API_ENDPOINT}/payment/test-verify-subscription`,
              data
            );
            alert(result.data.status);
            setPaymentVerified(true);
            console.log(result);
            // dispatch(retrieveActivePlanUser());
          },
          prefill: {
            name: currentUser?.name,
            email: currentUser?.email,
            contact: currentUser?.phoneNumber,
          },
          theme: {
            color: "#3399cc",
          },
        };

        console.log(options);

        const paymentObject = new window.Razorpay(options);

        console.log(paymentObject);
        paymentObject.open();
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };
    document.body.appendChild(script);
  };

  const handleHomepage = () => {
    navigate("/");
  };

  return (
    <div className="grid md:grid-cols-2 gap-3 md:gap-0">
      {!paymentVerified ? (
        <>
          <div className="px-5 md:px-24 ">
            <div className="pb-5">
              <h1 className="font-bold">Payment Confirmation</h1>
              <p className="m-0">Please Confirm Your Purchase Items Before</p>
              <p>Proceeding with your Payment</p>
            </div>
            <div className="">
              <p className="m-0 pb-3">Have a Coupon ? </p>
              <button className="px-5 py-1 rounded">Click Here</button>
            </div>
          </div>
          <div className="w-full flex flex-col px-5 md:px-0 md:pr-24 gap-3">
            <div className="flex justify-start md:justify-end">
              <button className="px-3 py-1 rounded">Go Back</button>
            </div>
            <div className="w-full bg-[#055151] p-3 rounded">
              <div className="w-full flex flex-col items-center pb-10">
                <div className="w-full flex justify-between">
                  <div>
                    <p className="m-0 text-lg text-white">
                      {paymentDetails?.planType} Package
                    </p>
                    <p className="text-white">({paymentDetails?.plan})</p>
                  </div>
                  <div className="flex justify-end">
                    <p className="text-white">₹ {paymentDetails?.totalPrice}</p>
                  </div>
                </div>
                {paymentDetails?.refundAmount ? (
                  <div className="w-full flex justify-between">
                    <div>
                      <p className="m-0 text-lg text-white">Discount</p>
                    </div>
                    <div className="flex justify-end">
                      <p className="text-white">
                        ₹{" "}
                        {paymentDetails?.totalPrice -
                          paymentDetails?.refundAmount}
                      </p>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <hr />
              <div className="flex justify-between items-center">
                <p className="m-0 text-white text-lg">Total Payable</p>
                <div className="flex justify-end">
                  <p className="m-0 text-white">
                    ₹{" "}
                    {paymentDetails?.refundAmount
                      ? paymentDetails?.refundAmount
                      : paymentDetails?.totalPrice}
                  </p>
                </div>
              </div>
            </div>
            <div class="w-full max-w-sm mx-auto p-6 text-white shadow-md rounded-lg">
              <label
                for="payment-method"
                class="block text-white text-sm font-semibold mb-2"
              >
                Select Payment Option
              </label>
              <select
                id="payment-method"
                name="payment-method"
                value={paymentMethod} // Bind value to the state
                onChange={handlePaymentMethodChange} // Attach the handler
                class="block w-full p-3 border bg-black border-gray-300 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="card">Card</option>
                <option value="upi">UPI</option>
              </select>
            </div>

            <button
              onClick={loadRazorpaySubscription}
              className="w-full rounded py-2"
            >
              Proceed to Payment
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="px-5 md:px-24">
            <div className="pb-5">
              <h1 className="font-bold">Payment Successful</h1>
              <p className="m-0">Your Payment is Successful</p>
            </div>
            <div className="flex items-center">
              <button onClick={handleHomepage} className="px-5 py-1 rounded">
                Continue to CLAW Home
              </button>
            </div>
          </div>
          <div className="w-full flex flex-col px-5 md:px-0 md:pr-24 gap-3">
            <div className="w-full bg-[#00802F] p-3 rounded">
              <div className="w-full flex flex-col items-center pb-10">
                <div className="w-full flex justify-between">
                  <div>
                    <p className="m-0 text-lg text-white">
                      {paymentDetails?.planType} Package
                    </p>
                    <p className="text-white">({paymentDetails?.plan})</p>
                  </div>
                  <div className="flex justify-end">
                    <p className="text-white">₹ {paymentDetails?.totalPrice}</p>
                  </div>
                </div>
                {paymentDetails?.refundAmount ? (
                  <div className="w-full flex justify-between">
                    <div>
                      <p className="m-0 text-lg text-white">Discount</p>
                    </div>
                    <div className="flex justify-end">
                      <p className="text-white">
                        ₹{" "}
                        {paymentDetails?.totalPrice -
                          paymentDetails?.refundAmount}
                      </p>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <hr />
              <div className="flex justify-between items-center">
                <p className="m-0 text-white text-lg">Total Payable</p>
                <div className="flex justify-end">
                  <p className="m-0 text-white">
                    ₹{" "}
                    {paymentDetails?.refundAmount
                      ? paymentDetails?.refundAmount
                      : paymentDetails?.totalPrice}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TestSubscription;

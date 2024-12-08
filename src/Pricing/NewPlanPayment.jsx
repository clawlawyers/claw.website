import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPriceDetails } from "../features/payment/pricingSlice";
import axios from "axios";
import { NODE_API_ENDPOINT } from "../utils/utils";
import { retrieveActivePlanUser } from "../features/gpt/gptSlice";
import { CircularProgress } from "@mui/material";
import paymentIcon from "../assets/images/paymentConfirm.gif";
import { setActivePlanDetails } from "../features/payment/paymentSlice";

const NewPlanPayment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [receipt, setReceipt] = useState(`receipt_${Date.now()}`);
  const [paymentVerified, setPaymentVerified] = useState(false);

  const paymentDetails = useSelector((state) => state.payments.plan);
  console.log(paymentDetails);
  const currentUser = useSelector((state) => state.auth.user);
  // console.log(paymentDetails);

  useEffect(() => {
    if (!paymentDetails) navigate("/pricing");
  }, [paymentDetails, navigate]);

  const loadRazorpay = async () => {
    setLoading(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => {
      setLoading(false);
      alert("Razorpay SDK failed to load. Are you online?");
    };
    script.onload = async () => {
      try {
        const result = await axios.post(
          `${NODE_API_ENDPOINT}/payment/create-order`,
          {
            amount: paymentDetails?.amount,
            currency: "INR",
            receipt: receipt,
            planName: paymentDetails?.planName,
            billingCycle: paymentDetails?.billingCycle,
            phoneNumber: currentUser?.phoneNumber,
          }
        );

        console.log(result);

        const { id, currency } = result.data.razorpayOrder;
        const { _id } = result.data.createdOrder;

        const options = {
          key: "rzp_live_vlDmt5SV4QPDhN",
          //   amount: String(amount),
          currency: currency,
          name: "CLAW LEGALTECH PRIVATE LIMITED",
          description: "Transaction",
          order_id: id,
          handler: async function (response) {
            console.log(response);
            const data = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              _id,
              createdAt: paymentDetails?.createdAt,
              expiresAt: paymentDetails?.expiresAt,
              refferalCode: paymentDetails?.refferalCode,
              couponCode: paymentDetails?.couponCode,
              existingSubscription: paymentDetails?.existingSubscription,
              amount: paymentDetails?.amount,
            };

            console.log(response);

            const result = await axios.post(
              `${NODE_API_ENDPOINT}/payment/verifyPayment`,
              data
            );
            alert(result.data.status);
            setLoading(false);
            setPaymentVerified(true);
            console.log(result.data);
            dispatch(setActivePlanDetails(result.data.plan.plan));
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
        setLoading(false);
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
    <div className="m-auto w-[85%]">
      {!paymentVerified ? (
        <div className="grid md:grid-cols-2 gap-3 md:gap-0">
          <div className="px-5 md:px-24 ">
            <div className="pb-5">
              <h1 className="font-bold">Payment Confirmation</h1>
              <p className="m-0">Please Confirm Your Purchase Items Before</p>
              <p>Proceeding with your Payment</p>
            </div>
            {/* <div className="">
              <p className="m-0 pb-3">Have a Coupon ? </p>
              <button onClick={handleDiscount} className="px-5 py-1 rounded">
                Click Here
              </button>
            </div> */}
          </div>
          <div className="w-full flex flex-col px-5 md:px-0 md:pr-24 gap-3">
            <div className="flex justify-start md:justify-end">
              <button
                onClick={() => navigate("/pricing")}
                className="px-3 py-1 rounded"
              >
                Go Back
              </button>
            </div>
            <div className="w-full bg-[#055151] p-3 rounded">
              <div className="w-full flex flex-col items-center pb-10">
                <div className="w-full flex justify-between">
                  <div>
                    <p className="m-0 text-lg text-white">
                      {paymentDetails?.planName.split("_")[0]} Package
                    </p>
                    <p className="text-white">
                      ({paymentDetails?.billingCycle})
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <p className="text-white">₹ {paymentDetails?.amount}</p>
                  </div>
                </div>
                {/* {paymentDetails?.refundAmount ? (
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
                )} */}
              </div>
              <hr />
              <div className="flex justify-between items-center">
                <p className="m-0 text-white text-lg">Total Payable</p>
                <div className="flex justify-end">
                  {/* <p className="m-0 text-white">
                    ₹{" "}
                    {paymentDetails?.refundAmount
                      ? paymentDetails?.refundAmount
                      : paymentDetails?.totalPrice}
                  </p> */}
                  <p className="m-0 text-white">₹ {paymentDetails?.amount}</p>
                </div>
              </div>
            </div>
            <button onClick={loadRazorpay} className="w-full rounded py-2">
              {loading ? (
                <CircularProgress size={15} color="inherit" />
              ) : (
                "Proceed to Payment"
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 p-5">
          <img className="w-auto h-auto rounded-none" src={paymentIcon} />
          <div className="flex flex-col py-1">
            <h1 className="text-[#00FFFF] font-bold">
              Thank You for your Purchase!
            </h1>
            <p className="text-sm">
              We appreciate your trust in us. Your transaction has been
              successfully completed, and a confirmation email with your order
              details is on its way.
            </p>
            <button onClick={() => navigate("/")} className="rounded">
              Continue to CLAW Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewPlanPayment;

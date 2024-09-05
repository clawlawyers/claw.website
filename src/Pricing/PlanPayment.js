import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPriceDetails } from "../features/payment/pricingSlice";

const PlanPayment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [receipt, setReceipt] = useState(`receipt_${Date.now()}`);

  const paymentDetails = useSelector((state) => state.price);
  const currentUser = useSelector((state) => state.auth.user);
  // console.log(paymentDetails);

  useEffect(() => {
    if (!paymentDetails.plan) navigate("/pricing");
  }, [paymentDetails, navigate]);

  const handleDiscount = () => {
    navigate("/pricing");
    dispatch(resetPriceDetails());
  };

  const testRazor = () => {
    const planeName = `${paymentDetails?.planType}_${paymentDetails?.plan[0]}`;
    const newObj = {
      amount: paymentDetails?.totalPrice,
      currency: "INR",
      receipt: receipt,
      plan: planeName,
      billingCycle: paymentDetails?.plan,
      session: paymentDetails?.sessions,
      phoneNumber: currentUser?.phoneNumber,
    };
    console.log(newObj);
  };

  // const loadRazorpay = async () => {
  //   setLoading(true);
  //   const script = document.createElement("script");
  //   script.src = "https://checkout.razorpay.com/v1/checkout.js";
  //   script.onerror = () => {
  //     alert("Razorpay SDK failed to load. Are you online?");
  //   };
  //   script.onload = async () => {
  //     try {
  //       const planeName = `${paymentDetails?.planType}_${paymentDetails?.plan}`;
  //       const result = await axios.post(
  //         `${NODE_API_ENDPOINT}/payment/create-order`,
  //         {
  //           amount: paymentDetails?.totalPrice,
  //           currency: "INR",
  //           receipt: receipt,
  //           plan: planeName,
  //           billingCycle: paymentDetails?.plan,
  //           session,
  //           phoneNumber: currentUser?.phoneNumber,
  //         }
  //       );

  //       console.log(result);

  //       const { amount, id, currency } = result.data.razorpayOrder;
  //       const { _id } = result.data.createdOrder;
  //       const options = {
  //         key: "rzp_test_UWcqHHktRV6hxM",
  //         amount: String(amount),

  //         currency: currency,
  //         name: "CLAW LEGALTECH PRIVATE LIMITED",
  //         description: "Transaction",
  //         order_id: id,
  //         handler: async function (response) {
  //           const data = {
  //             razorpay_order_id: response.razorpay_order_id,
  //             razorpay_payment_id: response.razorpay_payment_id,
  //             razorpay_signature: response.razorpay_signature,
  //             _id,
  //           };

  //           const result = await axios.post(
  //             `${NODE_API_ENDPOINT}/payment/verifyPayment`,
  //             data
  //           );
  //           alert(result.data.status);
  //           nav("/");
  //         },

  //         theme: {
  //           color: "#3399cc",
  //         },
  //       };

  //       const paymentObject = new window.Razorpay(options);
  //       paymentObject.open();
  //     } catch (error) {
  //       alert(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   document.body.appendChild(script);
  // };

  return (
    <div className="grid md:grid-cols-2">
      <div className="px-24">
        <div className="pb-5">
          <h1 className="font-bold">Payment Confirmation</h1>
          <p className="m-0">Please Confirm Your Purchase Items Before</p>
          <p>Proceeding with your Payment</p>
        </div>
        <div className="flex items-center">
          <p className="m-0">Have a Coupon ? </p>
          <button onClick={handleDiscount} className="px-5 py-1 rounded">
            Click Here
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col pr-24 gap-3">
        <div className="flex justify-end">
          <button onClick={handleDiscount} className="px-3 py-1 rounded">
            Go Back
          </button>
        </div>
        <div className="w-full bg-[#055151] p-3 rounded">
          <div className="w-full flex justify-between items-center pb-10">
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
          <hr />
          <div className="flex justify-between items-center">
            <p className="m-0 text-white text-lg">Total Payable</p>
            <div className="flex justify-end">
              <p className="m-0 text-white">₹ {paymentDetails?.totalPrice}</p>
            </div>
          </div>
        </div>
        <button onClick={testRazor} className="w-full rounded py-2">
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default PlanPayment;

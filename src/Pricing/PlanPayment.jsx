import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPriceDetails } from "../features/payment/pricingSlice";
import axios from "axios";
import { NODE_API_ENDPOINT } from "../utils/utils";
import { retrieveActivePlanUser } from "../features/gpt/gptSlice";
import { CircularProgress } from "@mui/material";
import paymentIcon from "../assets/images/paymentConfirm.gif";

const PlanPayment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [receipt, setReceipt] = useState(`receipt_${Date.now()}`);
  const [paymentVerified, setPaymentVerified] = useState(false);

  const paymentDetails = useSelector((state) => state.price);
  console.log(paymentDetails);
  const currentUser = useSelector((state) => state.auth.user);
  // console.log(paymentDetails);

  useEffect(() => {
    if (!paymentDetails.plan) navigate("/pricing");
  }, [paymentDetails, navigate]);

  const handleDiscount = () => {
    navigate("/pricing");
    dispatch(resetPriceDetails());
  };
  //   setLoading(true);
  //   const script = document.createElement("script");
  //   script.src = "https://checkout.razorpay.com/v1/checkout.js";
  //   script.onerror = () => {
  //     alert("Razorpay SDK failed to load. Are you online?");
  //   };
  //   script.onload = async () => {
  //     try {
  //       const planeName = `${paymentDetails?.planType}_${paymentDetails?.plan[0]}`;
  //       const result = await axios.post(
  //         `${NODE_API_ENDPOINT}/payment/create-order`,
  //         {
  //           amount: paymentDetails?.totalPrice,
  //           currency: "INR",
  //           receipt: receipt,
  //           plan: planeName?.toUpperCase(),
  //           billingCycle: paymentDetails?.plan.toUpperCase(),
  //           session: paymentDetails?.sessions,
  //           phoneNumber: currentUser?.phoneNumber,
  //         }
  //       );

  //       console.log(result);

  //       const { amount, id, currency } = result.data.razorpayOrder;
  //       const { _id } = result.data.createdOrder;
  //       const options = {
  //         key: "rzp_live_vlDmt5SV4QPDhN",
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
  //             isUpgrade: paymentDetails?.isUpgrade,
  //             createdAt: paymentDetails?.createdAt,
  //           };

  //           const result = await axios.post(
  //             `${NODE_API_ENDPOINT}/payment/verifyPayment`,
  //             data
  //           );
  //           alert(result.data.status);
  //           setPaymentVerified(true);
  //           dispatch(retrieveActivePlanUser());
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

  // const trialDays = 7;

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
          `${NODE_API_ENDPOINT}/payment/create-subscription`,
          {
            // amount: paymentDetails?.totalPrice,
            // currency: "INR",
            // receipt: receipt,
            plan: planeName?.toUpperCase(),
            billingCycle: paymentDetails?.plan.toUpperCase(),
            session: paymentDetails?.sessions,
            phoneNumber: currentUser?.phoneNumber,
            trialDays: paymentDetails?.trialDays,
            isDiscount: paymentDetails?.isDiscount,
          }
        );

        console.log(result);

        const { id: subscription_id } = result.data.razorpaySubscription;
        const { _id } = result.data.createdOrder;

        console.log(subscription_id);

        const options = {
          key: "rzp_live_vlDmt5SV4QPDhN",
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
              createdAt: resultDate,
              // trialDays: paymentDetails?.trialDays,
              refferalCode: paymentDetails?.refferalCode,
              couponCode: paymentDetails?.couponCode,
              // refundAmount: paymentDetails?.refundAmount,
              existingSubscription: paymentDetails?.existingSubscription,
              isDiscount: paymentDetails?.isDiscount,
            };

            console.log(response);

            // Verify the subscription payment with the backend
            const result = await axios.post(
              `${NODE_API_ENDPOINT}/payment/verify-subscription`,
              data
            );
            alert(result.data.status);
            setPaymentVerified(true);
            dispatch(retrieveActivePlanUser());
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
          `${NODE_API_ENDPOINT}/payment/create-order`,
          {
            amount: paymentDetails?.refundAmount
              ? paymentDetails?.refundAmount
              : paymentDetails?.totalPrice,
            currency: "INR",
            receipt: receipt,
            plan: planeName?.toUpperCase(),
            billingCycle: paymentDetails?.plan.toUpperCase(),
            session: paymentDetails?.sessions,
            phoneNumber: currentUser?.phoneNumber,
          }
        );

        console.log(result);

        const { amount, id, currency } = result.data.razorpayOrder;
        const { _id } = result.data.createdOrder;

        const options = {
          key: "rzp_live_vlDmt5SV4QPDhN",
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
              createdAt: resultDate,
              expiresAt:
                paymentDetails.plan === "Monthly"
                  ? new Date(
                      new Date(createdAt).getTime() +
                        expiryTotalDays * 24 * 60 * 60 * 1000
                    ).toISOString()
                  : new Date(
                      new Date(createdAt).getTime() +
                        expiryTotalDays * 24 * 60 * 60 * 1000
                    ).toISOString(),
              refferalCode: paymentDetails?.refferalCode,
              couponCode: paymentDetails?.couponCode,
              existingSubscription: paymentDetails?.existingSubscription,
              // amount: paymentDetails?.refundAmount
              //   ? paymentDetails?.refundAmount
              //   : paymentDetails?.totalPrice,
              amount: paymentDetails?.totalPrice,
              trialDays: paymentDetails?.trialDays,
            };

            console.log(response);

            const result = await axios.post(
              `${NODE_API_ENDPOINT}/payment/verifyPayment`,
              data
            );
            alert(result.data.status);
            setLoading(false);
            setPaymentVerified(true);
            dispatch(retrieveActivePlanUser());
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

  const loadRazorpayAddon = async () => {
    setLoading(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => {
      alert("Razorpay SDK failed to load. Are you online?");
    };
    script.onload = async () => {
      try {
        const planeName = `${paymentDetails?.planType}_${paymentDetails?.plan[0]}`;

        const result = await axios.post(
          `${NODE_API_ENDPOINT}/payment/create-order`,
          {
            amount: paymentDetails?.totalPrice,
            currency: "INR",
            receipt: receipt,
            plan: planeName?.toUpperCase(),
            billingCycle: paymentDetails?.plan.toUpperCase(),
            session: paymentDetails?.sessions,
            phoneNumber: currentUser?.phoneNumber,
          }
        );

        console.log(result);

        const { amount, id, currency } = result.data.razorpayOrder;
        const { _id } = result.data.createdOrder;

        // console.log(subscription_id);

        const options = {
          key: "rzp_live_vlDmt5SV4QPDhN",
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
              createdAt: resultDate,
              expiresAt: new Date(
                new Date(createdAt).getTime() + 30 * 24 * 60 * 60 * 1000
              ).toISOString(),
              refferalCode: paymentDetails?.refferalCode,
              couponCode: paymentDetails?.couponCode,
              existingSubscription: paymentDetails?.existingSubscription,
              amount: paymentDetails?.totalPrice,
            };

            console.log(response);

            // Verify the subscription payment with the backend
            const result = await axios.post(
              `${NODE_API_ENDPOINT}/payment/verifyPayment`,
              data
            );
            alert(result.data.status);
            setPaymentVerified(true);
            dispatch(retrieveActivePlanUser());
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

  const loadFreeTrial = async () => {
    const planeName = `${paymentDetails?.planType}_${paymentDetails?.plan[0]}`;
    const createdAt = new Date(paymentDetails?.createdAt);
    const resultDate = new Date(createdAt);

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

    try {
      const response = await axios.post(
        `${NODE_API_ENDPOINT}/payment/createPaymentLink`,
        {
          price: paymentDetails?.totalPrice,
          amount: paymentDetails?.refundAmount
            ? paymentDetails?.refundAmount
            : paymentDetails?.totalPrice,
          currency: "INR",
          mobile: currentUser?.phoneNumber,
          description: `Free Trial for ${paymentDetails?.trialDays} days`,
          trialDays: paymentDetails?.trialDays,
          // userId: currentUser?.uid,
          planName: planeName.toUpperCase(),
          refferalCode: paymentDetails?.refferalCode,
          couponCode: paymentDetails?.couponCode,
          existingSubscription: paymentDetails?.existingSubscription,
          expiresAt:
            paymentDetails.plan === "Monthly"
              ? new Date(
                  new Date(createdAt).getTime() +
                    expiryTotalDays * 24 * 60 * 60 * 1000
                ).toISOString()
              : new Date(
                  new Date(createdAt).getTime() +
                    expiryTotalDays * 24 * 60 * 60 * 1000
                ).toISOString(),
          createdAt: resultDate,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser?.jwt}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
      alert(
        `Your Trial for ${paymentDetails?.trialDays} days has been activated! \n You can use this link to complete your payment : \n ${response?.paymentLink}`
      );
      setPaymentVerified(true);
    } catch (err) {
      console.log(err);
    }
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
            <div className="">
              <p className="m-0 pb-3">Have a Coupon ? </p>
              <button onClick={handleDiscount} className="px-5 py-1 rounded">
                Click Here
              </button>
            </div>
          </div>
          <div className="w-full flex flex-col px-5 md:px-0 md:pr-24 gap-3">
            <div className="flex justify-start md:justify-end">
              <button onClick={handleDiscount} className="px-3 py-1 rounded">
                Go Back
              </button>
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
            <button
              onClick={
                paymentDetails.paymentProceedType === "regular"
                  ? loadRazorpay
                  : paymentDetails.paymentProceedType === "addon"
                  ? loadRazorpayAddon
                  : loadFreeTrial
              }
              className="w-full rounded py-2"
            >
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

export default PlanPayment;

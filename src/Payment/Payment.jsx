import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Styles from "./Payment.module.css";
import { NODE_API_ENDPOINT } from "../utils/utils";
import CircularProgress from "@mui/material/CircularProgress";
import { load } from "@cashfreepayments/cashfree-js";

export default function Payment() {
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const nav = useNavigate();
  const [discountApplied, setDiscountApplied] = useState(false);
  const { plan, request, session, total, type } = useSelector(
    (state) => state.cart
  );
  const { jwt } = useSelector((state) => state.auth.user);
  const [pay, setPay] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [Total, setTotal] = useState(total);
  const [receipt, setReceipt] = useState(`receipt_${Date.now()}`);
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!plan) navigate("/pricing");
  }, [plan, navigate]);

  // useEffect(() => {
  //   const initializeCashfree = async () => {
  //     const cashfree = await load({
  //       mode: "production", // or production
  //     });
  //     setPay(cashfree);
  //   };
  //   initializeCashfree();
  // }, []);

  const applyCoupon = async () => {
    if (couponCode === "" || undefined) {
      alert("please provide coupon code");
      return;
    }
    try {
      const response = await axios.post(`${NODE_API_ENDPOINT}/admin/validate`, {
        code: couponCode,
      });
      const discountValue = response.data.discount;
      setDiscount(discountValue);

      const newTotal = total - total * (discountValue / 100);
      setTotal(parseFloat(newTotal.toFixed(2)));

      setDiscountApplied(true);
    } catch (error) {
      console.error(error);
      alert(error.response.data.message || "Error applying coupon");
    }
  };
  useEffect(() => {
    if (discountApplied) {
      const newTotal = total - total * (discount / 100);
      setTotal(parseFloat(newTotal.toFixed(2)));
    }
  }, [discount, total, discountApplied]);

  // async function createOrder() {
  //   console.log(pay);
  //   if (!pay) {
  //     console.error("Payment object not initialized");
  //     return;
  //   }
  //   try {
  //     console.log("inside called");
  //     setLoading(true);
  //     const planeName = `${type}_${request}_${session}`;
  //     const response = await fetch(
  //       `${NODE_API_ENDPOINT}/payment/create-payment-order`,
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${jwt}`,
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           amount: parseFloat(Total),
  //           plan: planeName,
  //           billingCycle: plan,
  //           request,
  //           session,
  //         }),
  //       }
  //     );
  //     const { data } = await response.json();
  //     console.log({ data });

  //     pay.checkout({
  //       paymentSessionId: data.payment_session_id,
  //       returnUrl: "https://clawlaw.in",
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  const loadRazorpay = async () => {
    setLoading(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => {
      alert("Razorpay SDK failed to load. Are you online?");
    };
    script.onload = async () => {
      try {
        const planeName = `${type}_${request}_${session}`;
        const result = await axios.post(
          `${NODE_API_ENDPOINT}/payment/create-order`,
          {
            amount: Total,
            currency: "INR",
            receipt: receipt,
            plan: planeName,
            billingCycle: plan,
            request,
            session,
            phoneNumber: currentUser.phoneNumber,
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
            const data = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              _id,
            };

            const result = await axios.post(
              `${NODE_API_ENDPOINT}/payment/verifyPayment`,
              data
            );
            alert(result.data.status);
            // if (
            //   plan === "AddOn" &&
            //   result.data.status === "Payment verified successfully"
            // ) {
            //   axios.post(
            //     `${NODE_API_ENDPOINT}/gpt/dummy`,
            //     {
            //       phoneNumber: currentUser.phoneNumber,
            //     },
            //     {
            //       headers: {
            //         Authorization: `Bearer ${currentUser.jwt}`,
            //         "Content-Type": "application/json",
            //       },
            //     }
            //   );
            // }
            nav("/");
          },

          theme: {
            color: "#3399cc",
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };
    document.body.appendChild(script);
  };

  console.log(type + "_" + request + "_" + session);

  return (
    <div
      style={{ width: "80%", margin: "auto", position: "relative", zIndex: 2 }}
    >
      <div>
        <h2>Let’s Make Payment</h2>
        <p>
          To start your subscription, input your card details to make payment.
          You will be redirected to your banks authorization page .{" "}
        </p>
      </div>
      <div className={Styles.gridContainer}>
        <div style={{ flex: 1, paddingTop: 70, color: "black" }}>
          {/* <button
            style={{
              padding: "15px 80px",
              border: "none",
              fontSize: 24,
              borderRadius: 10,
              backgroundColor: "#008080",
              color: "white",
              alignSelf: "flex-start",
              marginTop: 25,
            }}
            onClick={createOrder}
            disabled={loading || !pay}
          >
            {loading || !pay ? <CircularProgress /> : "Pay now"}
          </button> */}
          <button
            style={{
              padding: "15px 80px",
              border: "none",
              fontSize: 24,
              borderRadius: 10,
              backgroundColor: "#008080",
              color: "white",
              alignSelf: "flex-start",
              marginTop: 25,
            }}
            onClick={loadRazorpay}
            disabled={loading}
          >
            {loading ? <CircularProgress /> : " Pay now"}
          </button>
          <br />
          <h1 style={{ color: "white", marginTop: "20px" }}>
            Apply Redeem Code Here
          </h1>
          <input
            style={{ height: "40px", width: "250px" }}
            type="text"
            id="coupon"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            required
          />
          <button
            onClick={applyCoupon}
            style={{
              marginLeft: "5px",
              padding: "5px 10px",
              border: "none",
              fontSize: 20,
              borderRadius: 10,
              backgroundColor: "#008080",
              color: "white",
              alignSelf: "flex-start",
              marginTop: 25,
            }}
          >
            Apply Coupon
          </button>
          {discountApplied && (
            <div>
              <p>Coupon applied! Discount: {discount}%</p>
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "rgba(0,0,0,0.1)",
            padding: "70px 40px",
          }}
        >
          <div>
            <h4 style={{ fontSize: 24, color: "#777" }}>
              {" "}
              You're paying, Total:
            </h4>

            <h2 style={{ fontSize: 64, fontWeight: 500, marginLeft: 20 }}>
              {discountApplied ? (
                <>
                  {Total}
                  <s style={{ fontSize: "20px" }}> {total}.00</s>
                </>
              ) : (
                <>{total}.00</>
              )}
            </h2>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 45,
            }}
          >
            <h3>Pro/{plan}</h3>
            <h3>{total}</h3>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h5 style={{ fontSize: 14, color: "#777" }}>
              Max requests - {request}
            </h5>
            <h5 style={{ fontSize: 14, color: "#777" }}>
              Max sessions - {session}
            </h5>
          </div>
          <div style={{ borderTop: "1px solid #777", marginTop: 45 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <h3 style={{ fontSize: 26, fontWeight: 500 }}>Tax</h3>
              <h3 style={{ fontSize: 26, fontWeight: 500 }}>₹ 0</h3>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <h3 style={{ fontSize: 26, fontWeight: 500 }}>Redeem Code</h3>
              <h3 style={{ fontSize: 26, fontWeight: 500 }}>{discount} %</h3>
            </div>
            {/* <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 45,
              }}
            >
              <h3 style={{ fontSize: 26, fontWeight: 500 }}>Total</h3>
              <h3 style={{ fontSize: 26, fontWeight: 500 }}>₹ {total}</h3>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

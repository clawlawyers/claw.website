import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Styles from "./Payment.module.css";
import { NODE_API_ENDPOINT } from "../utils/utils";
import CircularProgress from "@mui/material/CircularProgress";
import { load } from "@cashfreepayments/cashfree-js";

const cashfree = load({
  mode: "production", //or production
});

export default function Payment() {
  const { plan, request, session, total } = useSelector((state) => state.cart);
  const { jwt } = useSelector((state) => state.auth.user);
  const [pay, setPay] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  cashfree.then((res) => setPay(res));

  useEffect(() => {
    if (!plan) navigate("/pricing");
  }, [plan]);
  console.log(pay);
  async function createOrder() {
    console.log("called");
    try {
      setLoading(true);
      const response = await fetch(
        `${NODE_API_ENDPOINT}/payment/create-payment-order`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: total,
            plan: `PRO_${request}_${session}`,
            billingCycle: plan,
            request,
            session,
          }),
        }
      );
      const { data } = await response.json();

      pay.checkout({
        paymentSessionId: data.payment_session_id,
        returnUrl: "https://clawlaw.in",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

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
            onClick={createOrder}
            disabled={loading || !pay}
          >
            {loading || !pay ? <CircularProgress /> : "Pay now"}
          </button>
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
            <h4 style={{ fontSize: 24, color: "#777" }}> You're paying,</h4>

            <h2 style={{ fontSize: 64, fontWeight: 500, marginLeft: 20 }}>
              {total}.00
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
                marginTop: 45,
              }}
            >
              <h3 style={{ fontSize: 26, fontWeight: 500 }}>Tax</h3>
              <h3 style={{ fontSize: 26, fontWeight: 500 }}>₹ 0</h3>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 45,
              }}
            >
              <h3 style={{ fontSize: 26, fontWeight: 500 }}>Total</h3>
              <h3 style={{ fontSize: 26, fontWeight: 500 }}>₹ {total}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

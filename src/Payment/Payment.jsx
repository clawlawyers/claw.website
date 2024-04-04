import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Styles from "./Payment.module.css";
import CheckoutForm from './CheckoutForm';
import { NODE_API_ENDPOINT } from '../utils/utils';
// test api key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export default function Payment() {
    const { plan, request, session, total } = useSelector(state => state.cart);
    const navigate = useNavigate();

    const appearance = {
        theme: 'night',
        variables: {
            colorBackground: '#ffffff',
            spacingUnit: '5px',
            colorText: "black",
            colorDanger: '#df1b41',
        }
    };
    const options = {
        mode: 'payment',
        amount: total,
        currency: 'inr',
        appearance,
    };

    useEffect(() => {
        if (!plan) navigate('/pricing')
    }, [plan])

    return (
        <div style={{ width: "80%", margin: "auto", position: "relative", zIndex: 2 }}>
            <div>
                <h2>Let’s Make Payment</h2>
                <p>To start your subscription, input your card details to make payment.
                    You will be redirected to your banks authorization page . </p>
            </div>
            <div className={Styles.gridContainer}>
                <div style={{ flex: 1, paddingTop: 70, color: "black" }}>

                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>

                </div>
                <div style={{ display: "flex", flexDirection: "column", backgroundColor: "rgba(0,0,0,0.1)", padding: "70px 40px" }}>
                    <div >
                        <h4 style={{ fontSize: 24, color: "#777" }}> You're paying,</h4>

                        <h2 style={{ fontSize: 64, fontWeight: 500, marginLeft: 20 }}>{total}.00</h2>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 45 }}>
                        <h3>Pro/{plan}</h3>
                        <h3>{total}</h3>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h5 style={{ fontSize: 14, color: "#777" }}>Max requests - {request}</h5>
                        <h5 style={{ fontSize: 14, color: "#777" }}>Max sessions - {session}</h5>
                    </div>
                    <div style={{ borderTop: "1px solid #777", marginTop: 45 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 45 }}>
                            <h3 style={{ fontSize: 26, fontWeight: 500 }}>Tax</h3>
                            <h3 style={{ fontSize: 26, fontWeight: 500 }}>₹ 0</h3>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 45 }}>
                            <h3 style={{ fontSize: 26, fontWeight: 500 }}>Total</h3>
                            <h3 style={{ fontSize: 26, fontWeight: 500 }}>₹ {total}</h3>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}


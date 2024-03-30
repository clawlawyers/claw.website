import React, { useState } from 'react';
import { useSelector } from "react-redux";

import Styles from "./Payment.module.css";

export default function Payment() {
    const [cardHolderName, setCardHolderName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cardExpiry, setCardExpiry] = useState("");
    const [cardCVV, setCardCVV] = useState("");
    const [discountCode, setDiscountCode] = useState("");
    const { plan, request, session, total } = useSelector(state => state.cart);

    async function handlePayment(e) {
        e.preventDefault();
    }

    return (
        <div style={{ width: "80%", margin: "auto", position: "relative", zIndex: 2 }}>
            <div>
                <h2>Let’s Make Payment</h2>
                <p>To start your subscription, input your card details to make payment.
                    You will be redirected to your banks authorization page . </p>
            </div>
            <div className={Styles.gridContainer}>
                <div style={{ flex: 1, paddingTop: 70 }}>
                    <form onSubmit={handlePayment} style={{ display: "flex", flexDirection: "column", gap: 13 }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                            <label style={{ fontSize: 16, color: "#D4D3D3" }}>Cardholder's Name</label>
                            <CustomInput onChange={(e) => setCardHolderName(e.target.value)} value={cardHolderName} />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                            <label style={{ fontSize: 16, color: "#D4D3D3" }}>Card Number</label>
                            <CustomInput onChange={(e) => setCardNumber(e.target.value)} value={cardNumber} />

                        </div>
                        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                                <label style={{ fontSize: 16, color: "#D4D3D3" }}>Expiry</label>
                                <CustomInput onChange={(e) => setCardExpiry(e.target.value)} value={cardExpiry} />

                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                                <label style={{ fontSize: 16, color: "#D4D3D3" }}>CVV</label>
                                <CustomInput onChange={(e) => setCardCVV(e.target.value)} value={cardCVV} />
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>

                            <label style={{ fontSize: 16, color: "#D4D3D3" }}>Discount Code</label>
                            <CustomInput onChange={(e) => setDiscountCode(e.target.value)} value={discountCode} />
                        </div>

                        <button style={{ padding: "15px 80px", border: "none", fontSize: 24, borderRadius: 10, backgroundColor: "#8940FF", color: "white", alignSelf: "flex-start" }} type='submit'>Pay</button>
                    </form>
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

const CustomInput = (props) => {
    return <input style={{ height: 50, padding: 16, borderRadius: 10, outline: "none", fontSize: 23 }} {...props} />
}

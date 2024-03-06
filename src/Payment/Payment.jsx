import React, { useState } from 'react'

export default function Payment() {
    const [cardHolderName, setCardHolderName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cardExpiry, setCardExpiry] = useState("");
    const [cardCVV, setCardCVV] = useState("");
    const [discountCode, setDiscountCode] = useState("");

    async function handlePayment(e) {
        e.preventDefault();
        console.log(cardHolderName, cardNumber);
    }

    return (
        <div style={{ width: "80%", margin: "auto", position: "relative", zIndex: 2 }}>
            <div>
                <h2>Let’s Make Payment</h2>
                <p>To start your subscription, input your card details to make payment.
                    You will be redirected to your banks authorization page . </p>
            </div>
            <div style={{ display: "flex", gap: 70, flexWrap: "wrap" }}>
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
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 260 }}>
                    <div>
                        your paying
                    </div>
                    <div>
                        tax:00
                    </div>
                </div>
            </div>
        </div>
    )
}

const CustomInput = (props) => {
    return <input style={{ height: 50, padding: 16, borderRadius: 10, outline: "none", fontSize: 23 }} {...props} />
}

import React, { useState } from 'react';
import Slider from '@mui/material/Slider';

import Styles from "./Pricing.module.css";

export default function Pricing() {
    return (
        <div style={{ position: "relative", width: "100%", display: "flex", flexDirection: "column", height: "100%", zIndex: 2 }}>
            <div style={{ width: "90%", margin:"auto", flex: 1, color: "white" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 10 }}>
                    <h1 style={{ fontSize: 45, fontWeight: 800 }}>
                        Find the Perfect Pricing Option for Your Legal Needs
                    </h1>
                    <div style={{ width: "70%" }}>
                        <h5 style={{ fontSize: 25, fontWeight: 500, color: "#777" }}>
                            Explore our flexible pricing options designed to cater to a range of legal requirements. Select the plan that best fits your needs and budget.                        </h5>
                    </div>
                </div>

            </div>
            <div style={{ marginTop: 50, width: "80%", margin: "auto" }}>
                <div className={Styles.pricingContainer}>
                    <div className={Styles.first}>
                        <PricingCard
                            duration="Monthy"
                            sliderMap={monthly}

                        />
                    </div>
                    <div className={Styles.second}>
                        <PricingCard
                            duration="Yearly"
                            sliderMap={yearly}
                        />
                    </div>
                    <div className={Styles.third}>
                        <h1 style={{ color: "#008080", fontWeight: 800 }}>Enterprise</h1>
                        <button style={{ backgroundColor: "#008080", color: "white", padding: "12px 40px", borderRadius: 10, border: "none", fontSize: 27 }}>Contact us</button>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </div >
    )
}
const monthly = {
    request: {
        marks: [
            {
                value: 0,
                label: '1000'
            },
            {
                value: 25,
                label: '3000'
            },
            {
                value: 50,
                label: '5000'
            },
            {
                value: 75,
                label: '10000'
            },
            {
                value: 100,
                label: '20000'
            },

        ],
        map: { 0: 1000, 25: 3000, 50: 5000, 75: 10000, 100: 20000 }
    },
    session: {
        marks: [
            { value: 0, label: 1 },
            { value: 33, label: 2 },
            { value: 66, label: 3 },
            { value: 100, label: 4 },
        ],
        map: { 0: 1, 33: 2, 66: 3, 100: 4 }
    }
}
const yearly = {
    request: {
        marks: [
            {
                value: 0,
                label: '12000'
            },
            {
                value: 25,
                label: '36000'
            },
            {
                value: 50,
                label: '60000'
            },
            {
                value: 75,
                label: '150000'
            },
            {
                value: 100,
                label: '300000'
            },

        ],
        map: { 0: 12000, 25: 36000, 50: 60000, 75: 150000, 100: 300000 }
    },
    session: {
        marks: [
            { value: 0, label: 1 },
            { value: 33, label: 2 },
            { value: 66, label: 3 },
            { value: 100, label: 4 },
        ],
        map: { 0: 1, 33: 2, 66: 3, 100: 4 }
    }
}


const PricingCard = ({ duration, sliderMap }) => {
    const [request, setRequest] = useState();
    const [session, setSession] = useState();

    return <div style={{ border: "1px solid white", backgroundColor: "white", color: "black", borderRadius: 8, padding: 16, display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
            <h3 style={{ fontSize: 45, color: "#008080", fontWeight: 700, margin: 0 }}>{duration}</h3>
        </div>
        <div style={{ width: "80%", margin: "auto", textAlign: "center" }}>
            <div>
                <h3 style={{ fontSize: 27 }}>Request</h3>
                <Slider
                    defaultValue={0}
                    step={null}
                    style={{ color: "#008080" }}
                    marks={sliderMap.request.marks}
                    valueLabelDisplay="off"
                    onChange={(e) => setRequest(sliderMap.request.map[e.target.value])}
                />
            </div>
            <div style={{ width: "80%", margin: "auto" }}>
                <h3 style={{ fontSize: 27 }}>Users/Sessions</h3>
                <Slider
                    defaultValue={0}
                    style={{ color: "#008080" }}
                    step={null}
                    onChange={(e) => setSession(sliderMap.session.map[e.target.value])}
                    marks={sliderMap.session.marks}
                    valueLabelDisplay="off"
                />
            </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", flexDirection: "column", gap: 8 }}>
            <h5>You're paying</h5>
            <div>
                <span style={{ marginRight: 10 }}>₹</span>
                <span style={{ padding: "10px 50px", border: "1px solid #008080", borderRadius: 10 }}>{123}</span>
            </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 35 }}>
            <button style={{ padding: "16px 44px", border: "none", backgroundColor: "#008080", borderRadius: 8, color: "white", fontSize: 27 }}>
                Get it now
            </button>
        </div>
    </div>
}

// const Timer = () => {
//     const [days, setDays] = useState(0);
//     const [hours, setHours] = useState(0);
//     const [minutes, setMinutes] = useState(0);
//     const [seconds, setSeconds] = useState(0);

//     const deadline = "March, 31, 2024";

//     const getTime = () => {
//         const time = Date.parse(deadline) - Date.now();

//         setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
//         setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
//         setMinutes(Math.floor((time / 1000 / 60) % 60));
//         setSeconds(Math.floor((time / 1000) % 60));
//     }

//     useEffect(() => {
//         const interval = setInterval(() => getTime(), 1000);
//         return () => clearInterval(interval);
//     }, [])

//     return <div>
//         {days} : {hours} : {minutes} : {seconds}
//     </div>
// }
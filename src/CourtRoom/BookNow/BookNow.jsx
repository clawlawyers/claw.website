import React, { useState } from "react";
import CalendarComponent from "../../components/DateTime/Calendar";
import styles from "../BookNow/BookNow.module.css";
import image from "../../assets/images/courtroomPhoto.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { NODE_API_ENDPOINT } from "../../utils/utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookNow = () => {
  const [receipt, setReceipt] = useState(`receipt_${Date.now()}`);
  const [loading, setLoading] = useState(false);
  const [scheduledSlots, setScheduledSlots] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    record: false, // Assuming 'record' checkbox state
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  console.log(scheduledSlots);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedBookings = scheduledSlots.map((booking) => {
      // Create a new Date object to avoid mutating the original date
      let date = new Date(booking.date);

      // Add one day
      date.setDate(date.getDate() + 1);

      // Format the date
      const formattedDate = date.toISOString().split("T")[0];

      // Extract the hour from the time string
      const hour = parseInt(booking.time[0].split(":")[0], 10);

      // Return the formatted booking
      return { date: formattedDate, hour };
    });

    const bookingData = {
      phoneNumber: formData.contact,
      name: formData.name,
      email: formData.email,
      password: formData.password,
      recording: formData.record,
      slots: formattedBookings, // Add scheduledSlots to bookingData
    };
    console.log("Booking Data:", bookingData);
    loadRazorpay(bookingData);
    //TODO : backend post request
  };

  const loadRazorpay = async (bookingData) => {
    setLoading(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => {
      alert("Razorpay SDK failed to load. Are you online?");
    };
    script.onload = async () => {
      try {
        // const planeName = `${type}_${request}_${session}`;
        const result = await axios.post(
          `${NODE_API_ENDPOINT}/booking-payment/create-order`,
          {
            amount: scheduledSlots.length * 100,
            phoneNumber: formData.contact,
            currency: "INR",
            receipt: receipt,
            numberOfSlot: scheduledSlots.length,
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
              bookingData,
            };

            const result = await axios.post(
              `${NODE_API_ENDPOINT}/booking-payment/verifyPayment`,
              data
            );
            alert(result.data.status);
            navigate("/");
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

  return (
    <div className={styles.topContainer}>
      <h1
        style={{
          padding: "20px",
          fontWeight: 800,
        }}
      >
        Book your Court Room
      </h1>
      <CalendarComponent
        scheduledSlots={scheduledSlots}
        setScheduledSlots={setScheduledSlots}
      />

      <section className={styles.formContainer}>
        <img src={image} alt="" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "70%",
          }}
        >
          <form className={styles.forms} onSubmit={handleSubmit}>
            <h2>Enter your Details</h2>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <div className="relative w-[70%] bg-white/80 rounded-[10px]">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="text-black bg-transparent"
              />
              <button
                type="button"
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  border: "1px",
                  background: "none",
                  cursor: "pointer",
                  width: "fit-content",
                }}
                onClick={() =>
                  showPassword ? setShowPassword(false) : setShowPassword(true)
                }
              >
                {showPassword ? (
                  <Visibility
                    sx={{
                      color: "black",
                    }}
                  />
                ) : (
                  <VisibilityOff
                    sx={{
                      color: "black",
                    }}
                  />
                )}
              </button>
            </div>
            <input
              type="text"
              id="contact"
              name="contact"
              placeholder="Enter your contact number"
              value={formData.contact}
              onChange={handleInputChange}
              required
            />

            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                id="record"
                name="record"
                checked={formData.record}
                onChange={handleInputChange}
              />
              <label htmlFor="record">Record the CourtRoom</label>
            </div>
            <button type="submit">Proceed for Payment</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default BookNow;

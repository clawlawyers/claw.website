import React, { useState } from "react";
import CalendarComponent from "../../components/DateTime/Calendar";
import styles from "../BookNow/BookNow.module.css";
import image from "../../assets/images/courtroomPhoto.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const BookNow = () => {
  const [scheduledSlots, setScheduledSlots] = useState([]);
  const [showPassword,setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    record: false, // Assuming 'record' checkbox state
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingData = {
      ...formData,
      scheduledSlots: scheduledSlots, // Add scheduledSlots to bookingData
    };
    console.log("Booking Data:", bookingData);
    //TODO : backend post request
  };

  return (
    <div className={styles.topContainer}>
      <h1 style={{
        padding:"20px",
        fontWeight:800
      }}>Book your CourtRoom</h1>
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
            <div style={{ position: "relative" ,width:"100%"}}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
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
                  // width:"fit-content"
                }}
                onClick={() =>
                  showPassword ? setShowPassword(false) : setShowPassword(true)
                }
              >
                {showPassword?  <Visibility />:<VisibilityOff/> }
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

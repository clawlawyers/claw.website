import React, { useState } from "react";
import couponImg from "../assets/icons/coupon.png";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Modal } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Close } from "@mui/icons-material";
import { NODE_API_ENDPOINT } from "../utils/utils";
import axios from "axios";

const AddScreen = () => {
  const [paymentDialog, setPaymentDialog] = useState(false);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState(`receipt_${Date.now()}`);

  const handlePaymentDialog = () => {
    setPaymentDialog(true);
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
        const result = await axios.post(
          `${NODE_API_ENDPOINT}/payment/compain-create-order`,
          {
            amount: 99,
            currency: "INR",
            receipt: receipt,
          }
        );

        console.log(result);

        const { id, currency } = result.data.razorpayOrder;
        // const { _id } = result.data.createdOrder;

        const options = {
          key: "rzp_test_UWcqHHktRV6hxM",
          //   amount: String(amount),
          currency: currency,
          name: "CLAW LEGALTECH PRIVATE LIMITED",
          description: "Transaction",
          order_id: id,
          handler: async function (response) {
            console.log(response);
            const data = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              // _id,
              phoneNumber: phone,
            };

            console.log(response);

            const result = await axios.post(
              `${NODE_API_ENDPOINT}/payment/compain-verifyPayment`,
              data
            );
            alert(result.data.status);
            setLoading(false);
            // setPaymentVerified(true);
            console.log(result.data);
          },
          // prefill: {
          //   name: currentUser?.name,
          //   email: currentUser?.email,
          //   contact: currentUser?.phoneNumber,
          // },
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

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "#13161f",
        background: `radial-gradient(circle at 50% 0%, #018585, transparent 45rem),
      
      radial-gradient(circle at 100% 90%, #018585, transparent 15%)
      `,
        width: "100%",
      }}
    >
      <div className="h-screen w-[95%] m-auto flex flex-col justify-between">
        <div className=" grid md:grid-cols-2 items-center justify-center pt-3 gap-5 md:gap-2">
          <div className="w-full">
            <video
              className="rounded-lg"
              src="https://res.cloudinary.com/dyuov6i8c/video/upload/v1734506059/LegalGPT/sujyfh9ylpc204upafzo.mp4"
              autoPlay
              loop
              muted
              // controls
              playsInline
            />
          </div>
          <div className="w-full grid grid-cols-2 gap-2   items-center justify-center">
            <video
              className="rounded-lg"
              src="https://res.cloudinary.com/dyuov6i8c/video/upload/v1736837849/advertisementVideo/znbgaifwhet17asndf1h.mp4"
              autoPlay
              loop
              muted
              // controls
              playsInline
            />
            <video
              className="rounded-lg"
              src="https://res.cloudinary.com/dyuov6i8c/video/upload/v1736837849/advertisementVideo/qmlrslf4jl7cktpmegrj.mp4"
              autoPlay
              loop
              muted
              // controls
              playsInline
            />
            <video
              className="rounded-lg"
              src="https://res.cloudinary.com/dyuov6i8c/video/upload/v1736837849/advertisementVideo/fsdcokvkbs6ai1jma2oz.mp4"
              autoPlay
              loop
              muted
              // controls
              playsInline
            />
            <video
              className="rounded-lg"
              src="https://res.cloudinary.com/dyuov6i8c/video/upload/v1736837849/advertisementVideo/xbgdfsimi6x9mlhhntnh.mp4"
              autoPlay
              loop
              muted
              // controls
              playsInline
            />
          </div>
        </div>
        <div className=" grid md:grid-cols-2 items-center justify-center">
          <div className="flex flex-col md:flex-row  items-center gap-2">
            <p className="flex-1 text-2xl md:text-5xl font-bold text-white m-0">
              Become a Lawyer
            </p>
            <img className="w-40 md:w-56" src={couponImg} />
          </div>
          <div className="m-auto w-full flex items-center justify-center">
            <button
              onClick={handlePaymentDialog}
              style={{ border: "2px solid #05F182" }}
              className="w-full md:w-1/2 rounded-full bg-white bg-opacity-10 uppercase"
            >
              Subscribe Now
            </button>
          </div>
        </div>
        <div className="bg-[#316C66] border-t-2 border-transparent rounded-t-lg w-full flex justify-between items-center px-3 py-2">
          {/* <button className=" bg-[#12353B] rounded-full text-white py-1">
          Visit Our Website
        </button> */}
          <p className="m-0 font-bold text-white">CLAW Legaltech</p>
          <div className="flex gap-2">
            <a
              style={{ color: "white" }}
              href="https://www.instagram.com/claw__lawyers?igsh=a25qZzJkZW84anBt"
              target="_blank"
              rel="noreferrer"
            >
              <InstagramIcon />
            </a>
            <a
              style={{ color: "white" }}
              href="https://www.linkedin.com/company/claw-lawyers/"
              target="_blank"
              rel="noreferrer"
            >
              <LinkedInIcon />
            </a>
            <a
              style={{ color: "white" }}
              href="https://youtube.com/@clawlegaltech?si=iehyWC9uSmzk657K"
              target="_blank"
              rel="noreferrer"
            >
              <YouTubeIcon />
            </a>
          </div>
        </div>
        <Modal open={paymentDialog} onClose={() => setPaymentDialog(false)}>
          <div
            // className={Styles.scrollable}
            className="w-[80%] md:w-[40%]  bg-[#0b3535] border"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              // width: "60%",
              // height: "90%",
              color: "black",
              borderRadius: 10,
              padding: 10,
              transform: "translate(-50%, -50%)",
              boxShadow: 24,
            }}
          >
            <div className="w-full flex justify-between items-center">
              <p className="m-0 text-white text-xl font-semibold">
                Enter Your Details
              </p>
              <Close
                className="cursor-pointer text-white"
                onClick={() => setPaymentDialog(false)}
              />
            </div>
            <div className="flex flex-col mt-4">
              <input
                type="number"
                className="text-black focus:outline-none rounded-lg p-3"
                placeholder="Enter your Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div onClick={loadRazorpay} className="mt-2 flex justify-center">
              <button className="rounded-lg bg-transparent border">
                Proceed To Payment
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default AddScreen;

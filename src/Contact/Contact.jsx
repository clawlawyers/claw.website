import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);
  return (
    <div
      style={{
        width: "80%",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        color: "white",
      }}
    >
      <Helmet>
        <title>Contact Us</title>
        <meta
          name="description"
          content="We’re here to help! At Claw Legaltech
        , we value your time and are committed to providing prompt and effective
        assistance for all your queries and concerns."
        />
        <meta
          name="keywords"
          content="digital legal transformation, privacy policies, your, us, concerns, business law services, data-driven law, legal news insights, legal compliance, questions"
        />
      </Helmet>
      <h1 className="text-5xl font-bold">Contact Us</h1>
      <p>
        We’re here to help! At <span className="font-bold">Claw Legaltech</span>
        , we value your time and are committed to providing prompt and effective
        assistance for all your queries and concerns.
      </p>
      <h2>How to Reach Us</h2>
      <h3 className="text-xl">Email Us</h3>
      <p>For any questions or support, write to us at:</p>
      <div className="flex gap-3 items-center pb-3">
        <MailIcon />
        <p className="m-0 font-bold">claw.lawyers@gmail.com</p>
      </div>
      <h3 className="text-xl">Call Us</h3>
      <p>
        Speak with our team for assistance between{" "}
        <span className="font-bold">10 AM to 6 PM (IST):</span>
      </p>
      <div className="flex gap-3 items-center pb-3">
        <PhoneIcon />
        <p className="m-0 font-bold">+91 6352321550</p>
      </div>
      <h2>Customer Support</h2>
      <p>Our dedicated support team is ready to assist you with:</p>
      <ul>
        <li>
          <p>
            <span className="font-bold">Technical Queries:</span> Need help with
            our AI-powered tools or technical issues? We’ve got you covered.
          </p>
        </li>
        <li>
          <p>
            <span className="font-bold">Legal Queries:</span> Have questions
            about drafting, legal compliance, or our in-house consultation
            services? Reach out to our experts.
          </p>
        </li>
      </ul>
      <p>
        We’re here to ensure you have a seamless experience with our products
        and services.
      </p>
      <h2>We’d Love to Hear From You!</h2>
      <p>
        Whether it’s feedback, inquiries, or assistance, our team is just an
        email or call away. Connect with us and experience how Claw Legaltech
        can make a difference in your legal operations.
      </p>
      <h2>Office Hours:</h2>
      <p>
        Monday to Saturday: <span className="font-bold">10 AM – 6 PM</span>
      </p>
      <p className="">
        Sunday: <span className="font-bold">Closed</span>
      </p>
    </div>
  );
};

export default Contact;

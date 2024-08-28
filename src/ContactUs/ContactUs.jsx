import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Helmet } from "react-helmet";

export default function ContactUs() {
  return (
    <div
      style={{
        width: "80%",
        margin: "auto",
        zIndex: 2,
        backgroundColor: "#13161f",
        padding: 20,
        position: "inherit",
      }}
    >
      <Helmet>
        <title>Contact us!</title>
        <meta
          name="description"
          content="We welcome your questions, concerns, and feedback. Reach out using the contact information below or connect with us on social media."
        />
        {/* <meta
          name="keywords"
          content=""
        /> */}
      </Helmet>
      <h1>Contact Us</h1>
      <p>
        Thank you for choosing ClawLaw.in. We are committed to providing
        exceptional service and assistance to our users. Please feel free to
        reach out to us with any questions, concerns, or feedback you may have.
        Our dedicated team is here to help.
      </p>
      <p>
        Contact Information:
        <p>Email: Claw.lawyers@gmail.com</p>
        <p>Phone: +91 9950866260</p>
      </p>
      <p>
        Business Hours: Monday - Friday: 9:00 AM to 6:00 PM (IST) Saturday: 9:00
        AM to 1:00 PM (IST) Sunday: Closed
      </p>
      Connect With Us: Follow us on social media to stay updated on news,
      promotions, and more:
      <div>
        <a
          href="https://www.linkedin.com/company/claw-lawyers/"
          target="_blank"
          rel="noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            marginTop: 10,
            textDecoration: "none",
          }}
        >
          <LinkedInIcon />
          Linkedin
        </a>
      </div>
      <div>
        <a
          href="https://www.instagram.com/claw_lawyers/"
          target="_blank"
          rel="noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            marginTop: 10,
            textDecoration: "none",
          }}
        >
          <InstagramIcon />
          Instagram
        </a>
      </div>
      <div>
        <a
          href="http://www.twitter.com/claw_lawyers"
          target="_blank"
          rel="noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            marginTop: 10,
            textDecoration: "none",
          }}
        >
          <XIcon />X {"(Formely Twitter)"}
        </a>
      </div>
      <div>
        <a
          href="https://www.facebook.com/profile.php?id=61557181644675"
          target="_blank"
          rel="noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            marginTop: 10,
            textDecoration: "none",
          }}
        >
          <FacebookIcon />
          Facebook
        </a>
      </div>
      <h2>Customer Support:</h2>
      For assistance with your account, subscription, or any other inquiries,
      please contact our customer support team at Claw.lawyers@gmail.com or call
      us at the provided phone number during business hours.
      <p>
        Feedback: We value your feedback and use it to improve our services. If
        you have any suggestions or comments, please email us at
        Claw.lawyers@gmail.com. Your input is highly appreciated.
      </p>
      <p>
        Partnerships and Collaborations: Interested in partnering with
        ClawLaw.in? Please reach out to us via email at Claw.lawyers@gmail.com
        with details about your proposal or collaboration opportunity.
      </p>
      <p>
        Career Opportunities: Join our team! For inquiries regarding career
        opportunities or job openings, please visit our Careers page on the
        website or email us at Claw.lawyers@gmail.com.
      </p>
      <p>We look forward to hearing from you!</p>
      Sincerely, Clawlaw Team
    </div>
  );
}

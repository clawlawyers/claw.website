import React, { useEffect } from "react";

export default function ShippingPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);

  return (
    <div
      style={{
        width: "80%",
        margin: "auto",
        zIndex: 2,
        // backgroundColor: "#13161f",
        padding: 20,
        position: "inherit",
      }}
    >
      <h1 className="text-5xl font-bold">Shipping and Delivery Policy</h1>

      <p>
        At Claw Legaltech, we aim to ensure seamless access to our digital
        services and products. Since our offerings are entirely cloud-based, the
        following policy outlines the process for service activation and access.
      </p>
      <h2>1. Digital Product Delivery</h2>
      <ul>
        <li>
          <p>
            <span className="font-bold">Instant Access:</span> All our products,
            including Adira AI (AI Drafter), AI Courtroom, and LegalGPT, are
            delivered digitally. Once your subscription or membership is
            successfully processed, you will receive instant access to the
            platform.
          </p>
        </li>
        <li>
          <p>
            <span className="font-bold">Account Activation:</span> After
            completing your purchase, you will receive an email with your login
            credentials and instructions to access the services.
          </p>
        </li>
        <li>
          <p>
            <span className="font-bold">Delivery Confirmation:</span> A
            confirmation email will be sent upon successful activation of your
            account. If you do not receive this email, please check your spam
            folder or contact our support team.
          </p>
        </li>
      </ul>
      <h2>2. Accessing Services</h2>
      <ul>
        <li>
          <p>
            <span className="font-bold">Cloud-Based Platform:</span> All Claw
            Legaltech tools are available online via a secure, user-friendly
            SaaS portal. No physical delivery is required.
          </p>
        </li>
        <li>
          <p>
            <span className="font-bold">Support for Activation Issues:</span> If
            you encounter issues accessing your account or using the platform,
            our support team is available to assist you.
          </p>
        </li>
      </ul>
      <h2>3. Technical Support</h2>
      <ul>
        <li>
          <p className="text-lg font-bold">Hours of Availability:</p>
          <p>
            For any assistance, you can reach our technical support team between
            10 AM - 6 PM IST via:
          </p>
          <ul>
            <li>
              <p>
                <span className="font-bold">Email:</span>claw.lawyers@gmail.com
              </p>
            </li>
            <li>
              <p>
                <span className="font-bold">Phone:</span>+91 6352321550
              </p>
            </li>
          </ul>
        </li>
        <li>
          <p>
            <span className="font-bold text-lg">Resolution Time:</span> We aim
            to resolve all queries related to service delivery within 24-48
            business hours.
          </p>
        </li>
      </ul>
      <h2>4. Service Limitations</h2>
      <ul>
        <li>
          <p>
            <span className="font-bold">Geographical Availability:</span> Claw
            Legaltech services are currently available in India. Users outside
            India may experience restricted access or features based on regional
            compliance requirements.
          </p>
        </li>
        <li>
          <p>
            <span className="font-bold">Network Requirements:</span> To access
            our services seamlessly, ensure a stable internet connection.
          </p>
        </li>
      </ul>
      <h2>5. Refund and Cancellation</h2>
      <p>
        Please note that no refunds are offered for digital memberships. Refer
        to our Refund and Cancellation Policy for more information.
      </p>
      <h2>6. Contact Us</h2>
      <p>
        For any questions or concerns related to service delivery, please
        contact us:
      </p>
      <ul>
        <li>
          <p>
            <span className="font-bold">Email:</span> claw.lawyers@gmail.com
          </p>
        </li>
        <li>
          <p>
            <span className="font-bold">Phone:</span> +91 6352321550 (Available
            10 AM - 6 PM IST)
          </p>
        </li>
      </ul>
      <p>
        We’re committed to delivering the best experience with our digital legal
        solutions.
      </p>
    </div>
  );
}

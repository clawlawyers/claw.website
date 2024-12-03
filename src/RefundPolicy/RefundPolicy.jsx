import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

export default function RefundPolicy() {
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
      <Helmet>
        <title>Refund & Cancellation Policy</title>
        <meta
          name="description"
          content="Learn about Claw's cancellation policy and understand the circumstances under which you may be eligible for a refund."
        />
        <meta
          name="keywords"
          content="digital legal transformation, privacy policies, business law services, data-driven law, legal news insights, cancellation, about, legal compliance, AI legal solutions, contract management tools"
        />
      </Helmet>
      <h1 className="text-5xl font-bold">Refund & Cancellation Policy</h1>
      <p>
        At Claw Legaltech, we strive to provide a seamless experience with our
        services. Please review our refund and cancellation policy to understand
        the terms of your membership and subscription:
      </p>
      <h2>Refund Policy</h2>
      <ul>
        <li>
          <p className="font-bold text-lg">No Refunds:</p>
          <p>
            Claw Legaltech does not issue refunds for any memberships,
            subscriptions, or services purchased.
          </p>
        </li>
        <li>
          <p className="font-bold text-lg">
            In Case of Upgrades or Technical Issues:
          </p>
          <p>
            If there are service upgrades or technical issues, such as website
            lagging or interruptions from our side, we may offer:
          </p>
          <ul>
            <li>
              <p>Membership extensions.</p>
            </li>
            <li>
              <p>Complimentary product trials.</p>
            </li>
            <li>
              <p>Special user benefits as a goodwill gesture.</p>
            </li>
          </ul>
        </li>
      </ul>
      <p>
        These measures are provided solely at the discretion of Claw Legaltech
        and are not guaranteed.
      </p>
      <h2>Cancellation Policy</h2>
      <ul>
        <li>
          <p className="font-bold text-lg">User-Initiated Cancellation:</p>
          <p>
            Users may cancel their subscription at any time as per their
            requirements. Upon cancellation:
          </p>
          <ul>
            <li>
              <p>
                The subscription will remain active until the end of the current
                billing cycle.
              </p>
            </li>
            <li>
              <p>
                No refunds will be provided for unused time during the
                subscription period.
              </p>
            </li>
          </ul>
        </li>
        <li>
          <p className="font-bold text-lg">How to Cancel:</p>
          <p>
            To cancel your subscription, simply unsubscribe through your account
            settings on our platform.
          </p>
        </li>
      </ul>
      <h2>Contact Us</h2>
      <p>
        If you have questions about our refund and cancellation policy, please
        feel free to contact us:
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
        We appreciate your understanding and are committed to providing you with
        exceptional service.
      </p>
    </div>
  );
}

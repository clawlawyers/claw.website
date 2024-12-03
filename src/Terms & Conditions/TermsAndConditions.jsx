import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

export default function TermsAndConditions() {
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
        <title>Terms and Conditions</title>
        <meta
          name="description"
          content="A binding agreement outlining the legal rights and obligations between you and Claw."
        />
        <meta
          name="keywords"
          content="privacy policies, business law services, outlining, agreement, conditions, legal compliance, law firm automation, claw, the, legal"
        />
      </Helmet>
      <h1 className="text-5xl font-bold">Terms & Conditions</h1>
      <p>
        <span className="font-bold">Effective Date:</span> December 2, 2024
      </p>
      <p>
        Welcome to Claw Legaltech! These terms and conditions ("Terms") govern
        your access to and use of the services, products, and resources provided
        by Claw Legaltech Private Limited ("Claw Legaltech," "we," "us," or
        "our"). By accessing or using our website or services, you agree to be
        bound by these Terms. If you do not agree, you may not use our services.
      </p>
      <h2>1. Acceptance of Terms</h2>
      <p>By accessing our website or using our services, you confirm that:</p>
      <ul>
        <li>
          <p>
            You are at least 18 years old or have the legal capacity to enter
            into these Terms.
          </p>
        </li>
        <li>
          <p>You agree to comply with all applicable laws and regulations.</p>
        </li>
      </ul>
      <h2>2. Services Provided</h2>
      <p>Claw Legaltech provides AI-driven tools and services, including:</p>
      <ul>
        <li>
          <p>
            <span className="font-bold">Adira AI (AI Drafter):</span> For
            drafting, analyzing, and editing legal documents.
          </p>
        </li>
        <li>
          <p>
            <span className="font-bold">AI Courtroom:</span> For litigation
            preparation and case simulation.
          </p>
        </li>
        <li>
          <p>
            <span className="font-bold">LegalGPT:</span> For legal research and
            AI-driven query resolution.
          </p>
        </li>
      </ul>
      <p>
        The use of these tools is subject to the policies outlined in our
        Privacy Policy, Refund and Cancellation Policy, and other related
        documents.
      </p>
      <h2>3. User Responsibilities</h2>
      <p>By using our services, you agree to:</p>
      <ul>
        <li>
          <p>
            Provide accurate and complete information when creating an account
            or using our tools.
          </p>
        </li>
        <li>
          <p>Refrain from using the services for any unlawful purposes.</p>
        </li>
        <li>
          <p>
            Maintain the confidentiality of any login credentials or account
            details.
          </p>
        </li>
      </ul>
      <h3 className="text-2xl">Prohibited Activities:</h3>
      <p>You agree not to:</p>
      <ul>
        <li>
          <p>Attempt to reverse engineer, modify, or misuse our services.</p>
        </li>
        <li>
          <p>
            Share or distribute proprietary information or content obtained
            through Claw Legaltech without authorization.
          </p>
        </li>
      </ul>
      <h2>4. Payment and Subscription</h2>
      <ul>
        <li>
          <p>
            By purchasing a subscription, you agree to the pricing and billing
            terms displayed at the time of purchase.
          </p>
        </li>
        <li>
          <p>
            All payments are non-refundable, as outlined in our Refund and
            Cancellation Policy.
          </p>
        </li>
        <li>
          <p>
            Membership benefits, including extensions or trials, are subject to
            discretion in case of upgrades or technical issues from our side.
          </p>
        </li>
      </ul>
      <h2>5. Refund and Cancellation Policy</h2>
      <ul>
        <li>
          <p>
            <span className="font-bold">Refunds:</span> No refunds are issued
            for memberships or subscriptions.
          </p>
        </li>
        <li>
          <p>
            <span className="font-bold">Cancellation:</span> You may cancel your
            subscription at any time and unsubscribe through your account
            settings.
          </p>
        </li>
      </ul>
      <p>
        Refer to our detailed Refund and Cancellation Policy for more
        information.
      </p>
      <h2>6. Privacy and Data Use</h2>
      <ul>
        <li>
          <p>
            Your personal data is handled in accordance with our Privacy Policy.
          </p>
        </li>
        <li>
          <p>
            We collect information such as names, titles, phone numbers, and
            situations to provide appropriate legal assistance and tailored
            notifications.
          </p>
        </li>
        <li>
          <p>
            Data provided through the SaaS portal may be used for marketing
            purposes but is never shared with third parties.
          </p>
        </li>
      </ul>
      <h2>7. Intellectual Property</h2>
      <p>
        All content, tools, and services provided by Claw Legaltech, including
        but not limited to text, graphics, logos, and software, are the
        exclusive property of Claw Legaltech or its licensors.
      </p>
      <ul>
        <li>
          <p>
            You are granted a non-exclusive, non-transferable license to use our
            services for lawful purposes.
          </p>
        </li>
        <li>
          <p>
            Unauthorized use, reproduction, or distribution of content is
            strictly prohibited.
          </p>
        </li>
      </ul>
      <h2>8. Limitation of Liability</h2>
      <p>Claw Legaltech shall not be held liable for:</p>
      <ul>
        <li>
          <p>
            Any indirect, incidental, or consequential damages arising from the
            use of our services.
          </p>
        </li>
        <li>
          <p>
            Loss of data, revenue, or profits due to service interruptions or
            technical issues.
          </p>
        </li>
      </ul>
      <p>Our liability is limited to the extent permitted by applicable law.</p>
      <h2>9. Dispute Resolution</h2>
      <p>
        All disputes arising out of or in connection with these Terms shall be
        resolved through arbitration in accordance with the Arbitration and
        Conciliation Act, 1996, as amended.
      </p>
      <ul>
        <li>
          <p>
            The seat and venue of arbitration shall be Ahmedabad, Gujarat, and
            the language of arbitration shall be English.
          </p>
        </li>
        <li>
          <p>
            Interim relief may be sought from courts of competent jurisdiction
            in cases of urgency.
          </p>
        </li>
      </ul>
      <h2>10. Termination</h2>
      <p>
        Claw Legaltech reserves the right to terminate your access to our
        services if you:
      </p>
      <ul>
        <li>
          <p>Violate these Terms.</p>
        </li>
        <li>
          <p>
            Engage in activities deemed harmful to Claw Legaltech or its users.
          </p>
        </li>
      </ul>
      <p>
        Upon termination, all licenses granted to you will immediately cease.
      </p>
      <h2>11. Changes to Terms</h2>
      <p>
        Claw Legaltech may update these Terms from time to time. Any changes
        will be posted on this page with an updated effective date. Your
        continued use of our services after such updates constitutes acceptance
        of the revised Terms.
      </p>
      <h2>12. Contact Us</h2>
      <p>For questions about these Terms or our services, please contact us:</p>
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
        By using Claw Legaltech’s services, you agree to these Terms and
        Conditions. If you do not agree, please discontinue use of our services.
      </p>
    </div>
  );
}

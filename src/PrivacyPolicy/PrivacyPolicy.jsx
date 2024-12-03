import { Helmet } from "react-helmet";
import "./PrivacyPolicy.module.css";
import { useEffect } from "react";

function PrivacyPolicy() {
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
        <title>Our Commitment to Your Privacy</title>
        <meta
          name="description"
          content="At Claw, we are committed to protecting the privacy of our users. This Privacy Policy explains what information we collect and how we keep it safe."
        />
        <meta
          name="keywords"
          content="commitment, your, privacy policies, to, privacy, business law services, at, explains, law firm automation, are"
        />
      </Helmet>
      <h1>Privacy Policy</h1>
      <p>
        <span className="font-bold">Effective Date:</span> December 2, 2024
      </p>
      <p>
        At Claw Legaltech Private Limited ("Claw Legaltech," "we," "us," or
        "our"), your privacy is our priority. This Privacy Policy explains how
        we collect, use, disclose, and protect the information you provide when
        interacting with our services, including our SaaS platform and AI-driven
        legal solutions.
      </p>
      <h3 className="text-2xl">1. Information We Collect</h3>
      <p>
        We collect the following types of information to provide you with the
        best possible services:
      </p>
      <h3 className="text-2xl">Features</h3>
      <ul>
        <li>
          <p className="font-bold text-lg">Personal Information:</p>
          <ul>
            <li>
              <p>Names, titles, phone numbers, and other contact details.</p>
            </li>
            <li>
              <p>
                {" "}
                Situations and case-specific information shared by clients.
              </p>
            </li>
          </ul>
        </li>
        <li>
          <p className="font-bold text-lg">Professional Information:</p>
          <ul>
            <li>
              <p>Job titles, company names, and related details.</p>
            </li>
          </ul>
        </li>
        <li>
          <p className="font-bold text-lg">Technical Data:</p>
          <ul>
            <li>
              <p>
                IP addresses, browser types, and activity logs from website
                visits or interactions with our SaaS platform.
              </p>
            </li>
          </ul>
        </li>
        <li>
          <p className="font-bold text-lg">Cookies and Tracking Data:</p>
          <ul>
            <li>
              <p>
                Information collected through cookies to enhance user
                experience.
              </p>
            </li>
          </ul>
        </li>
      </ul>
      <h3 className="text-2xl">2. How We Use Your Information</h3>
      <p>The information collected is used to:</p>
      <ul>
        <li>
          <p>Deliver personalized legal assistance and notifications.</p>
        </li>
        <li>
          <p>Recommend appropriate services and solutions.</p>
        </li>
        <li>
          <p>Improve our offerings by analyzing usage patterns.</p>
        </li>
        <li>
          <p>
            Use client-provided data for internal marketing purposes while
            maintaining confidentiality.
          </p>
        </li>
      </ul>
      <h3 className="text-2xl">3. Sharing Your Information</h3>
      <p>
        We{" "}
        <span className="font-bold">
          do not disclose your information to any third party
        </span>
        . All client data is securely stored and used solely for:
      </p>
      <ul>
        <li>
          <p>Internal purposes to improve service delivery.</p>
        </li>
        <li>
          <p>
            Marketing insights to better understand client needs (without
            external sharing).
          </p>
        </li>
      </ul>
      <h3 className="text-2xl">4. Data Security</h3>
      <p>We implement robust technical and administrative measures to:</p>
      <ul>
        <li>
          <p>Protect your information from unauthorized access.</p>
        </li>
        <li>
          <p>
            Safeguard against data breaches, ensuring the confidentiality of
            sensitive client information.
          </p>
        </li>
      </ul>
      <h3 className="text-2xl">5. Your Rights</h3>
      <p>As a user of our platform, you have the following rights:</p>
      <ul>
        <li>
          <p>
            <span className="font-bold">Access:</span> Review the personal data
            we have collected about you.
          </p>
        </li>
        <li>
          <p>
            <span className="font-bold">Correction:</span> Request corrections
            to inaccurate or incomplete information.
          </p>
        </li>
        <li>
          <p>
            <span className="font-bold">Deletion:</span> Request that your data
            be removed from our systems.
          </p>
        </li>
        <li>
          <p>
            <span className="font-bold">Restrictions:</span> Limit the ways your
            data is processed or used for marketing purposes.
          </p>
        </li>
      </ul>
      <h3 className="text-2xl">6. Changes to This Privacy Policy</h3>
      <p>
        We may update this Privacy Policy periodically. Any changes will be
        communicated through our website and will reflect the updated effective
        date.
      </p>
      <h3 className="text-2xl">7. Contact Us</h3>
      <p>
        For questions, concerns, or requests related to this Privacy Policy,
        please contact us:
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
        We are committed to addressing your privacy concerns and ensuring
        transparency in our data practices.
      </p>
      <p className="font-bold text-lg">
        By using our services, you consent to the terms outlined in this Privacy
        Policy.
      </p>
    </div>
  );
}

export default PrivacyPolicy;

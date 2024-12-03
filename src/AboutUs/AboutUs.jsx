import { Helmet } from "react-helmet";
import "./AboutUs.module.css";
import { useEffect } from "react";

function AboutUs() {
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
        <title>About Us</title>
        <meta
          name="description"
          content="Welcome to Claw Legaltech, where
        innovation meets legal excellence. At Claw, we are transforming the
        legal landscape in India by harnessing the power of cutting-edge
        technology to simplify and enhance legal operations for professionals,
        businesses, and individuals."
        />
        <meta
          name="keywords"
          content="digital legal transformation, privacy policies, business law services, data-driven law, legal news insights, cancellation, about, legal compliance, AI legal solutions, contract management tools"
        />
      </Helmet>
      <h1 className="text-5xl font-bold">About Us</h1>
      <p>
        Welcome to <span className="font-bold">Claw Legaltech</span>, where
        innovation meets legal excellence. At Claw, we are transforming the
        legal landscape in India by harnessing the power of cutting-edge
        technology to simplify and enhance legal operations for professionals,
        businesses, and individuals.
      </p>
      <h2>Who We Are</h2>
      <p>
        Founded with the mission to bridge the gap between legal expertise and
        technology, Claw Legaltech is India’s premier LegalTech company. Our
        team of visionary legal minds, tech experts, and entrepreneurs works
        relentlessly to create AI-driven solutions that empower legal
        professionals, startups, and enterprises to handle complex legal
        challenges effortlessly. We are passionate about providing tools that
        reduce time, eliminate inefficiencies, and deliver precise results –
        allowing our clients to focus on strategy and growth.
      </p>
      <h2>Our Products</h2>
      <h3 className="text-2xl">1. Adira AI (also known as AI Drafter)</h3>
      <p>
        Drafting legal documents has never been easier. Adira AI is a powerful
        generative AI tool designed to create, analyze, and edit legal documents
        in minutes. Whether it's contracts, agreements, or compliance documents,
        Adira AI ensures accuracy, efficiency, and customization for every need.
        Additionally, Adira AI offers a unique human touch, allowing users to
        connect with Claw's in-house legal team for final consultations and
        expert reviews.
      </p>
      <h3 className="text-2xl">Features</h3>
      <ul>
        <li>
          <p>Automates complex legal drafting tasks.</p>
        </li>
        <li>
          <p>Ensures compliance with Indian legal standards.</p>
        </li>
        <li>
          <p>
            Allows seamless collaboration with legal experts for final
            validation.
          </p>
        </li>
        <li>
          <p>
            Ideal for startups, SMEs, and legal professionals seeking fast,
            reliable document creation.
          </p>
        </li>
      </ul>
      <h3 className="text-2xl">2. AI Courtroom</h3>
      <p>
        Revolutionize your case preparation with AI Courtroom, India’s first
        AI-driven litigation simulator. This tool offers:
      </p>
      <ul>
        <li>
          <p>Case simulations to predict outcomes and opposing strategies.</p>
        </li>
        <li>
          <p>Judge-specific insights to strengthen arguments.</p>
        </li>
        <li>
          <p>
            Comprehensive analysis to identify gaps and refine legal research.
          </p>
        </li>
      </ul>
      <p>
        It’s your virtual partner for preparing cases with confidence and
        precision.
      </p>
      <h3 className="text-2xl">3. LegalGPT</h3>
      <p>
        Meet LegalGPT, our advanced AI-powered assistant trained on Indian legal
        frameworks. This tool is designed to:
      </p>
      <ul>
        <li>
          <p>Answer legal queries with unparalleled accuracy.</p>
        </li>
        <li>
          <p>
            Provide insights into case laws, precedents, and legal
            interpretations.
          </p>
        </li>
        <li>
          <p>
            LegalGPT is the go-to resource for fast, intelligent legal guidance.
          </p>
        </li>
      </ul>
      <p>
        It’s your virtual partner for preparing cases with confidence and
        precision.
      </p>
      <h2>Why Choose Us ?</h2>
      <ul>
        <li>
          <p>
            <span className="font-bold">Efficiency Redefined:</span> Save hours
            with tools that automate repetitive legal tasks, delivering outputs
            in minutes.
          </p>
        </li>
        <li>
          <p>
            <span className="font-bold">Unparalleled Accuracy:</span> Rely on AI
            models trained specifically for the Indian legal system.
          </p>
        </li>
        <li>
          <p>
            <span className="font-bold">Expert Support:</span> Adira AI ensures
            that users can seamlessly connect with Claw's in-house legal team
            for consultations.
          </p>
        </li>
        <li>
          <p>
            <span className="font-bold">Data Security:</span> We prioritize
            confidentiality, ensuring client data is safeguarded with
            state-of-the-art encryption.
          </p>
        </li>
        <li>
          <p>
            <span className="font-bold">Scalable Solutions:</span> Whether
            you’re a solo practitioner or a multinational corporation, our tools
            grow with your needs.
          </p>
        </li>
      </ul>
      <h2>Our Vision</h2>
      <p>
        At Claw Legaltech, we envision a future where technology becomes an
        enabler for every legal professional, bridging gaps, improving access,
        and redefining the way legal services are delivered. Our goal is to make
        legal operations smarter, faster, and more accessible to everyone.
      </p>
      <h2>Get In Touch</h2>
      <p>
        Whether you're a seasoned lawyer, a growing startup, or a large
        enterprise, Claw Legaltech has the solutions you need to succeed in
        today’s legal world. Explore our products and discover how we can make a
        difference in your legal operations.
      </p>
      <p>Let’s shape the future of law together.</p>
      <h3 className="text-2xl">Visit Our Product Pages:</h3>
      <ul>
        <li>
          <p>Adira AI (AI Drafter)</p>
        </li>
        <li>
          <p>AI Courtroom</p>
        </li>
        <li>
          <p>LegalGPT</p>
        </li>
      </ul>
    </div>
  );
}

export default AboutUs;

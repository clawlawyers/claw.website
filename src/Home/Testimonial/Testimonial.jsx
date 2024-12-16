import React from "react";
import {
  StackedCarousel,
  ResponsiveContainer,
} from "react-stacked-center-carousel";
import "./Slide.css";
import { Slide } from "./Slider";

const data = [
  {
    description:
      "The War Room is an innovation I never imagined. Practicing against Claw AI helps me refine my arguments before going to court.",
    person: "Senior Advocate",
    rating: 5,
  },
  {
    description:
      "ClawLaw made my research for moot courts so easy! LegalGPT helped me find relevant cases in minutes, and War Room improved my argumentation skills. It's a must-have for every law student.",
    person: "Law Intern",
    rating: 4.5,
  },
  {
    description:
      "I was skeptical about AI in legal practice, but ClawLaw exceeded my expectations. LegalGPT’s precision and War Room’s challenges have genuinely sharpened my courtroom strategies.",
    person: "High Court Lawyer",
    rating: 5,
  },
  {
    description:
      "Running a business means facing legal issues regularly. ClawLaw’s case search and Adira AI made it easy for me to find precedents and draft contracts without relying entirely on external counsel.",
    person: "Business Owner",
    rating: 4,
  },
  {
    description:
      "ClawLaw saved us time and money. Adira AI’s ready-made templates and document drafting tools are perfect for startups like ours!",
    person: "Startup Owner",
    rating: 4.5,
  },
  {
    description:
      "ClawLaw is my go-to platform for case preparation. LegalGPT saves me hours of research, and War Room gives me the confidence to handle tough cases.",
    person: "Junior Advocate",
    rating: 3.5,
  },
  {
    description:
      "I was looking for affordable legal advice and found it on ClawLaw. Booking a lawyer was easy, and I got the help I needed without spending a fortune.",
    person: "Common Citizen",
    rating: 3.5,
  },
  {
    description:
      "I used Adira AI to draft internship assignments, and my mentors were impressed. It’s a lifesaver for students!",
    person: "Law Intern",
    rating: 5,
  },
  {
    description:
      "ClawLaw’s tools helped me streamline the legal side of my business. The combination of AI research and real lawyer consultations is unmatched.",
    person: "Startup Owner",
    rating: 4,
  },
  {
    description:
      "War Room is a game-changer for legal professionals. It forces you to think on your feet, and Claw AI’s factual depth is incredible.",
    person: "District Court Lawyer",
    rating: 4,
  },
  {
    description:
      "As a young lawyer, ClawLaw gave me the support I needed to succeed. The combination of case search and document drafting tools is invaluable.",
    person: "Junior Advocate",
    rating: 4.5,
  },
  {
    description:
      "I consulted a lawyer through ClawLaw and got clear, actionable advice. It’s great to have affordable access to real experts.",
    person: "Common Citizen",
    rating: 3.5,
  },
  {
    description:
      "LegalGPT makes research so much faster. I use it for every internship assignment and college project.",
    person: "Law Intern",
    rating: 4,
  },
];

const TestimonialCard = () => {
  const ref = React.useRef();
  return (
    <div
      className="card"
      style={{
        background: "transparent",
        border: "none",
        display: "flex",
        alignItems: "center",
        boxShadow: "none",
      }}
    >
      <div style={{ position: "relative", width: "100%" }}>
        <ResponsiveContainer
          carouselRef={ref}
          render={(parentWidth, carouselRef) => {
            let currentVisibleSlide = 5;
            if (parentWidth <= 1440) currentVisibleSlide = 5;
            else if (parentWidth <= 1080) currentVisibleSlide = 3;
            return (
              <StackedCarousel
                ref={carouselRef}
                slideComponent={Slide}
                slideWidth={320}
                height={300}
                carouselWidth={parentWidth}
                data={data}
                maxVisibleSlide={5}
                // disableSwipe
                currentVisibleSlide={currentVisibleSlide}
                // customScales={[1, 0.85, 0.7, 0.55]}
                // transitionTime={450}
              />
            );
          }}
        />
        <svg
          className="card-button left cursor-pointer"
          onClick={() => ref.current?.goBack()}
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
        </svg>
        <svg
          className="card-button right cursor-pointer"
          onClick={() => ref.current?.goNext()}
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z" />
        </svg>
      </div>
    </div>
  );
};

export default TestimonialCard;

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
      "LegalGPT has completely changed the way I do my legal research. What used to take me hours now only takes minutes. The way it understands context and pulls up exactly what I need is incredible. Honestly, I don't know how I managed without it before.",
    person: "Senior Advocate",
    rating: 5,
  },
  {
    description:
      "I’ve been using LegalGPT for a few months now, and I’m genuinely impressed. It makes legal research feel effortless, and the time I save lets me focus more on strategy and client interactions. It’s become an indispensable part of my practice.",
    person: "Independent Lawyer",
    rating: 4.5,
  },
  {
    description:
      "LegalGPT has become my go-to tool for research. It’s almost like having a personal assistant who knows exactly where to find the information I need, fast. It’s streamlined my workflow and made legal research so much less daunting.",
    person: "Junior Associate",
    rating: 5,
  },
  {
    description:
      "As a corporate lawyer, speed and accuracy are everything. LegalGPT nails both. Drafting documents has become so much quicker, and I love how it organizes everything I need in one place. At this point, its become an essential part of my daily work.",
    person: "Corporate Lawyer",
    rating: 4,
  },
  {
    description:
      "I was amazed the first time I used LegalGPT. It quickly found all the relevant case laws and documents I needed, and the interface is super easy to use. If you're a legal professional, you need this in your toolkit.",
    person: "Legal Consultant",
    rating: 4.5,
  },
];

const TestimonialCard = () => {
  const ref = React.useRef();
  return (
    <div className="card" style={{ background: "transparent", border: "none" }}>
      <div style={{ position: "relative" }}>
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
                slideWidth={450}
                height={400}
                carouselWidth={parentWidth}
                data={data}
                maxVisibleSlide={5}
                disableSwipe
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

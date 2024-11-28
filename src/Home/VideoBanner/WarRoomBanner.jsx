import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const videoArr = [
  {
    panel: "panel1",
    src: `https://res.cloudinary.com/dyuov6i8c/video/upload/v1732692075/LegalGPT/pms6oh8e5kk957mg41df.mp4`,
  },
  {
    panel: "panel2",
    src: `https://res.cloudinary.com/dyuov6i8c/video/upload/v1732692068/LegalGPT/fjp5exromwxv6aucjhyi.mp4`,
  },
  {
    panel: "panel3",
    src: `https://res.cloudinary.com/dyuov6i8c/video/upload/v1732692047/LegalGPT/rvccuwov1ttypoofrscy.mp4`,
  },
  {
    panel: "panel4",
    src: `https://res.cloudinary.com/dyuov6i8c/video/upload/v1732692033/LegalGPT/bpmjc1zaxlv7cdevfub4.mp4`,
  },
];

const WarRoomBanner = () => {
  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center gap-3 pb-3">
        <h1 className="text-2xl font-bold m-0">WarRoom</h1>
        <div className="flex-1 w-full bg-[#00C37B] h-[2px]"></div>
      </div>
      <div className="relative p-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center rounded-lg p-3">
          {/* Accordion Section */}
          <div>
            <Accordion
              sx={{ background: "transparent" }}
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                sx={{
                  border: "1px solid rgb(23, 30, 38)",
                  borderRadius: "10px",
                  background:
                    expanded === "panel1"
                      ? "linear-gradient(90deg,#00767A,#003739)"
                      : "transparent",
                }}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography
                  sx={{ color: "white", fontSize: "1.4rem", fontWeight: "500" }}
                >
                  Getting Started with WarRoom
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ backgroundColor: "rgb(23, 30, 38)" }}>
                <Typography sx={{ color: "white" }}>
                  Dive into a Quick Free Trial of AI Powered Court Arguments and
                  Counter-Arguments
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{ background: "transparent" }}
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                sx={{
                  border: "1px solid rgb(23, 30, 38)",
                  borderRadius: "10px",
                  background:
                    expanded === "panel2"
                      ? "linear-gradient(90deg,#00767A,#003739)"
                      : "transparent",
                }}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <Typography
                  sx={{ color: "white", fontSize: "1.4rem", fontWeight: "500" }}
                >
                  Upload Your Document
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ backgroundColor: "rgb(23, 30, 38)" }}>
                <Typography sx={{ color: "white" }}>
                  Keep Your Document Handy and Get started easily with arguments
                  and counter-arguments
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{ background: "transparent" }}
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
            >
              <AccordionSummary
                sx={{
                  border: "1px solid rgb(23, 30, 38)",
                  borderRadius: "10px",
                  background:
                    expanded === "panel3"
                      ? "linear-gradient(90deg,#00767A,#003739)"
                      : "transparent",
                }}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
              >
                <Typography
                  sx={{ color: "white", fontSize: "1.4rem", fontWeight: "500" }}
                >
                  Free Trial Limit
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ backgroundColor: "rgb(23, 30, 38)" }}>
                <Typography sx={{ color: "white" }}>
                  Keep Your Arguments ready to get the most out of it in Free
                  Trial of <span className="font-bold">30 Minutes</span>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{ background: "transparent" }}
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
            >
              <AccordionSummary
                sx={{
                  border: "1px solid rgb(23, 30, 38)",
                  borderRadius: "10px",
                  background:
                    expanded === "panel4"
                      ? "linear-gradient(90deg,#00767A,#003739)"
                      : "transparent",
                }}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography
                  sx={{ color: "white", fontSize: "1.4rem", fontWeight: "500" }}
                >
                  Placing Arguments & Fighting Case
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ backgroundColor: "rgb(23, 30, 38)" }}>
                <Typography sx={{ color: "white" }}>
                  Place Your Arguments, and receive counter-arguments from War
                  Room AI
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>

          {/* Carousel Section */}
          <div className="relative p-2 w-full">
            <Slider {...settings}>
              {videoArr.map((video, index) => (
                <div key={index} className="p-2">
                  <video
                    className="rounded-lg w-full h-72 md:h-80"
                    src={video.src}
                    autoPlay
                    loop
                    muted
                    controls
                    playsInline
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="mt-8 flex flex-col md:flex-row justify-center gap-10 text-white">
          <div className="text-center">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              Want to Explore War Room?
            </h2>
            <button className="bg-gradient-to-r from-[#005F62] to-[#00DDE5] text-white py-1 px-8 md:py-2 md:px-10 border border-white rounded-lg shadow-lg hover:opacity-90 transition">
              Explore
            </button>
          </div>

          {/* dividing line  */}
          <div className="h-24 w-[2px] bg-[#00C37B] hidden md:block"></div>

          <div className="text-center">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              Unlock All Features Available
            </h2>
            <button className="bg-gradient-to-r from-[#005F62] to-[#00DDE5] text-white py-1 px-8 md:py-2 md:px-10 border border-white rounded-lg shadow-lg hover:opacity-90 transition">
              Enter Courtroom
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarRoomBanner;

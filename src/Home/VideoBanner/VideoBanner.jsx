import React, { useMemo } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import bg from "../../assets/guide/bg.gif";
import getStartedVid from "../../assets/guide/1.mp4";
import genAi from "../../assets/guide/2.mp4";
import relevantHC from "../../assets/guide/3.mp4";
import specificHC from "../../assets/guide/4.mp4";
import specificSC from "../../assets/guide/5.mp4";
import references from "../../assets/guide/6.mp4";

const videoArr = [
  { panel: "panel1", src: `${getStartedVid}` },
  { panel: "panel2", src: `${genAi}` },
  { panel: "panel3", src: `${relevantHC}` },
  { panel: "panel4", src: `${specificHC}` },
  { panel: "panel5", src: `${specificSC}` },
  { panel: "panel6", src: `${references}` },
];

const VideoBanner = () => {
  const [expanded, setExpanded] = React.useState("panel1");

  const panelVideoSrc = useMemo(() => {
    const findVideo = videoArr.find((x) => x.panel === expanded);
    return findVideo.src;
  }, [expanded]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div className="m-auto w-[80%] flex flex-col justify-center items-center pt-24 gap-10">
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-bold text-5xl md:text-[70px] m-0">Your Guide to</h1>
        <h3
          style={{
            background: "linear-gradient(rgb(0, 128, 128), rgb(0, 200, 128))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
            fontSize: "4rem",
            fontWeight: "700",
            display: "inline-block",
          }}
        >
          AI Powered Legal Research
        </h3>
      </div>
      <div className="relative  p-3">
        <div className="grid md:grid-cols-[40%_60%] gap-3 items-center rounded-lg p-3">
          <div className="w-full absolute inset-0  rounded-none h-full opacity-50">
            <img className="w-full rounded-none h-full" src={bg} />
          </div>
          <div className="">
            <Accordion
              sx={{
                background:
                  expanded === "panel1"
                    ? "linear-gradient(90deg,#00C37B,#005F62)"
                    : "transparent",
              }}
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                //   expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "1.4rem",
                    fontWeight: "500",
                  }}
                >
                  Getting Started with LegalGPT
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ backgroundColor: "rgb(23, 30, 38)" }}>
                <Typography sx={{ color: "white" }}>
                  Get to know how to put your Question / Query in LegalGPT and
                  get the results
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{
                background:
                  expanded === "panel2"
                    ? "linear-gradient(90deg,#00C37B,#005F62)"
                    : "transparent",
              }}
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                //   expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "1.4rem",
                    fontWeight: "500",
                  }}
                >
                  Generative AI Suggestions
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ backgroundColor: "rgb(23, 30, 38)" }}>
                <Typography sx={{ color: "white" }}>
                  After you start a conversation LegalGPT analyzes your question
                  and helps you with more related questions to assist you
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{
                background:
                  expanded === "panel3"
                    ? "linear-gradient(90deg,#00C37B,#005F62)"
                    : "transparent",
              }}
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
            >
              <AccordionSummary
                aria-controls="panel3bh-content"
                id="panel3bh-header"
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "1.4rem",
                    fontWeight: "500",
                  }}
                >
                  Find Relevant High Court Cases
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ backgroundColor: "rgb(23, 30, 38)" }}>
                <Typography sx={{ color: "white" }}>
                  LegalGPT also finds all the Related Cases registered in Indian
                  High Courts
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{
                background:
                  expanded === "panel4"
                    ? "linear-gradient(90deg,#00C37B,#005F62)"
                    : "transparent",
              }}
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
            >
              <AccordionSummary
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "1.4rem",
                    fontWeight: "500",
                  }}
                >
                  Choose Specific High Court
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ backgroundColor: "rgb(23, 30, 38)" }}>
                <Typography sx={{ color: "white" }}>
                  LegalGPT also allows you to choose a specific State High Court
                  according to your requirements
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{
                background:
                  expanded === "panel5"
                    ? "linear-gradient(90deg,#00C37B,#005F62)"
                    : "transparent",
              }}
              expanded={expanded === "panel5"}
              onChange={handleChange("panel5")}
            >
              <AccordionSummary
                aria-controls="panel5bh-content"
                id="panel5bh-header"
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "1.4rem",
                    fontWeight: "500",
                  }}
                >
                  Find Supreme Court Cases
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ backgroundColor: "rgb(23, 30, 38)" }}>
                <Typography sx={{ color: "white" }}>
                  LegalGPT allows you to find Relevant Registered Cases in
                  Supreme Court of India
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{
                background:
                  expanded === "panel6"
                    ? "linear-gradient(90deg,#00C37B,#005F62)"
                    : "transparent",
              }}
              expanded={expanded === "panel6"}
              onChange={handleChange("panel6")}
            >
              <AccordionSummary
                aria-controls="panel6bh-content"
                id="panel6bh-header"
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "1.4rem",
                    fontWeight: "500",
                  }}
                >
                  Find Reference Cases
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ backgroundColor: "rgb(23, 30, 38)" }}>
                <Typography sx={{ color: "white" }}>
                  LegalGPT also finds all the Relevant Reference Cases based on
                  your input
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="flex justify-center items-center p-1 rounded-lg h-fit bg-black z-20">
            <video
              className="rounded-lg"
              src={panelVideoSrc}
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoBanner;

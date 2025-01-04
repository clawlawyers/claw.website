import React, { useEffect, useMemo, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";
import MobileVideoComponent from "./MobileComponent/MobileVideoComponent";

const videoArr = [
  {
    panel: "panel1",
    src: `https://res.cloudinary.com/dyuov6i8c/video/upload/v1734506059/LegalGPT/cpuomarsotsjx9wyush7.mp4`,
  },
  {
    panel: "panel2",
    src: `https://res.cloudinary.com/dyuov6i8c/video/upload/v1734506059/LegalGPT/sujyfh9ylpc204upafzo.mp4  `,
  },
  {
    panel: "panel3",
    src: `https://res.cloudinary.com/dyuov6i8c/video/upload/v1734506059/LegalGPT/kcbmks7lus4ceelapnbi.mp4`,
  },
  {
    panel: "panel4",
    src: `https://res.cloudinary.com/dyuov6i8c/video/upload/v1734506059/LegalGPT/haknhgegyyjstktzhlsg.mp4`,
  },
  {
    panel: "panel5",
    src: `https://res.cloudinary.com/dyuov6i8c/video/upload/v1734506059/LegalGPT/sn0zhogv6rr09m403sok.mp4`,
  },
  {
    panel: "panel6",
    src: `https://res.cloudinary.com/dyuov6i8c/video/upload/v1734506059/LegalGPT/gzfcmrbdqt8afhzeinli.mp4`,
  },
];

const LegalGptBanner = () => {
  const [expanded, setExpanded] = React.useState("panel1");
  const [currentVid, setCurrentVid] = useState(null);
  // console.log(currentVid);

  // const panelVideoSrc = useMemo(() => {
  //   const findVideo = videoArr.find((x) => x.panel === expanded);
  //   if (findVideo) {
  //     return findVideo.src;
  //   }
  // }, [expanded]);

  useEffect(() => {
    // setCurrentVid(null);
    const timer = setTimeout(() => {
      const findVideo = videoArr.find((x) => x.panel === expanded);
      if (findVideo) {
        setCurrentVid(findVideo.src);
      } else {
        setCurrentVid(null);
      }
    }, 2000);

    return () => clearInterval(timer);
  }, [expanded]);

  const handleChange = (panel) => (event, isExpanded) => {
    setCurrentVid(null);
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div className="w-full">
      {/* <div className="flex w-full items-center gap-3 pb-3">
        <h1 className="text-2xl font-bold m-0 text-[15px] sm:text-2xl">
          LegalGPT
        </h1>
        <div className="flex-1 w-full bg-[#00C37B] h-[2px]"></div>
      </div> */}
      <div className="relative  p-3">
        <div className="grid md:grid-cols-[40%_60%] gap-3 items-center rounded-lg p-3">
          <div className="w-full absolute inset-0  rounded-lg h-full bg-black opacity-40">
            {/* <img className="w-full rounded-none h-full" src={bg} /> */}
          </div>
          <div className="">
            <Accordion
              sx={{
                background: "transparent",
              }}
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}>
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
                id="panel1bh-header">
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "1.4rem", // Default size for desktop
                    fontWeight: "500",
                    "@media (max-width: 600px)": {
                      fontSize: "15px", // Set size to 15px for mobile view
                    },
                  }}>
                  Getting Started with LegalGPT
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  backgroundColor: "rgb(23, 30, 38)",
                  borderRadius: "10px",
                }}>
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "1rem", // Default for desktop
                    "@media (max-width: 600px)": {
                      fontSize: "15px", // Set size to 15px for mobile view
                    },
                  }}>
                  Get to know how to put your Question / Query in LegalGPT and
                  get the results
                </Typography>
                <MobileVideoComponent currentVid={currentVid} />
              </AccordionDetails>
            </Accordion>

            <Accordion
              sx={{
                background: "transparent",
              }}
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}>
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
                id="panel2bh-header">
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "1.4rem",
                    fontWeight: "500",
                    "@media (max-width: 600px)": {
                      fontSize: "15px", // Set size to 15px for mobile view
                    },
                  }}>
                  Generative AI Suggestions
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  backgroundColor: "rgb(23, 30, 38)",
                  borderRadius: "10px",
                }}>
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "1rem", // Default for desktop
                    "@media (max-width: 600px)": {
                      fontSize: "15px", // Set size to 15px for mobile view
                    },
                  }}>
                  After you start a conversation LegalGPT analyzes your question
                  and helps you with more related questions to assist you
                </Typography>
                <MobileVideoComponent currentVid={currentVid} />
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{
                background: "transparent",
              }}
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}>
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
                id="panel3bh-header">
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "1.4rem",
                    fontWeight: "500",
                    "@media (max-width: 600px)": {
                      fontSize: "15px", // Set size to 15px for mobile view
                    },
                  }}>
                  Find Relevant High Court Cases
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  backgroundColor: "rgb(23, 30, 38)",
                  borderRadius: "10px",
                }}>
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "1rem", // Default for desktop
                    "@media (max-width: 600px)": {
                      fontSize: "15px", // Set size to 15px for mobile view
                    },
                  }}>
                  LegalGPT also finds all the Related Cases registered in Indian
                  High Courts
                </Typography>
                <MobileVideoComponent currentVid={currentVid} />
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{
                background: "transparent",
              }}
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}>
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
                id="panel4bh-header">
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "1.4rem",
                    fontWeight: "500",
                    "@media (max-width: 600px)": {
                      fontSize: "15px", // Set size to 15px for mobile view
                    },
                  }}>
                  Choose Specific High Court
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  backgroundColor: "rgb(23, 30, 38)",
                  borderRadius: "10px",
                }}>
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "1rem", // Default for desktop
                    "@media (max-width: 600px)": {
                      fontSize: "15px", // Set size to 15px for mobile view
                    },
                  }}>
                  LegalGPT also allows you to choose a specific State High Court
                  according to your requirements
                </Typography>
                <MobileVideoComponent currentVid={currentVid} />
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{
                background: "transparent",
              }}
              expanded={expanded === "panel5"}
              onChange={handleChange("panel5")}>
              <AccordionSummary
                sx={{
                  border: "1px solid rgb(23, 30, 38)",
                  borderRadius: "10px",
                  background:
                    expanded === "panel5"
                      ? "linear-gradient(90deg,#00767A,#003739)"
                      : "transparent",
                }}
                aria-controls="panel5bh-content"
                id="panel5bh-header">
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "1.4rem",
                    fontWeight: "500",
                    "@media (max-width: 600px)": {
                      fontSize: "15px", // Set size to 15px for mobile view
                    },
                  }}>
                  Find Supreme Court Cases
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  backgroundColor: "rgb(23, 30, 38)",
                  borderRadius: "10px",
                }}>
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "1rem", // Default for desktop
                    "@media (max-width: 600px)": {
                      fontSize: "15px", // Set size to 15px for mobile view
                    },
                  }}>
                  LegalGPT allows you to find Relevant Registered Cases in
                  Supreme Court of India
                </Typography>
                <MobileVideoComponent currentVid={currentVid} />
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{
                background: "transparent",
              }}
              expanded={expanded === "panel6"}
              onChange={handleChange("panel6")}>
              <AccordionSummary
                sx={{
                  border: "1px solid rgb(23, 30, 38)",
                  borderRadius: "10px",
                  background:
                    expanded === "panel6"
                      ? "linear-gradient(90deg,#00767A,#003739)"
                      : "transparent",
                }}
                aria-controls="panel6bh-content"
                id="panel6bh-header">
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "1.4rem",
                    fontWeight: "500",
                    "@media (max-width: 600px)": {
                      fontSize: "15px", // Set size to 15px for mobile view
                    },
                  }}>
                  Find Reference Cases
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  backgroundColor: "rgb(23, 30, 38)",
                  borderRadius: "10px",
                }}>
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "1rem", // Default for desktop
                    "@media (max-width: 600px)": {
                      fontSize: "15px", // Set size to 15px for mobile view
                    },
                  }}>
                  LegalGPT also finds all the Relevant Reference Cases based on
                  your input
                </Typography>
                <MobileVideoComponent currentVid={currentVid} />
              </AccordionDetails>
            </Accordion>
          </div>
          {currentVid ? (
            <div className="hidden md:flex justify-center items-center p-1 rounded-lg z-20">
              <video
                className="rounded-lg h-80"
                src={currentVid}
                // autoPlay
                // loop
                muted
                controls
                playsInline
              />
            </div>
          ) : (
            <div className="hidden h-80 md:flex justify-center items-center bg-black z-20 rounded-lg">
              <CircularProgress size={30} color="inherit" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LegalGptBanner;

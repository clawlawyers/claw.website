import React, { useEffect, useMemo, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import bg from "../../assets/guide/bg.gif";
import firstCase from "../../assets/guide/11.mp4";
import dateRange from "../../assets/guide/12.mp4";
import { CircularProgress } from "@mui/material";
import MobileVideoComponent from "./MobileComponent/MobileVideoComponent";

const videoArr = [
  {
    panel: "panel1",
    src: `https://res.cloudinary.com/dyuov6i8c/video/upload/v1731065773/LegalGPT/cjkxtpjxdu7ajuxm3spi.mp4`,
  },
  {
    panel: "panel2",
    src: `https://res.cloudinary.com/dyuov6i8c/video/upload/v1731065773/LegalGPT/wpdifk3khl1eicesftox.mp4`,
  },
];

const CaseSearchBanner = () => {
  const [expanded, setExpanded] = React.useState("panel1");
  const [currentVid, setCurrentVid] = useState(null);

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
          Case Search
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
                //   expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header">
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "1.4rem",
                    fontWeight: "500",
                    "@media (max-width: 600px)": {
                      fontSize: "15px", // Set size to 15px for mobile view
                    },
                  }}>
                  Finding Your First Case
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
                  Get to know how to put your first Query in Case Search and get
                  the optimum AI Generated Results
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
                  Set A Date Range for Case Search
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
                  Cases not exactly from the time you want it to be ? This is
                  how you select a date range for your case searches
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

export default CaseSearchBanner;

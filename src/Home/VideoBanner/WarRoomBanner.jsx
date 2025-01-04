import React, { useEffect, useMemo, useState } from "react";
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
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { WARROOM_ENDPOINT } from "../../utils/utils";
import { useSelector } from "react-redux";
import MobileVideoComponent from "./MobileComponent/MobileVideoComponent";

// const videoArr = [
//   { panel: "panel1", src: `${getStartedVid}` },
//   { panel: "panel2", src: `${genAi}` },
//   { panel: "panel3", src: `${relevantHC}` },
//   { panel: "panel4", src: `${specificHC}` },
//   { panel: "panel5", src: `${specificSC}` },
//   { panel: "panel6", src: `${references}` },
// ];
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
  const [expanded, setExpanded] = React.useState("panel1");
  const [currentVid, setCurrentVid] = useState(null);
  const currentUser = useSelector((state) => state.auth.user);
  // console.log(currentVid);

  // const panelVideoSrc = useMemo(() => {
  //   const findVideo = videoArr.find((x) => x.panel === expanded);
  //   if (findVideo) {
  //     return findVideo.src;
  //   }
  // }, [expanded]);
  const openWarrrom = () => {
    var encodedStringBtoA = btoa(JSON.stringify(currentUser));
    console.log(currentUser);
    console.log(encodedStringBtoA);
    window.open(`${WARROOM_ENDPOINT}?user=${encodedStringBtoA}`);
  };

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
          WarRoom
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
                  Getting Started with WarRoom
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
                  Dive into a Quick Free Trial of AI Powered Court Arguments and
                  Counter-Arguments
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
                  Upload Your Document
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
                  Keep Your Document Handy and Get started easily with arguments
                  and counter-arguments
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
                  Free Trial Limit
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
                  Keep Your Arguments ready to get the most out of it in Free
                  Trial of{" "}
                  <span className="text-white font-bold">30 Minutes</span>
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
                  Placing Arguments & Fighting Case
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
                  Place Your Arguments,and receive counter- arguments from War
                  Room AI
                </Typography>
                <MobileVideoComponent currentVid={currentVid} />
              </AccordionDetails>
            </Accordion>
          </div>
          {currentVid ? (
            <div className="hidden  md:flex justify-center items-center p-1 rounded-lg z-20">
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
            <div className=" hidden h-80 md:flex justify-center items-center bg-black z-20 rounded-lg">
              <CircularProgress size={30} color="inherit" />
            </div>
          )}
        </div>
        <div className="flex flex-col md:flex-row items-center  justify-center w-full gap-2">
          {/* <div className="flex justify-between items-center space-x-8 text-white"> */}
          {/* Explore War Room */}
          <div className="flex flex-col px-5 items-center">
            <p className="mb-2 text-white opacity-90 text-center text-sm:text-[15px] sm:text-xl">
              Want to Explore War Room?
            </p>

            <span
              className="py-1 font-medium no-underline border-1 border-white cursor-pointer text-[15px] rounded-md transition-transform duration-300 ease-in-out transform hover:bg-teal-600 hover:scale-105 hover:shadow-lg w-48 text-center"
              onClick={openWarrrom}
              style={{
                background: "linear-gradient(30deg, #00767A, #003739)",
              }}>
              Explore
            </span>
          </div>

          {/* Divider */}
          <div className="hidden  md:h-16 md:mx-5 md:w-px md:bg-teal-500" />

          {/* Unlock All Features */}
          <div className="flex flex-col px-5 items-center">
            <p className="mb-2 text-white opacity-90 text-center text-sm:text-[15px] sm:text-xl">
              Unlock All Features Available
            </p>

            <Link
              to="https://courtroom.clawlaw.in/"
              className=" py-1 no-underline text-white font-medium border-1 border-white rounded-md transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg w-48 text-center text-[15px] sm:text-[15px]"
              style={{
                background: "linear-gradient(90deg, #00767A, #003739)",
              }}>
              Enter Courtroom
            </Link>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default WarRoomBanner;

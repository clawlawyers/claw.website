import React, { useEffect, useMemo, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";

const videoArr = [
  {
    panel: "panel1",
    src: `https://res.cloudinary.com/dyuov6i8c/video/upload/v1733138684/LegalGPT/pjmnsagzzybxnripge2d.mp4`,
  },
  {
    panel: "panel2",
    src: `https://res.cloudinary.com/dyuov6i8c/video/upload/v1733138684/LegalGPT/ixsowecsu1ftimewqfnp.mp4`,
  },
  {
    panel: "panel3",
    src: `https://res.cloudinary.com/dyuov6i8c/video/upload/v1733138684/LegalGPT/hkzbmya4vgew7t37l8sd.mp4`,
  },
  {
    panel: "panel4",
    src: `https://res.cloudinary.com/dyuov6i8c/video/upload/v1733138684/LegalGPT/pxehpgfttv8iwszswhww.mp4`,
  },
  {
    panel: "panel5",
    src: `https://res.cloudinary.com/dyuov6i8c/video/upload/v1733138684/LegalGPT/ji3kca2dd9i9r1gfrv7p.mp4`,
  },
  {
    panel: "panel6",
    src: `https://res.cloudinary.com/dyuov6i8c/video/upload/v1733138684/LegalGPT/i3cdi1w2kumymbzr5via.mp4`,
  },
  {
    panel: "panel7",
    src: `https://res.cloudinary.com/dyuov6i8c/video/upload/v1733138684/LegalGPT/jqk36t4mvzqirekazopd.mp4`,
  },
  {
    panel: "panel8",
    src: `https://res.cloudinary.com/dyuov6i8c/video/upload/v1733287388/LegalGPT/praxwhjlyic9onznlstk.mp4`,
  },
];

const AdiraAiBanner = () => {
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
      <div className="flex w-full items-center gap-3 pb-3">
        <h1 className="text-2xl font-bold m-0">Adira AI</h1>
        <div className="flex-1 w-full bg-[#00C37B] h-[2px]"></div>
      </div>
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
                  Upload Your Document
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  backgroundColor: "rgb(23, 30, 38)",
                  borderRadius: "10px",
                }}
              >
                <Typography sx={{ color: "white" }}>
                  Have a Document Sample which needs to be transformed into
                  Legal Format Document ?
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{
                background: "transparent",
              }}
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
                  sx={{
                    color: "white",
                    fontSize: "1.4rem",
                    fontWeight: "500",
                  }}
                >
                  Create Document from Prompt
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  backgroundColor: "rgb(23, 30, 38)",
                  borderRadius: "10px",
                }}
              >
                <Typography sx={{ color: "white" }}>
                  You can also generate your desired Legal Prompt with the help
                  of Prompts
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{
                background: "transparent",
              }}
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
                  sx={{
                    color: "white",
                    fontSize: "1.4rem",
                    fontWeight: "500",
                  }}
                >
                  Select Type of Document
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  backgroundColor: "rgb(23, 30, 38)",
                  borderRadius: "10px",
                }}
              >
                <Typography sx={{ color: "white" }}>
                  You can also Generate Document from a wide range of templated
                  Legal Documents
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{
                background: "transparent",
              }}
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
                  sx={{
                    color: "white",
                    fontSize: "1.4rem",
                    fontWeight: "500",
                  }}
                >
                  Fill the Requirements
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  backgroundColor: "rgb(23, 30, 38)",
                  borderRadius: "10px",
                }}
              >
                <Typography sx={{ color: "white" }}>
                  When some details are missing from your side, Adira AI asks
                  them from you for best results
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{
                background: "transparent",
              }}
              expanded={expanded === "panel5"}
              onChange={handleChange("panel5")}
            >
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
                id="panel5bh-header"
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "1.4rem",
                    fontWeight: "500",
                  }}
                >
                  Edit / Update Document
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  backgroundColor: "rgb(23, 30, 38)",
                  borderRadius: "10px",
                }}
              >
                <Typography sx={{ color: "white" }}>
                  Once a document is generated, you have the option to edit
                  contents of document with prompt
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{
                background: "transparent",
              }}
              expanded={expanded === "panel6"}
              onChange={handleChange("panel6")}
            >
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
                id="panel6bh-header"
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "1.4rem",
                    fontWeight: "500",
                  }}
                >
                  Find Document Details
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  backgroundColor: "rgb(23, 30, 38)",
                  borderRadius: "10px",
                }}
              >
                <Typography sx={{ color: "white" }}>
                  The Query bar assists not only in editing your document but
                  also find information from in it.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{
                background: "transparent",
              }}
              expanded={expanded === "panel7"}
              onChange={handleChange("panel7")}
            >
              <AccordionSummary
                sx={{
                  border: "1px solid rgb(23, 30, 38)",
                  borderRadius: "10px",
                  background:
                    expanded === "panel7"
                      ? "linear-gradient(90deg,#00767A,#003739)"
                      : "transparent",
                }}
                aria-controls="panel7bh-content"
                id="panel7bh-header"
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "1.4rem",
                    fontWeight: "500",
                  }}
                >
                  Generate & Download Document
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  backgroundColor: "rgb(23, 30, 38)",
                  borderRadius: "10px",
                }}
              >
                <Typography sx={{ color: "white" }}>
                  At any point if you find that the document generated is
                  perfect, generate the summary and download it.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{
                background: "transparent",
              }}
              expanded={expanded === "panel8"}
              onChange={handleChange("panel8")}
            >
              <AccordionSummary
                sx={{
                  border: "1px solid rgb(23, 30, 38)",
                  borderRadius: "10px",
                  background:
                    expanded === "panel8"
                      ? "linear-gradient(90deg,#00767A,#003739)"
                      : "transparent",
                }}
                aria-controls="panel8bh-content"
                id="panel8bh-header"
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "1.4rem",
                    fontWeight: "500",
                  }}
                >
                  Chatbot
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  backgroundColor: "rgb(23, 30, 38)",
                  borderRadius: "10px",
                }}
              >
                <Typography sx={{ color: "white" }}>
                  Talk to an expert to get any queries
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
          {currentVid ? (
            <div className="flex justify-center items-center p-1 rounded-lg z-20">
              <video
                className="rounded-lg h-80"
                src={currentVid}
                autoPlay
                loop
                muted
                controls
                playsInline
              />
            </div>
          ) : (
            <div className="h-80 flex justify-center items-center bg-black z-20 rounded-lg">
              <CircularProgress size={30} color="inherit" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdiraAiBanner;

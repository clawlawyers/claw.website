import React, { useEffect, useMemo, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import bg from "../../assets/guide/bg.gif";
import firstCase from "../../assets/guide/11.mp4";
import dateRange from "../../assets/guide/12.mp4";
import { CircularProgress } from "@mui/material";

const videoArr = [
  { panel: "panel1", src: `${firstCase}` },
  { panel: "panel2", src: `${dateRange}` },
];



const pannel_array =[{
heading:"Upload Your Document",
description:"Have a Document Sample which needs to be transformed into Legal Format Document ?"

},
{
heading:"Create Document from Prompt",
description:"You can also generate your desired Legal Prompt with the help of Prompts"
},
{
heading:"Select Type of Document",
description:"You can also Generate Document from a wide range of templated Legal Documents"

},

{
heading:"Fill the Requirements",
description:"When some details are missing from your side, Adira AI asks them from you for best results"

},
{
heading:"Edit / Update Document",
description:"Once a document is generated, you have the option to edit contents of document with prompt"

},
{
heading:"Find Document Details",
description:"The Query bar assists not only in editing your document but also find information from in it."

},
{
heading:"Generate & Download Document",
description:"At any point if you find that the document generated is perfect, generate the summary and download it."

},
]

const AdiraAiBanner = () => {
  const [expanded, setExpanded] = React.useState("panel1");
  const [currentVid, setCurrentVid] = useState(null);

  // const panelVideoSrc = useMemo(() => {
  //   const findVideo = videoArr.find((x) => x.panel === expanded);
  //   if (findVideo) {
  //     return findVideo.src;
  //   }
  // }, [expanded]);

  useEffect(() => {
    setCurrentVid(null);
    const findVideo = videoArr.find((x) => x.panel === expanded);
    if (findVideo) {
      setCurrentVid(findVideo.src);
    } else {
      setCurrentVid(null);
    }
  }, [expanded]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div className="">
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
            {pannel_array.map((e,i)=>( <Accordion
              sx={{
                background: "transparent",
              }}
              key={i}
              expanded={expanded === `panel${i+1}`}
              onChange={handleChange(`panel${i+1}`)}
            >
              <AccordionSummary 
                sx={{
                  border: "1px solid rgb(23, 30, 38)",
                  borderRadius: "10px",
                  background:
                    expanded === `panel${i+1}`
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
{e.heading}             
   </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ backgroundColor: "rgb(23, 30, 38)" }}>
                <Typography sx={{ color: "white" }}>
                {e.description}    
                </Typography>
              </AccordionDetails>
            </Accordion>))}
          
         
          </div>
          {currentVid ? (
            <div className="flex justify-center items-center p-1 rounded-lg h-fit bg-black z-20">
              <video
                className="rounded-lg"
                src={currentVid}
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          ) : (
            <div className="h-60 flex justify-center items-center bg-black z-20 rounded-lg">
              <CircularProgress size={30} color="inherit" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdiraAiBanner;

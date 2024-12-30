import React, { useEffect, useState } from "react";

const videoArrDetails = [
  {
    type: "LegalGPT",
    typeArr: [
      {
        name: " Getting Started with LegalGPT",
        details:
          " Get to know how to put your Question / Query in LegalGPT and get the results",
        videoSrc:
          "https://res.cloudinary.com/dyuov6i8c/video/upload/v1734506059/LegalGPT/cpuomarsotsjx9wyush7.mp4",
      },
      {
        name: " Generative AI Suggestions",
        details:
          " After you start a conversation LegalGPT analyzes your question and helps you with more related questions to assist you.",
        videoSrc:
          "https://res.cloudinary.com/dyuov6i8c/video/upload/v1734506059/LegalGPT/sujyfh9ylpc204upafzo.mp4 ",
      },
      {
        name: " Find Relevant High Court Cases",
        details:
          " LegalGPT also finds all the Related Cases registered in Indian High Courts.",
        videoSrc:
          "https://res.cloudinary.com/dyuov6i8c/video/upload/v1734506059/LegalGPT/kcbmks7lus4ceelapnbi.mp4",
      },
      {
        name: " Choose Specific High Court",
        details:
          " LegalGPT also allows you to choose a specific State High Court according to your requirements.",
        videoSrc:
          "https://res.cloudinary.com/dyuov6i8c/video/upload/v1734506059/LegalGPT/haknhgegyyjstktzhlsg.mp4",
      },
      {
        name: "  Find Supreme Court Cases",
        details:
          " LegalGPT allows you to find Relevant Registered Cases in Supreme Court of India.",
        videoSrc:
          "https://res.cloudinary.com/dyuov6i8c/video/upload/v1734506059/LegalGPT/sn0zhogv6rr09m403sok.mp4",
      },
      {
        name: "  Find Reference Cases",
        details:
          "  LegalGPT also finds all the Relevant Reference Cases based on your input.",
        videoSrc:
          "https://res.cloudinary.com/dyuov6i8c/video/upload/v1734506059/LegalGPT/gzfcmrbdqt8afhzeinli.mp4",
      },
    ],
  },
  {
    type: " Case Search",
    typeArr: [
      {
        name: "  Finding Your First Case",
        details:
          "  Get to know how to put your first Query in Case Search and get the optimum AI Generated Results.",
        videoSrc:
          "https://res.cloudinary.com/dyuov6i8c/video/upload/v1731065773/LegalGPT/cjkxtpjxdu7ajuxm3spi.mp4",
      },
      {
        name: " Set A Date Range for Case Search",
        details:
          "Cases not exactly from the time you want it to be ? This is how you select a date range for your case searches",
        videoSrc:
          "https://res.cloudinary.com/dyuov6i8c/video/upload/v1731065773/LegalGPT/wpdifk3khl1eicesftox.mp4",
      },
    ],
  },
  {
    type: " WarRoom",
    typeArr: [
      {
        name: " Getting Started with WarRoom",
        details:
          " Dive into a Quick Free Trial of AI Powered Court Arguments and Counter-Arguments.",
        videoSrc:
          "https://res.cloudinary.com/dyuov6i8c/video/upload/v1732692075/LegalGPT/pms6oh8e5kk957mg41df.mp4",
      },
      {
        name: "Upload Your Document",
        details:
          " Keep Your Document Handy and Get started easily with arguments and counter-arguments",
        videoSrc:
          "https://res.cloudinary.com/dyuov6i8c/video/upload/v1732692068/LegalGPT/fjp5exromwxv6aucjhyi.mp4",
      },
      {
        name: "Free Trial Limit",
        details:
          " Keep Your Arguments ready to get the most out of it in Free Trial of 30 Minutes.",
        videoSrc:
          "https://res.cloudinary.com/dyuov6i8c/video/upload/v1732692047/LegalGPT/rvccuwov1ttypoofrscy.mp4",
      },
      {
        name: " Placing Arguments & Fighting Case",
        details:
          " Place Your Arguments,and receive counter- arguments from War Room AI.",
        videoSrc:
          "https://res.cloudinary.com/dyuov6i8c/video/upload/v1732692033/LegalGPT/bpmjc1zaxlv7cdevfub4.mp4",
      },
    ],
  },
  {
    type: " Adira AI",
    typeArr: [
      {
        name: " Upload Your Document",
        details:
          " Have a Document Sample which needs to be transformed into Legal Format Document ?",
        videoSrc:
          "https://res.cloudinary.com/dyuov6i8c/video/upload/v1733138684/LegalGPT/pjmnsagzzybxnripge2d.mp4",
      },
      {
        name: " Create Document from Prompt",
        details:
          " You can also generate your desired Legal Prompt with the help of Prompts.",
        videoSrc:
          "https://res.cloudinary.com/dyuov6i8c/video/upload/v1733138684/LegalGPT/ixsowecsu1ftimewqfnp.mp4",
      },
      {
        name: " Select Type of Document",
        details:
          " You can also Generate Document from a wide range of templated Legal Documents.",
        videoSrc:
          "https://res.cloudinary.com/dyuov6i8c/video/upload/v1733138684/LegalGPT/hkzbmya4vgew7t37l8sd.mp4",
      },
      {
        name: " Fill the Requirements",
        details:
          "  When some details are missing from your side, Adira AI asks them from you for best results.",
        videoSrc:
          "https://res.cloudinary.com/dyuov6i8c/video/upload/v1733138684/LegalGPT/pxehpgfttv8iwszswhww.mp4",
      },
      {
        name: " Edit / Update Document",
        details:
          " Once a document is generated, you have the option to edit contents of document with prompt.",
        videoSrc:
          "https://res.cloudinary.com/dyuov6i8c/video/upload/v1733138684/LegalGPT/ji3kca2dd9i9r1gfrv7p.mp4",
      },
      {
        name: " Find Document Details",
        details:
          " The Query bar assists not only in editing your document but also find information from in it.",
        videoSrc:
          "https://res.cloudinary.com/dyuov6i8c/video/upload/v1733138684/LegalGPT/i3cdi1w2kumymbzr5via.mp4",
      },
      {
        name: "  Generate & Download Document",
        details:
          " At any point if you find that the document generated is perfect, generate the summary and download it.",
        videoSrc:
          "https://res.cloudinary.com/dyuov6i8c/video/upload/v1733138684/LegalGPT/jqk36t4mvzqirekazopd.mp4",
      },
      {
        name: "   Chatbot",
        details: "   Talk to an expert to get any queries.",
        videoSrc:
          "https://res.cloudinary.com/dyuov6i8c/video/upload/v1733287388/LegalGPT/praxwhjlyic9onznlstk.mp4",
      },
    ],
  },
];

const VideoBanner = () => {
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const [activeVideoIndex, setActiveVideoIndex] = useState([
    videoArrDetails[activeButtonIndex].typeArr[0],
  ]);

  useEffect(() => {
    setActiveVideoIndex([videoArrDetails[activeButtonIndex].typeArr[0]]);
  }, [activeButtonIndex]);

  return (
    <div id="videoBanner" className="pt-20 w-[80%] m-auto flex flex-col gap-3">
      <div className="flex flex-wrap justify-center gap-3">
        {videoArrDetails.map((x, index) => (
          <button
            onClick={() => setActiveButtonIndex(index)}
            className={`w-[26rem] border-2 rounded-lg px-4 py-2 hover:bg-white hover:bg-opacity-25 ${
              activeButtonIndex === index ? "bg-[#018585] border-[#0bc6c6]" : ""
            }`}
            key={index}>
            {x.type.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="border-2 rounded-lg p-2 flex flex-col gap-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {videoArrDetails[activeButtonIndex].typeArr.map((x, index) => (
            <div
              onClick={() => setActiveVideoIndex([x])}
              key={index}
              className={`w-full flex text-center px-1 justify-center items-center border rounded-lg cursor-pointer hover:bg-white hover:bg-opacity-25 ${
                activeVideoIndex[0].name === x.name
                  ? "bg-white bg-opacity-25"
                  : ""
              }`}>
              <p className="m-0 text-center py-2">{x.name}</p>
            </div>
          ))}
        </div>
        <div className="bg-black bg-opacity-25 rounded-lg p-3 flex flex-col md:flex-row gap-4">
          {activeVideoIndex.map((x, index) => (
            <div
              key={index}
              className="flex flex-col md:grid md:grid-cols-2 md:gap-4">
              <div className="mb-2 md:mb-0">
                {/* Text Content */}
                <p>{x.details}</p>
              </div>
              <div className="bg-black rounded-lg h-80">
                {/* Video Content */}
                <video
                  className="rounded-lg h-80 w-full"
                  src={x.videoSrc}
                  autoPlay
                  loop
                  muted
                  controls
                  playsInline
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoBanner;

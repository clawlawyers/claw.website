import React from "react";

import { CollapsedCard } from "./components/CollapsedNewsCard";
import news1 from "../assets/images/news1.png";
import news2 from "../assets/images/news2.png";
import news3 from "../assets/images/news3.png";
import news4 from "../assets/images/news4.png";
import news5 from "../assets/images/news5.png";
import news6 from "../assets/images/news6.png";
import news7 from "../assets/images/news7.png";
import news8 from "../assets/images/news8.png";
import news9 from "../assets/images/news9.png";
import news10 from "../assets/images/news10.png";
import news11 from "../assets/images/news11.png";

import { ExpandedCard } from "./components/ExpandedNewsCard";

const newsData = [
  {
    heading: "Where to Watch 'John Wick: Chapter 4'",
    subHeading:
      "There's been no official announcement regarding john wick Chapter 4's streaming release. However given its a liongaze film john wick chapter 4's wll eventully be realesed on sytarz",
    image: news1,
  },
  {
    heading: "Where to Watch 'John Wick: Chapter 4'",
    subHeading:
      "There's been no official announcement regarding john wick Chapter 4's streaming release. However given its a liongaze film john wick chapter 4's wll eventully be realesed on sytarz",
    image: news2,
  },
  {
    heading: "Where to Watch 'John Wick: Chapter 4'",
    subHeading:
      "There's been no official announcement regarding john wick Chapter 4's streaming release. However given its a liongaze film john wick chapter 4's wll eventully be realesed on sytarz",
    image: news3,
  },
  {
    heading: "Where to Watch 'John Wick: Chapter 4'",
    subHeading:
      "There's been no official announcement regarding john wick Chapter 4's streaming release. However given its a liongaze film john wick chapter 4's wll eventully be realesed on sytarz",
    image: news4,
  },
  {
    heading: "Where to Watch 'John Wick: Chapter 4'",
    subHeading:
      "There's been no official announcement regarding john wick Chapter 4's streaming release. However given its a liongaze film john wick chapter 4's wll eventully be realesed on sytarz",
    image: news5,
  },
  {
    heading: "Where to Watch 'John Wick: Chapter 4'",
    subHeading: "",
    image: news6,
  },
  {
    heading: "Where to Watch 'John Wick: Chapter 4'",
    subHeading: "",
    image: news7,
  },
  {
    heading: "Where to Watch 'John Wick: Chapter 4'",
    subHeading:
      "There's been no official announcement regarding john wick Chapter 4's streaming release. However given its a liongaze film john wick chapter 4's wll eventully be realesed on sytarz",
    image: news8,
  },
  {
    heading: "Where to Watch 'John Wick: Chapter 4'",
    subHeading:
      "There's been no official announcement regarding john wick Chapter 4's streaming release. However given its a liongaze film john wick chapter 4's wll eventully be realesed on sytarz",
    image: news9,
  },
  {
    heading: "Where to Watch 'John Wick: Chapter 4'",
    subHeading:
      "There's been no official announcement regarding john wick Chapter 4's streaming release. However given its a liongaze film john wick chapter 4's wll eventully be realesed on sytarz",
    image: news10,
  },
  {
    heading: "Where to Watch 'John Wick: Chapter 4'",
    subHeading:
      "There's been no official announcement regarding john wick Chapter 4's streaming release. However given its a liongaze film john wick chapter 4's wll eventully be realesed on sytarz",
    image: news11,
  },
];

const sectionData = [
  { title: "Latest News", newsIndexes: [0, 1, 2, 3] },
  { title: "Must Read", newsIndexes: [4], additionalContent: [news4, [5, 6]] },
  { title: "Legal News", newsIndexes: [7, 8, 9, 10] },
];

async function latestNewsResource() {
  try {
  } catch (error) {}
}

export default function News() {
  const mainHeading = newsData[0].heading;
  const mainSubHeading = newsData[0].subHeading;

  return (
    <div style={{ position: "inherit", zIndex: 2, marginLeft: "76px" }}>
      <ExpandedCard heading={mainHeading} subHeading={mainSubHeading} />
      {sectionData.map((section, index) => (
        <div key={index}>
          <div
            style={{ fontSize: "35px", fontWeight: "bold", marginTop: "50px" }}
          >
            {section.title}
          </div>
          <div style={{ display: "flex", marginTop: "25px" }}>
            {section.newsIndexes.map((newsIndex, subIndex) => (
              <CollapsedCard
                key={subIndex}
                heading={newsData[newsIndex].heading}
                subHeading={newsData[newsIndex].subHeading}
                image={newsData[newsIndex].image}
              />
            ))}
            {section.additionalContent &&
              section.additionalContent.map((content, contentIndex) =>
                Array.isArray(content) ? (
                  <div
                    key={contentIndex}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "20px",
                    }}
                  >
                    {content.map((nestedIndex, nestedSubIndex) => (
                      <CollapsedCard
                        key={nestedSubIndex}
                        heading={newsData[nestedIndex].heading}
                        image={newsData[nestedIndex].image}
                      />
                    ))}
                  </div>
                ) : (
                  <img
                    key={contentIndex}
                    src={content}
                    style={{
                      width: "555px",
                      height: "454px",
                      marginLeft: "5px",
                    }}
                    alt=""
                  />
                )
              )}
          </div>
        </div>
      ))}
    </div>
  );
}

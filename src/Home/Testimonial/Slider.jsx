import React from "react";
import { StackedCarouselSlideProps } from "react-stacked-center-carousel";
import "./Slide.css";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

export const Slide = React.memo(function (StackedCarouselSlideProps) {
  const { data, dataIndex, isCenterSlide, swipeTo, slideIndex } =
    StackedCarouselSlideProps;

  return (
    <div className="card-card" draggable={false}>
      <div className={`cover fill ${isCenterSlide ? "off" : "on"}`}>
        <div
          className="card-overlay fill"
          onClick={() => {
            if (!isCenterSlide) swipeTo(slideIndex);
          }}
        />
      </div>
      <div
        className="p-2 h-72 w-full flex flex-col rounded border-2 border-white"
        style={{
          background: "linear-gradient(90deg, #1f2329, #171e26 40%)",
        }}>
        <div className="grid grid-cols-2 ">
          <div className="flex flex-col gap-1 p-2">
            {/* <h5 className="m-0 text-white font-bold">Aditya Goel</h5> */}
            <p className="m-0 text-[15px] sm:text-lg text-white">
              {data[dataIndex].person}
            </p>
          </div>
          <div className="flex justify-end items-end p-2">
            <Stack spacing={1}>
              {/* <Rating name="half-rating" defaultValue={2.5} precision={0.5} /> */}
              <Rating
                name="half-rating-read"
                defaultValue={data[dataIndex].rating}
                precision={0.5}
                readOnly
              />
            </Stack>
          </div>
        </div>
        <hr
          style={{
            margin: "2px",
            height: "0px",
            border: "none",
            borderTop: "2px solid white",
          }}
        />
        <div className="flex justify-center items-center w-full h-full sm:w-3/4 sm:h-3/4 md:w-full md:h-full">
          <div className="px-3 italic font-semibold text-white text-[8px] sm:text-xs md:text-base">
            <p>" {data[dataIndex].description} "</p>
          </div>
        </div>
      </div>
    </div>
  );
});

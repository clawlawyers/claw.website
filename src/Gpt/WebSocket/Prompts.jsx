import { CircularProgress } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const Prompts = () => {
  const promptsArr = useSelector((state) => state.prompt.prompts);
  const promptLoading = useSelector((state) => state.prompt.loading);

  return (
    <div>
      {promptsArr.map((x, index) => (
        <p key={index}>{x.text ? x.text : <CircularProgress />}</p>
      ))}
    </div>
  );
};

export default Prompts;

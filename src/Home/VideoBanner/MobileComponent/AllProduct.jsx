import React, { useEffect, useState } from "react";
import LegalIcon from "../../../assets/Legalgpticon.png";
import AdiraAi from "../../../assets/adiraai.png";
import CaseSearch from "../../../assets/casesearch.png";
import CasePrediction from "../../../assets/caseprediction.png";
import Warroom from "../../../assets/warroom.png";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

import { activePlanFeatures } from "../../../utils/checkActivePlanFeatures";
import {
  ADIRA_ENDPOINT,
  WARROOM_ENDPOINT,
  LEGALGPT_ENDPOINT1,
  CASE_SEARCH,
} from "../../../utils/utils";

import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const allproduct = () => {
  const [activePlan, setActivePlan] = useState([]);
  const { plan } = useSelector((state) => state.gpt);
  console.log(plan);
  const currentUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const openAdiraAi = () => {
    var encodedStringBtoA = btoa(JSON.stringify(currentUser));
    console.log(currentUser);
    console.log(encodedStringBtoA);
    window.open(`${ADIRA_ENDPOINT}/?user=${encodedStringBtoA}`);
  };

  const openWarrrom = () => {
    var encodedStringBtoA = btoa(JSON.stringify(currentUser));
    console.log(currentUser);
    console.log(encodedStringBtoA);
    window.open(`${WARROOM_ENDPOINT}?user=${encodedStringBtoA}`);
  };

  const openCaseSearch = () => {
    var encodedStringBtoA = btoa(JSON.stringify(currentUser));
    console.log(currentUser);
    console.log(encodedStringBtoA);
    window.open(`${CASE_SEARCH}?user=${encodedStringBtoA}`);
  };

  const openLegalGpt = () => {
    const reqdObj = {
      token: currentUser.jwt,
    };

    console.log(reqdObj);

    const encodedStringBtoA = btoa(JSON.stringify(reqdObj));
    window.open(`${LEGALGPT_ENDPOINT1}?user=${encodedStringBtoA}`, "_self");
  };

  useEffect(() => {
    if (plan) {
      setActivePlan(activePlanFeatures(plan, "AICaseSearchAccess"));
    }
  }, [plan]);

  const handleCasePrediction = () => {
    toast("Coming Soon!");
  };

  return (
    <div className=" flex items-center mt-8 justify-center ">
      <div className="w-[80%] grid grid-cols-3 sm:grid-cols-2 items-center gap-6 md:grid-cols-3 lg:grid-cols-5 ">
        {currentUser ? (
          <div
            className="bg-[rgba(0,128,128,0.2)] border-2 border-[#00C37B] sm:pt-4 rounded-lg flex flex-col items-center justify-between shadow-lg cursor-pointer transition-all hover:scale-95 duration-300 w-[100px] h-[110px] sm:w-52 sm:h-52 "
            onClick={openLegalGpt}>
            <img
              src={LegalIcon}
              alt="Legal Icon"
              className="w-8 h-12 pt-4 sm:pt:0  sm:w-16 sm:h-20"
            />
            <h3 className="text-[12px] sm:text-lg text-white font-semibold text-center ">
              LegalGPT
            </h3>
            <div className="w-full bg-[#00C37B] text-center text-[10px] sm:text-lg rounded-b-md text-white font-bold">
              FREE
            </div>
          </div>
        ) : (
          <div
            className="bg-[rgba(0,128,128,0.2)] border-2 border-[#00C37B] sm:pt-4 rounded-lg flex flex-col items-center justify-between shadow-lg cursor-pointer transition-all hover:scale-95 duration-300 w-[100px] h-[110px] sm:w-52 sm:h-52 "
            onClick={() => navigate("/login")}>
            <img
              src={LegalIcon}
              alt="Legal Icon"
              className="w-8 h-12 pt-4 sm:pt:0  sm:w-16 sm:h-20"
            />
            <h3 className="text-[12px] sm:text-lg text-white font-semibold text-center ">
              LegalGPT
            </h3>
            <div className="w-full bg-[#00C37B] text-center text-[10px] sm:text-lg rounded-b-md text-white font-bold">
              FREE
            </div>
          </div>
        )}
        {currentUser ? (
          <div
            className="bg-[rgba(0,128,128,0.2)] border-2 border-[#00C37B] sm:pt-6 rounded-lg flex flex-col items-center justify-between shadow-lg cursor-pointer transition-all hover:scale-95 duration-300 mx-1 w-[100px] h-[110px] sm:w-52 sm:h-52 "
            onClick={openCaseSearch}>
            <img
              src={CaseSearch}
              alt="Case Search Icon"
              className="w-8 h-12  pt-4 sm:pt:0  sm:w-16 sm:h-20"
            />

            <h3 className="text-[12px] sm:text-lg text-white font-semibold text-center ">
              Case Search
            </h3>
            <div className="w-full bg-[#00C37B] text-center text-[10px] sm:text-lg  rounded-b-md text-white font-bold">
              FREE
            </div>
          </div>
        ) : (
          <div
            className="bg-[rgba(0,128,128,0.2)] border-2 border-[#00C37B] sm:pt-6 rounded-lg flex flex-col items-center justify-between shadow-lg cursor-pointer transition-all hover:scale-95 duration-300 mx-1 w-[100px] h-[110px] sm:w-52 sm:h-52 "
            onClick={() => navigate("/login")}>
            <img
              src={CaseSearch}
              alt="Case Search Icon"
              className="w-8 h-12  pt-4 sm:pt:0  sm:w-16 sm:h-20"
            />

            <h3 className="text-[12px] sm:text-lg text-white font-semibold text-center ">
              Case Search
            </h3>
            <div className="w-full bg-[#00C37B] text-center text-[10px] sm:text-lg  rounded-b-md text-white font-bold">
              FREE
            </div>
          </div>
        )}
        {currentUser ? (
          <div
            className="bg-[rgba(0,128,128,0.2)] border-2 mx-1 border-green-400 hover:scale-95 cursor-pointer transition-all duration-300 text-green-400 rounded-lg flex flex-col items-center justify-center  sm:pt-5 shadow-lg w-[100px] h-[110px]  sm:w-52 sm:h-52"
            onClick={openAdiraAi}>
            <img
              src={AdiraAi}
              className="w-8 pt-4  h-12 sm:pt-0  sm:w-16 sm:h-16 mb-2"
            />
            <h2 className="text-[12px] sm:text-lg mt-2 text-white font-semibold  text-center">
              Adira AI
            </h2>
          </div>
        ) : (
          <div
            className="bg-[rgba(0,128,128,0.2)] border-2 mx-1 border-green-400 hover:scale-95 cursor-pointer transition-all duration-300 text-green-400 rounded-lg flex flex-col items-center justify-center  sm:pt-5 shadow-lg w-[100px] h-[110px]  sm:w-52 sm:h-52"
            onClick={() => navigate("/login")}>
            <img
              src={AdiraAi}
              className="w-8 pt-4  h-12 sm:pt-0  sm:w-16 sm:h-16 mb-2"
            />
            <h2 className="text-[12px] sm:text-lg mt-2 text-white font-semibold  text-center">
              Adira AI
            </h2>
          </div>
        )}
        {currentUser ? (
          <div
            className="bg-[rgba(0,128,128,0.2)] border-2 border-[#00C37B] sm:pt-6 rounded-lg flex flex-col items-center justify-between shadow-lg cursor-pointer transition-all hover:scale-95 duration-300 sm:mx-1 ml-12 mr-4 w-[100px] h-[110px] sm:w-52 sm:h-52 "
            onClick={openWarrrom}>
            <img
              src={Warroom}
              alt="Case Search Icon"
              className="w-8 h-12  pt-4 sm:pt:0  sm:w-16 sm:h-20"
            />

            <h3 className="text-[12px] sm:text-lg text-white font-semibold text-center ">
              War Room
            </h3>
            <div className="w-full bg-[#00C37B] text-center text-[10px] sm:text-lg  rounded-b-md text-white font-bold">
              FREE
            </div>
          </div>
        ) : (
          <div
            className="bg-[rgba(0,128,128,0.2)] border-2 border-[#00C37B] sm:pt-6 rounded-lg flex flex-col items-center justify-between shadow-lg cursor-pointer transition-all hover:scale-95 duration-300 sm:mx-1 ml-12 mr-4 w-[100px] h-[110px] sm:w-52 sm:h-52 "
            onClick={() => navigate("/login")}>
            <img
              src={Warroom}
              alt="Case Search Icon"
              className="w-8 h-12  pt-4 sm:pt:0  sm:w-16 sm:h-20"
            />

            <h3 className="text-[12px] sm:text-lg text-white font-semibold text-center ">
              War Room
            </h3>
            <div className="w-full bg-[#00C37B] text-center text-[10px] sm:text-lg  rounded-b-md text-white font-bold">
              FREE
            </div>
          </div>
        )}
        {currentUser ? (
          <div
            onClick={handleCasePrediction}
            className="bg-[rgba(0,128,128,0.2)] border-2 border-[#00C37B] sm:pt-6 rounded-lg flex flex-col items-center justify-between shadow-lg cursor-pointer transition-all hover:scale-95 duration-300 sm:mx-1 ml-12 mr-4 w-[100px] h-[110px] sm:w-52 sm:h-52 ">
            <img
              src={CasePrediction}
              className="w-8 h-12  pt-4 sm:pt:0  sm:w-16 sm:h-20"
            />
            <h2 className="text-[12px] sm:text-lg text-white font-semibold  text-center">
              Case Prediction
            </h2>
            <div className="w-full bg-[#00C37B] text-center text-[10px] sm:text-lg  rounded-b-md text-white font-bold">
              FREE
            </div>
          </div>
        ) : (
          <div
            onClick={() => navigate("/login")}
            className="bg-[rgba(0,128,128,0.2)] border-2 border-[#00C37B] sm:pt-6 rounded-lg flex flex-col items-center justify-between shadow-lg cursor-pointer transition-all hover:scale-95 duration-300 sm:mx-1 ml-12 mr-4 w-[100px] h-[110px] sm:w-52 sm:h-52 ">
            <img
              src={CasePrediction}
              className="w-8 pt-4  h-12  sm:w-16 sm:h-16 sm:pt-0 mb-4 "
            />
            <h2 className="text-[12px] sm:text-lg text-white font-semibold  text-center">
              Case Prediction
            </h2>
            <div className="w-full bg-[#00C37B] text-center text-[10px] sm:text-lg  rounded-b-md text-white font-bold">
              FREE
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default allproduct;

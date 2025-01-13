import React from "react";
import LegalIcon from "../../../assets/Legalgpticon.png";
import AdiraAi from "../../../assets/adiraai.png";
import CaseSearch from "../../../assets/casesearch.png";
import CasePrediction from "../../../assets/caseprediction.png";
import Warroom from "../../../assets/warroom.png";
import {
  ADIRA_ENDPOINT,
  WARROOM_ENDPOINT,
  LEGALGPT_ENDPOINT1,
  CASE_SEARCH,
} from "../../../utils/utils";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const currentUser = useSelector((state) => state.auth.user);

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

  return (
    <div className=" flex items-center justify-center ">
      <div className="w-[80%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6">
        <div
          className="bg-[rgba(0,128,128,0.2)] border-2 cursor-pointer border-green-400 hover:scale-95 transition-all duration-300 text-green-400 rounded-lg flex flex-col items-center justify-center p-6 shadow-lg"
          onClick={openLegalGpt}
        >
          <img src={LegalIcon} className="text-4xl mb-4" />
          <h2 className="text-lg text-white font-semibold text-center">
            LegalGPT
          </h2>
        </div>
        <div
          className="bg-[rgba(0,128,128,0.2)] border-2 border-green-400 cursor-pointer hover:scale-95 transition-all duration-300 text-green-400 rounded-lg flex flex-col items-center justify-center p-6 shadow-lg"
          onClick={openCaseSearch}
        >
          <img src={CaseSearch} className="text-4xl mb-4" />
          <h2 className="text-lg text-white font-semibold text-center">
            Case Search
          </h2>
        </div>

        <div
          className="bg-[rgba(0,128,128,0.2)] border-2 border-green-400 hover:scale-95 cursor-pointer transition-all duration-300 text-green-400 rounded-lg flex flex-col items-center justify-center p-6 shadow-lg"
          onClick={openAdiraAi}
        >
          <img src={AdiraAi} className="text-4xl mb-4" />
          <h2 className="text-lg text-white font-semibold text-center">
            Adira AI
          </h2>
        </div>

        <div
          className="bg-[rgba(0,128,128,0.2)] border-2 border-green-400 hover:scale-95 transition-all cursor-pointer duration-300 text-green-400 rounded-lg flex flex-col items-center justify-center p-6 shadow-lg"
          onClick={openWarrrom}
        >
          <img src={Warroom} className="text-4xl mb-4" />
          <h2 className="text-lg text-white font-semibold text-center">
            War Room
          </h2>
        </div>

        <div className="bg-[rgba(0,128,128,0.2)] border-2 border-green-400 hover:scale-95 transition-all duration-300 cursor-pointer text-green-400 rounded-lg flex flex-col items-center justify-center p-6 shadow-lg">
          <img src={CasePrediction} className="text-4xl mb-4" />
          <h2 className="text-lg text-white font-semibold text-center">
            Case Prediction
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

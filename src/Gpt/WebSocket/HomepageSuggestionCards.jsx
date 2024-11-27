import React from "react";
import { motion } from "framer-motion";
import mindIcon from "../../assets/images/mind.png";

const cardDisplayArr = [
  "Request information about specific laws or acts.",
  "Learn the process of calculating tax amounts, including applicable rates and deductions.",
  "Engage in a discussion regarding legal issues and relevant laws associated with the incident.",
];

const prompArr = [
  "What is the historical context behind the creation of the Right to Information (RTI) Act, 2005? How has this law evolved over time, and what were the major milestones in its development?",
  "What is the process for calculating taxes for self-employed individuals? Include details on applicable tax rates, business expense deductions, and any special considerations for freelancers or sole proprietors.",
  "Discuss the legal issues involved in a case of employee dismissal due to alleged misconduct in Bangalore. What are the relevant laws and regulations, and how do they address wrongful termination and employee rights?",
];

const HomepageSuggestionCards = ({ onPromptSelect }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 px-3 gap-4">
      {cardDisplayArr.map((x, index) => (
        <motion.div
          key={index}
          whileTap={{ scale: "0.95" }}
          className="cursor-pointer flex flex-col justify-between items-center p-2 rounded tracking-wide text-xs bg-gray-800 hover:bg-gray-700 border text-center"
        >
          <div
            onClick={() => onPromptSelect(prompArr[index])}
            className="flex flex-col gap-2 items-center justify-center p-3"
          >
            <img className="h-8 w-8" src={mindIcon} />
            <p className="flex-1 m-0">{x}</p>
          </div>
        </motion.div>
      ))}
      {/* <motion.div
        whileTap={{ scale: "0.95" }}
        className="cursor-pointer flex flex-col justify-between items-center p-2 rounded tracking-wide text-xs bg-[#303030] text-center"
      >
        <div
          onClick={() => onPromptSelect(prompArr[2])}
          className="flex flex-col gap-2 items-center justify-center p-3"
        >
          <img className="h-8 w-8" src={mindIcon} />
          <p className="flex-1 m-0">
            Learn the process of calculating tax amounts, including applicable
            rates and deductions.
          </p>
        </div>
      </motion.div>
      <motion.div
        whileTap={{ scale: "0.95" }}
        className="cursor-pointer flex flex-col justify-between items-center p-2 rounded tracking-wide text-xs bg-[#303030] text-center"
      >
        <div
          onClick={() => onPromptSelect(prompArr[4])}
          className="flex flex-col gap-2 items-center justify-center p-3"
        >
          <img className="h-8 w-8" src={mindIcon} />
          <p className="flex-1 m-0">
            Engage in a discussion regarding legal issues and relevant laws
            associated with the incident.
          </p>
        </div>
      </motion.div> */}
    </div>
  );
};

export default HomepageSuggestionCards;

import React from "react";

const MemorandumOfUnderstanding = () => {
  return (
    <div className="relative h-92 flex justify-center items-center">
      {/* Content Box */}
      <div className="relative bg-white shadow-lg rounded-md p-4 sm:p-6 w-full max-w-md sm:max-w-5xl h-80 sm:h-[330px] overflow-y-auto">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/100"></div>
        {/* <h1 className="text-2xl text-black font-bold mb-4 text-center">
          Memorandum of Understanding
        </h1> */}

        <h2 className="text-xl text-black font-semibold mb-3">
          1. Objective of the Collaboration
        </h2>
        <p className="sm:text-justify text-black">
          The primary objective of this collaboration is to develop a novel
          therapeutic drug for autoimmune diseases and conduct the necessary
          preclinical studies to support future clinical trials and
          commercialization.
        </p>

        <h2 className="text-xl text-black font-semibold mb-3">
          2. Roles and Responsibilities
        </h2>
        <div className=" sm:text-justify text-gray-800">
          <p className="text-black">
            <strong>2.1.</strong> Party A shall be responsible for leading the
            research and laboratory experiments for the development of the drug
            candidate.
          </p>

          <p className="text-black">
            <strong>2.2.</strong> Party B shall be responsible for overseeing
            the clinical trials, regulatory affairs, and intellectual property
            management related to the Project.
          </p>

          <p className="text-black">
            <strong>2.3.</strong> The Parties shall work together to ensure the
            successful progression of the Project from the research and
            development stage to the clinical trials and eventual
            commercialization.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MemorandumOfUnderstanding;

import React from "react";

const MemorandumOfUnderstanding = () => {
  return (
    <div className="p-6 bg-gray-50  flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-md p-6 max-w-5xl">
        <h1 className="text-2xl text-black font-bold mb-4 text-center">
          Memorandum of Understanding
        </h1>

        <h2 className="text-xl font-semibold mb-3">
          1. Objective of the Collaboration
        </h2>
        <p className="text-gray-800 mb-4">
          The primary objective of this collaboration is to develop a novel
          therapeutic drug for autoimmune diseases and conduct the necessary
          preclinical studies to support future clinical trials and
          commercialization.
        </p>

        <h2 className="text-xl font-semibold mb-3">
          2. Roles and Responsibilities
        </h2>
        <div className="space-y-4 text-gray-800">
          <p>
            <strong>2.1.</strong> Party A shall be responsible for leading the
            research and laboratory experiments for the development of the drug
            candidate.
          </p>

          <p>
            <strong>2.2.</strong> Party B shall be responsible for overseeing
            the clinical trials, regulatory affairs, and intellectual property
            management related to the Project.
          </p>

          <p>
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

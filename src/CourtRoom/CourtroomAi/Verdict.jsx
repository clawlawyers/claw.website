import React from "react";
import logo from "../../assets/icons/clawlogo.png";
import verdictLogo from "../../assets/icons/verdict_logo.png";
const Verdict = () => {
  return (
    <main className="flex flex-col justify-center items-center h-full w-full py-10 relative">
      <section className="bg-[#7ebab2] w-2/5 flex flex-col h-full justify-start items-center rounded-md shadow-lg shadow-neutral-800 relative">
        <img
          src={verdictLogo}
          className=" w-max h-max object-cover"
          alt="verdict"
        />
        <img className="h-1/6 w-1/6" src={logo} alt="logo" />
        <section className="px-5 pb-5 flex flex-col h-full justify-between items-center">
          <p className="text-lg text-black mt-5">
            The verdict is the decision of the court. It is the final decision
            made by the judge or jury. The verdict is based on the evidence
            presented in court and the law that applies to the case. The verdict
            is the outcome of the trial and determines the guilt or innocence of
            the defendant.
          </p>
          <div className="flex flex-row w-full justify-end items-center">
            <button>Download</button>
          </div>
        </section>
      </section>
    </main>
  );
};

export default Verdict;

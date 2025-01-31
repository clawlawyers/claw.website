import React from "react";

const IntellectualPropertyAgreement = () => {
  return (
    <div className="relative h-92 flex justify-center items-center">
      {/* Content Box */}
      <div className="relative bg-white shadow-lg rounded-md p-4 sm:p-6 w-full max-w-md sm:max-w-5xl h-80 sm:h-[330px] overflow-y-auto">
        <div className="absolute inset-0  bg-gradient-to-b from-black/50 to-black/100"></div>
        {/* <h1 className="text-2xl text-black font-bold mb-4 text-center">
          Intellectual Property Agreement
        </h1> */}

        <h2 className="text-xl text-black font-semibold mb-3">
          Ownership of Intellectual Property
        </h2>

        <div className="sm:text-justify text-gray-800">
          <p className="text-black">
            <strong>2.1.</strong> All Intellectual Property, including but not
            limited to algorithms, clinical frameworks, software code, and
            platform designs, created by Priya, Rohit, or any external
            contractors hired for the Business, shall be owned by the Company.
          </p>

          <p className="text-black">
            <strong>2.2.</strong> The Parties agree that any and all work
            performed by Priya and Rohit, or by any external contractors, in
            relation to the Business shall be considered work-for-hire, and the
            Company shall be deemed the author and owner of such work.
          </p>

          <p className="text-black">
            <strong>2.3.</strong> Priya and Rohit hereby assign and transfer all
            of their right, title, and interest in and to the Intellectual
            Property to the Company, and they shall execute any and all
            documents necessary to effectuate such assignment and transfer.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntellectualPropertyAgreement;

import React from "react";

const IntellectualPropertyAgreement = () => {
  return (
    <div className="p-6 bg-gray-100  flex justify-center items-center">
      <div className="bg-white shadow-md rounded-md p-6 max-w-5xl">
        <h1 className="text-2xl text-black font-bold mb-4 text-center">
          Intellectual Property Agreement
        </h1>

        <h2 className="text-xl font-semibold mb-3">
          Ownership of Intellectual Property
        </h2>

        <div className="space-y-4 text-gray-800">
          <p>
            <strong>2.1.</strong> All Intellectual Property, including but not
            limited to algorithms, clinical frameworks, software code, and
            platform designs, created by Priya, Rohit, or any external
            contractors hired for the Business, shall be owned by the Company.
          </p>

          <p>
            <strong>2.2.</strong> The Parties agree that any and all work
            performed by Priya and Rohit, or by any external contractors, in
            relation to the Business shall be considered work-for-hire, and the
            Company shall be deemed the author and owner of such work.
          </p>

          <p>
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

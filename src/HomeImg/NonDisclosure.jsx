import React from "react";

const NonDisclosureAgreement = () => {
  return (
    <div className="relative h-92 flex justify-center items-center">
      {/* Content Box */}
      <div className="relative bg-white shadow-lg rounded-md p-4 sm:p-6 w-full max-w-md sm:max-w-5xl h-80 sm:h-[330px] overflow-y-auto">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/100"></div>
        <h2 className="text-xl text-black font-semibold mb-3">
          Confidentiality Obligations
        </h2>
        <div className="sm:text-justify text-black">
          <p className="text-black">
            <strong>2.1.</strong> The Recipient undertakes to hold the
            Confidential Information in strict confidence and not to disclose,
            distribute, or disseminate the Confidential Information to any third
            party for any purpose other than the Permitted Purpose.
          </p>

          <p className="text-black">
            <strong>2.2.</strong> The Recipient shall not use the Confidential
            Information for their own benefit or for the benefit of any third
            party, other than for the Permitted Purpose.
          </p>

          <p className="text-black">
            <strong>2.3.</strong> The Recipient shall implement adequate
            security measures to protect the Confidential Information from
            unauthorized access, use, or disclosure.
          </p>

          <p className="text-black">
            <strong>2.4.</strong> The Recipient shall not reproduce or create
            derivative works based on the Confidential Information without the
            prior written consent of the Company.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NonDisclosureAgreement;

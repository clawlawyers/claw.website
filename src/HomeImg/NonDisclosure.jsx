import React from "react";

const NonDisclosureAgreement = () => {
  return (
    <div className="p-6 bg-gray-50  flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-md p-6 max-w-5xl">
        <h1 className="text-2xl text-black font-bold mb-4 text-center">
          Non-Disclosure Agreement
        </h1>

        <h2 className="text-xl text-black font-semibold mb-3">
          Confidentiality Obligations
        </h2>
        <div className="space-y-4 text-gray-900">
          <p>
            <strong>2.1.</strong> The Recipient undertakes to hold the
            Confidential Information in strict confidence and not to disclose,
            distribute, or disseminate the Confidential Information to any third
            party for any purpose other than the Permitted Purpose.
          </p>

          <p>
            <strong>2.2.</strong> The Recipient shall not use the Confidential
            Information for her own benefit or for the benefit of any third
            party, other than for the Permitted Purpose.
          </p>

          <p>
            <strong>2.3.</strong> The Recipient shall implement adequate
            security measures to protect the Confidential Information from
            unauthorized access, use, or disclosure.
          </p>

          <p>
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

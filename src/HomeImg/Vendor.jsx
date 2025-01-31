import React from "react";

const VendorAgreement = () => {
  return (
    <div className="relative h-92 flex justify-center items-center">
      {/* Content Box */}
      <div className="relative bg-white shadow-lg rounded-md p-4 sm:p-6 w-full max-w-md sm:max-w-5xl h-80 sm:h-[330px] overflow-y-auto">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/100"></div>
        {/* <h1 className="text-2xl text-black font-bold mb-4 text-center">
        VENDOR AGREEMENT
      </h1> */}
        <h2 className="text-xl text-black font-semibold mb-2">
          SUPPLY OF GOODS
        </h2>
        <div className="sm:text-justify">
          <p className="text-black mb-4">
            <strong>2.1.</strong> GreenSupply shall supply EcoPack with
            plant-based fibers and resins in quantities of 10,000 kg per month
            for a period of 12 months, with an option to renew the contract for
            an additional 12-month period.
          </p>
          <p className="text-black mb-4">
            <strong>2.2.</strong> The Goods shall be delivered to EcoPack's
            production facility located at 789 Greenpark, New Delhi - 110002 on
            the Delivery Date.
          </p>
          <p className="text-black mb-4">
            <strong>2.3.</strong> GreenSupply shall be responsible for the
            transportation and delivery of the Goods to EcoPack's facility.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VendorAgreement;

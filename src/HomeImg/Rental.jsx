import React from "react";

const RentalAgreement = () => {
  return (
    <div className="relative h-92 flex justify-center items-center">
      {/* Content Box */}
      <div className="relative bg-white shadow-lg rounded-md p-4 sm:p-6 w-full max-w-md sm:max-w-5xl h-80 sm:h-[330px] overflow-y-auto">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/100"></div>
        <h2 className="text-lg sm:text-xl text-black font-semibold mb-2">
          MONTHLY RENT:
        </h2>
        <div className="sm:text-justify">
          <p className="text-black text-base sm:text-lg mb-4">
            <strong>1.</strong> The Tenant shall pay to the Landlord a monthly
            rent of ₹30,000/- (Rupees Thirty Thousand Only) (hereinafter
            referred to as the "Rent"), which shall be payable on or before the
            7th day of each English calendar month during the Lease Term.
          </p>
          <p className="text-black text-base sm:text-lg mb-4">
            <strong>2.</strong> The Tenant shall also pay a refundable security
            deposit of ₹1,00,000/- (Rupees One Lakh Only) (hereinafter referred
            to as the "Security Deposit") to the Landlord upon the execution of
            this Agreement.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RentalAgreement;

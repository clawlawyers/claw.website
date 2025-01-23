import React from "react";

const RentalAgreement = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-md rounded-md">
      <h1 className="text-2xl text-black font-bold mb-4 text-center">
        RENTAL AGREEMENT
      </h1>
      <h2 className="text-xl font-semibold mb-2">MONTHLY RENT:</h2>
      <div className="text-justify">
        <p className="mb-4">
          <strong>a.</strong> The Tenant shall pay to the Landlord a monthly
          rent of ₹30,000/- (Rupees Thirty Thousand Only) (hereinafter referred
          to as the "Rent"), which shall be payable on or before the 7th day of
          each English calendar month during the Lease Term.
        </p>
        <p className="mb-4">
          <strong>b.</strong> The Tenant shall also pay a refundable security
          deposit of ₹1,00,000/- (Rupees One Lakh Only) (hereinafter referred to
          as the "Security Deposit") to the Landlord upon the execution of this
          Agreement.
        </p>
      </div>
    </div>
  );
};

export default RentalAgreement;

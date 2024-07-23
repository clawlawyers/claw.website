import React, { useState } from "react";
import courtroomContact from "../../assets/images/courtroomContact.png";
import { motion } from "framer-motion";

const Contact = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [business, setBusiness] = useState("");
  const [query, setQuery] = useState("");
  const [contactMode, setContactMode] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
  };

  return (
    <div className="">
      <div className="grid grid-cols-[40%_60%] items-center text-black">
        <div>
          <img
            style={{ width: "100%", height: "100%" }}
            src={courtroomContact}
            alt="contact"
          />
        </div>
        <form style={{ position: "relative" }} onSubmit={handleSave}>
          <div className="m-28">
            <div
              className="bg-gradient-to-br from-[#006E6E] to-[#09FFFF]"
              style={{
                // background: "bg-gradient-to-br from-[#006E6E] to-[#09FFFF]",
                border: "2px solid white",
                borderRadius: "10px",
              }}
            >
              <div
                className="grid grid-cols-2 gap-3"
                style={{ margin: "20px 10px" }}
              >
                <input
                  className="p-2 border border-black rounded-md"
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  className="p-2 border border-black rounded-md"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <input
                  className="p-2 border border-black rounded-md"
                  placeholder="E-Mail ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="p-2 border border-black rounded-md"
                  placeholder="Mobile No."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  className="col-span-2 p-2 border border-black rounded-md"
                  placeholder="Business Name"
                  value={business}
                  onChange={(e) => setBusiness(e.target.value)}
                />
                <textarea
                  className="col-span-2 p-2 border border-black rounded-md text-black"
                  placeholder="Enter your Query"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div className="flex justify-between items-center mx-2 mb-3">
                <div className="flex gap-1 items-baseline">
                  <h2 className="text-sm m-0">Preferred Contact Mode: </h2>
                  <div className="flex flex-col gap-1">
                    <div className="w-full flex gap-1">
                      <input
                        type="radio"
                        value="email"
                        checked={contactMode === "email"}
                        onChange={(e) => setContactMode(e.target.value)}
                        className=""
                      />
                      <h1 className="m-0 text-xs">via E-Mail</h1>
                    </div>
                    <div className="w-full flex gap-1">
                      <input
                        type="radio"
                        value="call"
                        checked={contactMode === "call"}
                        onChange={(e) => setContactMode(e.target.value)}
                        className=""
                      />
                      <h1 className="m-0 text-xs">via Call</h1>
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    style={{ border: "2px solid white" }}
                    className="bg-transparent px-24 rounded-md"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;

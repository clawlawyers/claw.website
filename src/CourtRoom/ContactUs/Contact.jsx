import React, { useState } from "react";
import courtroomContact from "../../assets/images/courtroomContact.png";
import { motion } from "framer-motion";

const Contact = () => {
  const [firstName, setFirstName] = useState("");
  return (
    <div className="">
      <div className="grid grid-cols-[40%_60%] items-center ">
        <div>
          <img
            style={{ width: "100%", height: "100%" }}
            src={courtroomContact}
            alt="contact"
          />
        </div>
        <form style={{ position: "relative" }}>
          <div className="m-32">
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
                  // value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  className="p-2 border border-black rounded-md"
                  // type={showPass ? "text" : "password"}
                  placeholder="E-Mail ID"
                  // value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  className="p-2 border border-black rounded-md"
                  // type={showPass ? "text" : "password"}
                  placeholder="Mobile No."
                  // value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  className="col-span-2 p-2 border border-black rounded-md"
                  // type={showPass ? "text" : "password"}
                  placeholder="Business Name"
                  // value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                />
                <textarea
                  className="col-span-2 p-2 border border-black rounded-md text-black"
                  placeholder="Enter your Query"
                />
                <h2 className="text-lg">Preferred Contact Mode </h2>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;

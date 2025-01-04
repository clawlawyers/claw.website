import React, { useEffect, useState } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Helmet } from "react-helmet";
import contactIcon from "../assets/images/contactIcon.gif";
import { useNavigate } from "react-router-dom";
import { NODE_API_ENDPOINT } from "../utils/utils";
import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material";

export default function ContactUs() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [business, setBusiness] = useState("");
  const [query, setQuery] = useState("");
  const [contactMode, setContactMode] = useState("email");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    // Prepare the data to send
    const data = {
      firstName,
      lastName,
      email,
      phoneNumber: phone,
      preferredContactMode: contactMode,
      businessName: business,
      query,
      from: "legalgpt",
    };

    try {
      // Make the API request
      const response = await fetch(
        `${NODE_API_ENDPOINT}/courtroom/add/ContactUsQuery`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        // Handle successful response
        const result = await response.json();
        toast.success("Your message has been sent successfully!");
        // Reset the form
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setBusiness("");
        setQuery("");
        setContactMode("");
        setLoading(false);
      } else {
        // Handle server errors
        const result = await response.json();
        toast.error(result.message || "Failed to send the message.");
        setLoading(false);
        const script = document.createElement("script");
        script.innerHTML = `
           gtag('event', 'ads_conversion_Contact_Us_1', {
            // <event_parameters>
          });
        `;
        document.body.appendChild(script);
      }
    } catch (error) {
      // Handle network or other errors
      toast.error("An error occurred while sending your message.");
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-[#7a7a7a1a] rounded-lg"
      style={{
        width: "80%",
        margin: "auto",
        zIndex: 2,
        // padding: 20,
        position: "inherit",
      }}
    >
      <Helmet>
        <title>Contact us!</title>
        <meta
          name="description"
          content="We welcome your questions, concerns, and feedback. Reach out using the contact information below or connect with us on social media."
        />
        <meta
          name="keywords"
          content="digital legal transformation, privacy policies, your, us, concerns, business law services, data-driven law, legal news insights, legal compliance, questions"
        />
      </Helmet>
      <div className="grid md:grid-cols-2 px-4 py-2">
        <div className="p-8">
          <div className="flex flex-col">
            <h1 className="text-[#00FDFF]">Contact Us</h1>
            <p className="text-white">
              Need to Connect with us? Feel free to drop a text here and we will
              get back to you in no time.
            </p>
          </div>
          <div className="hidden md:visible md:w-full md:h-full">
            <img className="w-auto h-auto rounded-none" src={contactIcon} />
          </div>
        </div>
        <div>
          <form
            onSubmit={handleSubmit}
            className="py-8 grid grid-cols-2 gap-3 "
          >
            <div className="flex flex-col col-span-2 md:col-span-1 gap-1">
              <label className="text-xs">First Name</label>
              <input
                required
                className="bg-[#D9D9D9] text-sm p-3 border border-black rounded text-black"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1 col-span-2 md:col-span-1">
              <label className="text-xs">Last Name</label>
              <input
                required
                className="bg-[#D9D9D9] text-sm p-3 border border-black rounded text-black"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1 col-span-2 md:col-span-1">
              <label className="text-xs">Email</label>
              <input
                required
                className="bg-[#D9D9D9] text-sm p-3 border border-black rounded text-black"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1 col-span-2 md:col-span-1">
              <label className="text-xs">Mobile No.</label>
              <input
                required
                className="bg-[#D9D9D9] text-sm p-3 border border-black rounded text-black"
                placeholder="Enter your mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1 col-span-2">
              <label className="text-xs">Business Name</label>
              <input
                required
                className="bg-[#D9D9D9] text-sm p-3 border border-black rounded text-black"
                placeholder="Your Business"
                value={business}
                onChange={(e) => setBusiness(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1 col-span-2">
              <label className="text-xs">Message</label>
              <textarea
                required
                className="bg-[#D9D9D9] text-sm p-3 border border-black rounded text-black min-h-56 max-h-56"
                placeholder="Enter your message"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div
              className="grid col-span-2 justify-center items-center mb-2 gap-2"
              style={{ wordSpacing: "2px" }}
            >
              <h2 className="text-lg m-0 text-white leading-none">
                Preferred Contact Mode :{" "}
              </h2>
              <div className="flex justify-center gap-3">
                <div className="flex gap-2 items-center">
                  <input
                    type="radio"
                    value="email"
                    checked={contactMode === "email"}
                    onChange={(e) => setContactMode(e.target.value)}
                    className=""
                  />
                  <h1 className="m-0 text-sm text-white">via E-Mail</h1>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="radio"
                    value="call"
                    checked={contactMode === "call"}
                    onChange={(e) => setContactMode(e.target.value)}
                    className=""
                  />
                  <h1 className="m-0 text-sm text-white">via Call</h1>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="rounded-full col-span-2"
              style={{ background: "linear-gradient(90deg,#001B1B,#00FDFF)" }}
            >
              {loading ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>
      </div>
      <div
        className="w-full p-3 flex justify-between items-center"
        style={{ background: "linear-gradient(90deg,#6DFEFF,#001B1B)" }}
      >
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-1 rounded-lg"
          style={{ background: "linear-gradient(90deg,#001B1B,#018081)" }}
        >
          Go Back
        </button>
        {/* <div className="flex gap-2">
          <InstagramIcon className="cursor-pointer" />
          <FacebookIcon className="cursor-pointer" />
          <LinkedInIcon className="cursor-pointer" />
        </div> */}
      </div>
    </div>
  );
}

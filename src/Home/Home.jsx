import React, { useEffect, useState } from "react";
import Banner from "./Banner/Banner";
import SearchGPT from "./SearchGPT/SearchGPT";
import "./Home.module.css";
import Features from "./Features/Features";
import Blogs from "./Blogs/Blogs";
import Particles from "@tsparticles/react";
import TestimonialCard from "./Testimonial/Testimonial";
import VideoBannerHome from "./VideoBanner/Home";
import DocumentViewer from "../components/DocumentsComponent/DocumentViewer";

function Home({ featuresRef, engineReady, particleOptions }) {
  const [summery, setsummery] = useState("");
  const [referenceMessage, setReferenceMessage] = useState("");
  const [referenceSocket, setReferenceSocket] = useState(null);
  const [referenceIndex, setReferenceIndex] = useState(0);

  useEffect(() => {
    console.log("triggered");
    const newSocket = new WebSocket(
      "wss://api.clawlaw.in:8000/api/v1/gpt/generate"
    );

    newSocket.onopen = () => {
      console.log("WebSocket connection established");
    };

    newSocket.onmessage = (event) => {
      console.log(event.data);
      const formattedData = event.data
        .replaceAll("\\\\n\\\\n", "<br/>")
        .replaceAll("\\\\n", "<br/>")
        .replaceAll("\\n\\n", "<br/>")
        .replaceAll("\\n", "<br/>")
        .replaceAll("\n", "<br/>")
        .replaceAll(/\*([^*]+)\*/g, "<strong>$1</strong>")
        .replaceAll("\\", "")
        .replaceAll('"', "")
        .replaceAll(":", " :")
        .replaceAll("#", "")
        .replaceAll("**", "")
        .replaceAll("*", "");
      setReferenceMessage((prevMessages) => [...prevMessages, formattedData]);
    };

    newSocket.onclose = (event) => {
      // console.log(event);
      console.log("Closed code:", event.code);
      console.log("Close reason:", event.reason);
      console.log("WebSocket connection closed");
    };

    newSocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    setReferenceSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const sendReferenceMessage = (message) => {
    if (summery) {
      return;
    }
    // setIsLoading(true);
    if (referenceSocket && referenceSocket.readyState === WebSocket.OPEN) {
      // console.log(message);
      referenceSocket.send(JSON.stringify(message));
    }
  };

  useEffect(() => {
    if (referenceMessage.length === 0) return;

    const typeText = () => {
      if (referenceIndex < referenceMessage.length) {
        setsummery((prev) => (prev || "") + referenceMessage[referenceIndex]);
        setReferenceIndex((prev) => prev + 1);

        if (referenceMessage[referenceIndex] === "<EOS>") {
          console.log("Message is Finished");
          // setIsLoading(false);
        }
      }
    };

    if (referenceIndex < referenceMessage.length) {
      const animationFrameId = requestAnimationFrame(typeText);
      return () => cancelAnimationFrame(animationFrameId);
    }
  }, [referenceIndex, referenceMessage]);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {engineReady && <Particles id="tsparticles" options={particleOptions} />}
      <Banner />
      <SearchGPT
        sendReferenceMessage={sendReferenceMessage}
        summery={summery}
        setsummery={setsummery}
      />
      <VideoBannerHome />
      <DocumentViewer />
      <div
        className="relative bg-transparent flex flex-col gap-10"
        style={{ position: "relative", backgroundColor: "transparent" }}
      >
        <div
          style={{
            position: "absolute",
            height: 710,
            width: 710,
            top: 500,
            right: "-370px",
            background:
              "radial-gradient(circle, rgba(0, 128, 128,0.45) 0%, rgba(0, 128, 128, 0.15) 65%)",
            boxShadow: "0 0 100px 100px rgba(0, 128, 128, 0.15)",
            borderRadius: 723,
          }}
        />
        <Features ref={featuresRef} />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col justify-center items-center gap-1">
            <h1 className="font-bold text-[32px] md:text-7xl">Testimonials</h1>

            <p className="text-[8px] md:text-2xl font-semibold text-[#777]">
              Get to know what the professionals got to say
            </p>
          </div>
          <TestimonialCard />
          {/* <br /> */}
        </div>
        <Blogs />
      </div>
    </div>
  );
}

export default Home;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { NODE_API_ENDPOINT } from "../../../utils/utils.js";
import { v4 as uuidv4 } from "uuid";

const withPageTracking = (WrappedComponent) => {
  return (props) => {
    const location = useLocation();
    const [startTime, setStartTime] = useState(Date.now());
    const [visitorrId, setVisitorId] = useState(null);

    const formatDuration = (milliseconds) => {
      const totalSeconds = Math.floor(milliseconds / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      return `${hours}h ${minutes}m ${seconds}s`;
    };

    useEffect(() => {
      if (!localStorage.getItem("auth")) {
        var newVisitorId = uuidv4();
        localStorage.setItem("visitorId", newVisitorId);
        setVisitorId(newVisitorId);
      }

      const handlePageLeave = async () => {
        const endTime = Date.now();
        const visitDuration = endTime - startTime;
        const formattedDuration = formatDuration(visitDuration);
        console.log(formattedDuration);
        let data = JSON.parse(localStorage.getItem("auth"));
        // console.log(data.phoneNumber);

        const payload = {
          path: location.pathname,
          visitDuration,
          timestamp: new Date(),
        };

        if (!localStorage.getItem("visitorId")) {
          payload.userId = data.phoneNumber;
        } else {
          console.log(newVisitorId);
          payload.visitorId = newVisitorId;
        }

        // Send data to the backend
        await fetch(`${NODE_API_ENDPOINT}/admin/usertrack`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      };

      window.addEventListener("beforeunload", handlePageLeave);

      return () => {
        window.removeEventListener("beforeunload", handlePageLeave);
        handlePageLeave();
      };
    }, [location.pathname]);

    useEffect(() => {
      setStartTime(Date.now());
    }, [location.pathname]);

    return <WrappedComponent {...props} />;
  };
};

export default withPageTracking;

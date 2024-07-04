import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { NODE_API_ENDPOINT } from "../utils/utils.js";

export default function AdminWall() {
  const phoneNumber = useSelector((state) => state.auth.user.phoneNumber);
  const navigate = useNavigate();
  const [allAdmins, setAllAdmins] = useState([]);

  useEffect(() => {
    const getAdmins = async () => {
      const admins = await axios.get(`${NODE_API_ENDPOINT}/admin/getAdmins`);
      const allAdmins = admins.data[0].users.map((user) => {
        return "+91" + user.phoneNumber;
      });
      setAllAdmins(allAdmins);
    };

    getAdmins();

    if (!allAdmins.includes(phoneNumber) && allAdmins.length > 0) {
      console.log(allAdmins);
      navigate(`/`);
    }
  }, [phoneNumber, navigate]);

  return <Outlet />;
}

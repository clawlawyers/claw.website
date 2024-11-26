import React, { useEffect, useState } from "react";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  removePromptsArr,
  setToggleMenu,
} from "../../features/gpt/promptSlice";
import { CircularProgress } from "@mui/material";
import { activePlanFeatures } from "../../utils/checkActivePlanFeatures";
import StarIcon from "@mui/icons-material/Star";
import { UserSessions } from "../UserSessions";
import { useNavigate } from "react-router-dom";

const SocketSidebar = () => {
  const toggleMenu = useSelector((state) => state.prompt.toggle);
  const { plan } = useSelector((state) => state.gpt);
  console.log(plan);
  const currentUser = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activePlan, setActivePlan] = useState([]);

  const [startNew, setStartNew] = useState(false);

  useEffect(() => {
    if (plan) {
      setActivePlan(activePlanFeatures(plan));
    }
  }, [plan]);

  const handleNewChat = () => {
    dispatch(removePromptsArr());
    setStartNew(false);
    navigate("/gpt/socket");
  };

  return (
    <div
      className={`${
        toggleMenu ? "w-1/5" : "w-auto"
      } transition-width duration-500 ease-in-out delay-500 bg-gray-900 h-screen flex flex-col`}
    >
      <div className="w-full h-[5%] flex justify-end p-2">
        <MenuOutlinedIcon
          className="cursor-pointer"
          onClick={() => dispatch(setToggleMenu())}
        />
      </div>
      <div className="flex-1 h-[95%]">
        {toggleMenu ? (
          <div className="flex flex-col h-full gap-2">
            <div
              className="bg-gray-800 p-2 m-1 rounded-lg"
              style={{ fontSize: 14, color: "#777" }}
            >
              {plan ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <StarIcon />
                    <div
                      className="font-semibold"
                      style={{ fontSize: 16, color: "white" }}
                    >
                      {currentUser ? currentUser.phoneNumber : <>Guest</>}
                    </div>
                  </div>
                  <div style={{ fontSize: 12 }}>
                    <span className="text-white">Plan Type : </span>
                    <span style={{ textTransform: "capitalize" }}>
                      {activePlan.length
                        ? activePlan[0]?.planName?.split("_")[0]
                        : " No Plan"}
                    </span>
                  </div>
                  <div className="pt-2 flex justify-stretch gap-2">
                    <button
                      className="font-semibold text-xs justify-center items-center  rounded-lg"

                      //   onClick={() => dispatch(open())}
                    >
                      Upgrade
                    </button>
                    <button
                      //   onClick={() => setCancelSubscriptionDialog(true)}
                      className="font-semibold text-xs justify-center items-center bg-white text-[#00969A] rounded-lg"
                    >
                      End Subscription
                    </button>
                  </div>
                </div>
              ) : (
                <CircularProgress style={{ padding: 10, color: "white" }} />
              )}
            </div>
            <div className="w-full px-1">
              <button onClick={handleNewChat} className="w-full rounded-lg">
                Start New Chat
              </button>
            </div>
            <div className="bg-gray-800 flex-1 h-full overflow-auto pt-2 px-2 m-1 rounded-lg ">
              <UserSessions
                model="legalGPT"
                jwt={currentUser?.jwt}
                setStartNew={setStartNew}
                startNew={startNew}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SocketSidebar;

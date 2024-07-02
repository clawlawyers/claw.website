import "./App.css";
import Home from "./Home/Home";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import PrivacyPolicy from "./PrivacyPolicy/PrivacyPolicy";
import Blog from "./Blog/Blog";
import AllBlogs from "./AllBlogs/AllBlogs";
import CreateBlog from "./CreateBlog/CreateBlog";
import Pricing from "./Pricing/Pricing";
import Login from "./Login/Login";
import RootLayout from "./RootLayout/RootLayout";
import { Provider } from "react-redux";
import store from "./store";
import Payment from "./Payment/Payment";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Toaster } from "react-hot-toast";
import { retrieveAuth } from "./features/auth/authSlice";
import GPTLayout from "./Gpt/GPTLayout.jsx";
import GPT from "./Gpt/GPT.jsx";
import SessionGPT from "./Gpt/SessionGPT.jsx";
import AuthWall from "./AuthWall/AuthWall.jsx";
import CaseFinder from "./CaseFinder/index.jsx";
import AmbassadorDashboard from "./Ambassador/AmbassadorDashboard.jsx";
import Ambassador from "./Ambassador/Ambassador.jsx";
import AmbassadorApply from "./Ambassador/AmbassadorApply.jsx";
import AdminWall from "./AdminWall/AdminWall.jsx";
import TermsOfService from "./TermsOfService/TermsOfService.jsx";
import NotFound from "./NotFound/index.jsx";
import ContactUs from "./ContactUs/ContactUs.jsx";
import RefundPolicy from "./RefundPolicy/RefundPolicy.jsx";
import ShippingPolicy from "./ShippingPolicy/ShippingPolicy.jsx";
import News from "./News/index.jsx";
import Home1 from "./Admin/Home/Home";
import Users from "./Admin/Users/Users";
import Menu from "./Admin/Menu/Menu";
import ReferralCode from "./Admin/ReferralCode/ReferralCode";
import SubscribedUser from "./Admin/SubscribedUsers/SubscribedUser";
import Visitors from "./Admin/Visitors/Visitors";
import TermsAndConditions from "./Terms & Conditions/TermsAndConditions.jsx";
import Couponcode from "./Admin/CouponCode/Couponcode.jsx";
import QuizMain from "./Quiz/Index.jsx";
import axios from "axios";
import { useSelector } from "react-redux";
import { NODE_API_ENDPOINT } from "../src/utils/utils.js";
import withPageTracking from "./Admin/components/Usertrack/withPageTracking.jsx";
import Usertrack from "./Admin/Usertrack/Usertrack.jsx";
import SalesmanDetail from "./Admin/Salesman/SalesmanDetail.jsx";
import SalesmanList from "./Admin/Salesman/SalesmanList.jsx";
import PricingTable from "./Pricing/Test.jsx";

function App() {
  const BATCH_INTERVAL = 60 * 1000; //  (1 minute = 60 seconds * 1000 milliseconds/second)
  const [init, setInit] = useState(false);
  const currentUser = useSelector((state) => state.auth.user);

  const currentUserRef = useRef(currentUser);

  useEffect(() => {
    currentUserRef.current = currentUser;
  }, [currentUser]);

  const updateEngagementTime = useCallback(async (engagementData) => {
    try {
      await axios.post(
        `${NODE_API_ENDPOINT}/cron/engagement/time`,
        engagementData
      );
    } catch (error) {
      console.error("Error updating engagement time:", error);
    }
  }, []);

  const flushQueue = useCallback(() => {
    const user = currentUserRef.current;
    if (user) {
      updateEngagementTime([
        {
          phoneNumber: user.phoneNumber,
          engagementTime: 60,
          timestamp: Date.now(),
        },
      ]);
    }
  }, [updateEngagementTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      flushQueue();
    }, BATCH_INTERVAL);

    return () => {
      clearInterval(interval);
      flushQueue();
    };
  }, [flushQueue]);

  // const [startTime, setStartTime] = useState(Date.now());
  // const [engagementQueue, setEngagementQueue] = useState([]);
  // const currentUser = useSelector((state) => state.auth.user);
  // console.log(currentUser);

  // const updateEngagementTime = async (engagementData) => {
  //   try {
  //     await axios.post(
  //       `${NODE_API_ENDPOINT}/cron/engagement/time`,
  //       engagementData
  //     );
  //   } catch (error) {
  //     console.error("Error updating engagement time:", error);
  //   }
  // };

  // const addEngagementTimeToQueue = (engagementTime) => {
  //   setEngagementQueue((prevQueue) => [
  //     ...prevQueue,
  //     {
  //       phoneNumber: currentUser?.phoneNumber,
  //       engagementTime,
  //       timestamp: Date.now(),
  //     },
  //   ]);
  // };

  // const flushQueue = () => {
  //   if (engagementQueue.length > 0) {
  //     updateEngagementTime(engagementQueue);
  //     setEngagementQueue([]);
  //   }
  // };

  // useEffect(() => {
  //   const handleBeforeUnload = () => {
  //     const endTime = Date.now();
  //     const engagementTime = (endTime - startTime) / 1000; // Time in seconds
  //     addEngagementTimeToQueue(engagementTime);
  //     flushQueue();
  //   };

  //   const handleVisibilityChange = () => {
  //     if (document.visibilityState === "hidden") {
  //       const endTime = Date.now();
  //       const engagementTime = (endTime - startTime) / 1000;
  //       addEngagementTimeToQueue(engagementTime);
  //       flushQueue();
  //     } else if (document.visibilityState === "visible") {
  //       setStartTime(Date.now());
  //     }
  //   };

  //   const interval = setInterval(() => {
  //     flushQueue();
  //   }, BATCH_INTERVAL);

  //   window.addEventListener("beforeunload", handleBeforeUnload);
  //   document.addEventListener("visibilitychange", handleVisibilityChange);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //     document.removeEventListener("visibilitychange", handleVisibilityChange);
  //     clearInterval(interval);
  //     flushQueue();
  //   };
  // }, [startTime, engagementQueue]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     flushQueue();
  //   }, BATCH_INTERVAL);

  //   return () => {
  //     clearInterval(interval);
  //     flushQueue();
  //   };
  // }, []);

  // this should be run only once per application lifetime
  useEffect(() => {
    store.dispatch(retrieveAuth());
  }, []);
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);
  const options = useMemo(
    () => ({
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.9,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        // links: {
        //   color: "#ffffff",
        //   distance: 150,
        //   enable: true,
        //   opacity: 0,
        //   width: 1,
        // },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 2,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 70,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 2 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  const AdminLayout = () => {
    return (
      <div className="container">
        <div className="menuContainer">
          <Menu />
        </div>
        <div className="contentContainer">
          <Outlet />
        </div>
      </div>
    );
  };

  // Wrap components with withPageTracking
  const TrackedQuizMain = withPageTracking(QuizMain);
  // const TrackedHome = withPageTracking(Home);
  const TrackedNews = withPageTracking(News);
  const TrackedAllBlogs = withPageTracking(AllBlogs);
  const TrackedCaseSearch = withPageTracking(CaseFinder);
  const TrackedGpt = withPageTracking(GPT);

  const router = createBrowserRouter([
    {
      path: "quiz",
      element: <TrackedQuizMain />,
    },
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "",
          element: <Home particleOptions={options} engineReady={init} />,
        },
        {
          path: "quiz",
          element: <TrackedQuizMain />,
        },
        {
          path: "news",
          element: <TrackedNews />,
        },
        {
          path: "blog",
          element: <TrackedAllBlogs />,
        },
        {
          path: "blog/:blogName",
          element: <Blog />,
        },
        {
          path: "create/blog",
          element: <CreateBlog />,
        },
        {
          path: "privacyPolicy",
          element: <PrivacyPolicy />,
        },
        {
          path: "terms-of-service",
          element: <TermsOfService />,
        },
        {
          path: "pricing",
          element: <Pricing />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "leaders",
          element: <Ambassador />,
          children: [
            { path: "apply", element: <AmbassadorApply /> },
            { path: "dashboard", element: <AmbassadorDashboard /> },
          ],
        },
        {
          path: "admin",
          element: <AuthWall />,
          children: [
            {
              path: "",
              element: <AdminWall />,
              children: [
                {
                  path: "",
                  element: <AdminLayout />,
                  children: [
                    { path: "", element: <Home1 /> },
                    { path: "users", element: <Users /> },
                    { path: "subscribed-users", element: <SubscribedUser /> },
                    { path: "referral-code", element: <ReferralCode /> },
                    { path: "visitors", element: <Visitors /> },
                    { path: "couponcode", element: <Couponcode /> },
                    { path: "user-visit", element: <Usertrack /> },
                    { path: "salesman", element: <SalesmanList /> },
                    { path: "salesman/:id", element: <SalesmanDetail /> },
                  ],
                },
              ],
            },
          ],
        },

        {
          path: "paymentgateway",
          element: <AuthWall />,
          children: [{ path: "", element: <Payment /> }],
        },
        {
          path: "case/search",
          element: <AuthWall />,
          children: [{ path: "", element: <TrackedCaseSearch /> }],
        },
        { path: "contact-us", element: <ContactUs /> },
        { path: "refund-and-cancellation-policy", element: <RefundPolicy /> },
        { path: "terms-and-conditions", element: <TermsAndConditions /> },
        { path: "shipping-and-delivery", element: <ShippingPolicy /> },
      ],
    },
    {
      path: "/gpt",
      element: <AuthWall />,
      children: [
        {
          path: "legalGPT",
          element: (
            <GPTLayout
              keyword="Legal"
              primaryColor="#008080"
              model="legalGPT"
            />
          ),
          children: [
            {
              path: "",
              element: (
                <TrackedGpt
                  keyword="Legal"
                  primaryColor="#008080"
                  model="legalGPT"
                  textGradient={["rgba(0,128,128,0.75)", "rgba(0,128,128,0)"]}
                  backgroundGradient={[
                    "rgba(0,128,128,0.45)",
                    "rgba(0,128,128,0.1)",
                  ]}
                />
              ),
            },
            {
              path: "session/:sessionId",
              element: (
                <SessionGPT
                  keyword="Legal"
                  primaryColor="#008080"
                  model="legalGPT"
                />
              ),
            },
          ],
        },
        {
          path: "finGPT",
          element: (
            <GPTLayout
              keyword="Finance"
              primaryColor="#008080"
              model="financeGPT"
            />
          ),
          children: [
            {
              path: "",
              element: (
                <GPT
                  textGradient={["rgba(0,128,128,0.75)", "rgba(0,128,128,0)"]}
                  backgroundGradient={[
                    "rgba(0,128,128,0.45)",
                    "rgba(0,128,128,0.1)",
                  ]}
                  keyword={"Finance"}
                  primaryColor={"#008080"}
                  model={"financeGPT"}
                />
              ),
            },
            {
              path: "session/:sessionId",
              element: (
                <SessionGPT
                  keyword={"Finance"}
                  primaryColor={"#008080"}
                  model={"financeGPT"}
                />
              ),
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <div className="App">
      {/* <Provider store={store}> */}
      <RouterProvider router={router} />
      <Toaster />
      {/* </Provider> */}
    </div>
  );
}

const WrappedApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default WrappedApp;

import "./App.css";
import Home from "./Home/Home";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import PrivacyPolicy from "./PrivacyPolicy/PrivacyPolicy";
import Blog from "./Blog/Blog";
import AllBlogs from "./AllBlogs/AllBlogs";
import CreateBlog from "./CreateBlog/CreateBlog";
import Pricing from "./Pricing/Pricing";
import Login from "./Login/Login";
import RootLayout from "./RootLayout/RootLayout";
import { Provider, useDispatch } from "react-redux";
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
import AddAmbassadorForm from "./Admin/AddAmbassador/index.jsx";
import Demovideo from "./DemoVideo/Demovideo.jsx";
import AllAdmins from "./Admin/AllAdmins/AllAdmins.jsx";
import AdiraAi from "./AdiraAi/AdiraAi.jsx";
// import CourtRoom from "./CourtRoom/CourtRoom.jsx";
// import LoginToCourtRoom from "./CourtRoom/Login/LoginToCourtRoom.jsx";
// import BookNow from "./CourtRoom/BookNow/BookNow.jsx";

// import CourtroomAiHome from "./CourtRoom/CourtroomAi/CourtroomAiHome.jsx";
// import CourtRoomAiLayout from "./CourtRoom/CourtroomAi/CourtRoomAiLayout.jsx";
// import CourtroomArgument from "./CourtRoom/CourtroomAi/CourtroomArgument.jsx";
// import UploadDoc from "./CourtRoom/CourtroomAi/UploadDoc.jsx";
// import Verdict from "./CourtRoom/CourtroomAi/Verdict.jsx";
// import Contact from "./CourtRoom/ContactUs/Contact.jsx";
import { retrieveCourtroomAuth } from "./features/bookCourtRoom/LoginReducreSlice.js";
import PlanPayment from "./Pricing/PlanPayment.jsx";
import { retrieveActivePlanUser, setPlan } from "./features/gpt/gptSlice.js";
import TestSubscription from "./Pricing/TestSubscription.jsx";
import UserPurchases from "./Purchases/UserPurchases.jsx";
import Login1 from "./Login/Login1.jsx";
import Login2 from "./Login/Login2.jsx";
import { WindowRounded } from "@mui/icons-material";
import WebSocketComponent from "./Gpt/WebSocket/WebSocket.jsx";
import Prompts from "./Gpt/WebSocket/Prompts.jsx";
import SocketLayout from "./Gpt/WebSocket/SocketLayout.jsx";
import DocumentViewer from "./components/DocumentsComponent/DocumentViewer.jsx";
import PricingPlans from "./Pricing/PricingPlans.jsx";
import NewPlanPayment from "./Pricing/NewPlanPayment.jsx";
import { retrieveActiveAdiraPlan } from "./features/payment/paymentSlice.js";
import AboutUs from "./AboutUs/AboutUs.jsx";
import Contact from "./Contact/Contact.jsx";
import { RiLayoutGrid2Line } from "react-icons/ri";
import SignUpPage from "./Login/Signup.jsx";
import PopupPage from "./Login/PopupPage.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google"; // Import the provider
import ChatbotButton from "./Chatbot/ChatbotButton.jsx";
import AddScreen from "./Advt/AddScreen.jsx";

function App() {
  const BATCH_INTERVAL = 60 * 1000; //  (1 minute = 60 seconds * 1000 milliseconds/second)

  const currentUser = useSelector((state) => state.auth.user);
  const autologout = useSelector((state) => state.auth.autologout);

  const [init, setInit] = useState(false);

  const currentUserRef = useRef(currentUser);

  useEffect(() => {
    currentUserRef.current = currentUser;
    if (currentUser == null && autologout) {
      window.alert("You have been Logged out ");
      window.location.replace("/login");
    }
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

  // this should be run only once per application lifetime
  useEffect(() => {
    store.dispatch(retrieveActivePlanUser());
    store.dispatch(retrieveAuth());
    store.dispatch(retrieveActiveAdiraPlan());
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
    // useEffect(() => {
    //   const VerifyAdmin = async () => {
    //     const storedAuth = localStorage.getItem("auth");
    //     if (storedAuth) {
    //       const parsedUser = await JSON.parse(storedAuth);
    //       const isAdmin = await axios.get(
    //         `${NODE_API_ENDPOINT}/admin/${parsedUser.phoneNumber}/isAdmin`
    //       );
    //       // console.log(isAdmin.data.isAdmin);
    //       if (isAdmin.data.isAdmin) {
    //         if (parsedUser.expiresAt < new Date().valueOf()) return null;
    //         const props = await fetch(`${NODE_API_ENDPOINT}/client/auth/me`, {
    //           method: "GET",
    //           headers: {
    //             Authorization: `Bearer ${parsedUser.jwt}`,
    //           },
    //         });
    //         const parsedProps = await props.json();

    //         if (
    //         //  !parsedProps.data.phoneNumber ===
    //           parsedUser.phoneNumber.substring(3)
    //         ) {
    //           alert("Invalid User");
    //           return null;
    //         }
    //       } else {
    //         alert("Unauthorized Access");
    //         return null;
    //       }
    //     }
    //   };
    //   VerifyAdmin();
    // }, []);

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
      path: "add",
      element: <AddScreen />,
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
          path: "dummy",
          element: <TestSubscription />,
        },
        {
          path: "news",
          element: <TrackedNews />,
        },
        {
          path: "/blog",
          element: <AllBlogs />,
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
          element: <PricingPlans />,
        },
        {
          path: "payment",
          // element: <PlanPayment />,
          element: <NewPlanPayment />,
        },
        {
          path: "purchases",
          element: <UserPurchases />,
        },
        {
          path: "congrats-investor",
          element: <Demovideo />,
        },
        {
          path: "login2",
          element: <Login1 />,
        },
        {
          path: "login",
          element: (
            <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
              <Login2 />
            </GoogleOAuthProvider>
          ),
        },
        {
          path: "signup",
          element: <SignUpPage />,
        },
        {
          path: "popup",
          element: <PopupPage />,
        },
        // {
        //   path: "add",
        //   element: <AddScreen />,
        // },

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
                    { path: "add-ambassador", element: <AddAmbassadorForm /> },
                    { path: "salesman", element: <SalesmanList /> },
                    { path: "salesman/:id", element: <SalesmanDetail /> },
                    { path: "all-admins", element: <AllAdmins /> },
                  ],
                },
              ],
            },
          ],
        },
        {
          path: "pricing",
          // element: <AuthWall />,
          children: [{ path: "", element: <PricingPlans /> }],
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
        { path: "about-us", element: <AboutUs /> },
        { path: "contact", element: <Contact /> },
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
        {
          path: "socket",
          element: <SocketLayout />,
          children: [
            { path: "", element: <Prompts /> },
            { path: "v1/:sessionId", element: <WebSocketComponent /> },
          ],
        },
      ],
    },
    // {
    //   path: "socket",
    //   element: <SocketLayout />,
    //   children: [
    //     { path: "", element: <Prompts /> },
    //     { path: "v1/:sessionId", element: <WebSocketComponent /> },
    //   ],
    // },
    {
      path: "/adira",
      element: <AdiraAi />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
      <ChatbotButton />
      <Toaster />
    </div>
  );
}

const WrappedApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default WrappedApp;

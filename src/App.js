import "./App.css";
import Home from "./Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import Ambassadorship from "./Ambassadorship/Ambassadorship";
import { useRef, useState, useEffect, useMemo } from "react";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Toaster } from 'react-hot-toast';
import { retrieveAuth } from "./features/auth/authSlice";
import GPTLayout from "./Gpt/GPTLayout.jsx";
import GPT from "./Gpt/GPT.jsx";
import SessionGPT from "./Gpt/SessionGPT.jsx";
import AuthWall from "./AuthWall/AuthWall.jsx";


function App() {
  const featuresRef = useRef(null);
  const [init, setInit] = useState(false);


  // this should be run only once per application lifetime
  useEffect(() => {
    store.dispatch(retrieveAuth());
  }, [])
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
      // background: {
      //   color: {
      //     value: "#0d47a1",
      //   },
      // },
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
    [],
  );

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout onClickFeatures={() => featuresRef?.current?.scrollIntoView({ behavior: "smooth" })} />,
      children: [
        {
          path: "",
          element: <Home particleOptions={options} featuresRef={featuresRef} engineReady={init} />
        },
        {
          path: "blog",
          element: <AllBlogs />
        },
        {
          path: "blog/:blogName",
          element: <Blog />
        },
        {
          path: "create/blog",
          element: <CreateBlog />
        },
        {
          path: "privacyPolicy",
          element: <PrivacyPolicy />
        },
        {
          path: "pricing",
          element: <Pricing />
        },
        {
          path: "login",
          element: <Login />
        },
        {
          path: "ambassadorship",
          element: <Ambassadorship />
        },
        {
          path: "paymentgateway",
          element: <Payment />
        }
      ]
    },
    {
      path: "/gpt",
      element: <AuthWall />,
      children: [
        {
          path: "legalGPT",
          element: <GPTLayout keyword="Legal" primaryColor="#8940FF" model="legalGPT" />,
          children: [
            {
              path: '',
              element: <GPT keyword="Legal" primaryColor="#8940FF" model="legalGPT" textGradient={["rgba(137, 64, 255, 0.5)", "rgba(137, 64, 255, 0)"]} backgroundGradient={["rgba(137, 64, 255,0.45)", "rgba(137, 64, 255,0.1)"]} />
            },
            {
              path: 'session/:sessionId',
              element: <SessionGPT keyword="Legal" primaryColor="#8940FF" model="legalGPT" />
            },
          ]
        },
        {
          path: "finGPT",
          element: <GPTLayout keyword="Finance" primaryColor="#008080" model="financeGPT" />,
          children: [
            {
              path: '',
              element: <GPT textGradient={["rgba(0,128,128,0.75)", "rgba(0,128,128,0)"]} backgroundGradient={["rgba(0,128,128,0.45)", "rgba(0,128,128,0.1)"]} keyword={"Finance"} primaryColor={"#008080"} model={"financeGPT"} />
            },
            {
              path: 'session/:sessionId',
              element: <SessionGPT keyword={"Finance"} primaryColor={"#008080"} model={"financeGPT"} />
            },
          ]
        },
      ]
    },

  ]);


  return (
    <div className="App">
      <Provider store={store}>
        <RouterProvider router={router} />
        <Toaster />
      </Provider>
    </div>
  );
}

export default App;

import "./App.css";
import Home from "./Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LegalGPT from "./LegalGPT/LegalGPT";
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
import LegalGPTLayout from "./LegalGPT/LegalGPTLayout.jsx";
import SessionLegalGPT from "./LegalGPT/SessionLegalGPT.jsx";
import ConversationLegalGPT from "./LegalGPT/ConversationLegalGPT.jsx";
function App() {
  const featuresRef = useRef(null);
  const [init, setInit] = useState(false);


  // this should be run only once per application lifetime
  useEffect(() => {
    store.dispatch(retrieveAuth());
  }, [store])
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
      path: "/legalGPT",
      element: <LegalGPTLayout />,
      children: [
        {
          path: '',
          element: <LegalGPT />
        },
        {
          path: 'session/:sessionId',
          element: <SessionLegalGPT />
        },
        {
          path: 'conversation',
          element: <ConversationLegalGPT />
        }
      ]
    },
  ]);
  // const persistor = persistStore(store);


  return (
    <div className="App">
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <RouterProvider router={router} />
        <Toaster />
        {/* </PersistGate> */}
      </Provider>
    </div>
  );
}

export default App;

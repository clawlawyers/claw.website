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
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist';
import Payment from "./Payment/Payment";
import Ambassadorship from "./Ambassadorship/Ambassadorship";
import { useRef } from "react";

function App() {
  const featuresRef = useRef(null);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout onClickFeatures={() => featuresRef?.current.scrollIntoView({ behavior: "smooth" })} />,
      children: [
        {
          path: "/",
          element: <Home featuresRef={featuresRef} />
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
      element: <LegalGPT />
    },
  ]);
  const persistor = persistStore(store)

  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;

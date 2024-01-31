import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home/Home";
import Register from "./Register/Register";
import Testimonials from "./Testimonials/Testimonials";
import LegalGPT from "./LegalGPT/LegalGPT";
import PrivacyPolicy from "./PrivacyPolicy/PrivacyPolicy";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/legalGPT",
    element: <LegalGPT />
  },
  {
    path: "/privacyPolicy",
    element: <PrivacyPolicy />
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

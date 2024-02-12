import "./App.css";
import Home from "./Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./Register/Register";
import Testimonials from "./Testimonials/Testimonials";
import LegalGPT from "./LegalGPT/LegalGPT";
import PrivacyPolicy from "./PrivacyPolicy/PrivacyPolicy";
import Blog from "./Blog/Blog";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },

    {
      path: "/blog/:id",
      element: <Blog />,
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
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

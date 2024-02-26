import "./App.css";
import Home from "./Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LegalGPT from "./LegalGPT/LegalGPT";
import PrivacyPolicy from "./PrivacyPolicy/PrivacyPolicy";
import Blog from "./Blog/Blog";
import AllBlogs from "./AllBlogs/AllBlogs";
import CreateBlog from "./CreateBlog/CreateBlog";
import Pricing from "./Pricing/Pricing";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },

    {
      path: "/blog/:blogName",
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
    {
      path: "/blog",
      element: <AllBlogs />
    },
    {
      path: "/create/blog",
      element: <CreateBlog />
    },
    {
      path: "/pricing",
      element: <Pricing />
    }
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";

import Blog from "../pages/Blog";
import About from "../pages/About";
import Partners from "../pages/Partners";
import HomePage from "../pages/HomePage/HomePage";

export const router = createBrowserRouter([
  {
    path: "/", element: <Layout />, children: [
      { index: true, element: <HomePage /> },
      { path: "blog", element: <Blog /> },
      { path: "about", element: <About/> },
      { path: "partners", element: <Partners /> },

    ],
  },
]);

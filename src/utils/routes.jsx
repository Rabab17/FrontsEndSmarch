import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import HomePage from "../pages/HomePage";
import Blog from "../pages/Blog";
import About from "../pages/About";
import Partners from "../pages/Partners";

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

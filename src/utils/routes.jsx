import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import HomePage from "../pages/HomePage/HomePage";
import Blog from "../pages/BlogPage/Blog";
import About from "../pages/AboutPage/About";
import Partners from "../pages/PartnersPage/Partners";
import Login from "../pages/LoginPage/Login";
import SiginUp from "../pages/SignUpPage/SignUp";
import ForgetPassword from "../pages/ForgetPassword/ForgetPassword";
import ChaletDetails from "../pages/ChaletDetails/ChaletDetails";

export const router = createBrowserRouter([
  {
    path: "/", element: <Layout />, children: [
      { index: true, element: <HomePage /> },
      { path: "blog", element: <Blog /> },
      { path: "about", element: <About /> },
      { path: "partners", element: <Partners /> },
      { path: "partners/:id", element: <ChaletDetails /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SiginUp /> },
      { path: "ForgetPassword", element: <ForgetPassword /> },

    ],
  },
]);

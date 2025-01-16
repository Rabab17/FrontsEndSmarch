import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import HomePage from "../pages/HomePage/HomePage";
import Blog from "../pages/BlogPage/Blog";
import About from "../pages/AboutPage/About";
import Partners from "../pages/PartnersPage/Partners";
import Login from "../pages/LoginPage/Login";
import ForgetPassword from "../pages/ForgetPassword/ForgetPassword";
import ChaletDetails from "../pages/ChaletDetails/ChaletDetails";
import NotFound from "../pages/NotFoundPage/NotFound";
import SignUp from "../pages/SignUpPage/SignUp";
import OwnerDashboard from "../pages/OwnerDashboard/layout/OwnerDashboard";
import ContactUs from "../pages/ContactUs/ContactUs";
import SinglePost from "../pages/SinglePost/SinglePost";
import SignUpUser from "../pages/SignUpPage/SignUpUser";
import SignUpOwner from "../pages/SignUpPage/SignUpOwner";

export const router = createBrowserRouter([
  {
    path: "/", element: <Layout />, children: [
      { index: true, element: <HomePage /> },
      { path: "blog", element: <Blog /> },
      { path: "blog/:id", element: <SinglePost /> },
      { path: "about", element: <About /> },
      { path: "ContactUs", element: <ContactUs/> },
      { path: "partners", element: <Partners /> },
      { path: "partners/:id", element: <ChaletDetails /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp/> },
      { path: "signupUser", element: <SignUpUser />},
      { path: "signupOwner", element:<SignUpOwner/> },
      { path: "ForgetPassword", element: <ForgetPassword /> },
      { path: "OwnerDashboard", element: <OwnerDashboard/> },
      { path: '*', element: <NotFound /> }
    ],
  },
]);

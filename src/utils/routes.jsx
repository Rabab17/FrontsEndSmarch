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
import ProfilePage from "../pages/OwnerDashboard/pages/ProfilePage";
import ControlsPage from "../pages/OwnerDashboard/pages/ControlsPage";
import BalanceRechargePage from "../pages/OwnerDashboard/pages/BalanceRechargePage";
import SupportPage from "../pages/OwnerDashboard/pages/SupportPage";
import NotificationPage from "../pages/OwnerDashboard/pages/Notifications/NotificationPage";
import ChaletManagement from "../pages/OwnerDashboard/pages/ChaletManagement";
import ManageReservations from "../pages/OwnerDashboard/pages/ManageReservations";
import UserDashboard from "../pages/UserDashboard/layout/UserDashboard";
import ProfileUser from "../pages/UserDashboard/pages/ProfileUser";
import ResetPassword from "../pages/ForgetPassword/[token]/ResetPassword";
import Overview from "../pages/UserDashboard/pages/Overview";

import Datapicker from "../pages/datepicker/Datepicker";
import SingleChaletManagement from "../pages/OwnerDashboard/pages/SingleChaletManagement";
import EditChalet from "../pages/OwnerDashboard/pages/EditChalet";
import SupportUser from "../pages/UserDashboard/pages/SupportUser";
import UpdatePassword from "../pages/UpdatePassword/UpdatePassword";
import SubscriptionOwner from "../pages/OwnerDashboard/pages/SubscriptionOwner";
import AddChalet from "../pages/OwnerDashboard/pages/AddChalet/AddChalet";
import NewNotification from "../pages/OwnerDashboard/pages/Notifications/pages/NewNotification";
import ReadNotification from "../pages/OwnerDashboard/pages/Notifications/pages/ReadNotification";
import AllNotification from "../pages/OwnerDashboard/pages/Notifications/pages/AllNotification";
import TicketSend from "../pages/OwnerDashboard/pages/TicketSend";
import Chat from "../pages/HomePage/Chat";
import UserNotificationPage from "../pages/UserDashboard/pages/Notification/UserNotificationPage";
import AllNotificationUser from "../pages/UserDashboard/pages/Notification/pages/AllNotificationUser";
import NewNotificationUser from "../pages/UserDashboard/pages/Notification/pages/NewNotificationUser";
import ReadNotificationUser from "../pages/UserDashboard/pages/Notification/pages/ReadNotificationUser";
import Terms from "../pages/terms/Terms";
import FAQ from "../pages/FAQ/FAQ";
import Privacy from "../pages/privacy/Privacy";



export const router = createBrowserRouter([
  {
    path: "/", element: <Layout />, children: [
      { index: true, element: <HomePage /> },
      { path: "blog", element: <Blog /> },
      { path: "blog/:id", element: <SinglePost /> },
      { path: "about", element: <About /> },
      { path: "ContactUs", element: <ContactUs /> },
      { path: "partners", element: <Partners /> },
      { path: "partners/:id", element: <ChaletDetails /> },
      { path: "Datapicker/:id", element: <Datapicker /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "signupUser", element: <SignUpUser /> },
      { path: "ForgetPassword", element: <ForgetPassword /> },
      { path: "UpdatePassword", element: <UpdatePassword /> },
      { path: "ResetPassword/:token", element: <ResetPassword /> },
      { path: 'Chat/:id', element: <Chat /> },
      { path: 'privacy', element: <Privacy /> },
      { path: 'terms', element: <Terms /> },
      { path: 'faq', element: <FAQ /> },
      {
        path: "OwnerDashboard", element: <OwnerDashboard />, children: [
          { index: true, element: <ControlsPage /> },
          { path: 'profile', element: <ProfilePage /> },
          { path: 'BalanceRecharge', element: <BalanceRechargePage /> },
          { path: 'support', element: <SupportPage /> },
          { path: 'TicketSend', element: <TicketSend /> },
          {
            path: 'notifications', element: <NotificationPage />, children: [
              { index: true, element: <AllNotification /> },
              { path: 'new', element: <NewNotification /> },
              { path: 'read', element: <ReadNotification /> },
            ]
          },
          { path: 'ChaletManagement', element: <ChaletManagement /> },
          { path: 'ManageReservations', element: <ManageReservations /> },
          { path: 'subscription', element: <SubscriptionOwner /> },
          { path: 'addChalet', element: <AddChalet /> },
          { path: 'SingleChaletManagement', element: <SingleChaletManagement /> },
          { path: 'editchlet', element: <EditChalet /> },
        ]
      },
      {
        path: "UserDashboard", element: <UserDashboard />, children: [

          { index: true, element: <Overview /> },
          { path: 'profile', element: <ProfileUser /> },
          { path: 'SupportUser', element: <SupportUser /> },
          {
            path: 'notifications-user', element: <UserNotificationPage />, children: [
              { index: true, element: <AllNotificationUser /> },
              { path: 'new', element: <NewNotificationUser /> },
              { path: 'read', element: <ReadNotificationUser /> },
            ]
          },
        ]
      },
      { path: '*', element: <NotFound /> }
    ],
  },
]);
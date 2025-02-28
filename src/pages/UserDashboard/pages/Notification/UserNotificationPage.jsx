import { Outlet } from "react-router-dom";
import HeaderUserNotification from "./layout/HeaderUserNotification";

export default function UserNotificationPage() {
    return (
        <>
            <HeaderUserNotification />
            <Outlet />
        </>
    )
}

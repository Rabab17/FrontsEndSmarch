import { useContext, useEffect } from "react";
import Splash from "../../../../../components/Splash";
import { notificationContext } from "../../../../../context/Notification";
import Pagination from "../../../../../components/Pagination";
import NotificationTemp from "./NotificationTemp";


export default function NewNotification() {

    const {
        getNotifications,
        notification,
        loading,
        setCurrentPage,
        currentPage,
        totalPages,
        toggleReadStatus,
    } = useContext(notificationContext)

    useEffect(() => {
        setCurrentPage(1);
        // console.log("currentPage: " + currentPage);
    }, []);

    useEffect(() => {
        // console.log("asdasddasds")
        getNotifications(false);
    }, [currentPage]);
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false, timeZone: 'UTC' };
        const date = new Date(dateString);
        const dateAr = new Intl.DateTimeFormat('ar-EG', options).format(date);

        return {
            date: dateAr.split("في ")[0],
            time: dateAr.split("في ")[1]
        }
    }

    if (loading) return (<Splash />)
    return (
        <>
            {notification?.map((notif, index) => (
                <div key={index} className="flex justify-center mt-7 px-4 sm:px-6 lg:px-8">
                    <NotificationTemp
                        notification={notif}
                        formatDate={formatDate}
                        toggleReadStatus={toggleReadStatus}
                        all={false}
                    />
                </div>
            ))}

            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />

        </>
    );
}
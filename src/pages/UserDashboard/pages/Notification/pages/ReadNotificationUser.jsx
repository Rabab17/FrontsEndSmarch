import { useContext, useEffect } from "react";
import { notificationContext } from "../../../../../context/Notification";
import Splash from "../../../../../components/Splash";
import NotificationTemp from "../../../../OwnerDashboard/pages/Notifications/pages/NotificationTemp";
import Pagination from "../../../../../components/Pagination";

export default function ReadNotificationUser() {
    const {
        getReadotifications,
        readNotification,
        loading,
        setCurrentPage,
        totalPages,
        currentPage
    } = useContext(notificationContext)

    useEffect(() => {
        setCurrentPage(1);
    }, []);

    useEffect(() => {
        getReadotifications()
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

            {readNotification?.map((notif, index) => (
                <div key={index} className="flex justify-center mt-7 px-4 sm:px-6 lg:px-8">
                    <NotificationTemp
                        notification={notif}
                        formatDate={formatDate}
                    />
                </div>
            ))}
            {readNotification.length != 0 &&
                <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
            }

        </>
    );
}
import axios from "axios";
import { useContext, useState } from "react";
import { useEffect } from "react";
import Splash from "../../../../../components/Splash";
import { notificationContext } from "../../../../../context/Notification";
import Pagination from "../../../../../components/Pagination";

export default function NewNotification() {
   
    const {getNewNotifications,
        newNotification,
        loading,
        setCurrentPage,
        currentPage,
        totalPages,
    }=useContext(notificationContext)

       

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
            {newNotification?.map((notification, index) => (
                <div key={index} className="flex justify-center mt-7 px-4 sm:px-6 lg:px-8">
                    <div className="flex  w-full max-w-4xl">
                        <div className="w-8/12 bg-[#E9F3FF] p-4 sm:p-5 rounded-t sm:rounded-l sm:rounded-tr-none">
                            <p className="text-xl sm:text-2xl font-medium"> {notification.title}</p>
                            <p className="text-base sm:text-lg mt-2">{notification.text}</p>
                        </div>
                        <div className="w-3/12 bg-[#E9F3FF] p-4 sm:p-5 rounded-b sm:rounded-r sm:rounded-bl-none text-left">
                            <p className="text-xs sm:text-sm lg:text-base">{formatDate(notification.createdAt).date}</p>
                            <p className="text-xs sm:text-sm mt-2">{formatDate(notification.createdAt).time}</p>
                        </div>
                    </div>
                </div>
            ))}

            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />

        </>
    );
}
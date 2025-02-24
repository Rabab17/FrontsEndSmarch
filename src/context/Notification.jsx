/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Pusher from "pusher-js";
import Swal from "sweetalert2";
export const notificationContext = createContext()

export default function NotificationContextProvider({ children }) {
    const token = localStorage.getItem("token")
    const [userId, setUserId] = useState(null);
    // Initialize as empty array instead of null
    // const [newNotification, setNewNotification] = useState([]);
    const [notification, setNotification] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, serTotalPages] = useState(1)
    const [numOfNewNotification, setnumOfNewNotification] = useState(0)
    const [numOfNotification, setnumOfNotification] = useState(0)



    // all notifications
    const getNotifications = async (isRead = null) => {
        setLoading(true)
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_URL_BACKEND}notification/user`, {
                headers: {
                    Authorization: token
                },
                params: {
                    page: currentPage,
                    ...(isRead !== null && { isRead })
                }
            })
            console.log(data)
            // Ensure we're setting an array
            // setNewNotification(data.data || [])
            setNotification(data.data || [])
            serTotalPages(data.pagination.totalPages)
            setnumOfNotification(data.pagination.totalItems)


        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "خطأ ",
                text: error.response.data.message,
                icon: "error",
                confirmButtonText: "حسنا",
            })
            // Set empty array on error
            // setNewNotification([])
            setNotification([])

        }
        setLoading(false)
    };



    // new notification
    const getNewNotifications = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_URL_BACKEND}notification/user`, {
                headers: {
                    Authorization: token
                },
                params: {
                    isRead: false
                }
            })
            console.log(data)
            // Ensure we're setting an array

            // serTotalPages(data.pagination.totalPages)
            setnumOfNewNotification(data.pagination.totalItems)

        } catch (error) {
            console.log(error);


        }
        setLoading(false)
    };

    //read notifications 


    useEffect(function () {
        getNewNotifications()
        getNotifications()
        var decode = jwtDecode(token);
        console.log("decode :" + decode);
        setUserId(decode.id);

    }, [])
    // useEffect(function () {

    //     getNewNotifications()
    // }, [currentPage])


    const toggleReadStatus = async (id) => {
        const token = localStorage.getItem("token");

        try {
            await axios.patch(
                `${import.meta.env.VITE_URL_BACKEND}notification/isRead/${id}`,
                {},
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            Swal.fire({
                title: "تم تغيير حالة التنبيه بنجاح",
                icon: "success",
                confirmButtonText: "موافق",
            });
            getNotifications()
            getNewNotifications()
            setCurrentPage(currentPage);

        } catch (error) {
            Swal.fire({
                title: "errors",
                text: error.response.data.massage,
                icon: "error",
                confirmButtonText: "موافق",
            });
            console.error("Failed to update notification status", error);
        }
    };



    useEffect(() => {
        if (!userId) return; // Add guard clause
        getNewNotifications()
        getNotifications()
        setCurrentPage(currentPage)
        const pusherNotification = new Pusher(import.meta.env.VITE_PUBLIC_PUSHER_KEY, {
            cluster: import.meta.env.VITE_PUBLIC_PUSHER_CLUSTER,
        });

        const channel = pusherNotification.subscribe(`notification-${userId}`);

        channel.bind('newNotification', function (notification2) {
            setnumOfNewNotification(prev => prev + 1)
            console.log("numOfNewNotification: " + numOfNewNotification)
            console.log(notification2)
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
            pusherNotification.disconnect();
        };

    }, [userId]);

    return <notificationContext.Provider value={{
        loading, setCurrentPage,
        currentPage, totalPages, toggleReadStatus,
        getNotifications, numOfNotification, notification, numOfNewNotification
    }}>
        {children}
    </notificationContext.Provider>

}
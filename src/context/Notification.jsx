/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Pusher from "pusher-js";
import Swal from "sweetalert2";
export const notificationContext = createContext()

export default function NotificationContextProvider({ children }) {
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);
    const [notification, setNotification] = useState([]);
    const [readNotification, setReadNotification] = useState([]);
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

            window.scrollTo(0, 0);

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

            setnumOfNewNotification(data.pagination.totalItems)

        } catch (error) {
            console.log(error);


        }
        setLoading(false)
    };



    const getReadotifications = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_URL_BACKEND}notification/user`, {
                headers: {
                    Authorization: token
                },
                params: {
                    isRead: true
                }
            })
            // console.log(data)

            setReadNotification(data.data)

        } catch (error) {
            console.log(error);


        }
        setLoading(false)
    };
    //read notifications 


    useEffect(() => {
        console.log("token in useEffect " + token);
        if (!token) return;
        console.log("token in useEffect " + token);

        getNewNotifications();
        getNotifications();
        getReadotifications();

        var decode = jwtDecode(token);
        setUserId(decode.id);
    }, [token]);
    useEffect(() => {
        console.log(token);
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const toggleReadStatus = async (id, all) => {
        const token = localStorage.getItem("token");
        // setLoadingRead(true)

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
            getNotifications(all)
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
        // finally {
        //     setLoadingRead(false)
        // }
    };



    useEffect(() => {
        if (!userId) return;
        getNewNotifications()
        getNotifications()
        setCurrentPage(currentPage)
        const pusherNotification = new Pusher(import.meta.env.VITE_PUBLIC_PUSHER_KEY, {
            cluster: import.meta.env.VITE_PUBLIC_PUSHER_CLUSTER,
        });

        const channel = pusherNotification.subscribe(`notification-${userId}`);

        channel.bind('newNotification', function (notification2) {
            setNotification(prevData => [notification2, ...prevData])

            setnumOfNewNotification(prev => prev + 1)
            // console.log("numOfNewNotification: " + numOfNewNotification)
            // console.log(notification2)
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
        getNotifications, numOfNotification, notification,
        numOfNewNotification, readNotification, getReadotifications, setToken
    }}>
        {children}
    </notificationContext.Provider>

}
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Pusher from "pusher-js";
export const notificationContext =createContext()

export default function NotificationContextProvider({ children }) {
    const token = localStorage.getItem("token")
    const [userId, setUserId] = useState(null);
    // Initialize as empty array instead of null
    const [newNotification, setNewNotification] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, serTotalPages] = useState(1)
    const [numOfNewNotification, setnumOfNewNotification] = useState(0)
    const setUser = () => {
      console.log("ok");
      
          var decode = jwtDecode(token);
          console.log(decode);
          setUserId(decode._id);
        
      }
    const getNewNotifications = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_URL_BACKEND}notification/user`, {
                headers: {
                    Authorization: token
                },
                params: {
                    page: currentPage
                }
            })
            
            // Ensure we're setting an array
            setNewNotification(data.data || [])
            serTotalPages(data.pagination.totalPages)
            setnumOfNewNotification(data.pagination.totalItems)

        } catch (error) {
            console.log(error);
            // Set empty array on error
            setNewNotification([])
        }
        setLoading(false)
    };
    useEffect(function () {
    
        getNewNotifications()
        console.log("ok");
      
          var decode = jwtDecode(token);
          console.log(decode);
          setUserId(decode.id);

    }, [])
    useEffect(function () {
    
        getNewNotifications()
    }, [currentPage])

    useEffect(() => {
        if (!userId) return; // Add guard clause
        
        const pusherNotification = new Pusher(import.meta.env.VITE_PUBLIC_PUSHER_KEY, {
            cluster: import.meta.env.VITE_PUBLIC_PUSHER_CLUSTER,
        });
        
        const channel = pusherNotification.subscribe(`notification-${userId}`);
  
        channel.bind('newNotification', function (notification) {
            setNewNotification(prev => {
                if (!Array.isArray(prev)) return [notification];
                const newNotify = [notification, ...prev];
                return newNotify.slice(0, prev.length); // Keep the same length
            });
            setnumOfNewNotification(prev => prev + 1)
        });
  
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
            pusherNotification.disconnect();
        };
      
    }, [userId]);
  
    return <notificationContext.Provider value={{ getNewNotifications, newNotification, loading, setCurrentPage, currentPage, totalPages , numOfNewNotification}}>
      {children}
    </notificationContext.Provider>
  
  }
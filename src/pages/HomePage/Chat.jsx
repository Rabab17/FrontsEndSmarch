import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Pusher from 'pusher-js';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { HiChatBubbleLeftRight } from "react-icons/hi2";

export default function Chat() {
    const { id } = useParams();
    const token = localStorage.getItem("token");
    const [ticket, setTicket] = useState(null);
    const [message, setMessage] = useState("");
    const messagesEndRef = useRef(null);

    const getTicketByChatId = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}chat/${id}`, {
                headers: { authorization: token },
            });
            setTicket(response.data.data);
        } catch (error) {
            console.log("Error fetching:", error);
        }
    };

    const sendMessage = async () => {
        if (!message.trim()) return; // Prevent sending empty messages
        try {
            await axios.post(`${import.meta.env.VITE_URL_BACKEND}chat/sendMessage/${id}`, { message }, {
                headers: { authorization: token }
            });
            setMessage(""); // Clear message input
            getTicketByChatId(); // Refresh messages
        } catch (error) {
            console.log("Error sending message:", error.response.data.message);
        }
    };

    useEffect(() => {
        getTicketByChatId(); // Fetch ticket on mount
    }, [id]);

    useEffect(() => {
        if (messagesEndRef.current && ticket?.messages?.length > 0) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [ticket?.messages]);

    useEffect(() => {
        const pusher = new Pusher(import.meta.env.VITE_PUBLIC_PUSHER_KEY, {
            cluster: import.meta.env.VITE_PUBLIC_PUSHER_CLUSTER,
        });

        const channel = pusher.subscribe(`message-${id}`);
        channel.bind("newMessage", (data) => {
            console.log("data",data);
            
            setTicket((prevTicket) => ({
                ...prevTicket,
                messages: data,
            }));
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [id]);

    const Message = ({ text, isUser, timestamp }) => {
        return (
            <div
                style={{
                    alignSelf: isUser ? "flex-end" : "flex-start",
                    maxWidth: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    backgroundColor: isUser ? "#3b82f6" : "#e5e7eb",
                    color: isUser ? "white" : "black",
                    wordBreak: "break-word",
                }}
            >
                {text}
                <div style={{ fontSize: "10px", color: "#6b7280", marginTop: "4px" }}>
                    {new Date(timestamp).toLocaleTimeString()}
                </div>
            </div>
        );
    };

    if (!ticket) {
        return <p>جاري تحميل البيانات...</p>;
    }

    return (
        <div className="p-6 bg-gray-100 grid grid-cols-1 md:grid-cols-12 gap-4 h-screen">
            <div className="col-span-1 md:col-span-9 bg-white shadow-md rounded-lg flex flex-col h-full">
                <h3 className="text-lg font-semibold text-blue-600 p-4">متابعة تذكرة الدعم</h3>
                <div
                    className="flex-1 overflow-auto p-4 max-h-[calc(100vh-200px)]"
                    style={{
                        scrollbarWidth: "thin", /* Firefox */
                        scrollbarColor: "#4f46e5 #e5e7eb", /* Firefox */
                    }}
                >
                    {ticket?.messages?.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                            <HiChatBubbleLeftRight className="w-16 h-16 text-gray-400 animate-bounce" />
                            <p className="mt-2">لا توجد رسائل حتى الآن، يمكنك بدء المحادثة الآن.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            {ticket?.messages?.map((msg, index) => {
                                const isUser = msg.senderRole === "user";
                                return (
                                    <div key={index} className={`flex items-start gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
                                        <Stack direction="row" spacing={2}>
                                            <Avatar>{isUser ? "U" : "A"}</Avatar>
                                        </Stack>
                                        <div className={`${isUser ? "text-right" : "text-left"}`}>
                                            <Message text={msg.message} isUser={isUser} timestamp={msg.timestamp} />
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>
                {ticket?.status !== "closed" && (
                    <div className="p-4 bg-white border-t flex items-center gap-2 sticky bottom-0">
                        <textarea
                            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            rows="2"
                            placeholder="اكتب رسالتك هنا..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                            onClick={sendMessage}
                        >
                            إرسال
                        </button>
                    </div>
                )}
                {ticket?.status === "closed" && <p className="text-center text-gray-500 p-4">تم غلق تذكرة الدعم</p>}
            </div>
        </div>
    );
}
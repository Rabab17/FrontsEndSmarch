/* eslint-disable react/prop-types */
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Pusher from 'pusher-js';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import Splash from '../../components/Splash';

export default function Chat() {
    const { id } = useParams();
    const token = localStorage.getItem("token");
    const [ticket, setTicket] = useState(null);
    const [message, setMessage] = useState("");
    const messagesEndRef = useRef(null);
    const nav = useNavigate()
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
        if (!token) nav('/')
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
            console.log("data", data);

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

    const Message = ({ text, isOwner }) => {
        return (
            <div
                style={{
                    alignSelf: isOwner ? "flex-start" : " flex-end",
                    maxWidth: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    backgroundColor: isOwner ? "#e5e7eb" : "#3b82f6",
                    color: isOwner ? "black" : " white",
                    wordBreak: "break-word",
                }}
            >
                {text}

            </div>
        );
    };

    if (!ticket) {
        return <Splash />;
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
                        <div className="text-gray-500  flex flex-col items-center justify-center h-full">
                            <HiChatBubbleLeftRight className="w-16 h-16 text-gray-400 animate-bounce" />
                            <p className="mt-2">لا توجد رسائل حتى الآن، يمكنك بدء المحادثة الآن.</p>
                        </div>
                    ) : (
                        <div className="w-full flex flex-col space-y-4">
                            {ticket?.messages?.map((msg, index) => {
                                const isOwner = msg.senderRole === "owner";
                                const messageTime = new Date(msg.timestamp).toLocaleString("ar-EG", {
                                    weekday: "short", // اسم اليوم (مثل: السبت)
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true // لعرض الوقت بصيغة 12 ساعة
                                });
                                return (
                                    <div key={index} className={`flex items-start gap-2 ${isOwner ? "flex-row" : " flex-row-reverse"}`}>
                                        <Stack direction="row" spacing={2}>
                                            <Avatar>{isOwner ? "A" : "U"}</Avatar>
                                        </Stack>
                                        <div className={`${isOwner ? "text-left" : "text-right"}`}>
                                            <Message text={msg.message} isOwner={isOwner} />
                                            <p className={`text-xs text-gray-500 ${isOwner ? 'text-right' : ' text-end'}`}>{messageTime}</p>
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
                            placeholder="اكتب رسالتك هنا..."
                        >
                            إرسال
                        </button>
                    </div>
                )}
                {ticket?.status === "closed" && <p className="text-center text-gray-500 p-4">تم غلق تذكرة الدعم</p>}
            </div>
            <div className="col-span-1 md:col-span-3 bg-white shadow-md rounded-lg p-4 w-full md:w-fit self-start">
                <h3 className="text-lg font-semibold text-blue-600 mb-3">معلومات</h3>
                <p><strong>العميل:</strong> {ticket?.ticketID.sender.userName}</p>
                <p><strong>الحالة:</strong> {ticket?.status}</p>
                <p><strong>تاريخ الإنشاء:</strong> {new Date(ticket?.createdAt).toLocaleString("en-US")}</p>
                <p><strong>آخر تحديث:</strong> {new Date(ticket?.updatedAt).toLocaleString("en-US")}</p>
            </div>
        </div>
    );
}
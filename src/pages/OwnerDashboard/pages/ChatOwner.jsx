import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { HiChatBubbleLeftRight } from "react-icons/hi2";

export default function ChatOwner() {
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
            console.log("Error fetching :", error);
        }
    };

    const sendMessage = async () => {
        if (!message.trim()) return;
        try {
            await axios.post(`${import.meta.env.VITE_URL_BACKEND}chat/sendMessage/${id}`,
                { message },
                { headers: { authorization: token } }
            );
            setMessage("");
            getTicketByChatId();
        } catch (error) {
            console.log("Error sending message:", error.response.data.message);
        }
    };

    useEffect(() => {
        getTicketByChatId();
    }, [id]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [ticket]);

    if (!ticket) {
        return <p>جاري تحميل البيانات...</p>;
    }

    return (
        <div className="p-6 bg-gray-100 grid grid-cols-1 md:grid-cols-12 gap-4 h-screen">
            {/* صندوق الرسائل */}
            <div className="col-span-1 md:col-span-9 bg-white shadow-md rounded-lg flex flex-col h-full">
                <h3 className="text-lg font-semibold text-blue-600 p-4">متابعة تذكرة الدعم</h3>
                <div className="flex-1 overflow-auto p-4 max-h-[calc(100vh-200px)]">
                    {ticket?.messages?.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                            <HiChatBubbleLeftRight className="w-16 h-16 text-gray-400 animate-bounce" />
                            <p className="mt-2">لا توجد رسائل حتى الآن، يمكنك بدء المحادثة الآن.</p>
                        </div>
                    ) : (
                        <div className="w-full flex flex-col space-y-4">
                            {ticket?.messages?.map((msg, index) => {
                                const isAdmin = msg.senderRole === "admin";
                                return (
                                    <div key={index} className={`flex items-start gap-2 ${isAdmin ? "flex-row" : "flex-row-reverse"}`}>
                                        <Stack direction="row" spacing={2}>
                                            <Avatar>{isAdmin ? "A" : "O"}</Avatar>
                                        </Stack>
                                        <div className={`${isAdmin ? "text-left" : "text-right"}`}>
                                            <p className={`p-2 rounded-md ${isAdmin ? "bg-gray-200" : "bg-blue-500 text-white"}`}>
                                                {msg.message}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>
                {/* إدخال الرسالة */}
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
            {/* صندوق المعلومات */}
            <div className="col-span-1 md:col-span-3 bg-white shadow-md rounded-lg p-4 w-full md:w-fit self-start">
                <h3 className="text-lg font-semibold text-blue-600 mb-3">معلومات</h3>
                <p><strong>الحالة:</strong> {ticket?.status}</p>
                <p><strong>تاريخ الإنشاء:</strong> {new Date(ticket?.createdAt).toLocaleString("en-US")}</p>
                <p><strong>آخر تحديث:</strong> {new Date(ticket?.updatedAt).toLocaleString("en-US")}</p>
            </div>
        </div>
    );
}

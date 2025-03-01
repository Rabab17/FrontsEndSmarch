import axios from 'axios';
import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import Avatar from '@mui/material/Avatar';
// import Stack from '@mui/material/Stack';
import { HiChatBubbleLeftRight } from "react-icons/hi2";

export default function ChatOwner() {
    const { id } = useParams(); // الحصول على id من params
    const token = localStorage.getItem("token");
    console.log("token",token);
    
    const [ticket, setTicket] = useState(null);
    const [message, setMessage] = useState("");

    // دالة لجلب بيانات التذكرة باستخدام id
    const getTicketByChatId = async () => {
        console.log(id)
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/chat/${id}`, {
                headers: token ,
            });
            console.log("respons",response);
            setTicket(response.data.data); // تعيين بيانات التذكرة
        } catch (error) {
            console.log("Error fetching ticket:", error);
        }
    };

    // دالة لإرسال رسالة جديدة
    const sendMessage = async () => {
        if (!message.trim()) return; // التحقق من عدم إرسال رسالة فارغة

        try {
            await axios.post(`${import.meta.env.VITE_URL_BACKEND}/chat/sendMessage/${id}`, 
                { message }, 
                { headers: { authorization: token } }
            );
            setMessage(""); // إعادة تعيين حقل الرسالة
            getTicketByChatId(); // تحديث البيانات بعد إرسال الرسالة
        } catch (error) {
            console.log("Error sending message:", error.response.data.message);
        }
    };

    // استخدام useEffect لجلب بيانات التذكرة عند تحميل المكون
    useEffect(() => {
        getTicketByChatId(); // جلب بيانات التذكرة عند تحميل المكون
    }, [id]); // إضافة id كاعتماد لتحديث البيانات عند تغييره

    // عرض رسالة تحميل البيانات إذا لم تكن التذكرة موجودة بعد
    if (!ticket) {
        return <p>جاري تحميل البيانات...</p>;
    }

    return (
        <div className="p-6 bg-gray-100 grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* صندوق الرسائل */}
            <div className="col-span-1 md:col-span-9 bg-white shadow-md rounded-lg p-4 flex flex-col">
                <h3 className="text-lg font-semibold text-blue-600 mb-3">متابعة تذكرة الدعم</h3>
                <div className="flex-1 space-y-4 overflow-auto max-h-[400px] flex flex-col items-center justify-center">
                    {ticket?.messages?.length === 0 ? (
                        <div className="text-center text-gray-500 flex flex-col items-center">
                            <HiChatBubbleLeftRight className="w-16 h-16 text-gray-400 animate-bounce" />
                            <p className="mt-2">لا توجد رسائل حتى الآن، يمكنك بدء المحادثة الآن.</p>
                        </div>
                    ) : (
                        <div className="w-full flex flex-col space-y-4">
                            {ticket?.messages?.map((msg, index) => {
                                const isAdmin = msg.senderRole === "admin"; // تحديد ما إذا كان المرسل هو المسؤول
                                return (
                                    <div key={index} className={`flex items-start gap-2 ${isAdmin ? "flex-row" : "flex-row-reverse"}`}>
                                        {/* <Stack direction="row" spacing={2}>
                                            <Avatar>{isAdmin ? "A" : "O"}</Avatar>
                                        </Stack> */}
                                        <div className={`${isAdmin ? "text-left" : "text-right"}`}>
                                            <p className={`p-2 rounded-md ${isAdmin ? "bg-gray-200" : "bg-blue-500 text-white"}`}>
                                                {msg.message}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* إدخال الرسالة أو رسالة الإغلاق */}
                {ticket?.status === "closed" ? (
                    <p className="mt-4 text-center text-gray-500">تم غلق تذكرة الدعم</p>
                ) : (
                    <div className="mt-4 flex items-center gap-2">
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
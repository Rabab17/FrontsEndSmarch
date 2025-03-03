/* eslint-disable react/prop-types */
import { MdMarkEmailRead } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function NotificationTemp({ notification, formatDate, toggleReadStatus, all = null }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleNavigate = (id, all) => {
        toggleReadStatus(id, all);
        switch (notification.type) {
            case "Reservation":
                {
                    notification.recipientRole == 'user' ?
                        navigate("/UserDashboard") :
                        navigate("/OwnerDashboard/ManageReservations")
                }
                break;
            case "Ticket":
                navigate("/OwnerDashboard/support");
                break;
            case "Subscription":
                navigate("/ownerdashboard/Subscription");
                break;
            case "Chalet":
                navigate("/ownerdashboard/ChaletManagement");
                break;
            case "Chat":
                navigate(`/chat/${notification.relatedEntityId}`);
                break;
            default:
                navigate(`/`);
        }
    };

    const handleMarkAsRead = async (e) => {
        e.stopPropagation();
        setLoading(true); // تشغيل اللودينج لهذا الإشعار فقط
        await toggleReadStatus(notification._id, all);
        setLoading(false); // إيقاف اللودينج بعد انتهاء العملية
    };

    return (
        <div className={`flex w-full justify-between max-w-3xl border rounded-lg py-2 px-3 shadow-md transition-all duration-300  border-blue-400 cursor-pointer ${notification.isRead ? '' : 'bg-blue-100'}`}
            onClick={() => { handleNavigate(notification._id, all) }}>
            <div className="w-8/12 p-4 sm:p-5 rounded-t sm:rounded-l sm:rounded-tr-none">
                <p className="text-xl sm:text-2xl text-blue-700 font-semibold">{notification.title}</p>
                <p className="text-base sm:text-lg text-blue-700 mt-2">{notification.text}</p>
                {!notification.isRead &&
                    <div className="mt-2 text-sm text-blue-500 font-semibold">إشعار جديد 🔔</div>
                }
            </div>
            <div className="w-3/12 p-4 sm:p-5 rounded-b sm:rounded-r sm:rounded-bl-none text-left">
                <p className="text-xs sm:text-sm lg:text-base">{formatDate(notification.createdAt).date}</p>
                <p className="text-xs sm:text-sm mt-2">{formatDate(notification.createdAt).time}</p>

                {!notification.isRead && (
                    <div
                        onClick={handleMarkAsRead}
                        className="flex items-center justify-evenly mt-2 py-1 bg-green-500 rounded-lg shadow-sm hover:bg-green-600 transition duration-200 cursor-pointer"
                    >
                        {loading ? (
                            <>
                                <p className="mx-5">تمييز كمقروء</p>
                                <div className="w-5 h-5 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                            </>
                        ) : (
                            <>
                                <h1>تمييز كمقروء</h1>
                                <MdMarkEmailRead size={20} />
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}


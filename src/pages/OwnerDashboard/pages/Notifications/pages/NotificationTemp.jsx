/* eslint-disable react/prop-types */
import { MdMarkEmailRead } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function NotificationTemp({ notification, formatDate, toggleReadStatus }) {
    const navigate = useNavigate();
    const handleNavigate = () => {
        switch (notification.type) {
            case "Reservation":
                navigate("/OwnerDashboard/ManageReservations");
                break;
            case "Ticket":
                navigate("/OwnerDashboard/support");
                break;
            case "Subscription":
                navigate("/ownerdashboard/BalanceRecharge");
                break;
            case "Chalet":
                navigate("/ownerdashboard/ChaletManagement");
                break;
            default:
                navigate(`/`);
        }
    };
    return (
        <div className="flex w-full justify-between max-w-3xl border rounded-lg py-2 px-3 shadow-md transition-all duration-300 bg-blue-50 border-blue-400"
            onClick={handleNavigate}>
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

                {!notification.isRead &&
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleReadStatus(notification._id);
                        }}
                        className="flex items-center justify-evenly mt-2 py-1 bg-green-500 rounded-lg shadow-sm hover:bg-green-600 transition duration-200 cursor-pointer"
                    >
                        <h1>تميز ك مقروء</h1>
                        <MdMarkEmailRead size={20} />
                    </div>
                }
            </div>
        </div>
    );
}

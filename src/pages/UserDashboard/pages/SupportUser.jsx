import { useEffect, useState } from "react";
import axios from "axios";
import TicketModal from "./TicketModal"; // Import the TicketModal component
import Splash from "../../../components/Splash";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function Overview() {
    const [tickets, setTickets] = useState([]); // State to store tickets
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    const [selectedOwnerID, setSelectedOwnerID] = useState(null); // State to store selected owner ID
    const [currentPage, setCurrentPage] = useState(1); // Current page
    const [totalPages, setTotalPages] = useState(1); // Total pages
    const [numOfTicketsClosed, setNumOfTicketsClosed] = useState(0); // Number of closed tickets
    const [numOfTicketsOpen, setNumOfTicketsOpen] = useState(0); // Number of open tickets
    const [numOfTicketsPending, setNumOfTicketsPending] = useState(0); // Number of pending tickets
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchTickets = async () => {
            const token = localStorage.getItem("token");

            try {
                const response = await axios.get(`https://smarch-back-end-nine.vercel.app/ticket/user?page=${currentPage}`, {
                    headers: {
                        Authorization: token,
                    },
                });

                if (response.data.status === "success") {
                    setTickets(response.data.data);
                    setTotalPages(response.data.pagination.totalPages); // Set total pages
                    setNumOfTicketsClosed(response.data.numOfTicketsClosed); // Set closed tickets count
                    setNumOfTicketsOpen(response.data.numOfTicketsOpen); // Set open tickets count
                    setNumOfTicketsPending(response.data.numOfTicketsPending); // Set pending tickets count
                    console.log("response.data.data", response.data);
                } else {
                    setError("فشل في استرجاع البيانات.");
                }
            } catch (err) {
                console.error("Error fetching tickets:", err);
                setError("حدث خطأ أثناء استرجاع البيانات.");
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, [currentPage]); // Fetch tickets when currentPage changes

    if (loading) {
        return <Splash />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="p-6 space-y-6">
            {/* عرض عدد التذاكر في بطاقات */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold">عدد التذاكر المفتوحة</h3>
                    <p className="text-2xl font-bold">{numOfTicketsOpen}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold">عدد التذاكر المغلقة</h3>
                    <p className="text-2xl font-bold">{numOfTicketsClosed}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold">عدد التذاكر قيد الانتظار</h3>
                    <p className="text-2xl font-bold">{numOfTicketsPending}</p>
                </div>
            </div>

            {/* الجدول */}
            <div className="bg-white p-4 rounded-lg shadow">
                <table className="w-full">
                    <thead>
                        <tr className="text-[#0061E0] p-2 text-xl">
                            <th>اسم المستلم</th>
                            <th>البريد الإلكتروني</th>
                            <th>الموضوع</th>
                            <th>حالة التذكرة</th>
                            <th>تاريخ الإنشاء</th>
                            <th>الإجراء</th> {/* إضافة عمود للإجراء */}
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map((ticket) => (
                            <tr key={ticket._id}>
                                <td className="py-5 px-2 text-center text-lg">{ticket.recipient.userName}</td>
                                <td className="py-5 px-2 text-center text-lg">{ticket.recipient.email}</td>
                                <td className="py-5 px-2 text-center text-lg">{ticket.subject}</td>
                                <td className="py-5 px-2 text-center text-lg">
                                    <span className={`px-3 py-1 text-white ${ticket.status === "pending" ? "bg-yellow-500" : ticket.status === "closed" ? "bg-red-500" : "bg-green-500"} rounded-lg`}>
                                        {ticket.status === "pending" ? "قيد الانتظار" : ticket.status === "closed" ? "مغلق" : "مكتمل"}
                                    </span>
                                </td>
                                <td className="py-5 px-2 text-center text-lg">{new Date(ticket.createdAt).toLocaleDateString()}</td>
                                <td className="py-5 px-2 text-center text-lg">
                                    {ticket.chatID ? ( // تحقق مما إذا كان هناك chatID
                                        <button 
                                            onClick={() => navigate(`/Chat/${ticket.chatID}`)} 
                                            className="text-blue-500 hover:underline"
                                        >
                                            عرض المحادثة
                                        </button>
                                    ) : (
                                        <span>لا يوجد شات</span> 
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* أزرار التنقل بين الصفحات */}
            {totalPages > 1 && ( // Show pagination only if there are more than 1 page
                <nav aria-label="Page navigation example" className="flex justify-center">
                    <ul className="inline-flex -space-x-px text-sm">
                        <li>
                            <button 
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                                disabled={currentPage === 1}
                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
                            >
                                السابق
                            </button>
                        </li>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li key={index}>
                                <button 
                                    onClick={() => setCurrentPage(index + 1)} 
                                    className={`flex items-center justify-center px-3 h-8 leading-tight ${currentPage === index + 1 ? 'text-blue-600 border border-gray-300 bg-blue-50' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'}`}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                        <li>
                            <button 
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                                disabled={currentPage === totalPages}
                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
                            >
                                التالى 
                            </button>
                        </li>
                    </ul>
                </nav>
            )}

            {/* Modal for support ticket */}
            <TicketModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} ownerID={selectedOwnerID} /> {/* Pass ownerID to the modal */}
        </div>
    );
}
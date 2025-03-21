import { useEffect, useState } from "react";
import axios from "axios";
import TicketModal from "./TicketModal"; // Import the TicketModal component
import Splash from "../../../components/Splash";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Pagination from "../../../components/Pagination";

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
                const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}ticket/user?page=${currentPage}`, {
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

            {tickets.length > 0 ?
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
                    <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
                </div> :
                <div className="text-center text-lg font-semibold">لا توجد تذاكر بعد.</div>
            }



            {/* Modal for support ticket */}
            <TicketModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} ownerID={selectedOwnerID} /> {/* Pass ownerID to the modal */}
        </div>
    );
}
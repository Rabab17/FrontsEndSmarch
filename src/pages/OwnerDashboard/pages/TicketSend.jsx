import { useState, useEffect } from "react";
import axios from "axios";
import TicketModal from "../../UserDashboard/pages/TicketModal";
import Splash from "../../../components/Splash";
import Pagination from "../../../components/Pagination";

export default function TicketSend() {
    const [tickets, setTickets] = useState([]); // حالة لتخزين التذاكر
    const [loading, setLoading] = useState(true); // حالة لتحميل البيانات
    const [error, setError] = useState(null); // حالة لتخزين الأخطاء
    const [currentPage, setCurrentPage] = useState(1); // الصفحة الحالية
    const [totalPages, setTotalPages] = useState(1); // إجمالي الصفحات
    const [isModalOpen, setIsModalOpen] = useState(false); // حالة لفتح وإغلاق نافذة إنشاء التذكرة

    const fetchTickets = async () => {
        const token = localStorage.getItem('token');
        console.log(token);

        try {
            const response = await axios.get(`https://smarch-back-end-nine.vercel.app/ticket/owner/send?page=${currentPage}&limit=10`, {
                headers: {
                    'Authorization': token
                }
            });
            console.log(response.data);

            if (response.data.status === 'success' && Array.isArray(response.data.data)) {
                setTickets(response.data.data);
                setTotalPages(response.data.pagination.totalPages);
            } else {
                throw new Error("Unexpected data format");
            }

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, [currentPage]);

    if (loading) return <div><Splash /></div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-6 space-y-6">
            <button
                onClick={() => setIsModalOpen(true)} // فتح نافذة إنشاء التذكرة
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
                إنشاء تذكرة جديدة
            </button>
            {tickets.length == 0 ? <div>
                <h2 className="text-3xl text-center text-gray-500 mt-12">
                    لا توجد لديك تذاكر حتى الان
                </h2>
            </div> :
                <>
                    <div className="p-4 rounded-lg shadow">
                        <table className="w-full">
                            <thead>
                                <tr className="text-[#0061E0] p-2 text-xl">
                                    <th>رقم التذكره</th>
                                    <th>تاريخ الارسال</th>
                                    <th>الموضوع</th>
                                    <th>الحاله</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(tickets) && (
                                    tickets.map((ticket, index) => (
                                        <tr key={ticket._id}>
                                            <td className="py-5 px-2 text-center text-lg">{(currentPage - 1) * 10 + index + 1}</td>
                                            <td className="py-5 px-2 text-center text-lg">{new Date(ticket.createdAt).toLocaleDateString()}</td>
                                            <td className="py-5 px-2 text-center text-lg">{ticket.subject}</td>
                                            <td className="py-5 px-2 text-center text-lg">
                                                <span className={`px-3 py-1 text-white ${ticket.status === 'pending' ? 'bg-yellow-500' : ticket.status === 'complete' ? 'bg-green-500' : 'bg-red-500'} rounded-lg`}>
                                                    {ticket.status === 'pending' ? 'قيد الانتظار' : ticket.status === 'complete' ? 'مكتمل' : 'مغلق'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    < Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
                </>

            }

            {/* Modal for creating a ticket */}
            <TicketModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}
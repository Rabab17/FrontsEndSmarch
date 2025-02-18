import { useState, useEffect } from "react";
import axios from "axios";
import TicketModal from "../../UserDashboard/pages/TicketModal";
import Swal from "sweetalert2"; // Import SweetAlert2
import Splash from "../../../components/Splash";

export default function SupportPage() {
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
            const response = await axios.get(`https://smarch-back-end-nine.vercel.app/ticket/owner?page=${currentPage}&limit=10`, {
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

    const updateStatus = async (ticketId, newStatus) => {
        const token = localStorage.getItem('token');
        console.log("id", ticketId);
        try {
            await axios.patch(`https://smarch-back-end-nine.vercel.app/ticket/updateStatus/${ticketId}`, { status: newStatus }, {
                headers: {
                    'Authorization': token
                }
            });
            fetchTickets();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleCloseConfirmation = (ticketId) => {
        Swal.fire({
            title: 'هل أنت متأكد أنك تريد غلق هذه الحالة؟',
            text: "لا يمكنك التراجع عن هذا!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'نعم، أغلقها!',
            cancelButtonText: 'لا '
        }).then((result) => {
            if (result.isConfirmed) {
                updateStatus(ticketId, 'closed'); // غلق الحالة
                Swal.fire(
                    'مغلق!',
                    'تم غلق الحالة بنجاح.',
                    'success'
                );
            }
        });
    };

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

            <div className="p-4 rounded-lg shadow">
                <table className="w-full">
                    <thead>
                        <tr className="text-[#0061E0] p-2 text-xl">
                            <th>رقم التذكره</th>
                            <th>اسم المستخدم</th>
                            <th>تاريخ الارسال</th>
                            <th>الموضوع</th>
                            <th>الحاله</th>
                            <th>غلق هذه الحاله</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(tickets) && tickets.length > 0 ? (
                            tickets.map((ticket, index) => (
                                <tr key={ticket._id}>
                                    <td className="py-5 px-2 text-center text-lg">{(currentPage - 1) * 10 + index + 1}</td>
                                    <td className="py-5 px-2 text-center text-lg">{ticket.sender.userName}</td>
                                    <td className="py-5 px-2 text-center text-lg">{new Date(ticket.createdAt).toLocaleDateString()}</td>
                                    <td className="py-5 px-2 text-center text-lg">{ticket.subject}</td>
                                    <td className="py-5 px-2 text-center text-lg">
                                        <span className={`px-3 py-1 text-white ${ticket.status === 'pending' ? 'bg-yellow-500' : ticket.status === 'complete' ? 'bg-green-500' : 'bg-red-500'} rounded-lg`}>
                                            {ticket.status === 'pending' ? 'قيد الانتظار' : ticket.status === 'complete' ? 'مكتمل' : 'مغلق'}
                                        </span>
                                    </td>
                                    <td className="py-5 px-2 text-center text-lg">
                                        <button 
                                            onClick={() => handleCloseConfirmation(ticket._id)} 
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                        >
                                            غلق
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">لا توجد تذاكر لعرضها</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
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
                                التالي
                            </button>
                        </li>
                    </ul>
                </nav>
            )}

            {/* Modal for creating a ticket */}
            <TicketModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </div>
    );
}
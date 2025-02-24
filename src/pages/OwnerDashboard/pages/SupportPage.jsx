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

    const fetchTickets = async () => {
        const token = localStorage.getItem('token');
        console.log(token);

        try {
            const response = await axios.get(`https://smarch-back-end-nine.vercel.app/ticket/owner?page=${currentPage}&limit=10`, {
                headers: {
                    'Authorization': token
                }
            });
            console.log("respons",response.data);

            if (response.data.status === 'success' && Array.isArray(response.data.data)) {
                setTickets(response.data.data);
                setTotalPages(response.data.pagination.totalPages);
            } else {
                throw new Error("Unexpected data format");
            }

        } catch (err) {
            setError("فشل في تحميل التذاكر. يرجى المحاولة مرة أخرى."); // Updated error message
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, [currentPage]);

    const updateStatus = async (ticketId, newStatus) => {
        const token = localStorage.getItem('token');
        console.log("hamada");
        
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

    const getTicketByChatId = async (chatId, id, status) => {
        const token = localStorage.getItem('token');
        console.log("iddd",id);
        console.log("tokenid",token);
        
        
        if (status === 'closed') {
            Swal.fire("التذكرة مغلقة!!", "لا يمكنك فتح محادثة لهذه التذكرة", "warning");
            return; // لا تتابع إذا كانت التذكرة مغلقة
        }

        if (chatId) {
            // Fetch chat details
            try {
                const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/chat/${chatId}`, {
                    headers: { authorization: token },
                });
                console.log("Chat details:", response.data);
                // Handle chat details (e.g., open a chat modal)
            } catch (error) {
                console.log("Error fetching chat details:", error);
            }
        } else {
            // Create a new chat
            Swal.fire({
                title: "هل تريد إنشاء محادثة جديدة؟",
                icon: "warning",
                confirmButtonText: "موافق",
                showCancelButton: true,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const response = await axios.post(
                            `${import.meta.env.VITE_URL_BACKEND}/chat/create`, 
                            { ticketID: id }, 
                            {
                                headers:  token ,
                            }
                        );
                        console.log("id", { ticketID: id });
                        Swal.fire({
                            title: "تم إنشاء المحادثة",
                            icon: "success",
                            confirmButtonText: "موافق",
                        });
                        console.log(response.data.data);
                    } catch (error) {
                        console.log(error);
                    }
                }
            });
        }
    };

  

    if (loading) return <div><Splash /></div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-6 space-y-6">
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
                                            className=" text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M12 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V12" stroke="#0061E0" />
                                                <path d="M18.375 2.62523C18.7728 2.2274 19.3124 2.00391 19.875 2.00391C20.4376 2.00391 20.9771 2.2274 21.375 2.62523C21.7728 3.02305 21.9963 3.56262 21.9963 4.12523C21.9963 4.68784 21.7728 5.2274 21.375 5.62523L12.362 14.6392C12.1245 14.8765 11.8312 15.0501 11.509 15.1442L8.63597 15.9842C8.54992 16.0093 8.45871 16.0108 8.37188 15.9886C8.28505 15.9663 8.2058 15.9212 8.14242 15.8578C8.07904 15.7944 8.03386 15.7151 8.01162 15.6283C7.98937 15.5415 7.99087 15.4503 8.01597 15.3642L8.85597 12.4912C8.9505 12.1693 9.12451 11.8763 9.36197 11.6392L18.375 2.62523Z" stroke="#0061E0" />
                                            </svg>
                                        </button>
                                    </td>
                                    <td className="p-2 text-center">
                                        <button className="text-blue-500 hover:underline" onClick={() => getTicketByChatId(ticket.chatID, ticket._id, ticket.status)}>
                                            عرض المحادثة {/* نص الزر */}
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
           
        </div>
    );
}
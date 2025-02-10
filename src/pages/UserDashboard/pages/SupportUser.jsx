import { useState, useEffect } from "react";
import axios from "axios";

export default function SupportUser() {
    const [tickets, setTickets] = useState([]); // حالة لتخزين التذاكر
    const [loading, setLoading] = useState(true); // حالة لتحميل البيانات
    const [error, setError] = useState(null); // حالة لتخزين الأخطاء
    const [currentPage, setCurrentPage] = useState(1); // الصفحة الحالية
    const [totalPages, setTotalPages] = useState(1); // إجمالي الصفحات

    useEffect(() => {
        const fetchTickets = async () => {
            const token = localStorage.getItem('token'); // استرجاع التوكن من localStorage
            try {
                const response = await axios.get(`https://smarch-back-end-nine.vercel.app/ticket/user?page=${currentPage}`, {
                    headers: {
                        'Authorization': token 
                    }
                });
                // تعيين التذاكر إلى response.data
                if (response.data.status === 'success' && Array.isArray(response.data.data)) {
                    setTickets(response.data.data); 
                    setTotalPages(response.data.pagination.totalPages); // تعيين إجمالي الصفحات
                } else {
                    throw new Error("Unexpected data format");
                }
                console.log("response", response.data);
                
            } catch (err) {
                setError(err.message); 
            } finally {
                setLoading(false); 
            }
        };

        fetchTickets(); 
    }, [currentPage]); // إعادة تحميل البيانات عند تغيير الصفحة

    if (loading) return <div>Loading...</div>; 
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
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(tickets) && tickets.length > 0 ? (
                            tickets.map((ticket, index) => (
                                <tr key={ticket._id}>
                                    <td className="py-5 px-2 text-center text-lg">{(currentPage - 1) * 10 + index + 1}</td> {/* حساب رقم التذكرة */}
                                    <td className="py-5 px-2 text-center text-lg">{ticket.recipient.userName}</td>
                                    <td className="py-5 px-2 text-center text-lg">{new Date(ticket.createdAt).toLocaleDateString()}</td> {/* تحويل التاريخ إلى تنسيق محلي */}
                                    <td className="py-5 px-2 text-center text-lg">{ticket.subject}</td>
                                    <td className="py-5 px-2 text-center text-lg">
                                        <span className={`px-3 py-1 text-white ${ticket.status === 'pending' ? 'bg-yellow-500' : ticket.status === 'complete' ? 'bg-green-500' : 'bg-red-500'} rounded-lg`}>
                                            {ticket.status === 'pending' ? 'قيد الانتظار' : ticket.status === 'complete' ? 'مكتمل' : 'مغلق'}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">لا توجد تذاكر لعرضها</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* أزرار التنقل بين الصفحات */}
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
        </div>
    );
}
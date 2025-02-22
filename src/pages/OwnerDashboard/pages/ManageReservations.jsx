import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2"; // تأكد من تثبيت sweetalert2
import Splash from "../../../components/Splash";

export default function ManageReservations() {
    const token = localStorage.getItem("token");
    const [bookings, setBookings] = useState([]); // حالة للحجوزات
    const [revenue, setRevenue] = useState(0); // حالة للإيرادات
    const [numberOfReservations, setNumberOfReservations] = useState(0); // عدد الحجوزات
    const [numberOfClients, setNumberOfClients] = useState(0); // عدد العملاء
    const [currentPage, setCurrentPage] = useState(1); // الصفحة الحالية
    const [totalPages, setTotalPages] = useState(1); // إجمالي الصفحات
    const [loading, setLoading] = useState(true);

    const fetchUserData = async (page) => {
        setLoading(true); 
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}reservation/owner`, {
                headers: {
                    authorization: token
                },
                params: { page }
            });
            console.log("بيانات المستخدم:", response.data);
            const userData = response.data.data;

            setBookings(userData);
            setRevenue(response.data.Revenue);
            setNumberOfReservations(response.data.numberOfReservations);
            setNumberOfClients(response.data.numberOfClients);
            setTotalPages(response.data.pagination.totalPages);
        } catch (error) {
            console.error("خطأ في استرجاع بيانات المستخدم:", error);
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        fetchUserData(currentPage);
    }, [currentPage]);

    const updateStatus = async (id, newStatus) => {
        try {
            await axios.patch(`${import.meta.env.VITE_URL_BACKEND}reservation/status/${id}`, { status: newStatus }, {
                headers: {
                    authorization: token
                }
            });
            fetchUserData(currentPage); // تحديث البيانات بعد تغيير الحالة
        } catch (error) {
            console.error("خطأ في تحديث الحالة:", error);
        }
    };

    const editStatus = async (booking) => {
        const { _id, status } = booking;

        if (status === "pending") {
            Swal.fire({
                icon: "info",
                title: "هل تريد تأكيد الحجز أم إلغاؤه؟",
                showDenyButton: true,
                confirmButtonText: "تأكيد",
                denyButtonText: "إلغاء",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await updateStatus(_id, "approved");
                } else if (result.isDenied) {
                    await updateStatus(_id, "rejected");
                }
            });
        } else if (status === "approved") {
            Swal.fire({
                icon: "info",
                title: "هل تريد اعادة الحجز الى قيد المراجعة أم إلغاؤه؟",
                showDenyButton: true,
                confirmButtonText: "ارجاع الى قيد المراجعة",
                denyButtonText: "الحجز إلغاء",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await updateStatus(_id, "pending");
                } else if (result.isDenied) {
                    await updateStatus(_id, "rejected");
                }
            });
        } else if (status === "rejected") {
            Swal.fire({
                icon: "info",
                title: "الحجز مرفوض. هل تريد تأكيده مرة أخرى؟",
                showDenyButton: true,
                confirmButtonText: "تأكيد الحجز",
                denyButtonText: "إلغاء",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await updateStatus(_id, "pending");
                } else if (result.isDenied) {
                }
            });
        } else {
            Swal.fire({
                icon: "info",
                title: "هل تريد اعادة الحجز الى قيد المراجعة أم تأكيده؟",
                showDenyButton: true,
                confirmButtonText: "ارجاع الى قيد المراجعة",
                denyButtonText: "تأكيد الحجز",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await updateStatus(_id, "pending");
                } else if (result.isDenied) {
                    await updateStatus(_id, "approved");
                }
            });
        }
    };

    if (loading) return <Splash />; 
    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-wrap gap-4 justify-between">
                {/* ... (الكود الخاص بعرض الإيرادات وعدد الحجوزات والعملاء) ... */}
            </div>
            {/* الجدول */}
            <div className="bg-white p-4 rounded-lg shadow">
                <table className="w-full">
                    <thead>
                        <tr className="text-[#0061E0] p-2 text-xl">
                            <th>رقم الحجز</th>
                            <th>اسم العميل</th>
                            <th>اسم الشاليه</th>
                            <th>تاريخ الدخول</th>
                            <th>تاريخ المغادرة</th>
                            <th>مبلغ الحجز</th>
                            <th>حالة الحجز</th>
                            <th>خيارات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, index) => (
                            <tr key={booking._id}>
                                <td className="py-2 px-1 text-center text-lg">{index + 1}</td>
                                <td className="py-2 px-1 text-center text-lg">
                                    {booking.userID ? booking.userID.userName : "غير متوفر"}
                                </td>
                                <td className="py-2 px-1 text-center text-lg">{booking.chaletID.name}</td>
                                <td className="py-2 px-1 text-center text-lg">{new Date(booking.checkInDate).toLocaleDateString()}</td>
                                <td className="py-2 px-1 text-center text-lg">{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                                <td className="py-2 px-1 text-center text-lg">{`${booking.chaletID.price} ريال`}</td>
                                <td className="py-2 px-1 text-center text-lg">
                                    <span
                                        className={`px-3 py-1 text-white ${booking.status === "pending" ? "bg-yellow-500" : booking.status === "approved" ? "bg-green-500" : "bg-red-500"} rounded-lg`}>
                                        {booking.status === "pending" ? "قيد الانتظار" : booking.status === "approved" ? "مكتمل" : "ملغى"}
                                    </span>
                                </td>
                                <td className="p-2 text-center">
                                    <button onClick={() => editStatus(booking)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M12 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V12" stroke="#0061E0" />
                                                    <path d="M18.375 2.62523C18.7728 2.2274 19.3124 2.00391 19.875 2.00391C20.4376 2.00391 20.9771 2.2274 21.375 2.62523C21.7728 3.02305 21.9963 3.56262 21.9963 4.12523C21.9963 4.68784 21.7728 5.2274 21.375 5.62523L12.362 14.6392C12.1245 14.8765 11.8312 15.0501 11.509 15.1442L8.63597 15.9842C8.54992 16.0093 8.45871 16.0108 8.37188 15.9886C8.28505 15.9663 8.2058 15.9212 8.14242 15.8578C8.07904 15.7944 8.03386 15.7151 8.01162 15.6283C7.98937 15.5415 7.99087 15.4503 8.01597 15.3642L8.85597 12.4912C8.9505 12.1693 9.12451 11.8763 9.36197 11.6392L18.375 2.62523Z" stroke="#0061E0" />
                                                </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* عناصر التحكم في الصفحات */}
            <div className="flex justify-between mt-4">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    الصفحة السابقة
                </button>
                <span>الصفحة {currentPage} من {totalPages}</span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    الصفحة التالية
                </button>
            </div>
        </div>
    );
}
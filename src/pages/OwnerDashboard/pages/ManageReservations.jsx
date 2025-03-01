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
            if (error.response && error.response.data) {
                console.error("خطأ في تحديث الحالة:", error.response.data.message);
                Swal.fire({
                    icon: "error",
                    title: "خطأ",
                    text: error.response.data.message,
                });
            } else {
                console.error("خطأ في تحديث الحالة:", error);
            }
        }
    };

    const editStatus = async (booking) => {
        const { _id, status, checkInDate } = booking;

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
                title: "هل تريد  إلغاؤه؟",
                showDenyButton: true,
                denyButtonText: "الحجز إلغاء",
            }).then(async (result) => {
                if (result.isDenied) {
                    await updateStatus(_id, "rejected");
                }
            });
        } else if (status === "rejected") {
            const currentDate = new Date();
            const checkInDateObj = new Date(checkInDate);

            if (checkInDateObj > currentDate) {
                Swal.fire({
                    icon: "info",
                    title: "الحجز مرفوض. هل تريد تأكيده مرة أخرى؟",
                    showDenyButton: true,
                    confirmButtonText: "تأكيد الحجز",
                    denyButtonText: "إلغاء",
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        await updateStatus(_id, "approved");
                    } else if (result.isDenied) {
                        // لا تفعل شيئًا
                    }
                });
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "لا يمكن إعادة الحجز.",
                    text: "تاريخ الدخول قد مضى.",
                });
            }
        } else {
            Swal.fire({
                icon: "info",
                title: "هل تريد تأكيده؟",
                showDenyButton: true,
                denyButtonText: "تأكيد الحجز",
            }).then(async (result) => {
                if (result.isDenied) {
                    await updateStatus(_id, "approved");
                }
            });
        }
    };

    if (loading) return <Splash />; 
    return (
        <div className="p-6 space-y-6">
       <div className="flex flex-wrap gap-4 justify-evenly">
                {/* بطاقات المعلومات */}
                <div className="flex justify-between items-center p-4 rounded-lg shadow w-full sm:w-[48%] md:w-[22%] h-[150px] flex-shrink-0 border border-[#1A71FF]">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">الإيرادات</h3>
                        <p className="text-2xl font-semibold text-[#101828]">{revenue} رس</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="61" viewBox="0 0 60 61" fill="none">
                        <path opacity="0.21" d="M0 30.9067V37.9067C0 50.6093 10.2975 60.9067 23 60.9067H30H37C49.7025 60.9067 60 50.6093 60 37.9067V30.9067V23.9067C60 11.2042 49.7025 0.906738 37 0.906738H30H23C10.2975 0.906738 0 11.2042 0 23.9067V30.9067Z" fill="#4AD991" />
                        <path d="M19.1111 41.7956H42.4444C43.3036 41.7956 44 42.4921 44 43.3512C44 44.2103 43.3036 44.9067 42.4444 44.9067H17.5556C16.6964 44.9067 16 44.2103 16 43.3512V18.4623C16 17.6032 16.6964 16.9067 17.5556 16.9067C18.4147 16.9067 19.1111 17.6032 19.1111 18.4623V41.7956Z" fill="#4AD991" />
                        <path opacity="0.5" d="M24.9126 35.0817C24.325 35.7085 23.3406 35.7402 22.7138 35.1526C22.0871 34.5651 22.0553 33.5806 22.6429 32.9539L28.4762 26.7317C29.0445 26.1255 29.9888 26.073 30.6208 26.6123L35.2248 30.5411L41.2235 22.9428C41.7558 22.2685 42.734 22.1534 43.4083 22.6858C44.0826 23.2181 44.1977 24.1963 43.6653 24.8706L36.6653 33.7373C36.1186 34.4298 35.1059 34.5294 34.4347 33.9567L29.7306 29.9425L24.9126 35.0817Z" fill="#4AD991" />
                    </svg>
                </div>

                <div className="flex justify-between items-center p-4 rounded-lg shadow w-full sm:w-[48%] md:w-[22%] h-[150px] flex-shrink-0 border border-[#1A71FF]">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">عدد الحجوزات</h3>
                        <p className="text-2xl font-semibold text-[#101828]">{numberOfReservations}</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="61" height="61" viewBox="0 0 61 61" fill="none">
                        <path opacity="0.3" d="M0.5 30.4722V37.4722C0.5 50.1747 10.7975 60.4722 23.5 60.4722H30.5H37.5C50.2025 60.4722 60.5 50.1747 60.5 37.4722V30.4722V23.4722C60.5 10.7696 50.2025 0.472168 37.5 0.472168H30.5H23.5C10.7975 0.472168 0.5 10.7696 0.5 23.4722V30.4722Z" fill="#FF9066" />
                        <path opacity="0.78" d="M29.1312 24.281C29.1512 24.0205 29.3684 23.8193 29.6297 23.8193H30.0475C30.3044 23.8193 30.5195 24.014 30.545 24.2696L31.1667 30.486L35.5814 33.0087C35.7372 33.0977 35.8333 33.2634 35.8333 33.4428V33.8314C35.8333 34.1611 35.5199 34.4005 35.2018 34.3138L28.8987 32.5947C28.6673 32.5316 28.5133 32.3131 28.5317 32.074L29.1312 24.281Z" fill="#FF9066" />
                        <path opacity="0.901274" d="M23.2218 15.4568C22.9577 15.142 22.4477 15.2625 22.3524 15.6621L20.7189 22.5103C20.6412 22.8359 20.8993 23.1444 21.2336 23.1255L28.2783 22.7263C28.6892 22.703 28.8976 22.221 28.633 21.9057L26.8316 19.7588C27.9965 19.3608 29.2317 19.1529 30.5 19.1529C36.7592 19.1529 41.8333 24.227 41.8333 30.4862C41.8333 36.7454 36.7592 41.8196 30.5 41.8196C24.2408 41.8196 19.1667 36.7454 19.1667 30.4862C19.1667 29.4355 19.309 28.4063 19.5864 27.4172L17.0188 26.697C16.6808 27.9021 16.5 29.1731 16.5 30.4862C16.5 38.2182 22.768 44.4862 30.5 44.4862C38.232 44.4862 44.5 38.2182 44.5 30.4862C44.5 22.7542 38.232 16.4862 30.5 16.4862C28.5551 16.4862 26.7029 16.8828 25.0197 17.5995L23.2218 15.4568Z" fill="#FF9066" />
                    </svg>
                </div>

                <div className="flex justify-between items-center p-4 rounded-lg shadow w-full sm:w-[48%] md:w-[22%] h-[150px] flex-shrink-0 border border-[#1A71FF]">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">عدد العملاء</h3>
                        <p className="text-2xl font-semibold text-[#101828]">{numberOfClients}</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="61" height="60" viewBox="0 0 61 60" fill="none">
                        <path opacity="0.21" d="M0.5 30V37C0.5 49.7025 10.7975 60 23.5 60H30.5H37.5C50.2025 60 60.5 49.7025 60.5 37V30V23C60.5 10.2975 50.2025 0 37.5 0H30.5H23.5C10.7975 0 0.5 10.2975 0.5 23V30Z" fill="#8280FF" />
                        <path opacity="0.587821" d="M21.1667 23.3333C21.1667 26.2789 23.5545 28.6667 26.5 28.6667C29.4455 28.6667 31.8334 26.2789 31.8334 23.3333C31.8334 20.3878 29.4455 18 26.5 18C23.5545 18 21.1667 20.3878 21.1667 23.3333ZM34.5 28.6667C34.5 30.8758 36.2909 32.6667 38.5 32.6667C40.7092 32.6667 42.5 30.8758 42.5 28.6667C42.5 26.4575 40.7092 24.6667 38.5 24.6667C36.2909 24.6667 34.5 26.4575 34.5 28.6667Z" fill="#8280FF" />
                        <path d="M26.4778 31.3335C20.1826 31.3335 15.0177 34.5689 14.5009 40.9324C14.4727 41.2791 15.1356 42.0002 15.47 42.0002H37.4956C38.4972 42.0002 38.5128 41.1941 38.4972 40.9335C38.1065 34.3911 32.8616 31.3335 26.4778 31.3335ZM45.7746 42.0002L40.6333 42.0002C40.6333 38.9989 39.6417 36.2293 37.9683 34.001C42.5103 34.0506 46.2189 36.347 46.498 41.2002C46.5092 41.3956 46.498 42.0002 45.7746 42.0002Z" fill="#8280FF" />
                    </svg>
                </div>
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
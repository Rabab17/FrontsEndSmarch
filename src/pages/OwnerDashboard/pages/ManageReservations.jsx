import axios from "axios";
import { useEffect, useState } from "react";
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

    if (loading) return <Splash />; 
    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-wrap gap-4 justify-between">
                <div className="flex justify-between p-4 rounded-lg w-full sm:w-[48%] md:w-[22%] flex-shrink-0 border border-[#1A71FF] bg-white shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)]">
                    <div className="w-full">
                        <div className="flex justify-between mb-6">
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
                    </div>
                </div>
                
                <div className="flex justify-between p-4 rounded-lg shadow w-full sm:w-[48%] md:w-[22%] h-[150px] flex-shrink-0 border border-[#1A71FF]">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">الشاليهات المؤجرة</h3>
                        <p className="text-2xl font-semibold text-[#101828]">{numberOfReservations}</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="61" height="60" viewBox="0 0 61 60" fill="none">
                        <path opacity="0.21" d="M0.166504 30V37C0.166504 49.7025 10.464 60 23.1665 60H30.1665H37.1665C49.8691 60 60.1665 49.7025 60.1665 37V30V23C60.1665 10.2975 49.8691 0 37.1665 0H30.1665H23.1665C10.464 0 0.166504 10.2975 0.166504 23V30Z" fill="#FEC53D" />
                        <path d="M15.1665 24.3164L28.067 31.7645C28.2059 31.8447 28.3516 31.9026 28.4998 31.9394V46.3846L16.0866 39.0385C15.5163 38.701 15.1665 38.0875 15.1665 37.4248V24.3164ZM45.1665 24.1184V37.4248C45.1665 38.0875 44.8167 38.701 44.2464 39.0385L31.8332 46.3846V31.8129C31.8634 31.7978 31.8934 31.7816 31.9231 31.7645L45.1665 24.1184Z" fill="#FEC53D" />
                        <path opacity="0.499209" d="M15.5718 20.7014C15.7294 20.5024 15.9282 20.3343 16.1601 20.2108L29.2851 13.2201C29.8361 12.9266 30.497 12.9266 31.048 13.2201L44.173 20.2108C44.3517 20.306 44.5109 20.4277 44.6466 20.5697L30.2564 28.8778C30.1618 28.9325 30.0746 28.995 29.9951 29.064C29.9156 28.995 29.8283 28.9325 29.7337 28.8778L15.5718 20.7014Z" fill="#FEC53D" />
                    </svg>
                </div>


                <div className="flex justify-between p-4 rounded-lg shadow w-full sm:w-[48%] md:w-[22%] h-[150px] flex-shrink-0 border border-[#1A71FF]">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">عدد الحجوزات</h3>
                        <p className="text-2xl font-semibold text-[#101828]">{numberOfReservations}</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="61" height="60" viewBox="0 0 61 60" fill="none">
                        <path opacity="0.21" d="M0.166504 30V37C0.166504 49.7025 10.464 60 23.1665 60H30.1665H37.1665C49.8691 60 60.1665 49.7025 60.1665 37V30V23C60.1665 10.2975 49.8691 0 37.1665 0H30.1665H23.1665C10.464 0 0.166504 10.2975 0.166504 23V30Z" fill="#FEC53D" />
                        <path d="M15.1665 24.3164L28.067 31.7645C28.2059 31.8447 28.3516 31.9026 28.4998 31.9394V46.3846L16.0866 39.0385C15.5163 38.701 15.1665 38.0875 15.1665 37.4248V24.3164ZM45.1665 24.1184V37.4248C45.1665 38.0875 44.8167 38.701 44.2464 39.0385L31.8332 46.3846V31.8129C31.8634 31.7978 31.8934 31.7816 31.9231 31.7645L45.1665 24.1184Z" fill="#FEC53D" />
                    </svg>
                </div>

                <div className="flex justify-between p-4 rounded-lg shadow w-full sm:w-[48%] md:w-[22%] h-[150px] flex-shrink-0 border border-[#1A71FF]">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">عدد العملاء</h3>
                        <p className="text-2xl font-semibold text-[#101828]">{numberOfClients}</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="61" height="60" viewBox="0 0 61 60" fill="none">
                        <path opacity="0.21" d="M0.5 30V37C0.5 49.7025 10.7975 60 23.5 60H30.5H37.5C50.2025 60 60.5 49.7025 60.5 37V30V23C60.5 10.2975 50.2025 0 37.5 0H30.5H23.5C10.7975 0 0.5 10.2975 0.5 23V30Z" fill="#8280FF" />
                        <path opacity="0.587821" d="M21.1665 23.3333C21.1665 26.2789 23.5543 28.6667 26.4998 28.6667C29.4454 28.6667 31.8332 26.2789 31.8332 23.3333C31.8332 20.3878 29.4454 18 26.4998 18C23.5543 18 21.1665 20.3878 21.1665 23.3333ZM34.4998 28.6667C34.4998 30.8758 36.2907 32.6667 38.4998 32.6667C40.709 32.6667 42.4998 30.8758 42.4998 28.6667C42.4998 26.4575 40.709 24.6667 38.4998 24.6667C36.2907 24.6667 34.4998 26.4575 34.4998 28.6667Z" fill="#8280FF" />
                    </svg>
                </div>
            </div>
            {/* الجدول */}
            <div className="bg-white p-4 rounded-lg shadow">
    <table className="w-full">
        <thead>
            <tr className="text-[#0061E0] p-2 text-xl">
                <th >رقم الحجز</th>
                <th >اسم العميل</th>
                <th >اسم الشاليه</th>
                <th >تاريخ الدخول</th>
                <th >تاريخ المغادرة</th>
                <th>مبلغ الحجز</th>
                <th >حالة الحجز</th>
            </tr>
        </thead>
        <tbody>
    {bookings.map((booking,index) => (
        <tr key={booking._id}>
           
           <td className="py-2 px-1 text-center text-lg">{index + 1}</td>
            <td className="py-2 px-1 text-center text-lg">{booking.userID.userName}</td>
            <td className="py-2 px-1 text-center text-lg">{booking.chaletID.name}</td>
            <td className="py-2 px-1 text-center text-lg">{new Date(booking.checkInDate).toLocaleDateString()}</td>
            <td className="py-2 px-1 text-center text-lg">{new Date(booking.checkOutDate).toLocaleDateString()}</td>
            <td className="py-2 px-1 text-center text-lg">{`${booking.chaletID.price} ريال`}</td>
            <td className="py-2 px-1 text-center text-lg">
                <span
                    className={`px-3 py-1 text-white ${booking.status === "pending" ? "bg-yellow-500" : "bg-green-500"} rounded-lg`}>
                    {booking.status === "pending" ? "قيد الانتظار" : "مكتمل"}
                </span>
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
};
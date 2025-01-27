import  { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // استيراد useParams و useNavigate
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import axios from "axios";
import "./style.css";

export default function Datapicker() { 
  const { id } = useParams(); 
  const navigate = useNavigate(); // استخدام useNavigate
  console.log("id", id);
  const [dateRange, setDateRange] = useState([null, null]);
  const [isOpen, setIsOpen] = useState(true);

  const handleChange = (update) => {
    setDateRange(update);
  };

  const handleConfirm = async () => {
    const checkInDate = dateRange[0];
    const checkOutDate = dateRange[1];

    if (!checkInDate || !checkOutDate) {
      Swal.fire({
        title: 'خطأ',
        text: 'يرجى اختيار تاريخ الوصول والمغادرة.',
        icon: 'error',
        confirmButtonText: 'حسناً',
      });
      return;
    }


    try {
        const token = localStorage.getItem("token"); 
        console.log(token);
        const response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}reservation/create`, {
            checkInDate: checkInDate.toISOString(),
            checkOutDate: checkOutDate.toISOString(),
            chaletID: id 
        }, {
            headers: {
                Authorization: token, 
            },
        });
        console.log("Response:", response); 

        Swal.fire({
          title: 'تم حجز الشاليه بنجاح!',
          text: response.data.message,
          icon: 'success',
          confirmButtonText: 'العودة إلى الصفحة الرئيسية',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/UserDashboard/Overview'); 
          }
        });
    } catch (error) {
      console.error("Error response:", error.response ? error.response.data : error.message); 
      if (error.response) {
        Swal.fire({
          title: 'خطأ',
          text: error.response.data.message || 'حدث خطأ أثناء الحجز.',
          icon: 'error',
          confirmButtonText: 'حسناً',
        });
      } else if (error.request) {
        Swal.fire({
          title: 'خطأ',
          text: 'لم يتم تلقي استجابة من الخادم.',
          icon: 'error',
          confirmButtonText: 'حسناً',
        });
      } else {
        Swal.fire({
          title: 'خطأ',
          text: 'حدث خطأ أثناء إعداد الطلب.',
          icon: 'error',
          confirmButtonText: 'حسناً',
        });
      }
    }
  };

  return (
    <div className="date-picker-container flex flex-col items-center mb-8">
      <h2 className="text-2xl font-bold mb-4">تفاصيل الحجز</h2>

      <label className="mb-2 text-gray-700">اختر النطاق الزمني:</label>

      <div onClick={() => setIsOpen(true)} className="cursor-pointer border border-gray-300 rounded-lg p-3 text-center w-64 mb-4">
        {dateRange[0] && dateRange[1]
          ? `${dateRange[0].toLocaleDateString()} - ${dateRange[1].toLocaleDateString()}`
          : "اختر النطاق الزمني:"}
      </div>

      <DatePicker
        selectsRange
        startDate={dateRange[0]}
        endDate={dateRange[1]}
        onChange={handleChange}
        className="hidden"
        calendarClassName="custom-calendar"
        minDate={new Date()}
        open={isOpen}
        onCalendarClose={() => setIsOpen(false)}
      />

      <button
        onClick={handleConfirm}
        className="confirm-button"
      >
        تأكيد الحجز
      </button>
    </div>
  );
}
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import axios from "axios";
import "./style.css";

export default function Datapicker() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState([null, null]);
  const [isOpen, setIsOpen] = useState(true);
  const [bookedDates, setBookedDates] = useState([]); // تخزين الأيام المحجوزة



  const formatDate = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  //   useEffect(() => {
  //     if (dateRange[0] && !dateRange[1]) {
  //         const nextDay = new Date(dateRange[0]);
  //         nextDay.setDate(nextDay.getDate() + 1); // إضافة يوم واحد
  //         setDateRange([dateRange[0], nextDay]);
  //     }
  // }, [dateRange[0]]); // التأثير يعمل فقط عند تغيير `dateRange[0]`


  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}reservation/user/chalet/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        console.log(response.data.data)
        const bookings = response.data.data;

        let allBookedDates = [];

        // استخراج الأيام بين checkInDate و checkOutDate
        bookings.forEach(({ checkInDate, checkOutDate }) => {
          let currentDate = new Date(checkInDate);
          let endDate = new Date(checkOutDate);

          while (currentDate < endDate) {
            // currentDate.setDate(currentDate.getDate() - 1);
            allBookedDates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
          }
        });

        setBookedDates(allBookedDates);
      } catch (error) {
        console.error("Error fetching booked dates:", error);
      }
    };

    fetchBookedDates();
  }, [id]);
  const handleChange = (update) => {
    setDateRange(update);
  };

  const handleConfirm = async () => {
    dateRange[1].setDate(dateRange[1].getDate() + 1); 
    setDateRange([dateRange[0], dateRange[1]]);
    const checkInDate = dateRange[0];
    const checkOutDate = dateRange[1];
    if (!checkInDate || !checkOutDate) {
      Swal.fire({
        title: "خطأ",
        text: "يرجى اختيار تاريخ الوصول والمغادرة.",
        icon: "error",
        confirmButtonText: "حسناً",
      });
      return;
    }

    const checkInDateOnly = formatDate(checkInDate)
    const checkOutDateOnly = formatDate(checkOutDate)
    console.log("checkInDateOnly: " + checkInDateOnly)
    console.log("checkOutDateOnly: " + checkOutDateOnly)


    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}reservation/create`, {
        checkInDate: checkInDateOnly,
        checkOutDate: checkOutDateOnly,
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
      Swal.fire({
        title: "خطأ",
        text: error.response?.data?.message || "حدث خطأ أثناء الحجز.",
        icon: "error",
        confirmButtonText: "حسناً",
      });
    }
  };

  return (
    <div className="date-picker-container bg-blue-50 flex flex-col items-center mb-8">
      <h2 className="text-3xl font-extrabold  mb-4">تفاصيل الحجز</h2>
      {/* {console.log(bookedDates)} */}
      <label className="mb-2 text-gray-700 text-xl">اختر النطاق الزمني:</label>

      <div onClick={() => setIsOpen(true)} className="cursor-pointer border border-gray-300 rounded-lg p-3 text-center w-64 ">
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
        excludeDates={bookedDates}
        highlightDates={bookedDates}
        onCalendarClose={() => setIsOpen(false)}
      />

      <button
        onClick={handleConfirm}
        className="w-44 bg-gradient-to-l from-[#48BB78] to-[#1A71FF] text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 mt-80"
      >
        تأكيد الحجز
      </button>
    </div>
  );
}

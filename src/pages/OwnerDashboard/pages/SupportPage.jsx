import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoEye } from "react-icons/io5";

export default function SupportPage() {

  const tickets = [
    {
      id: 12345,
      username: "احمد علي",
      date: "2022-01-01",
      subject: "مشكلة في الحجز",
      status: "جديدة",
      statusColor: "green-600",
    },

    {
      id: 12347,
      username: "سعيد عبد الله",
      date: "2022-03-01",
      subject: "طلب تعديل الحجز",
      status: "مغلقة",
      statusColor: "red-500",
    },
  ];

  return (
    <div className="border border-blue-500 w-[80vw] rounded-xl overflow-hidden mr-5">
   
      <div className="flex justify-between items-center text-gray-800 gap-10 p-5 ">
        <div className="text-blue-500 font-bold text-lg">رقم التذكرة</div>
        <div className="text-blue-500 font-bold text-lg">اسم المستخدم</div>
        <div className="text-blue-500 font-bold text-lg">تاريخ الارسال</div>
        <div className="text-blue-500 font-bold text-lg">الموضوع</div>
        <div className="text-blue-500 font-bold text-lg">الحالة</div>
        <div className="text-blue-500 font-bold text-lg">خيارات</div>
      </div>

   
      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          className="flex justify-between items-center p-4 bg-white text-gray-800 gap-10 border-b last:border-none"
        >
          <div>{ticket.id}</div>
          <div>{ticket.username}</div>
          <div>{ticket.date}</div>
          <div>{ticket.subject}</div>
          <div
            className={`border bg-${ticket.statusColor} text-white rounded-md px-2 py-1 text-center`}
          >
            {ticket.status}
           </div>
          <div className="flex gap-3">
            <button className="text-blue-500 hover:underline">
              <IoEye size={20} />
            </button>
            /
            <button className="text-red-500 hover:underline">
              <RiDeleteBin6Fill size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

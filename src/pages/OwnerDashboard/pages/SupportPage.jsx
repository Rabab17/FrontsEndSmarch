import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoEye } from "react-icons/io5";


export default function SupportPage() {
  return (
    <div className="table   border border-blue-500 w-[80vw] rounded-xl ">
      <div className="flex justify-between items-center  text-gray-800 gap-10 p-5 ">
        <div className="text-blue-500 font-bold " style={{fontSize:22}}>رقم التذكرة </div>
        <div className="text-blue-500 font-bold " style={{fontSize:22}}>اسم المستخدم</div>
        <div className="text-blue-500 font-bold " style={{fontSize:22}}>تاريخ الارسال</div>
        <div className="text-blue-500 font-bold " style={{fontSize:22}}>الموضوع</div>
        <div className="text-blue-500 font-bold " style={{fontSize:22}}>الحالة</div>
        <div className="text-blue-500 font-bold " style={{fontSize:22}}>خيارات</div>

      </div>
      <div className="flex justify-between items-center p-4 bg-white text-gray-800 gap-10 pr-5 font-normal">
        <div>12345</div>
        <div>احمد علي</div>
        <div>2022-01-01</div>
        <div>مشكلة في الحجز</div>
        <div className="border border-green-600 bg-green-600 w-[5vw] " style={{fontSize:20}}><h3 className="text-white font-normal pr-4">جديدة</h3></div>
        <div className="flex flex-row"> <IoEye className="text-blue-500"/> / <RiDeleteBin6Fill className="text-red-500"/> </div>

      </div>


      
    </div>
  )
}

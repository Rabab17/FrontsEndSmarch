<<<<<<< HEAD
import { useEffect, useState } from "react";
import { backendUrl } from "../../api/data";
import { HiOutlineLocationMarker } from "react-icons/hi";

export default function About() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backendUrl}chalet/users`); // استدعاء API
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json(); // تحويل البيانات إلى JSON
        setData(result.data); // تحديث الحالة بالبيانات المستلمة
      } catch (err) {
        console.error("Error fetching data:", err); // طباعة الأخطاء في الكونسول
      }
    };

    fetchData(); // استدعاء الدالة عند تحميل الصفحة
  }, []);

  // طباعة البيانات في الكونسول بعد تحميلها فقط
  useEffect(() => {
    if (data.length > 0) {
      console.log(data); // سيتم الطباعة فقط عندما تحتوي data على عناصر
    }
  }, [data]); // هذا الuseEffect سيعمل عندما تتغير حالة data

  return (
    <div className="bg-blue-50 my-12 py-12">
=======
import { HiOutlineLocationMarker } from "react-icons/hi";
import useFetchData from "../../hooks/useFetchData";

export default function About() {
  const { data, error, loading } = useFetchData(`${import.meta.env.VITE_URL_BACKEND}chalet/users`);

  if (loading) return <p className="text-center">جاري تحميل البيانات...</p>;
  if (error) return <p className="text-center text-red-500">حدث خطأ: {error}</p>;

  return (
    <div className="bg-blue-50  py-12">
>>>>>>> 99f4c70ada92c941693cf6b755e9f48b37e89ce0
      <div className="text-center">
        <h1 className="text-[#0061E0] text-3xl font-bold mb-6">
          اكتشف أفضل الشاليهات
        </h1>
        <h3 className="text-gray-600 text-lg mb-6">
          تصفّح أفضل الشاليهات المختارة خصيصًا لك بأفضل الأسعار
        </h3>
        <input
          type="search"
          name="search1"
          placeholder="بحث"
          className="w-96 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-wrap justify-center">
        {data.map((chalet) => (
          <div key={chalet._id} className="bg-white shadow-md rounded-lg border border-blue-500 mx-6 my-10">
<<<<<<< HEAD
            <img

              src={chalet.img}
              alt={chalet.name}
            />
            <div className='p-3'>
              <h1 className=" text-2xl font-medium text-[#363A3D]">{chalet.name}</h1>
              <div className='flex items-center mt-3'>
                <HiOutlineLocationMarker className='me-2' />
                <p className='text-[#101828]'>{chalet.location.city}, {chalet.location.street}</p>
              </div>
              <div className='flex justify-between mx-1 mt-3 items-center'>
                <button className='bg-gradient-to-l from-[#48BB78] to-[#1A71FF] text-white px-6 lg:px-16 py-2 rounded-lg font-semibold  '>
                  المزيد
                </button>
                <h1 className='text-[#0061E0] text-2xl font-bold'>{chalet.price} رس</h1>
=======
            <img src={chalet.img} alt={chalet.name} />
            <div className="p-3">
              <h1 className="text-2xl font-medium text-[#363A3D]">{chalet.name}</h1>
              <div className="flex items-center mt-3">
                <HiOutlineLocationMarker className="me-2" />
                <p className="text-[#101828]">
                  {chalet.location.city}, {chalet.location.street}
                </p>
              </div>
              <div className="flex justify-between mx-1 mt-3 items-center">
                <button className="bg-gradient-to-l from-[#48BB78] to-[#1A71FF] text-white px-6 lg:px-16 py-2 rounded-lg font-semibold">
                  المزيد
                </button>
                <h1 className="text-[#0061E0] text-2xl font-bold">{chalet.price} رس</h1>
>>>>>>> 99f4c70ada92c941693cf6b755e9f48b37e89ce0
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

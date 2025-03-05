import { HiOutlineLocationMarker } from "react-icons/hi"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import Splash from "../../components/Splash"
import Pagination from "../../components/Pagination"

export default function Partners() {
  const [chalets, setChalets] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState()
  useEffect(() => {


    const fetchChalet = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}chalet/users`,
          {
            params: {
              page: currentPage,
              limit: 12
            }
          });
        setTotalPages(response.data.pagination.totalPages)
        const chaletData = response.data.data;
        setChalets(chaletData);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("خطأ في استرجاع بيانات المستخدم:", error);
      } finally {

        setLoading(false)
      }
    };

    fetchChalet();
  }, [currentPage]);
  const nav = useNavigate()
  const GoToChalet = (id) => {
    nav(`/partners/${id}`)
  }
  return (
    <div className="bg-blue-50 mb-5 py-12">
      {chalets.length > 0 ?

        <>
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
          {loading ? <Splash /> : (
            <>
              <div className="flex  flex-wrap justify-center">
                {chalets.map((chalet) => (
                  <div
                    key={chalet._id}
                    className="bg-white w-full sm:w-[48%] md:w-[30%] lg:w-[20%] shadow-md rounded-lg border border-blue-500 mx-3 my-5"
                  >
                    <img
                      src={chalet.img}
                      alt={chalet.name}
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                    <div className='p-3'>
                      <h1 className=" text-2xl font-medium text-[#363A3D]">{chalet.name}</h1>
                      <div className='flex items-center mt-3'>
                        <HiOutlineLocationMarker className='me-2' />
                        <p className='text-[#101828]'>{chalet.location.city}, {chalet.location.street}</p>
                      </div>
                      <div className='flex justify-between mx-1 mt-3 items-center'>
                        <button onClick={() => { GoToChalet(chalet._id) }} className='bg-gradient-to-l from-[#48BB78] to-[#1A71FF] text-white px-6 lg:px-16 py-2 rounded-lg font-semibold  '>
                          المزيد
                        </button>
                        <h1 className='text-[#0061E0] text-2xl font-bold'>{chalet.price}</h1>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
            </>
          )}
        </> :
        <div className="flex justify-center items-center h-full">
          <h2 className="text-center text-3xl text-gray-700 ">لا توجد شاليات متوفرة حاليا</h2>
        </div>
      }
    </div>
  )
}

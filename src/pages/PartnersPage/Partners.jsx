import { HiOutlineLocationMarker } from "react-icons/hi"
import { Chalets } from "../../api/data"
import { useNavigate } from "react-router-dom"

export default function Partners() {
  const chalets = Chalets
  const nav = useNavigate()
  const GoToChalet = (id)=>{
      nav(`/partners/${id}`)
  }
  return (
    <div className="bg-blue-50  py-12">
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
      <div className="flex  flex-wrap justify-center">
        {chalets.map((chalet) => (
          <div key={chalet.id} className="bg-white shadow-md rounded-lg border border-blue-500 mx-6 my-10">
            <img

              src={chalet.img}
              alt={chalet.name}
            />
            <div className='p-3'>
              <h1 className=" text-2xl font-medium text-[#363A3D]">{chalet.name}</h1>
              <div className='flex items-center mt-3'>
                <HiOutlineLocationMarker className='me-2' />
                <p className='text-[#101828]'>{chalet.city}</p>
              </div>
              <div className='flex justify-between mx-1 mt-3 items-center'>
                <button onClick={()=>{GoToChalet(chalet.id)}} className='bg-gradient-to-l from-[#48BB78] to-[#1A71FF] text-white px-6 lg:px-16 py-2 rounded-lg font-semibold  '>
                  المزيد
                </button>
                <h1 className='text-[#0061E0] text-2xl font-bold'>{chalet.price}</h1>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

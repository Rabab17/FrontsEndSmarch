import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { HiOutlineLocationMarker } from "react-icons/hi";
import { Chalets } from '../../api/data';
import { useNavigate } from 'react-router-dom';

const ChaletSlider = () => {

    const chalets = Chalets
    const nav = useNavigate()
    const GoToChalet = (id)=>{
        nav(`/partners/${id}`)
    }
    return (
        <div className='mx-10'>

            <Swiper
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                    500: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 4,
                    },
                }}
            >
                {chalets.map((chalet) => (
                    <SwiperSlide key={chalet.id}>
                        <div className="bg-white shadow-md rounded-lg border border-blue-500">
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
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ChaletSlider;

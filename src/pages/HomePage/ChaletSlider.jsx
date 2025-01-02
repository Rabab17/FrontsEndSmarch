import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { HiOutlineLocationMarker } from "react-icons/hi";

const ChaletSlider = () => {
    const chalets = [
        {
            id: 1,
            name: 'شاليه البحر الاحمر 1',
            city: 'الرياض، حي النخيل',
            price: ' 1000رس ',
            img: 'src/assets/images/chalet-img.png',
        },
        {
            id: 2,
            name: 'شاليه البحر الاحمر 2',
            city: 'الرياض، حي النخيل',
            price: ' 1000رس ',
            img: 'src/assets/images/chalet-img.png',
        },
        {
            id: 3,
            name: 'شاليه البحر الاحمر 3',
            city: 'الرياض، حي النخيل',
            price: ' 1000رس ',
            img: 'src/assets/images/chalet-img.png',
        },
        {
            id: 4,
            name: 'شاليه البحر الاحمر 4',
            city: 'الرياض، حي النخيل',
            price: ' 1000رس ',
            img: 'src/assets/images/chalet-img.png',
        },
        {
            id: 5,
            name: 'شاليه البحر الاحمر 5',
            city: 'الرياض، حي النخيل',
            price: ' 1000رس ',
            img: 'src/assets/images/chalet-img.png',
        },
        {
            id: 6,
            name: 'شاليه البحر الاحمر 6',
            city: 'الرياض، حي النخيل',
            price: ' 1000رس ',
            img: 'src/assets/images/chalet-img.png',
        },

    ];

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
                                    <button className='bg-gradient-to-l from-[#48BB78] to-[#1A71FF] text-white px-6 lg:px-16 py-2 rounded-lg font-semibold  '>
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

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { GrSwim } from "react-icons/gr";
import { RiHomeOfficeFill } from "react-icons/ri";
import { MdCancel, MdLocationOn } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import axios from "axios";
import Splash from "../../components/Splash";

export default function ChaletDetails() {
  const [chalet, setChalet] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate(); // استخدام useNavigate

  useEffect(() => {
    const fetchChalet = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}chalet/${id}`);
        console.log("بيانات الشاليه:", response.data);
        const chaletData = response.data.data;
        setChalet(chaletData);
      } catch (error) {
        console.error("خطأ في استرجاع بيانات الشاليه:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChalet();
  }, [id]);

  const [openSection, setOpenSection] = useState("المرافق");

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleBooking = () => {
    navigate(`/Datapicker/${id}`); // توجيه المستخدم إلى Datapicker
  };

  return (
    <>
      {loading ? (
        <Splash />
      ) : (
        <div className="bg-blue-50 my-10 mx-4 sm:mx-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-8">
            <div className="w-full md:w-[60%] px-2 sm:px-4">
              <h1 className="text-3xl font-bold my-4 sm:my-6">{chalet.title}</h1>
              <p className="text-xl font-normal">{chalet.description}</p>
              <h1 className="text-2xl font-bold text-[#0061E0] my-6 sm:my-8">
                {chalet.price} / ليله
              </h1>
              <div className="w-full md:w-[80%] space-y-4 sm:space-y-6 pb-8">
                {/* المرافق */}
                <div className="p-4 rounded-lg shadow-md transition-all duration-300 bg-[#0061E0]">
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleSection("المرافق")}
                  >
                    <h2 className="text-lg sm:text-2xl text-white">المرافق والوصف</h2>
                    {openSection === "المرافق" ? (
                      <IoIosArrowBack className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                    ) : (
                      <IoIosArrowDown className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                    )}
                  </div>
                </div>
                {openSection === "المرافق" && (
                  <div className="mt-2 sm:mt-4 text-[#101828] bg-white p-4 sm:p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <GrSwim className="text-blue-600 text-2xl sm:text-3xl me-2 sm:me-3" />
                      <p className="text-sm sm:text-xl">
                        مسبح خاص ونظيف، محاط بكراسي للتشمس وجلسات مريحة.
                      </p>
                    </div>
                    <div className="flex items-center">
                      <RiHomeOfficeFill className="text-blue-600 text-2xl sm:text-3xl me-2 sm:me-3" />
                      <p className="text-sm sm:text-xl">
                        حديقة خارجية خضراء تضم منطقة شواء مخصصة (BBQ)
                      </p>
                    </div>
                  </div>
                )}

                {/* الموقع */}
                <div className="p-4 rounded-lg shadow-md transition-all duration-300 bg-[#0061E0]">
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleSection("الموقع")}
                  >
                    <h2 className="text-lg sm:text-2xl text-white">الموقع</h2>
                    {openSection === "الموقع" ? (
                      <IoIosArrowBack className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                    ) : (
                      <IoIosArrowDown className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                    )}
                  </div>
                </div>
                {openSection === "الموقع" && (
                  <div className="mt-2 sm:mt-4 text-[#101828] bg-white p-4 sm:p-6 rounded-lg">
                    <div className="flex items-center">
                      <MdLocationOn className="text-blue-600 text-2xl sm:text-3xl me-2 sm:me-3" />
                      <p className="text-sm sm:text-xl">
                        يقع الشاليه في منطقة مميزة، على بعد 5 دقائق من الشاطئ ومناطق الترفيه.
                      </p>
                    </div>
                  </div>
                )}

                {/* شروط الحجز */}
                <div className="p-4 rounded-lg shadow-md transition-all duration-300 bg-[#0061E0]">
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleSection("شروط الحجز")}
                  >
                    <h2 className="text-lg sm:text-2xl text-white">شروط الحجز وسياسة الإلغاء</h2>
                    {openSection === "شروط الحجز" ? (
                      <IoIosArrowBack className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                    ) : (
                      <IoIosArrowDown className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                    )}
                  </div>
                </div>
                {openSection === "شروط الحجز" && (
                  <div className="text-[#101828] bg-white p-4 sm:p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <BsInfoCircle className="text-blue-600 text-2xl sm:text-3xl me-2 sm:me-3" />
                      <p className="text-sm sm:text-xl">
                        الحجز غير قابل للإلغاء بعد 48 ساعة من تأكيده. يجب إظهار بطاقة الهوية عند الوصول.
                      </p>
                    </div>
                    <div className="flex items-center">
                      <MdCancel className="text-blue-600 text-2xl sm:text-3xl me-2 sm:me-3" />
                      <p className="text-sm sm:text-xl">
                        يمكن الإلغاء مجاناً حتى 7 أيام قبل موعد الحجز. بعد ذلك، يتم خصم 50% من الرسوم.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="w-full md:w-[50%] my-6 sm:my-10 px-2 sm:px-4">
              <img
                src={chalet.img}
                alt={chalet.title}
                className="w-full h-[500px] sm:h-[500px] object-cover rounded-lg"
              />
              <div
                dir="ltr"
                className="flex flex-wrap gap-1 mt-6"
              >
                {chalet.gallery.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className="w-[32%] h-[150px] sm:h-[250px] object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="my-6 sm:my-8 px-4 sm:px-8 ">
            <button 
              onClick={handleBooking} 
              className="bg-gradient-to-l from-[#48BB78] to-[#1A71FF] text-white py-2 sm:py-3 px-6 sm:px-8 rounded-lg text-sm sm:text-lg hover:from-[#38a169] hover:to-[#1a5de8]"
            >
              احجز الآن واستمتع بتجربة فريدة
            </button>
          </div>
        </div>
      )}
    </>
  );
}
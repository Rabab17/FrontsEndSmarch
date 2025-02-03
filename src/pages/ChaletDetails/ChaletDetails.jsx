import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { GrSwim } from "react-icons/gr";
import { RiHomeOfficeFill } from "react-icons/ri";
import { MdCancel, MdLocationOn } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import axios from "axios";
import Splash from "../../components/Splash";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

export default function ChaletDetails() {
  const [chalet, setChalet] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token")
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

  useEffect(() => {
    if (!loading && chalet && token) {
      const decoded = jwtDecode(token);
      const ownerid = decoded.id;
      console.log(chalet);
      if (ownerid === chalet.ownerID._id) {
        setIsOwner(true);
      }
    }
  }, [loading, chalet, token]);



  const [openSection, setOpenSection] = useState("المرافق");

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleBooking = () => {

    if (!token) {
      Swal.fire({
        title: 'خطأ',
        text: 'يجب تسجيل الدخول اولا ',
        icon: 'error',
        confirmButtonText: 'حسناً',


      }).then(() => {
        navigate("/login");
      });
    } else {

      navigate(`/Datapicker/${id}`);
    }

  };

  const editChlet = () => {
    navigate('/ownerdashboard/editChlet', { state: { id } })
}

  return (
    <>
      {loading ? (
        <Splash />
      ) : (
        <div className=" my-10 mx-4 sm:mx-8">
          {isOwner ?
            <div dir="ltr" className="my-6 sm:my-8 px-4 sm:px-8 ">
              <button
                onClick={()=>{editChlet()} }
                className="flex items-center gap-5 bg-[#0061E0] text-white py-2 px-6 sm:px-16 rounded-lg text-sm sm:text-2xl font-semibold"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                  <path
                    d="M12.5 3H5.5C4.96957 3 4.46086 3.21071 4.08579 3.58579C3.71071 3.96086 3.5 4.46957 3.5 5V19C3.5 19.5304 3.71071 20.0391 4.08579 20.4142C4.46086 20.7893 4.96957 21 5.5 21H19.5C20.0304 21 20.5391 20.7893 20.9142 20.4142C21.2893 20.0391 21.5 19.5304 21.5 19V12"
                    stroke="#E9F3FF"
                    style={{ strokeWidth: 2 }}
                  />
                  <path
                    d="M18.8751 2.62498C19.2729 2.22716 19.8125 2.00366 20.3751 2.00366C20.9377 2.00366 21.4773 2.22716 21.8751 2.62498C22.2729 3.02281 22.4964 3.56237 22.4964 4.12498C22.4964 4.68759 22.2729 5.22716 21.8751 5.62498L12.8621 14.639C12.6246 14.8762 12.3313 15.0499 12.0091 15.144L9.13609 15.984C9.05005 16.0091 8.95883 16.0106 8.872 15.9883C8.78517 15.9661 8.70592 15.9209 8.64254 15.8575C8.57916 15.7942 8.53398 15.7149 8.51174 15.6281C8.48949 15.5412 8.491 15.45 8.51609 15.364L9.35609 12.491C9.45062 12.169 9.62463 11.876 9.86209 11.639L18.8751 2.62498Z"
                    stroke="#E9F3FF"
                    style={{ strokeWidth: 2 }}
                  />
                </svg>

                تعديل
              </button>
            </div> : ''
          }
          <div className="bg-blue-50 flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-8">
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
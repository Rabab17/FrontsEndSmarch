import { Link } from "react-router-dom";
import { MdOutlineHome } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { IoIosPeople } from "react-icons/io";
import { TbStars } from "react-icons/tb";

export default function HomePage() {
    return (
        <>
            <div
                className="bg-cover bg-center h-[900px] relative"
                style={{ backgroundImage: "url('src/assets/images/home-image.png')" }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-[#101828] opacity-60"></div>

                {/* Header */}
                <header className="mx-auto max-w-[1440px] h-[108px] flex items-center justify-between px-6 relative z-10">
                    <div className="flex items-center">
                        <img
                            src="./src/assets/images/logo.png"
                            alt="Logo"
                            className="h-[40px] w-auto"
                        />
                    </div>

                    <nav className="hidden md:flex">
                        <Link to="/" className="text-[#E9F3FF] text-xl font-semibold ml-8 ">
                            الرئيسية
                        </Link>
                        <Link to="/about" className="text-[#E9F3FF] text-lg ml-8 ">
                            من نحن
                        </Link>
                        <Link to="/partners" className="text-[#E9F3FF] text-lg ml-8 ">
                            شركاء النجاح
                        </Link>
                        <Link to="/blog" className="text-[#E9F3FF] text-lg ">
                            المدونة
                        </Link>
                    </nav>

                    <button className="bg-gradient-to-l from-[#48BB78] to-[#1A71FF] text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                        تسجيل الدخول
                    </button>
                </header>

                {/* Hero Section */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center z-50 w-[60%]">
                    <h1 className="text-[30px] md:text-[55px] font-bold leading-[150%] text-center whitespace-normal">
                        إدارة وحجز الشاليهات بسهولة&nbsp;و&nbsp;احترافية!
                    </h1>

                    <p className="mt-4 text-sm md:text-[39px] leading-relaxed">
                        منصة مبتكرة تجمع بين الراحة والاحترافية في إدارة حجز الشاليهات. سواء كنت مالكًا أو مستأجرًا، نقدم لك أفضل تجربة ممكنة.
                    </p>

                    <button className="w-56 mt-6 bg-gradient-to-l from-[#48BB78] via-[#48BB78] to-[#1A71FF] text-white text-3xl px-6 py-2 md:px-8 md:py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                        ابدأ الآن
                    </button>
                </div>
            </div>
            <div className="">
                <div className="mx-auto w-[80%] bg-[#c9d0d9] h-[200px] rounded-3xl">
                    <div className="flex justify-evenly">
                        <div className="my-6 ">
                            <MdOutlineHome className="mb-2 text-[#0061E0] text-6xl" />
                            <h1 className="mb-2 text-[#0D263B] text-3xl font-bold" >+100</h1>
                            <p className="mb-2 text-[#0061E0] text-3xl">شاليه</p>
                        </div>
                        <div className="my-6">
                            <SlCalender className="mb-2 text-[#0061E0] text-6xl" />
                            <h1 className="mb-2 text-[#0D263B] text-3xl font-bold">+300</h1>
                            <p className="mb-2 text-[#0061E0] text-3xl">تقيم</p>
                        </div>
                        <div className=" my-6">
                            <IoIosPeople className="mb-2 text-[#0061E0] text-6xl" />
                            <h1 className="mb-2 text-[#0D263B] text-3xl font-bold">+1500</h1>
                            <p className="mb-2 text-[#0061E0] text-3xl">عميل</p>
                        </div>
                        <div className="my-6">
                            <TbStars className="mb-2 text-[#0061E0] text-6xl" />
                            <h1 className="mb-2 text-[#0D263B] text-3xl font-bold">+2000</h1>
                            <p className="mb-2 text-[#0061E0] text-3xl">حجز</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
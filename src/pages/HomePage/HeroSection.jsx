import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosMenu } from "react-icons/io";

export default function HeroSection() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div
            className="bg-cover bg-center relative h-[500px] sm:h-[700px] lg:h-[900px]"
            style={{ backgroundImage: "url('src/assets/images/home-image.png')" }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#101828] opacity-60"></div>

            {/* Header */}
            <header className="mx-auto max-w-[1440px] h-[108px] flex items-center justify-between px-2 lg:px-6 relative z-10">
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center w-full justify-between">
                    <div className="flex items-center">
                        <img
                            src="./src/assets/images/logo.png"
                            alt="Logo"
                            className="h-[40px] w-auto transition-transform duration-300 transform hover:scale-110"
                        />
                    </div>

                    <nav className="flex items-center">
                        <Link to="/" className="text-[#E9F3FF] text-xl font-semibold ml-8">
                            الرئيسية
                        </Link>
                        <Link to="/about" className="text-[#E9F3FF] text-lg ml-8">
                            من نحن
                        </Link>
                        <Link to="/partners" className="text-[#E9F3FF] text-lg ml-8">
                            شركاء النجاح
                        </Link>
                        <Link to="/blog" className="text-[#E9F3FF] text-lg">
                            المدونة
                        </Link>
                    </nav>

                    <button className="bg-gradient-to-l from-[#48BB78] to-[#1A71FF] text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 start-button">
                        تسجيل الدخول
                    </button>
                </div>

                {/* Mobile Header */}
                <div className='md:hidden flex justify-between w-[100%]'>
                    {/* Hamburger Icon (positioned to the right) */}
                    <div className='w-[20%]'>
                        <IoIosMenu
                            onClick={toggleMenu}
                            className="text-white text-4xl md:text-3xl transition-transform duration-300"
                        />
                    </div>

                    {/* Logo in the Center for Mobile */}
                    <img
                        src="./src/assets/images/logo.png"
                        alt="Logo"
                        className="h-[40px] w-auto"
                    />

                    <button className="bg-gradient-to-l from-[#48BB78] to-[#1A71FF] text-white px-4 py-1 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm">
                        تسجيل الدخول
                    </button>
                </div>

                {/* Mobile Menu Drawer */}
                <div
                    className={`fixed inset-0 bg-[#00000080] z-20 transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                    onClick={toggleMenu}
                >
                    <div className={`fixed right-0 top-0 bg-[#2c3e50] w-[250px] h-full p-6 transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} transition-all duration-300`}>
                        <nav className="flex flex-col">
                            <Link to="/" className="text-[#E9F3FF] text-xl font-semibold mb-6 nav-link">
                                الرئيسية
                            </Link>
                            <Link to="/about" className="text-[#E9F3FF] text-lg mb-6 nav-link">
                                من نحن
                            </Link>
                            <Link to="/partners" className="text-[#E9F3FF] text-lg mb-6 nav-link">
                                شركاء النجاح
                            </Link>
                            <Link to="/blog" className="text-[#E9F3FF] text-lg mb-6 nav-link">
                                المدونة
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center  w-[90%] sm:w-[70%] lg:w-[60%]">
                {/* العنوان */}
                <h1 className="text-[24px] sm:text-[30px] md:text-[40px] lg:text-[55px] font-bold leading-[140%] md:leading-[150%] text-center whitespace-normal">
                    إدارة وحجز الشاليهات بسهولة واحترافية!
                </h1>

                {/* النص الوصفي */}
                <p className="mt-4 text-xs sm:text-sm md:text-lg lg:text-[24px] leading-relaxed">
                    منصة مبتكرة تجمع بين الراحة والاحترافية في إدارة حجز الشاليهات. سواء كنت مالكًا أو مستأجرًا، نقدم لك أفضل تجربة ممكنة.
                </p>

                {/* الزر */}
                <button className="w-40 sm:w-48 md:w-56 lg:w-64 mt-6 bg-gradient-to-l from-[#48BB78] via-[#48BB78] to-[#1A71FF] text-white text-sm sm:text-lg md:text-2xl px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 start-button">
                    ابدأ الآن
                </button>
            </div>
        </div>
    );
}
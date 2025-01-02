import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosMenu } from "react-icons/io";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header  className="h-[108px] w-full bg-white flex items-center justify-between px-2 lg:px-6 shadow-md">
      {/* اللوغو على اليسار */}
      <div className="hidden lg:flex items-center">
        <img src="./src/assets/images/logo.png" alt="Logo" className="h-[40px] w-auto" />
      </div>

      {/* القائمة في المنتصف مع زيادة التباعد بين العناصر */}
      <nav className="hidden md:flex items-center ">
        <Link to="/" className="text-[#101828] text-lg ml-8 font-bold">الرئيسية</Link>
        <Link to="/about" className="text-[#101828] text-lg ml-8">من نحن</Link>
        <Link to="/partners" className="text-[#101828] text-lg ml-8">شركاء النجاح</Link>
        <Link to="/blog" className="text-[#101828] text-lg">المدونة</Link>
      </nav>

      {/* زر تسجيل الدخول على اليمين */}
      <div className="hidden md:flex items-center">
        <button className="bg-gradient-to-l from-[#1A71FF] to-[#48BB78] text-white px-6 py-2 rounded-lg font-semibold shadow-lg">
          تسجيل الدخول
        </button>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden flex justify-between w-full">
        {/* Hamburger Icon (positioned to the right) */}
        <div className="w-[20%]">
          <IoIosMenu
            onClick={toggleMenu}
            className="text-[#101828] text-3xl"
          />
        </div>

        {/* Logo in the Center for Mobile */}
        <img src="./src/assets/images/logo.png" alt="Logo" className="h-[40px] w-auto mx-auto" />

        {/* Mobile Login Button */}
        <button className="bg-gradient-to-l from-[#1A71FF] to-[#48BB78] text-white px-4 py-1 rounded-lg font-semibold text-sm">
          تسجيل الدخول
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 bg-[#00000080] z-20 transition-all duration-300 ${isMenuOpen ? "block" : "hidden"}`}
        onClick={toggleMenu}
      >
        <div className={`fixed right-0 top-0 bg-white w-[250px] h-full p-6 transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} transition-all duration-300`}>
          <nav className="flex flex-col space-y-6">
            <Link to="/" className="text-[#101828] text-xl font-semibold">الرئيسية</Link>
            <Link to="/about" className="text-[#101828] text-lg">من نحن</Link>
            <Link to="/partners" className="text-[#101828] text-lg">شركاء النجاح</Link>
            <Link to="/blog" className="text-[#101828] text-lg">المدونة</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

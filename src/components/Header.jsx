import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header dir="rtl" className="h-[108px] w-full bg-white flex items-center justify-between px-6 shadow-md">
      {/* اللوغو على اليسار */}
      <div className="flex items-center">
        <img src="./src/assets/images/logo.png" alt="Logo" className="h-[40px] w-auto" />
      </div>

      {/* القائمة في المنتصف مع زيادة التباعد بين العناصر */}
      <nav className="flex ">
        <Link to="/" className="text-[#101828] text-lg font-bold ml-8">الرئيسية</Link>
        <Link to="/about" className="text-[#101828] text-lg  ml-8">من نحن</Link>
        <Link to="/partners" className="text-[#101828] text-lg  ml-8">شركاء النجاح</Link>
        <Link to="/blog" className="text-[#101828] text-lg ">المدونة</Link>
      </nav>

      {/* زر تسجيل الدخول على اليمين */}
      <div className="flex items-center">
        <button className="bg-gradient-to-l from-[#1A71FF] to-[#48BB78] text-white px-6 py-2 rounded-lg font-semibold shadow-lg">
          تسجيل الدخول
        </button>
      </div>
    </header>
  );
}

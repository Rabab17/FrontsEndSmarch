import { Link } from "react-router-dom";

export default function SiginUp() {
    return (
        <div className="flex flex-col md:flex-row justify-around items-center py-10 bg-blue-50 rounded-lg shadow-lg overflow-hidden w-full">
            {/* form section*/}
            <div className="w-full md:w-1/3 p-8">
                <h1 className="text-4xl font-bold text-[#1E293B] mb-4">
                    إنشاء حساب جديد
                </h1>
                <p className="text-2xl text-[#718096] mb-6">
                    ابدأ رحلتك الآن وسجل حسابك بكل سهولة
                </p>
                <form className="space-y-4">
                    <div className="p-[1px] bg-gradient-to-r from-[#1a72ffd3] via-[#1A71FFCC] to-[#48BB78] rounded-lg ">
                        <input
                            type="text"
                            placeholder="اسم المستخدم"
                            className="w-full p-3 bg-white rounded-lg text-right focus:outline-[#0061E0]"
                        />
                    </div>
                    <div className="p-[1px] bg-gradient-to-r from-[#1a72ffd3] via-[#1A71FFCC] to-[#48BB78] rounded-lg">
                        <input
                            type="email"
                            placeholder="بريد إلكتروني"
                            className="w-full p-3 bg-white rounded-lg text-right focus:outline-[#0061E0]"
                        />
                    </div>
                    <div className="p-[1px] bg-gradient-to-r from-[#1a72ffd3] via-[#1A71FFCC] to-[#48BB78] rounded-lg">
                        <input
                            type="tel"
                            placeholder="رقم الهاتف"
                            className="w-full p-3 bg-white rounded-lg text-right focus:outline-[#0061E0]"
                        />
                    </div>
                    <div className="p-[1px] bg-gradient-to-r from-[#1a72ffd3] via-[#1A71FFCC] to-[#48BB78] rounded-lg">
                        <input
                            type="password"
                            placeholder="كلمة مرور"
                            className="w-full p-3 bg-white rounded-lg text-right focus:outline-[#0061E0]"
                        />
                    </div>
                    <div className="p-[1px] bg-gradient-to-r from-[#1a72ffd3] via-[#1A71FFCC] to-[#48BB78] rounded-lg">
                        <input
                            type="password"
                            placeholder="تأكيد كلمة المرور"
                            className="w-full p-3 bg-white rounded-lg text-right focus:outline-[#0061E0]"
                        />
                    </div>
                    <label className="flex items-center text-sm">
                        <input type="checkbox" className="ml-2" />
                        أوافق على اتفاقية المستخدم
                    </label>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-l from-[#48BB78] to-[#1A71FF] text-white py-3 rounded-lg"
                    >
                        إنشاء حساب
                    </button>
                </form>
                <p className="text-center text-sm mt-4">
                    لديك حساب بالفعل؟{" "}
                    <Link to="/login" className="text-[#0061E0] font-semibold hover:underline">
                        سجل الدخول الآن
                    </Link>
                </p>
            </div>

            {/* image section */}
            <div className="hidden md:block w-full md:w-[40%]">
                <img
                    src="src/assets/images/login.png"
                    alt="Building"
                    className="w-full h-full object-contain"
                />
            </div>
        </div>
    );
}

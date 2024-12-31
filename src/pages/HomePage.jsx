import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <>
            <div
                className="bg-cover h-screen relative"
                style={{ backgroundImage: "url('src/assets/images/home-image.png')" }}
            >
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#101828] opacity-40"></div>

                <header className="mx-auto h-[108px] w-[1401px] flex items-center justify-between px-6 relative z-10">
                    <div className="flex items-center w-[162]">
                        <img src="./src/assets/images/logo.png" alt="Logo" className="h-[40px] w-auto" />
                    </div>

                    <nav className="flex">
                        <Link to="/" className="text-[#E9F3FF] text-lg font-semibold ml-8">الرئيسية</Link>
                        <Link to="/about" className="text-[#E9F3FF] text-lg font-semibold ml-8">من نحن</Link>
                        <Link to="/partners" className="text-[#E9F3FF] text-lg font-semibold ml-8">شركاء النجاح</Link>
                        <Link to="/blog" className="text-[#E9F3FF] text-lg font-semibold">المدونة</Link>
                    </nav>

                    <div className="flex items-center w-[228]">
                        <button className="bg-gradient-to-l from-[#1A71FF] to-[#48BB78] text-white px-6 py-2 rounded-lg font-semibold shadow-lg">
                            تسجيل الدخول
                        </button>
                    </div>
                </header>

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center z-10">
                    <h1 className="text-4xl font-bold">إدارة وحجز الشاليهات بسهولة واحترافية!</h1>
                    <p className="mt-4 text-xl">منصة مبتكرة تجمع بين الراحة والاحترافية في إدارة حجز الشاليهات. سواء كنت مالكًا أو مستأجرًا، نقدم لك أفضل تجربة ممكنة.</p>
                </div>
            </div>
        </>
    );
}

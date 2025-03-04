import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import FormInput from "./FormInput";
import { notificationContext } from "../../context/Notification";

export default function SignUpUser() {
    const { setToken } = useContext(notificationContext)
    const location = useLocation();
    const { userType } = location.state || {};
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // حالة اللودر
    const nav = useNavigate();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&])[A-Za-z\d!@#$%^&]{8,}$/;
    useEffect(() => {

        if (!userType) {
            nav("/signup");
        }
    }, [userType, nav]);


    // submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);
        setIsLoading(true)
        // التحقق من صحة البيانات
        if (!emailRegex.test(email)) {
            setError("البريد الإلكتروني غير صالح.");
            return;
        }
        if (!passwordRegex.test(password)) {
            setError(
                "كلمة المرور يجب أن تحتوي على حرف كبير، حرف صغير، رقم، ورمز خاص (!@#$%^&) وأن تكون مكونة من 8 أحرف على الأقل."
            );
            return;
        }
        if (password !== confirmPassword) {
            setError("كلمتا المرور غير متطابقتين.");
            return;
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}user`, {
                userName: username,
                email,
                phoneNumber: phone,
                password,
                role: userType,
            });
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("token", response.data.token);
            setToken(response.data.token);

            Swal.fire({
                title: "تم التسجيل بنجاح!",
                text: "تم إنشاء حسابك بنجاح. سيتم تحويلك إلى  لوحة التحكم .",
                icon: "success",
                confirmButtonText: "حسناً",
            }).then(() => {
                userType == 'user' ? nav("/userdashboard") : nav("/ownerdashboard")
            });
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            Swal.fire({
                title: "خطأ",
                text: error.response.data.message,
                icon: "error",
                confirmButtonText: "حسناً",
            });
        } finally {
            setIsLoading(false);

        }

    };

    return (
        <div className="flex flex-col md:flex-row justify-around mb-10 items-center py-10 bg-blue-50 rounded-lg shadow-lg overflow-hidden w-full">
            {/* form section */}
            <div className="w-full md:w-1/3 p-8">
                <h1 className="text-4xl font-bold text-[#1E293B] mb-4">
                    {userType == 'user' ? "تريد الاستمتاع بإجازتك؟" : "تبحث عن إدارة شاليهك؟"}
                </h1>
                <p className="text-2xl text-[#718096] mb-6">
                    {userType == 'user' ? "سجّل حسابك لتصفح الشاليهات وحجز عطلتك المثالية بسهولة." : "تبحث عن إدارة شاليهك؟"}

                </p>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                <form className="space-y-4" onSubmit={handleSubmit}>

                    <FormInput label="اسم المستخدم" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

                    <FormInput label="بريد إلكتروني" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required={true} />


                    <FormInput label="رقم الهاتف" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />


                    <FormInput label="كلمة مرور" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required={true} />


                    <FormInput label="تأكيد كلمة المرور" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required={true} />

                    <label className="flex items-center text-sm">
                        <input type="checkbox" className="ml-2" required />
                        <a href="/terms" target="_blank" rel="noopener noreferrer">
                            أوافق على اتفاقية المستخدم
                        </a>
                    </label>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-l from-[#48BB78] to-[#1A71FF] text-white py-3 rounded-lg flex items-center justify-center gap-2"
                        disabled={isLoading} // تعطيل الزر أثناء التحميل
                    >
                        {isLoading ? (
                            <>
                                <p className="mx-5">
                                    جاري المعالجة
                                </p>
                                <div className="w-5 h-5 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                            </>
                        ) : (
                            "انشاء حساب"
                        )}
                    </button>
                </form>
                <p className="text-center text-sm mt-4">
                    لديك حساب بالفعل؟
                    <Link to="/login" className="text-[#0061E0] font-semibold hover:underline">
                        سجل الدخول الآن
                    </Link>
                </p>
            </div>

            {/* image section */}
            <div className="hidden md:block w-full md:w-[40%]">
                <img
                    src="/assets/images/login.png"
                    alt="Building"
                    className="w-full h-full object-contain"
                />
            </div>
        </div>
    );
}

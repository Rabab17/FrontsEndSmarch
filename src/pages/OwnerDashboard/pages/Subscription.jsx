import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // استخدام useNavigate في React Router v6
import Splash from "../../../components/Splash";

export default function Subscription() {
    const [packages, setPackages] = useState(null);
    const token = localStorage.getItem("token");
    const navigate = useNavigate(); // استخدام useNavigate للتنقل بين الصفحات

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`https://smarch-back-end-nine.vercel.app/subscription/user/subscriptions`,
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                );
                setPackages(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.error("خطأ في استرجاع بيانات المستخدم:", error);
            }
        };

        fetchUserData();
    }, [token]);

    if (!packages) {
        return <Splash />;
    }

    const handleSelectPackage = (packageId) => {
        // التنقل إلى الصفحة المحددة مع إرسال الـ id عبر state
        navigate("/OwnerDashboard/addChalet", { state: { packageId } });
    };

    return (
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 p-6">
            {
                packages.map((plan) => (
                    <div
                        key={plan._id}
                        className="border border-gray-300 rounded-lg shadow-md p-6 text-center w-[90%] md:w-[25%]"
                    >
                        <h3 className="text-3xl font-bold text-blue-700 mb-4">{plan.packageId.name}</h3>

                        <div className="text-xl mb-6 space-y-2 text-start">
                            <p>
                                تاريخ الاشتراك : {new Date(plan.createdAt).toLocaleDateString("en-GB")}
                            </p>
                            <p>
                                تاريخ الانتهاء : {new Date(plan.endDate).toLocaleDateString("en-GB")}
                            </p>
                            <p>
                                عدد الشاليهات الباقيه : {plan.remainChalets}
                            </p>
                        </div>
                        <button
                            onClick={() => handleSelectPackage(plan._id)} // إرسال الـ id عند النقر
                            className="bg-blue-600 text-white py-2 px-8 rounded-lg hover:bg-blue-700 transition"
                        >
                            اختيار
                        </button>
                    </div>
                ))
            }
        </div>
    )
}

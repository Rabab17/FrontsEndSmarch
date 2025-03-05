import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Splash from "../../../components/Splash";
import Swal from "sweetalert2";

export default function SubscriptionOwner() {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}subscription/user/subscriptions`,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            setPackages(response.data.data);
        } catch (error) {
            console.error("خطأ في استرجاع بيانات المستخدم:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchUserData();
    }, []);

    if (loading) {
        return <Splash />;
    }

    const handleSelectPackage = (packageId) => {
        navigate("/OwnerDashboard/addChalet", { state: { packageId } });
    };

    const handleRenewPackage = async (packageId) => {
        setLoading(true);
        try {
            const response = await axios.patch(`${import.meta.env.VITE_URL_BACKEND}subscription/renew/${packageId}`, {},
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            Swal.fire({
                title: "ناجح",
                text: response.data.message,
                icon: "success",
            })
            fetchUserData();
        } catch (error) {
            Swal.fire({
                title: "خطأ",
                text: error.response.data.massage,
                icon: "error",
            });

            console.error("خطأ في استرجاع بيانات المستخدم:", error);
        } finally {
            setLoading(false);
        }
    }

    const currentDate = new Date();
    return (
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 p-6">
            {packages.length === 0 ?
                <div>
                    <h2 className="text-3xl text-center text-gray-500 mt-12">
                        انت غير مشترك فى باقه برجاء الاشتراك

                    </h2>
                    <div className="flex justify-center mt-10">

                        <button
                            className="w-1/2 text-3xl bg-gradient-to-l from-[#48BB78] to-[#1A71FF] text-white py-3 rounded-lg flex items-center justify-center gap-2"
                            onClick={() => { navigate('/ownerdashboard/BalanceRecharge') }}
                        >
                            اشترك الان
                        </button>
                    </div>
                </div>
                : (
                    <>
                        {
                            packages.map((plan) => (
                                <div
                                    key={plan._id}
                                    className="border border-gray-300 rounded-lg shadow-md p-6 text-center w-[90%] md:w-[25%]"
                                >
                                    <h3 className="text-3xl font-bold text-blue-700 mb-4">{plan.packageId?.name}</h3>

                                    <div className="text-xl mb-6 space-y-2 text-start">
                                        <p>تاريخ الاشتراك : {new Date(plan.createdAt).toLocaleDateString("en-GB")}</p>
                                        <p>تاريخ الانتهاء : {new Date(plan.endDate).toLocaleDateString("en-GB")}</p>
                                        <p>عدد الشاليهات الباقية : {plan.remainChalets}</p>
                                        {new Date(plan.endDate) < currentDate &&
                                            <h1 className="text-xl text-center"> موعد الباقه انتهي برجاء التجديد</h1>

                                        }
                                    </div>

                                    {new Date(plan.endDate) < currentDate ? (
                                        <>
                                            <button
                                                onClick={() => handleRenewPackage(plan._id)}
                                                className="bg-red-600 text-white py-2 px-8 rounded-lg hover:bg-red-700 transition"
                                            >
                                                تجديد الاشتراك
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => handleSelectPackage(plan._id)}
                                            disabled={plan.remainChalets === 0}
                                            className={`bg-blue-600 text-white py-2 px-8 rounded-lg hover:bg-blue-700 transition ${plan.remainChalets === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            اختيار
                                        </button>
                                    )}
                                </div>
                            ))
                        }
                    </>
                )
            }
        </div>
    )
}

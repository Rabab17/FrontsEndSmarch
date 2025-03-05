import { useEffect, useState } from 'react';
import axios from 'axios';
import Splash from "../../../components/Splash";
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '../../../components/Pagination';

export default function ControlsPage() {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const nav = useNavigate();

    const fetchPackages = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}chalet/owner`, {
                headers: {
                    Authorization: token
                }
            });
            console.log(response.data.data)
            setPackages(response.data.data);

        } catch (error) {
            console.error("Error fetching packages:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPackages();
    }, []);

    const navToAddPackage = () => {
        nav('BalanceRecharge');
    };

    const navToSingleMang = (chaletId) => {
        nav('SingleChaletManagement', { state: { chaletId } });
    };

    const indexOfLastPackage = currentPage * itemsPerPage;
    const indexOfFirstPackage = indexOfLastPackage - itemsPerPage;
    const currentPackages = packages.slice(indexOfFirstPackage, indexOfLastPackage);



    const totalPages = Math.ceil(packages.length / itemsPerPage);

    if (loading) return <Splash />;

    return (
        <div className="px-4">
            <div className="flex mb-4">
                <button
                    onClick={navToAddPackage}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    اضافة باقة +
                </button>
            </div>
            {packages.length > 0 ?

                <div className="space-y-4">
                    {currentPackages.map((pkg, index) => (
                        <div key={pkg._id} className="flex flex-col md:flex-row bg-blue-100 p-4 rounded-lg shadow-md items-center md:justify-between">
                            {/* رقم الباقة */}
                            <div className="text-center md:w-1/6">
                                <p className="text-gray-800 pb-5">رقم الباقة</p>
                                <p className="font-bold text-blue-600">{index + 1 + (currentPage - 1) * itemsPerPage}</p>
                            </div>

                            {/* اسم الباقة */}
                            <div className="text-center md:w-1/6">
                                <p className="text-gray-800 pb-5">اسم الباقة</p>
                                <p className="font-bold text-blue-600">{pkg.subscriptionID.packageId.name}</p>
                            </div>

                            {/* اسم الشاليه */}
                            <div className="text-center md:w-1/6">
                                <p className="text-gray-800 pb-5">اسم الشاليه</p>
                                <p className="font-bold text-blue-600">{pkg.name}</p>
                            </div>

                            {/* تاريخ البداية */}
                            <div className="text-center md:w-1/6">
                                <p className="text-gray-800 pb-5">تاريخ البداية</p>
                                <p className="font-bold text-blue-600">{new Date(pkg.subscriptionID.startDate).toLocaleDateString()}</p>
                            </div>

                            {/* تاريخ الانتهاء */}
                            <div className="text-center md:w-1/6">
                                <p className="text-gray-800 pb-5">تاريخ الانتهاء</p>
                                <p className="font-bold text-blue-600">{new Date(pkg.subscriptionID.endDate).toLocaleDateString()}</p>
                            </div>

                            {/* زر الإدارة والتحكم */}
                            <div className="text-center md:w-1/6">
                                <button
                                    onClick={() => navToSingleMang(pkg._id)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                >
                                    الإدارة والتحكم
                                </button>
                            </div>
                        </div>
                    ))}
                    < Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
                </div> :
                <div className="flex flex-col justify-center items-center h-full">
                    <h2 className="text-center text-3xl text-gray-700 ">
                        لم تقم بإضافة أي شاليهات بعد
                    </h2>
                    <Link to='/ownerdashboard/subscription'>

                        <button
                            className="m-5 p-5 text-3xl bg-gradient-to-l from-[#48BB78] to-[#1A71FF] text-white py-3 rounded-lg"
                        >
                            ابدأ بإضافة شاليه الآن!
                        </button>
                    </Link>
                </div>
            }

        </div>
    );
}
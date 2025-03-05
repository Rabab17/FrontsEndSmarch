import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosPeople } from "react-icons/io";
import { MdOutlineHome } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { TbStars } from "react-icons/tb";
import Splash from "../../components/Splash";

export default function QuickStats() {
    const [stats, setStats] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}siteData`);
                
                setStats(response.data.data)
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false)
            }
        };

        fetchData();
    }, []);
    if (loading) return <Splash />;
    const statsData = [
        { icon: MdOutlineHome, value: stats?.chalet|0, label: "شاليه" },
        { icon: SlCalender, value: stats?.reservation|0, label: "تقيم" },
        { icon: IoIosPeople, value: stats?.client|0, label: "عميل" },
        { icon: TbStars, value: stats?.rating|0, label: "حجز" },
    ];
    return (
        <div className="mx-auto lg:w-[80%] w-[90%] bg-blue-50 py-4 rounded-3xl">
            <div className="flex justify-evenly items-center flex-wrap md:flex-nowrap">
                {statsData.map(({ icon: Icon, value, label }) => (
                    <div key={label} className="flex flex-col items-center w-[22%] md:w-auto">
                        <Icon className="mb-2 text-[#0061E0] text-3xl md:text-6xl" />
                        <h1 className="mb-2 text-[#0D263B] text-lg md:text-3xl font-bold">+{value}</h1>
                        <p className="mb-2 text-[#0061E0] text-sm md:text-3xl">{label}</p>
                    </div>
                ))}
            </div>
        </div>

    )
}

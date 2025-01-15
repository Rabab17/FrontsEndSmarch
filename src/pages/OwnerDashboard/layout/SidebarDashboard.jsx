
/* eslint-disable react/prop-types */
import { AiFillPieChart } from "react-icons/ai";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { useState } from "react";

export default function SidebarDashboard({ onSelect, isOpen }) {
    const [selected, setSelected] = useState("controls");

    const handleSelect = (page) => {
        setSelected(page);
        onSelect(page);
    };

    return (
        <aside className={`bg-blue-50 w-64 h-full p-4 md:flex flex-col justify-center ${isOpen ? '' : 'hidden'}`}>
            <div className="mt-10 text-center">
                <div className={`mb-6 text-2xl flex items-center gap-2 cursor-pointer rounded ${selected === "controls" ? "bg-[#0061E0] text-white py-2" : ""
                    }`}
                    onClick={() => handleSelect("controls")}
                >
                    <AiFillPieChart size={22} className={`text-[#0061E0] ${selected === "controls" ? "text-white" : ""
                        }`} />
                    <h1>لوحة التحكم</h1>
                </div>
                <div className="space-y-6">
                    <div
                        className={`text-2xl flex items-center gap-2 cursor-pointer rounded ${selected === "BalanceRecharge" ? "bg-[#0061E0] text-white py-2" : ""
                            }`}
                        onClick={() => handleSelect("BalanceRecharge")}
                    >
                        <FaMoneyBill1Wave size={22} className={`text-[#0061E0] ${selected === "BalanceRecharge" ? "text-white" : ""
                            }`} />
                        <h1>شحن الرصيد</h1>
                    </div>
                    <div
                        className={`text-2xl flex items-center gap-2 cursor-pointer rounded ${selected === "profile" ? "bg-[#0061E0] text-white py-2" : ""
                            }`}
                        onClick={() => handleSelect("profile")}
                    >
                        <IoPerson size={22} className={`text-[#0061E0] ${selected === "profile" ? "text-white" : ""
                            }`} />
                        <h1>الملف الشخصي</h1>
                    </div>

                    <div
                        className={`text-2xl flex items-center gap-2 cursor-pointer rounded ${selected === "support" ? "bg-[#0061E0] text-white py-2" : ""
                            }`}
                        onClick={() => handleSelect("support")}
                    >
                        <MdSupportAgent size={22} className={`text-[#0061E0] ${selected === "support" ? "text-white" : ""
                            }`} />
                        <h1>تذاكر الدعم</h1>
                    </div>
                    <div
                        className={`text-2xl flex items-center gap-2 cursor-pointer rounded ${selected === "notifications" ? "bg-[#0061E0] text-white py-2" : ""
                            }`}
                        onClick={() => handleSelect("notifications")}
                    >
                        <IoNotifications size={22} className={`text-[#0061E0] ${selected === "notifications" ? "text-white" : ""
                            }`} />
                        <h1>الإشعارات</h1>
                    </div>
                </div>
            </div>

            <div className="mt-auto">
                <button className="w-full px-4 py-2 mt-4 bg-[#0061E0] rounded text-white text-2xl">
                    تسجيل خروج
                </button>
            </div>
        </aside>
    );
}

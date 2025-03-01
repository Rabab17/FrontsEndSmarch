/* eslint-disable react/prop-types */
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function FormInput({ label, type, value, onChange, required }) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="relative p-[1px] bg-gradient-to-r from-[#1a72ffd3] via-[#1A71FFCC] to-[#48BB78] rounded-lg">
            <input
                type={type === "password" && showPassword ? "text" : type}
                value={value}
                onChange={onChange}
                placeholder={label}
                required={required}
                className="w-full p-3 bg-white rounded-lg text-right focus:outline-[#0061E0]"
            />
            {type === "password" && (
                <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute inset-y-0 left-3 flex items-center text-[#0061E0]"
                >
                    {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
                </button>
            )}
        </div>
    );
}

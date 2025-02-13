/* eslint-disable react/prop-types */

import { AiOutlineCloseCircle, AiOutlinePlusCircle } from "react-icons/ai";

export default function ListInput({ title, list, setList, error }) {
    const handleChange = (index, value) => {
        const updatedList = [...list];
        updatedList[index] = value;
        setList(updatedList);
    };

    const handleAdd = () => {
        setList([...list, ""]);
    };

    const handleRemove = (index) => {
        setList(list.filter((_, i) => i !== index));
    };

    return (
        <div className="mb-3">
            <label className="block font-semibold mb-1">{title}:</label>
            {list.map((point, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                    <input
                        type="text"
                        value={point}
                        onChange={(e) => handleChange(index, e.target.value)}
                        placeholder={`نقطة ${index + 1}`}
                        className={`w-full p-2 bg-transparent border rounded-lg focus:outline-[#124FB3] ${error ? "border-red-500" : "border-black"}`}
                    />

                    {/* زر الإضافة */}
                    {index === list.length - 1 && (
                        <button type="button" onClick={handleAdd} className="text-blue-600 hover:text-blue-800">
                            <AiOutlinePlusCircle size={24} />
                        </button>
                    )}

                    {/* زر الحذف */}
                    {list.length > 1 && (
                        <button type="button" onClick={() => handleRemove(index)} className="text-red-600 hover:text-red-800">
                            <AiOutlineCloseCircle size={24} />
                        </button>
                    )}
                </div>
            ))}
            {error && <div className="error text-red-600">{error}</div>}
        </div>
    );
}

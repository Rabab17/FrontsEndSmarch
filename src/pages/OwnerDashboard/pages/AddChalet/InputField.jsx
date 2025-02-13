// eslint-disable-next-line react/prop-types
export default function InputField({ label, name, value, onChange, error, type = "text" }) {
    return (
        <div >
            <label className="block text-black text-xl mb-2">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className={`border rounded w-full p-2 ${error ? "border-red-500" : "border-black"}`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}

import { Packages } from "../../../api/data";

export default function ControlsPage() {
  const packages = Packages
  return (
    <div className="px-4">
      <div className="flex mb-4">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          اضافة باقة +
        </button>
      </div>
      <div className="space-y-4">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="flex flex-col md:flex-row bg-blue-100 p-4 rounded-lg shadow-md items-center md:justify-between"
          >
            {/* رقم الباقة */}
            <div className="text-center md:w-1/6">
              <p className=" text-gray-800 pb-5">رقم الباقة</p>
              <p className="font-bold text-blue-600">{pkg.id}</p>
            </div>

            {/* اسم الباقة */}
            <div className="text-center md:w-1/6">
              <p className=" text-gray-800 pb-5">اسم الباقة</p>
              <p className="font-bold text-blue-600">{pkg.name}</p>
            </div>

            {/* اسم التفاصيل */}
            <div className="text-center md:w-1/6">
              <p className=" text-gray-800 pb-5">اسم الشاليه</p>
              <p className="font-bold text-blue-600">{pkg.chaletName}</p>
            </div>

            {/* تاريخ البداية */}
            <div className="text-center md:w-1/6">
              <p className=" text-gray-800 pb-5">تاريخ البداية</p>
              <p className="font-bold text-blue-600">{pkg.startDate}</p>
            </div>

            {/* تاريخ الانتهاء */}
            <div className="text-center md:w-1/6">
              <p className=" text-gray-800 pb-5">تاريخ الانتهاء</p>
              <p className="font-bold text-blue-600">{pkg.endDate}</p>
            </div>

            {/* زر الإدارة والتحكم */}
            <div className="text-center md:w-1/6">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                الإدارة والتحكم
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
}

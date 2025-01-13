export default function ProfilePage() {
  return (
    <>
      {/* زر تغيير كلمة المرور */}
      <div className="text-end sm:px-10 ">
        <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
          🔒 تغيير كلمة السر
        </button>
      </div>
      {/* البطاقة الرئيسية */}
      <div className="mx-4 sm:mx-8 bg-white rounded-lg shadow-md border border-blue-300 mt-6 pb-8">
        {/* القسم العلوي (صورة المستخدم والمعلومات الشخصية) */}
        <div className="flex flex-wrap items-center justify-between px-6 sm:px-10 py-6 gap-4">
          <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
            تعديل
          </button>
          <div className="flex items-center gap-4">
            <div className="text-end">
              <h2 className="text-lg font-semibold">Mohamed Fathy</h2>
              <p className="text-gray-500">mohamed@gmail.com</p>
            </div>
            <img
              src="/assets/images/copy1.JPG"
              alt="Profile Picture"
              className="w-20 h-20 rounded-full"
            />
          </div>
        </div>

        {/* الحقول القابلة للتعديل */}
        <div className="flex flex-wrap justify-evenly gap-4 px-6 sm:px-10">
          {/* الاسم */}
          <div className="w-[80%] sm:w-[40%]">
            <label className="block text-sm font-medium text-gray-700 mb-2">الاسم</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md bg-blue-50 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          {/* البريد الإلكتروني */}
          <div className="w-[80%] sm:w-[40%]">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              البريد الالكتروني
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md bg-blue-50 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          {/* الهاتف */}
          <div className="w-[80%] sm:w-[40%]">
            <label className="block text-sm font-medium text-gray-700 mb-2">الهاتف</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md bg-blue-50 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          {/* تاريخ الميلاد */}
          <div className="w-[80%] sm:w-[40%]">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              تاريخ الميلاد
            </label>
            <select
              className="w-full px-4 py-2 border rounded-md bg-blue-50 focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option>اختر التاريخ</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Blog() {
  return (
    <div className="h-auto bg-cyan-50 flex flex-col items-center justify-center py-10">
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-blue-700 text-3xl font-bold">استكشف مقالاتنا</h1>
        <h3 className="text-gray-600 text-lg">
          تعرف على أحدث الأخبار والنصائح حول استئجار الشاليهات وإدارة العطلات المثالية.
        </h3>
        <input
          type="search"
          name="search1"
          id="12"
          placeholder="بحث"
          className="w-96 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Grid for Blog Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 w-full max-w-screen-lg mx-auto">
        {/* Blog Post Cards */}
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-white p-4 w-full rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
          >
            <img
              src="https://via.placeholder.com/350x200" // Example image URL
              alt={`Blog Post ${index + 1}`}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-lg font-semibold text-blue-700 mb-2">عنوان المقالة {index + 1}</h2>
            <p className="text-gray-600 text-sm mb-4">
              هذا نص تجريبي للمقالة {index + 1}. تعرف على أحدث النصائح حول إدارة العطلات واحتياجات السفر.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

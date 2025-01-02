export default function Blog() {
  return (
    <div className="h-screen bg-cyan-50 flex flex-col items-center justify-center " style={{height:950}}>
     
      <div className="text-center space-y-4 mb-8" style={{ paddingTop: 30 }}>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 w-full max-w-screen-lg mx-auto">
        {/* Blog Post Card 1 */}
        <div className="bg-white p-4 w-80 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
          <img
            src="https://via.placeholder.com/350x200" // Example image URL
            alt="Blog Post 1"
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h2 className="text-lg font-semibold text-blue-700 mb-2">  فضل الوجهات الشاطئية لعام 2024</h2>
          <p className="text-gray-600 text-sm mb-4">
          لحجز عبر الإنترنت يمنحك المرونة والراحة مع خيارات واسعة تناسب جميع احتياجاتك. تعرف على كيف يمكنك الاستفادة من هذه الخدمة بطريقة آمنة وسريعة مع مقارنة الأسعار والعروض بسهولة.          </p>
        
        </div>

        {/* Blog Post Card 2 */}
        <div className="bg-white p-4 w-80 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
          <img
            src="https://via.placeholder.com/350x200" // Example image URL
            alt="Blog Post 2"
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h2 className="text-lg font-semibold text-blue-700 mb-2"> لماذا يجب عليك الحجز أونلاين؟ </h2>
          <p className="text-gray-600 text-sm mb-4">
            هذا نص تجريبي للمقالة الثانية. تعرف على أحدث النصائح حول إدارة العطلات واحتياجات السفر.
          </p>
        
        </div>

        {/* Blog Post Card 3 */}
        <div className="bg-white p-4 w-80 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
          <img
            src="https://via.placeholder.com/350x200" // Example image URL
            alt="Blog Post 3"
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h2 className="text-lg font-semibold text-blue-700 mb-2">عنوان المقالة 3</h2>
          <p className="text-gray-600 text-sm mb-4">
            تعرف على كيفية اختيار الشاليه المثالي لعطلتك القادمة مع نصائح مفيدة وأفضل الخيارات.
          </p>
        
        </div>

        {/* Blog Post Card 4 */}
        <div className="bg-white p-4 w-80 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
          <img
            src="https://via.placeholder.com/350x200" // Example image URL
            alt="Blog Post 4"
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h2 className="text-lg font-semibold text-blue-700 mb-2">عنوان المقالة 4</h2>
          <p className="text-gray-600 text-sm mb-4">
            هذا نص تجريبي للمقالة الرابعة. اكتشف كيف يمكنك تنظيم عطلتك المثالية في الشاليه.
          </p>
        
        </div>

        {/* Blog Post Card 5 */}
        <div className="bg-white p-4 w-80 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
          <img
            src="https://via.placeholder.com/350x200" // Example image URL
            alt="Blog Post 5"
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h2 className="text-lg font-semibold text-blue-700 mb-2">عنوان المقالة 5</h2>
          <p className="text-gray-600 text-sm mb-4">
            تعرف على أفضل الوجهات للعطلات الشاطئية والجبيلية مع الشاليه المثالي.
          </p>
        
        </div>

        {/* Blog Post Card 6 */}
        <div className="bg-white p-4 w-80 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
          <img
            src="https://via.placeholder.com/350x200" // Example image URL
            alt="Blog Post 6"
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h2 className="text-lg font-semibold text-blue-700 mb-2">عنوان المقالة 6</h2>
          <p className="text-gray-600 text-sm mb-4">
            هذا نص تجريبي للمقالة السادسة. تعرف على أحدث الأخبار في عالم الشاليهات.
          </p>
        
        </div>
      </div>
    </div>
  );
}

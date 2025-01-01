
export default function ChaletSection() {
    return (
        <>
            <div className="flex justify-between  mx-2 md:mx-10">
                <div className="w-[70%] md:w-auto">
                    <h1 className="font-bold text-xl md:text-2xl mb-3">
                        اكتشف افضل الشاليهات
                    </h1>
                    <h3 className="  text-sm md:text-base mb-4">
                        تصفّح أفضل الشاليهات المختارة خصيصًا لك بأفضل الأسعار
                    </h3>
                </div>
                <div className="w-[30%] md:w-auto">
                    <button className="border border-blue-500 rounded-md px-2 md:px-5 py-2">
                        عرض الكل
                    </button>
                </div>
            </div>
            <div className="flex overflow-x-auto gap-12 pt-5">
                <div className="w-[300px]">
                    <div className="bg-white shadow-md rounded-lg p-6 border border-blue-500">
                        <img
                            className="w-full h-48 object-cover"
                            src="https://images.unsplash.com/photo-1596345442867-27f38b97433e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
                            alt="Image"
                        />
                        <h3 className="mt-4 text-xl font-bold">شاليه 1</h3>
                        <p className="mt-2 text-sm">المدينة: المدينة 1</p>
                        <p className="mt-2 text-sm">السعر: $150</p>
                    </div>
                </div>

                <div className="w-[300px]">
                    <div className="bg-white shadow-md rounded-lg p-6 border border-blue-500">
                        <img
                            className="w-full h-48 object-cover"
                            src="https://images.unsplash.com/photo-1596345442867-27f38b97433e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
                            alt="Image"
                        />
                        <h3 className="mt-4 text-xl font-bold">شاليه 2</h3>
                        <p className="mt-2 text-sm">المدينة: المدينة 2</p>
                        <p className="mt-2 text-sm">السعر: $200</p>
                    </div>
                </div>

                <div className="w-[300px]">
                    <div className="bg-white shadow-md rounded-lg p-6 border border-blue-500">
                        <img
                            className="w-full h-48 object-cover"
                            src="https://images.unsplash.com/photo-1596345442867-27f38b97433e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
                            alt="Image"
                        />
                        <h3 className="mt-4 text-xl font-bold">شاليه 3</h3>
                        <p className="mt-2 text-sm">المدينة: المدينة 3</p>
                        <p className="mt-2 text-sm">السعر: $180</p>
                    </div>
                </div>

                <div className="w-[300px]">
                    <div className="bg-white shadow-md rounded-lg p-6 border border-blue-500">
                        <img
                            className="w-full h-48 object-cover"
                            src="https://images.unsplash.com/photo-1596345442867-27f38b97433e?ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
                            alt="Image"
                        />
                        <h3 className="mt-4 text-xl font-bold">شاليه 4</h3>
                        <p className="mt-2 text-sm">المدينة: المدينة 4</p>
                        <p className="mt-2 text-sm">السعر: $170</p>
                    </div>
                </div>

                <div className="w-[300px]">
                    <div className="bg-white shadow-md rounded-lg p-6 border border-blue-500">
                        <img
                            className="w-full h-48 object-cover"
                            src="https://images.unsplash.com/photo-1596345442867-27f38b97433e?ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
                            alt="Image"
                        />
                        <h3 className="mt-4 text-xl font-bold">شاليه 4</h3>
                        <p className="mt-2 text-sm">المدينة: المدينة 4</p>
                        <p className="mt-2 text-sm">السعر: $170</p>
                    </div>
                </div>

                <div className="w-[300px]">
                    <div className="bg-white shadow-md rounded-lg p-6 border border-blue-500">
                        <img
                            className="w-full h-48 object-cover"
                            src="https://images.unsplash.com/photo-1596345442867-27f38b97433e?ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
                            alt="Image"
                        />
                        <h3 className="mt-4 text-xl font-bold">شاليه 4</h3>
                        <p className="mt-2 text-sm">المدينة: المدينة 4</p>
                        <p className="mt-2 text-sm">السعر: $170</p>
                    </div>
                </div>


            </div>
        </>
    )
}

export default function OpinionSection() {
    const opinion = [
        {
            id: 1,
            name: 'Kira Wood',
            text: 'كانت تجربتي مع المنصة رائعة! كل شيء كان بسيطًا وسهل الاستخدام، وأنا الآن أستطيع إدارة شاليهتي بكل سهولة.',
            image: 'src/assets/images/Ellipse 55.png',
        },
        {
            id: 2,
            name: 'Kira Wood',
            text: 'كانت تجربتي مع المنصة رائعة! كل شيء كان بسيطًا وسهل الاستخدام، وأنا الآن أستطيع إدارة شاليهتي بكل سهولة.',
            image: 'src/assets/images/Ellipse 55.png',
        },
        {
            id: 3,
            name: 'Kira Wood',
            text: 'كانت تجربتي مع المنصة رائعة! كل شيء كان بسيطًا وسهل الاستخدام، وأنا الآن أستطيع إدارة شاليهتي بكل سهولة.',
            image: 'src/assets/images/Ellipse 55.png',
        },

    ]
    return (


        <section className="bg-blue-50 my-12">
            <div className="container mx-auto text-center pt-6">
                <h2 className="text-5xl text-blue-600 mb-4">
                    آراء شركاء النجاح
                </h2>
                <p className=" ">
                    لا شيء يعبر عن جودة الخدمة أفضل من تجارب شركاء النجاح:
                </p>
            </div>
            <div className="flex bg-blue-50 justify-center ">


                {opinion.map(opinion => (
                    <div key={opinion.id} className=" py-8 px-4 flex flex-col items-end">
                        <div className=" bg-white text-center rounded-lg p-6 shadow-md w-96">
                            <p className="text-gray-800 text-lg leading-relaxed mb-4">
                                {opinion.text}
                            </p>
                        </div>

                        <div className=" relative mt-6 me-6 flex items-center">
                            <div className="absolute left-[25%] transform -translate-x-1/2 -top-9 w-6 h-6 bg-white rotate-45 "></div>
                            <div className="ms-4" dir="ltr">
                                <h4 className=" font-semibold">{opinion.name}</h4>
                                <p className="text-gray-500 text-sm">Customer</p>
                            </div>
                            <img
                                src={opinion.image}
                                alt="customer"
                                className="w-16 h-16 rounded-full border-2 border-blue-200 shadow"
                            />
                        </div>
                    </div>
                ))}




            </div>
        </section>
    );
}

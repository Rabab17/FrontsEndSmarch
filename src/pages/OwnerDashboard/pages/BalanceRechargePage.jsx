import { IoCheckmarkCircleOutline } from "react-icons/io5";

export default function BalanceRechargePage() {
  const plans = [
    {
      title: "المجانية",
      price: "مجانا",
      features: ["دخول لوحة المالك", "دعم تقني 24/7", "10 حجوزات شهريًا"],
    },
    {
      title: "المميزة",
      price: "600 ريال / شهر",
      features: [
        "دخول لوحة المالك",
        "دعم تقني 24/7",
        "10 حجوزات شهريًا",
        "ميزات إضافية أخرى",
      ],
    },
    {
      title: "الاحترافية",
      price: "1200 ريال / شهر",
      features: [
        "دخول لوحة المالك",
        "أولوية في دعم العملاء",
        "حجوزات غير محدودة شهريًا",
        "دعم شخصي عبر مدير حساب مخصص",
        "تقارير شاملة مع تحليلات متقدمة",
      ],
    },
  ];

  return (
    <div className="flex flex-row gap-12 pr-5">
      {plans.map((plan, index) => (
        <div
          key={index}
          className="border border-blue-500 rounded-xl w-[22vw] h-[55vh] p-4"
        >
          <h1 className="text-blue-600 font-bold text-center text-xl"style={{fontSize:28}}>
            {plan.title}
          </h1>
          <h4 className="pt-5 pr-2 font-bold" style={{fontSize:23}}>{plan.price}</h4>
          <div className="pt-5">
            {plan.features.map((feature, i) => (
              <div key={i} className="flex flex-row items-center mb-2">
                <IoCheckmarkCircleOutline
                  className="text-blue-500 pr-2"
                  size={26}
                />
                <h4 className="font-normal text-lg pr-1">{feature}</h4>
              </div>
            ))}
          </div>
          <div className="flex flex-row justify-center gap-4 mt-5">
            <button className="bg-blue-500 text-white font-bold border border-blue-500 rounded-lg w-[7vw] h-[6vh]  text-lg">
              تعديل
            </button>
            <button className="bg-red-500 text-white font-bold border border-red-500 rounded-lg w-[7vw] h-[6vh] text-lg">
              حذف
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

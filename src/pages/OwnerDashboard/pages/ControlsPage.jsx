export default function ControlsPage() {
  return (
      <>
    <div className="flex pl-[900px] ">
      <button className="w-[10vw] h-[5vh] bg-blue-700 border border-blue-300 rounded-lg    inline-flex items-center justify-center gap-2 text-white">
        <span className="font-normal text-xl">اضافه باقه</span>
        <span className="text-lg font-normal">+</span>
      </button>
    </div>
<br />
    <div className="bg-blue-100 flex flex-row border border-blue-200 rounded-lg gap-[80px] h-[140px]  flex justify-center items-center h-screen">
  <div className="">
    <h3 className="text-xl">رقم الباقة </h3>
    <br />
    <h3 className="pr-5 text-xl text-blue-600">1</h3>
  </div>
  
<div className="">
  <h3 className="text-xl">اسم الباقة </h3>
  <br />
<h3 className="text-xl text-blue-600">المجانية</h3>
</div>

<div className="">
  <h3 className="text-xl">اسم الشاليه </h3>
  <br />
<h3 className="text-xl text-blue-600">المجانية</h3>
</div>

<div className="">
  <h3 className="text-xl">تاريخ البداية</h3>
  <br />
<h3 className="text-xl text-blue-600"> 01-11-2024</h3>
</div>

<div className="">
  <h3 className="text-xl">تاريخ الانتهاء</h3>
  <br />
<h3 className="text-xl text-blue-600">01-11-2024</h3>
</div>

<div className="pt-[50px]">
<button className="w-[10vw] h-[5vh] bg-blue-700 border border-blue-300 rounded-lg    inline-flex items-center justify-center gap-2 text-white">
        <span className="font-normal text-xl"> الادارة والتحكم </span>
      </button>
</div>





    </div>
      </>
    
  );
}

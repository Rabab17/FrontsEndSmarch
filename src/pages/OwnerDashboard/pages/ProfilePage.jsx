import { TiLockClosed } from "react-icons/ti";

export default function ControlsPage() {
  return (
    <>
      <div className="flex pr-[900px] ">
        <button className="w-[12vw] h-[6vh] bg-blue-700 border border-blue-300 rounded-lg inline-flex items-center justify-center gap-2 text-white">
          <TiLockClosed className="text-white" />
          <span className="font-normal text-xl ">تغيير كلمة السر</span>
        </button>
      </div>
      <br />


      <div
        className=""
        style={{ borderColor: '#1A71FF', borderWidth: '1px', borderRadius: '8px', padding: '16px' }}
      >
        <div className="flex flex-row gap-[580px]">
        <div>
          <button className="w-[10vw] h-[6vh] bg-blue-700 border border-blue-300 rounded-lg inline-flex items-center justify-center gap-2 text-white">
            <span className="font-normal text-xl ">تعديل</span>
          </button>
        </div>


        <div className="flex items-center  ">
          <span className="hidden md:block">Mohamed Fathy</span>
          <img
            src="/assets/images/copy1.JPG"
            alt="Profile"
            className="rounded-full w-12 h-12"
          />
        </div>
        </div>
       

        




        <div className="flex flex-row gap-[200px] justify-center pt-5">
      
          <div className="">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 pt-5">الاسم</label>
            <input
              type="text"
              id="name"
              name="name"
              className=" w-[18vw] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-100 "
             
            />
          </div>

          <div className="">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">البريد الالكتروني</label>
            <input
              type="email"
              id="email"
              name="email"
              className=" w-[18vw] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-100"
              
            />
          </div>

         
       
      </div>




      <div className="flex flex-row gap-[200px] justify-center pt-5">
      
      <div className="">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 "> الهاتف</label>
        <input
          type="text"
          id="name"
          name="name"
          className=" w-[18vw] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-100"
         
        />
      </div>

      <div className="">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">تاريخ الميلاد </label>
        <input
          type="email"
          id="email"
          name="email"
          className=" w-[18vw] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-100"
          
        />
      </div>

     
   
  </div>



      </div>

      {/* Form Below Profile */}
      
    </>
  );
}

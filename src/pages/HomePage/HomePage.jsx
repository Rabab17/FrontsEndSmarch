import ChaletSection from "./ChaletSection";
import HeroSection from "./HeroSection";
import QuickStats from "./QuickStats";

export default function HomePage() {
  return (
    <>
      {/* <HeroSection />
      <QuickStats /> */}

      <div className="relative">
        {/* Hero Section */}
        <HeroSection />

        {/* QuickStats */}
        <div className="absolute left-0 right-0 mx-auto -mt-24">
          <QuickStats />
        </div>

        {/* باقي الصفحة */}
        <div className="md:mt-32 mt-16">
        </div>
      </div>




      <ChaletSection />




      <div className="pt-5 flex flex-col items-center justify-center">
        <h1 className="font-bold text-5xl">المزايا والخدمات</h1>
        <h3 className="pt-4"> كل ما تحتاجه في مكان واحد</h3>
      </div>

      <div className="flex flex-wrap gap-4 justify-center pt-5">
        {/* Service 1 */}
        <div className="w-[250px]">
          <div className="relative h-[250px] overflow-hidden">
            <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1596345442867-27f38b97433e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80" alt="Image" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#0061E0] to-[#0D263B]" />
          </div>
          <div className="flex flex-col items-center mt-4">
            {/* Icon (Font Awesome or any icon library) */}
            <i className="fas fa-cogs text-4xl text-white"></i>
            <p className="mt-2 text-center text-white">خدمة 1</p>
          </div>
        </div>

        {/* Service 2 */}
        <div className="w-[250px]">
          <div className="relative h-[250px] overflow-hidden">
            <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1596345442867-27f38b97433e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80" alt="Image" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#00A6ED] to-[#1182CE]" />
          </div>
          <div className="flex flex-col items-center mt-4">
            {/* Icon (Font Awesome or any icon library) */}
            <i className="fas fa-home text-4xl text-white"></i>
            <p className="mt-2 text-center text-white">خدمة 2</p>
          </div>
        </div>

        {/* Service 3 */}
        <div className="w-[250px]">
          <div className="relative h-[250px] overflow-hidden">
            <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1596345442867-27f38b97433e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80" alt="Image" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#00C8F9] to-[#1976D2]" />
          </div>
          <div className="flex flex-col items-center mt-4">
            {/* Icon (Font Awesome or any icon library) */}
            <i className="fas fa-leaf text-4xl text-white"></i>
            <p className="mt-2 text-center text-white">خدمة 3</p>
          </div>
        </div>

        {/* Service 4 */}
        <div className="w-[250px]">
          <div className="relative h-[250px] overflow-hidden">
            <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1596345442867-27f38b97433e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80" alt="Image" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#00E676] to-[#00C853]" />
          </div>
          <div className="flex flex-col items-center mt-4">
            {/* Icon (Font Awesome or any icon library) */}
            <i className="fas fa-cogs text-4xl text-white"></i>
            <p className="mt-2 text-center text-white">خدمة 4</p>
          </div>
        </div>
      </div>


    </>
  );
}

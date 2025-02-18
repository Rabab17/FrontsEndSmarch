import { useEffect, useState } from "react";
import AboutSection from "./AboutSection ";
import ChaletSection from "./ChaletSection";
import HeroSection from "./HeroSection";
import OpinionSection from "./OpinionSection";
import QuickStats from "./QuickStats";
import ServiceSection from "./ServiceSection";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function HomePage() {

  const [tokenOwner, setTokenOwner] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const handleMessage = async (event) => {
      console.log("Received data:", event.data);
      console.log("Received data:", event);
      if (event.origin !== "http://localhost:5174") return;

      const { id } = event.data;

      try {
        const response = await axios.get(
          `https://smarch-back-end-nine.vercel.app/user/token/${id}`,
          {
            headers: {
              authorization:import.meta.env.VITE_ADMIN_TOKEN
            },
          }
        );

        const token = response.data.token;
        console.log("Received token:", token);
        localStorage.setItem("token", token);
        setTokenOwner(token); 
      } catch (error) {
        console.error("Error fetching owner token:", error);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // 🔄 إعادة التوجيه تلقائيًا بعد استلام التوكن
  useEffect(() => {
    if (tokenOwner) {
      navigate("/"); // غير المسار حسب الحاجة
    }
  }, [tokenOwner, navigate]);


  return (
    <>


      <div className="relative">
        <HeroSection />

        <div className="absolute left-0 right-0 mx-auto -mt-24">
          <QuickStats />
        </div>

        <div className="md:mt-32 mt-16">
        </div>
      </div>

      <ChaletSection />
      <ServiceSection />
      <AboutSection />
      <OpinionSection />
    </>
  );
}

import { useEffect, useState } from "react";
import { Link, useNavigate, useResolvedPath } from "react-router-dom";

export default function HeaderNotification() {
    const buttons = ["اشعارات جديدة", "اشعارات مقروءة"];
    const {pathname}= useResolvedPath()
    const navigate=useNavigate()
    const [selectedIndex, setSelectedIndex] = useState(null); // Track selected button index
    

    useEffect(()=>{
        if(pathname.includes('new')) setSelectedIndex(0)
        else if(pathname.includes('read')) setSelectedIndex(1)
    },[])
    useEffect(()=>{
        if(selectedIndex==0) navigate('new')
        else if(selectedIndex==1) navigate('read')
    },[selectedIndex])
    return (
     <>
     <div className="flex flex-row gap-12 justify-center">
     {buttons.map((btn,index)=>(
          
         
          <button
          key={index}
            className={`text-xl text-white border rounded-lg py-2 px-5 text-center ${
                selectedIndex === index ? "bg-blue-600" : "bg-gray-700"
              }`}
            onClick={() => setSelectedIndex( index)}
            
          >
          {btn}
          </button>
        
        
     ))}
     </div>
     
     </>
    );
}
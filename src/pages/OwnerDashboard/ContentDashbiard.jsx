import { Outlet, useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export default function ContentDashbiard() {
    const token = localStorage.getItem("token");
    const nav = useNavigate();


    useEffect(() => {
        if (token) {
            console.log("decodedToken");
            const decoded = jwtDecode(token);
            const id = decoded.id;
            id ? '' : nav('/')
        } else {
            nav('/')
        }
    }, [token]);


    return (
        <div className="mt-10 w-[100%]">
            {/* {renderContent()} */}
            <Outlet />
        </div>
    );
};


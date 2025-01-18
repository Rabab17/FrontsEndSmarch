import { Outlet, useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

// eslint-disable-next-line react/prop-types
export default function ContentDashbiard() {
    const token = localStorage.getItem("token");
    const nav = useNavigate();
    console.log("too");
    console.log("token", token);

    useEffect(() => {
        if (token) {
            console.log("decodedToken");
            const decoded = jwtDecode(token);
            const id = decoded.id;

            console.log("userID من الـ token:", id);

            const fetchUserData = async () => {
                try {
                    const response = await axios.get(`https://smarch-back-end-nine.vercel.app/user/${id}`, {

                    });
                    console.log("بيانات المستخدم:", response.data);
                    // const userData = response.data.data;

                } catch (error) {
                    console.error("خطأ في استرجاع بيانات المستخدم:", error);
                }
            };

            fetchUserData();
        } else {
            nav('/')
        }
    }, [token]);


    return (
        <div className="mt-20 w-[100%]">
            {/* {renderContent()} */}
            <Outlet />
        </div>
    );
};


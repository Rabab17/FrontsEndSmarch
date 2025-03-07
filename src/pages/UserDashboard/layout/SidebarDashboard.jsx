

import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { notificationContext } from "../../../context/Notification";

// eslint-disable-next-line react/prop-types
export default function SidebarDashboard({ isOpen }) {
    const nav = useNavigate();
    const location = useLocation();
    const { numOfNewNotification } = useContext(notificationContext);

    const isExactMatch = (path) => location.pathname === path;

    const isPartialMatch = (path) => location.pathname.includes(path);

    const SignOutButtonClick = () => {
        Swal.fire({
            title: 'هل أنت متأكد؟',
            text: 'هل تريد تسجيل الخروج؟',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'نعم، تسجيل الخروج',
            cancelButtonText: 'إلغاء',
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("token");
                nav('/login');
            }
        });
    };


    return (
        <aside className={`bg-blue-50 w-64 h-full p-4 md:flex flex-col justify-between ${isOpen ? '' : 'hidden'}`}>
            <div className="mt-5 text-center">
                <div
                    className={`mb-6 text-2xl flex items-center gap-2 cursor-pointer rounded ${isExactMatch("/Overview") ? "bg-[#0061E0] text-white py-2" : ""
                        }`}
                    onClick={() => nav('/UserDashboard')}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 32 32"
                        fill="currentColor"
                        className={`text-[#0061E0] ${isExactMatch("/Overview") ? "text-white" : ""}`
                        }

                    >
                        <path d="M28.2267 13.7732H19.3334C18.7222 13.7732 18.2267 13.2777 18.2267 12.6665V3.77317C18.2267 3.16198 18.7222 2.6665 19.3334 2.6665C24.8562 2.6665 29.3334 7.14366 29.3334 12.6665C29.3334 13.2777 28.8379 13.7732 28.2267 13.7732ZM27.0267 11.5598C26.5354 8.14623 23.8536 5.46448 20.44 4.97317V11.5598H27.0267Z" />
                        <path d="M28.1067 15.9998H17.24C16.9182 15.9998 16.6096 15.872 16.3821 15.6444C16.1545 15.4169 16.0267 15.1083 16.0267 14.7865V3.89312C16.0288 3.54331 15.8814 3.20926 15.6216 2.97497C15.3619 2.74067 15.0144 2.62843 14.6667 2.66646C7.70661 3.4055 2.50275 9.40047 2.74951 16.3953C2.99627 23.3902 8.60964 29.0035 15.6045 29.2503C22.5993 29.4971 28.5943 24.2932 29.3334 17.3331C29.3633 16.9897 29.2474 16.6496 29.0141 16.3959C28.7807 16.1423 28.4514 15.9985 28.1067 15.9998Z" />
                    </svg>


                    <h1>نظره عامه</h1>
                </div>
                <div className="space-y-6 md:space-y-8">

                    <div
                        className={`text-2xl flex items-center gap-2 cursor-pointer rounded ${isPartialMatch("/profile") ? "bg-[#0061E0] text-white py-2" : ""
                            }`}
                        onClick={() => nav("profile")}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="28"
                            viewBox="0 0 32 32"
                            className={`text-[#0061E0] ${isPartialMatch("/profile") ? "text-white" : ""}`}

                            fill="currentColor">
                            <path d="M8.66667 9.99984C8.66667 8.05492 9.43928 6.18965 10.8145 4.81439C12.1898 3.43912 14.0551 2.6665 16 2.6665C17.9449 2.6665 19.8102 3.43912 21.1855 4.81439C22.5607 6.18965 23.3333 8.05492 23.3333 9.99984C23.3333 11.9448 22.5607 13.81 21.1855 15.1853C19.8102 16.5606 17.9449 17.3332 16 17.3332C14.0551 17.3332 12.1898 16.5606 10.8145 15.1853C9.43928 13.81 8.66667 11.9448 8.66667 9.99984ZM4 25.3332C4 23.5651 4.70238 21.8694 5.95262 20.6191C7.20286 19.3689 8.89856 18.6665 10.6667 18.6665H21.3333C23.1014 18.6665 24.7971 19.3689 26.0474 20.6191C27.2976 21.8694 28 23.5651 28 25.3332V29.3332H4V25.3332Z" />
                        </svg>
                        <h1>الملف الشخصي</h1>
                    </div>


                    <div
                        className={`text-2xl flex items-center gap-2 cursor-pointer rounded ${isPartialMatch("/support") ? "bg-[#0061E0] text-white py-2" : ""
                            }`}
                        onClick={() => nav("SupportUser")}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32"
                            className={`text-[#0061E0] ${isPartialMatch("/support") ? "text-white" : ""}`}

                            fill="currentColor">
                            <path d="M24.96 19.6798C25.4267 18.5464 25.68 17.3331 25.68 15.9998C25.68 15.0398 25.5334 14.1198 25.28 13.2664C24.4134 13.4664 23.5067 13.5731 22.56 13.5731C20.6213 13.5752 18.7105 13.1111 16.9887 12.2201C15.2669 11.329 13.7846 10.037 12.6667 8.4531C11.472 11.3474 9.21564 13.6753 6.36002 14.9598C6.30669 15.2931 6.30669 15.6531 6.30669 15.9998C6.30669 17.2727 6.55741 18.5332 7.04455 19.7092C7.53168 20.8853 8.24569 21.9539 9.1458 22.854C10.9637 24.6718 13.4292 25.6931 16 25.6931C17.4 25.6931 18.7467 25.3864 19.96 24.8398C20.72 26.2931 21.0667 27.0131 21.04 27.0131C18.8534 27.7464 17.16 28.1064 16 28.1064C12.7734 28.1064 9.69335 26.8398 7.42669 24.5598C6.04675 23.1863 5.02171 21.4978 4.44002 19.6398H2.66669V13.5731H4.12002C4.56034 11.4298 5.57268 9.44565 7.04961 7.83122C8.52654 6.2168 10.413 5.03231 12.5087 4.40344C14.6045 3.77458 16.8314 3.7248 18.9532 4.25937C21.0749 4.79395 23.0124 5.89296 24.56 7.43977C26.2397 9.11387 27.3857 11.2481 27.8534 13.5731H29.3334V19.6398H29.2534L24.5067 23.9998L17.44 23.1998V20.9731H23.88L24.96 19.6798ZM12.36 15.6931C12.76 15.6931 13.1467 15.8531 13.4267 16.1464C13.7081 16.4301 13.866 16.8135 13.866 17.2131C13.866 17.6127 13.7081 17.9961 13.4267 18.2798C13.1467 18.5598 12.76 18.7198 12.36 18.7198C11.52 18.7198 10.84 18.0531 10.84 17.2131C10.84 16.3731 11.52 15.6931 12.36 15.6931ZM19.6267 15.6931C20.4667 15.6931 21.1334 16.3731 21.1334 17.2131C21.1334 18.0531 20.4667 18.7198 19.6267 18.7198C18.7867 18.7198 18.1067 18.0531 18.1067 17.2131C18.1067 16.81 18.2668 16.4234 18.5519 16.1383C18.8369 15.8532 19.2236 15.6931 19.6267 15.6931Z" />
                        </svg>
                        <h1>تذاكر الدعم</h1>
                    </div>
                    <div
                        className={`text-2xl flex items-center gap-2 cursor-pointer rounded ${isPartialMatch("/notifications") ? "bg-[#0061E0] text-white py-2" : ""
                            }`}
                        onClick={() => nav("notifications-user")}
                    >
                        <div className="flex gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"
                                className={`text-[#0061E0] ${isPartialMatch("/notifications") ? "text-white" : ""}`}
                                fill="currentColor">
                                <path d="M16 4C13.6131 4 11.3239 4.94821 9.63604 6.63604C7.94822 8.32387 7.00001 10.6131 7.00001 13V17.802L5.07201 22.63C5.01162 22.7816 4.98926 22.9457 5.00688 23.108C5.02451 23.2702 5.08157 23.4257 5.1731 23.5608C5.26463 23.6959 5.38784 23.8066 5.53198 23.8832C5.67612 23.9597 5.8368 23.9998 6.00001 24H26C26.1632 23.9998 26.3239 23.9597 26.468 23.8832C26.6122 23.8066 26.7354 23.6959 26.8269 23.5608C26.9184 23.4257 26.9755 23.2702 26.9931 23.108C27.0107 22.9457 26.9884 22.7816 26.928 22.63L25 17.8V13C25 10.6131 24.0518 8.32387 22.364 6.63604C20.6761 4.94821 18.387 4 16 4ZM16 29C15.113 29.0002 14.2512 28.7056 13.5499 28.1626C12.8486 27.6195 12.3477 26.8588 12.126 26H19.874C19.6523 26.8588 19.1514 27.6195 18.4501 28.1626C17.7488 28.7056 16.887 29.0002 16 29Z" />
                            </svg>
                            <h1>الإشعارات</h1>
                        </div>
                        <p className="rounded-full bg-red-700 w-8 h-8 text-center "> {numOfNewNotification} </p>
                    </div>
                </div>
            </div>

            <div className="mt-auto">
                <button onClick={SignOutButtonClick} className="w-full px-4 py-2 mt-4 bg-[#0061E0] rounded text-white text-2xl">
                    تسجيل خروج
                </button>
            </div>
        </aside>
    );
}

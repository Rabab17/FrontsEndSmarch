import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react';
export default function Layout() {
    const location = useLocation();
    const isHomePage = location.pathname === '/'
    const isDashboard = location.pathname.includes('Dashboard') || location.pathname.includes('dashboard');

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return (
        <>
            {(!isHomePage && !isDashboard) &&

                <Header />
            }
            <Outlet />
            {!isDashboard &&
                <Footer />
            }
        </>
    )
}

import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet, useLocation } from 'react-router-dom'
export default function Layout() {
    const location = useLocation();
    const isHomePage = location.pathname === '/'
    const isDashboard = location.pathname === '/OwnerDashboard'
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

import BalanceRechargePage from "./pages/BalanceRechargePage";
import ControlsPage from "./pages/ControlsPage";
import NotificationPage from "./pages/NotificationPage";
import ProfilePage from "./pages/ProfilePage";
import SupportPage from "./pages/SupportPage";

// eslint-disable-next-line react/prop-types
export default function ContentDashbiard({ page }) {
    const renderContent = () => {
        switch (page) {
            case "controls":
                return <ControlsPage/>;
            case "settings":
            case "dashboard":
                return <BalanceRechargePage/>;
            case "profile":
                return <ProfilePage/>;
            case "support":
                return <SupportPage/>;
            case "notifications":
                return <NotificationPage/>;
            default:
                return <ControlsPage/>
        }
    };

    return (
        <main className="mt-20 mx-auto text-3xl font-bold">
            {renderContent()}
        </main>
    );
};


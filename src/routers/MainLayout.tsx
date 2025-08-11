import { Outlet } from "react-router";
import Header from "../components/Header";

const MainLayout = () => {
    return (
        <div className="app-layout-container">
            <div className="header-container">
                <Header />
            </div>
            <div className="main-container">
                <Outlet />
            </div>
        </div>
    )
}
export default MainLayout;
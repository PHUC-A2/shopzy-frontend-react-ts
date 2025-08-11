import { Outlet } from "react-router";
import Header from "../components/users/Header";

const UserLayout = () => {
    return (
        <div className="user-layout-container">
            <div className="user-header-container">
                <Header />
            </div>
            <div className="user-main-container">
                <Outlet />
            </div>
        </div>
    )
}
export default UserLayout;
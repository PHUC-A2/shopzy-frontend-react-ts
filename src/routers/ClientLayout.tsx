import { Outlet } from "react-router";
import Header from "../components/users/Header";

const ClientLayout = () => {
    return (
        <div className="client-layout-container">
            <div className="client-header-container">
                <Header />
            </div>
            <div className="client-main-container">
                <Outlet />
            </div>
        </div>
    )
}
export default ClientLayout;
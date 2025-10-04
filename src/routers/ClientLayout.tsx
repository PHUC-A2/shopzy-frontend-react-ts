import { Outlet } from "react-router";
import Header from "../components/client/Header";
import Footer from "../components/client/Footer";
import '../styles/ClientLayout.scss'

interface IProps {
    cartCount: number;
}

const ClientLayout = (props: IProps) => {

    const { cartCount } = props;

    return (
        <div className="client-layout-container">
            <div className="client-header-container">
                <Header cartCount={cartCount} />
            </div>
            <div className="client-main-container">
                <Outlet />
            </div>
            <div className="client-footer-container">
                <Footer />
            </div>
        </div>
    )
}
export default ClientLayout;
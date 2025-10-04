import { Outlet } from "react-router";
import Header from "../components/client/Header";
import Footer from "../components/client/Footer";
import '../styles/ClientLayout.scss'
import { useState } from "react";

const ClientLayout = () => {
    // xử lý thêm vào giỏ hàng (đây là component cha)
    // dùng Context API của Outlet để xử lý sau này có thể mở rộng
    const [cartCount, setCartCount] = useState<number>(0);

    return (
        <div className="client-layout-container">
            <div className="client-header-container">
                <Header cartCount={cartCount} />
            </div>
            <div className="client-main-container">
                <Outlet context={{ setCartCount }} />
            </div>
            <div className="client-footer-container">
                <Footer />
            </div>
        </div>
    )
}
export default ClientLayout;
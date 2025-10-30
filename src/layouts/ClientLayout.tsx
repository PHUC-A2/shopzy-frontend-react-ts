import { Outlet } from "react-router";
import Header from "../components/client/Header";
import Footer from "../components/client/Footer";
import '../styles/ClientLayout.scss'
import { useState } from "react";
import ModalMessage from "../pages/client/chat/ModalMessage";
import MessageButton from "../pages/client/chat/MessageButton";

const ClientLayout = () => {
    // xử lý thêm vào giỏ hàng (đây là component cha)
    // dùng Context API của Outlet để xử lý sau này có thể mở rộng
    // const [cartCount, setCartCount] = useState<number>(0);
    const [openModalMessage, setOpenModalMessage] = useState(false);

    return (
        <div className="client-layout-container">
            <div className="client-header-container">
                <Header />
            </div>
            <div className="client-main-container">
                <Outlet />
            </div>
            <div className="client-footer-container">
                <Footer />
            </div>

            {/* Nút chat luôn hiển thị */}
            <MessageButton onClick={() => setOpenModalMessage(true)} />
            <ModalMessage
                openModalMessage={openModalMessage}
                setOpenModalMessage={setOpenModalMessage}
            />
        </div>
    )
}
export default ClientLayout;
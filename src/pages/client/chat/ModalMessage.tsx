import { Drawer, Avatar, Input, Button } from "antd";
import { SendOutlined, UserOutlined, ShopOutlined } from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IProps {
    openModalMessage: boolean;
    setOpenModalMessage: (v: boolean) => void;
}

const ModalMessage = (props: IProps) => {
    const { openModalMessage, setOpenModalMessage } = props;
    const [messages, setMessages] = useState([
        { id: 1, from: "shop", text: "Xin chào 👋! Shop có thể giúp gì cho bạn?" },
        { id: 2, from: "user", text: "Mình muốn hỏi về sản phẩm này." },
    ]);
    const [input, setInput] = useState("");

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;
        const newMessage = { id: Date.now(), from: "user", text: input };
        setMessages((prev) => [...prev, newMessage]);
        setInput("");

        setTimeout(() => {
            const shopReplies = [
                "Cảm ơn bạn đã quan tâm 💙",
                "Sản phẩm này đang còn hàng nhé ✅",
                "Bạn cần tư vấn chi tiết hơn không?",
                "Shop sẽ freeship cho đơn hàng từ 500k 🚚",
                "Chúc bạn một ngày vui vẻ nhé 🌞",
                "Sản phẩm được bảo hành 12 tháng 🎉",
                "Hiện tại sản phẩm đang được giảm giá 10% 💰",
                "Bạn có muốn mình tư vấn size phù hợp không?",
                "Mẫu mã còn nhiều màu sắc, bạn thích màu nào?",
                "Đặt hàng hôm nay sẽ được giao trong 2-3 ngày 🕒",
                "Shop vừa mới nhập thêm hàng mới, bạn tham khảo nhé!",
                "Nếu bạn mua 2 sản phẩm trở lên sẽ có ưu đãi combo 🎁",
                "Cảm ơn bạn đã để lại đánh giá tích cực ⭐️",
                "Sản phẩm có thể dùng thử nếu đặt trước hôm nay",
                "Bạn cần xem thêm hình ảnh chi tiết không?",
                "Shop có hỗ trợ đổi trả trong 7 ngày 📝",
                "Sản phẩm này đang hot trend, bạn nhanh tay nha 🔥",
                "Chúng tôi cam kết hàng chính hãng 100% ✅",
                "Bạn có thể tham khảo thêm các sản phẩm liên quan bên dưới 👇",
                "Shop luôn có ưu đãi cho khách hàng thân thiết 💛",
                "Nếu cần, mình sẽ gửi thêm video sử dụng sản phẩm 🎥",
                "Bạn muốn mình gợi ý sản phẩm tương tự không?",
                "Sản phẩm đang có khuyến mãi đặc biệt hôm nay ✨",
                "Bạn có thể đặt trước để được giữ hàng nha 📦",
                "Shop hỗ trợ thanh toán qua nhiều hình thức tiện lợi 💳",
                "Đừng quên check thêm voucher để giảm thêm nha 🎫",
                "Cảm ơn bạn đã tin tưởng và lựa chọn shop 💖",
                "Mình sẽ hướng dẫn bạn cách chọn size chuẩn nhất nhé!",
                "Hàng mới về liên tục, bạn thường xuyên ghé shop nhé 🌟",
                "Nếu mua số lượng lớn, shop sẽ có giá tốt hơn 💼",
                "Bạn cần mình gửi thêm đánh giá của khách hàng khác không?",
                "Shop có thể gói quà nếu bạn muốn 🎁",
                "Mình sẽ gửi link nhanh để bạn đặt hàng ngay 🛒",
                "Bạn muốn được tư vấn sản phẩm đang bán chạy nhất không?",
                "Đừng quên follow shop để cập nhật khuyến mãi mới nhất 🔔",
                "Sản phẩm có thể kết hợp với các phụ kiện đi kèm nhé",
                "Bạn cần đặt hàng ngay để giữ ưu đãi hôm nay không?",
                "Nếu có thắc mắc, cứ nhắn tin shop sẽ trả lời sớm nhất 🕐",
                "Shop luôn sẵn sàng hỗ trợ bạn 24/7 💌",
                "Cảm ơn bạn đã quan tâm, chúc bạn mua sắm vui vẻ 🛍️",
                "Sản phẩm có thể dùng thử trong vòng 7 ngày nhé",
            ];

            const reply =
                shopReplies[Math.floor(Math.random() * shopReplies.length)];

            setMessages((prev) => [
                ...prev,
                { id: Date.now(), from: "shop", text: reply },
            ]);
        }, 1500);
    };

    return (
        <Drawer
            title={
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Avatar icon={<ShopOutlined />} style={{ backgroundColor: "#f97316" }} />
                    <div>
                        <div style={{ fontWeight: 600, color: "orange" }}>Shop Online</div>
                        <div style={{ fontSize: 12, color: "green" }}>Đang hoạt động</div>
                    </div>
                </div>
            }
            closable={false}
            onClose={() => setOpenModalMessage(false)}
            open={openModalMessage}
            width={360}
            styles={{
                body: {
                    display: "flex",
                    flexDirection: "column",
                    padding: "0",
                    height: "100%",
                },
            }}
        >
            {/* Khung chat */}
            <div
                style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: "16px",
                    background: "#f9fafb",
                }}
            >
                <AnimatePresence>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            style={{
                                display: "flex",
                                justifyContent:
                                    msg.from === "user" ? "flex-end" : "flex-start",
                                marginBottom: "10px",
                            }}
                        >
                            {msg.from === "shop" && (
                                <Avatar
                                    icon={<ShopOutlined />}
                                    size="small"
                                    style={{ marginRight: 6, background: "#f97316" }}
                                />
                            )}
                            <div
                                style={{
                                    padding: "8px 12px",
                                    borderRadius: 16,
                                    maxWidth: "70%",
                                    background:
                                        msg.from === "user"
                                            ? "linear-gradient(135deg,#3b82f6,#2563eb)"
                                            : "#e5e7eb",
                                    color: msg.from === "user" ? "#fff" : "#111",
                                    fontSize: 14,
                                }}
                            >
                                {msg.text}
                            </div>
                            {msg.from === "user" && (
                                <Avatar
                                    icon={<UserOutlined />}
                                    size="small"
                                    style={{ marginLeft: 6, background: "#3b82f6" }}
                                />
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
            </div>

            {/* Footer nhập tin nhắn */}
            <div
                style={{
                    borderTop: "1px solid #e5e7eb",
                    padding: "8px",
                    display: "flex",
                    gap: 8,
                    background: "#fff",
                }}
            >
                <Input
                    placeholder="Nhập tin nhắn..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onPressEnter={handleSend}
                />
                <Button
                    type="primary"
                    icon={<SendOutlined />}
                    onClick={handleSend}
                    style={{ borderRadius: "8px" }}
                />
            </div>
        </Drawer>
    );
};

export default ModalMessage;

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

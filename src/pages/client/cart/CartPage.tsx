import { Empty, Image, Typography, Layout } from "antd";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { FaShoppingBag, FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "./CartPage.scss";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";

const { Text, Title } = Typography;

interface CartItem {
    cartItemId: number;
    productId: number;
    name: string;
    imageUrl: string;
    price: number;
    quantity: number;
    size: string;
    color: string;
    status: string;
    subtotal: number;
}

const CartPage = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            cartItemId: 1,
            productId: 1,
            name: "Quần ABC",
            imageUrl: "https://picsum.photos/200/200?random=1",
            price: 200000,
            quantity: 2,
            size: "M",
            color: "Đỏ",
            status: "IN_STOCK",
            subtotal: 200000 * 2,
        },
        {
            cartItemId: 2,
            productId: 3,
            name: "Quần C",
            imageUrl: "https://picsum.photos/200/200?random=2",
            price: 300000,
            quantity: 1,
            size: "L",
            color: "Đen",
            status: "IN_STOCK",
            subtotal: 300000 * 1,
        },
    ]);

    const handleQuantityChange = (productId: number, delta: number) => {
        setCartItems((prev) =>
            prev.map((item) => {
                if (item.productId === productId) {
                    const newQuantity = Math.max(1, item.quantity + delta);
                    return {
                        ...item,
                        quantity: newQuantity,
                        subtotal: newQuantity * item.price,
                    };
                }
                return item;
            })
        );
    };

    const handleRemoveItem = (productId: number) => {
        setCartItems((prev) => prev.filter((item) => item.productId !== productId));
    };

    const totalPrice = cartItems.reduce((acc, item) => acc + item.subtotal, 0);

    return (
        <div className="cart-page-container">
            <Layout style={{ padding: "1rem 0", maxWidth: 800, margin: "0 auto" }}>
                <Title level={3} style={{ marginBottom: 24, textAlign: "center" }}>
                    <span style={{ color: "#faad14" }}>🛒 Shopzy | Giỏ Hàng</span>
                </Title>

                {cartItems.length > 0 && isAuthenticated ? (
                    <>
                        <AnimatePresence>
                            {cartItems.map((item) => (
                                <motion.div
                                    key={item.cartItemId}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div
                                        style={{
                                            background: "#fff",
                                            borderRadius: 12,
                                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                            padding: 12,
                                            marginBottom: 12,
                                            display: "flex",
                                            flexWrap: "wrap",
                                            alignItems: "center",
                                            gap: 12,
                                        }}
                                    >
                                        <Image
                                            width={80}
                                            src={item.imageUrl}
                                            style={{ borderRadius: 8 }}
                                        />
                                        <div style={{ flex: 1, minWidth: 120 }}>
                                            <Text strong style={{ display: "block" }}>
                                                {item.name}
                                            </Text>
                                            <Text type="secondary" style={{ display: "block" }}>
                                                Kích cỡ: {item.size}, Màu: {item.color}
                                            </Text>
                                            <Text type="secondary" style={{ display: "block" }}>
                                                Trạng thái: {item.status}
                                            </Text>
                                        </div>
                                        <div style={{ minWidth: 80 }}>
                                            <Text strong>{item.price.toLocaleString()} VND</Text>
                                        </div>
                                        <div style={{ display: "flex", gap: 8, minWidth: 100 }}>
                                            <Button
                                                variant="outline-dark"
                                                size="sm"
                                                onClick={() => handleQuantityChange(item.productId, -1)}
                                            >
                                                <FaMinus />
                                            </Button>
                                            <Text style={{ margin: "0 8px" }}>{item.quantity}</Text>
                                            <Button
                                                variant="outline-dark"
                                                size="sm"
                                                onClick={() => handleQuantityChange(item.productId, 1)}
                                            >
                                                <FaPlus />
                                            </Button>
                                        </div>
                                        <div style={{ minWidth: 80 }}>
                                            <Text strong>{item.subtotal.toLocaleString()} VND</Text>
                                        </div>
                                        <Button
                                            variant="danger"
                                            style={{
                                                background: "#faad14",
                                                border: "none",
                                                color: "white",
                                                borderRadius: "8px",
                                                minWidth: 36,
                                            }}
                                            onClick={() => handleRemoveItem(item.productId)}
                                        >
                                            <FaTrashAlt />
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "12px",
                                background: "#fff",
                                borderRadius: 12,
                                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                            }}
                        >
                            <Text strong style={{ fontSize: 16 }}>
                                Tổng tiền:{" "}
                                <Text
                                    style={{
                                        fontSize: 18,
                                        color: "#389e0d",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {totalPrice.toLocaleString()} VND
                                </Text>
                            </Text>
                            <Button
                                variant="outline-dark"
                                style={{
                                    padding: "10px 24px",
                                    borderRadius: "8px",
                                    border: "2px solid #faad14",
                                    background: "#fff",
                                    color: "#faad14",
                                    fontWeight: 500,
                                    minWidth: 150,
                                    marginTop: 8,
                                }}
                            >
                                <FaShoppingBag /> Mua Hàng
                            </Button>
                        </div>
                    </>
                ) : (
                    <Empty description="Giỏ hàng trống" />
                )}
            </Layout>
        </div>
    );
};

export default CartPage;

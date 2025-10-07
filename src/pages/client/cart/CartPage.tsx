import { Empty, Image, Space, Typography, Divider, Row, Col, Layout } from "antd";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { FaShoppingBag, FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "./CartPage.scss";
import { toast } from "react-toastify";

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

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleQuantityChange = (productId: number, delta: number) => {
        setCartItems((prev) =>
            prev.map((item) => {
                if (item.productId === productId) {
                    const newQuantity = Math.max(1, item.quantity + delta);
                    return { ...item, quantity: newQuantity, subtotal: newQuantity * item.price };
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
            <Layout style={{ padding: "2rem", borderRadius: "16px", background: "#fff" }}>
                <Title level={3} style={{ marginBottom: 24, color: "#001529" }}>
                    <span style={{ color: "#faad14" }}>🛒 Shopzy | Giỏ Hàng</span>
                </Title>

                {cartItems.length > 0 ? (
                    <>
                        {!isMobile ? (
                            <>
                                {/* =========== DESKTOP VIEW =========== */}
                                <Row style={{ fontWeight: "bold", marginBottom: 12 }}>
                                    <Col span={2}>STT</Col>
                                    <Col span={6}>Sản phẩm</Col>
                                    <Col span={4}>Đơn giá</Col>
                                    <Col span={4}>Số lượng</Col>
                                    <Col span={4}>Thành tiền</Col>
                                    <Col span={4}>Thao tác</Col>
                                </Row>
                                <Divider />
                                <AnimatePresence>
                                    {cartItems.map((item, index) => (
                                        <motion.div
                                            key={item.cartItemId}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -50 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Row align="middle" style={{ marginBottom: 20 }}>
                                                <Col span={2}>{index + 1}</Col>
                                                <Col span={6}>
                                                    <Image width={80} src={item.imageUrl} style={{ borderRadius: "8px" }} />
                                                    <Text strong style={{ display: "block", marginTop: 8 }}>
                                                        {item.name}
                                                    </Text>
                                                    <Text type="secondary">
                                                        Kích cỡ: {item.size}, Màu: {item.color}
                                                    </Text>
                                                </Col>
                                                <Col span={4}>{item.price.toLocaleString()} VND</Col>
                                                <Col span={4}>
                                                    <Space>
                                                        <Button variant="outline-dark" size="sm" onClick={() => handleQuantityChange(item.productId, -1)}>
                                                            <FaMinus />
                                                        </Button>
                                                        <Text>{item.quantity}</Text>
                                                        <Button variant="outline-dark" size="sm" onClick={() => handleQuantityChange(item.productId, 1)}>
                                                            <FaPlus />
                                                        </Button>
                                                    </Space>
                                                </Col>
                                                <Col span={4}>{item.subtotal.toLocaleString()} VND</Col>
                                                <Col span={4}>
                                                    <Button
                                                        variant="danger"
                                                        style={{
                                                            background: "#faad14",
                                                            border: "none",
                                                            color: "white",
                                                            borderRadius: "8px",
                                                        }}
                                                        onClick={() => handleRemoveItem(item.productId)}
                                                    >
                                                        <FaTrashAlt />
                                                    </Button>
                                                </Col>
                                            </Row>
                                            <Divider />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>

                                {/* Total */}
                                <Row justify="space-between" style={{ marginTop: 24 }}>
                                    <Col>
                                        <Text strong style={{ fontSize: "16px" }}>Tổng tiền: </Text>
                                        <Text style={{ fontSize: "18px", color: "#389e0d", fontWeight: "bold" }}>
                                            {totalPrice.toLocaleString()} VND
                                        </Text>
                                    </Col>
                                    <Col>
                                        <motion.div whileHover={{ scale: 1.05 }}>
                                            {/* <Button className="checkout-btn">
                                                <FaShoppingBag /> Mua Hàng
                                            </Button> */}
                                            <Button
                                                onClick={() => toast.info("Chuyển sang trang checkout")}
                                                variant="outline-dark"
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 5,
                                                    padding: "10px 24px",
                                                    borderRadius: "8px",
                                                    border: "2px solid #faad14",
                                                    background: "white",
                                                    color: "#faad14",
                                                    fontWeight: "500",
                                                    transition: "all 0.3s ease",
                                                }}
                                                onMouseOver={(e) => {
                                                    e.currentTarget.style.background = "#faad14";
                                                    e.currentTarget.style.color = "white";
                                                }}
                                                onMouseOut={(e) => {
                                                    e.currentTarget.style.background = "white";
                                                    e.currentTarget.style.color = "#faad14";
                                                }}
                                            >
                                                <FaShoppingBag /> <span>Mua Hàng</span>
                                            </Button>
                                        </motion.div>
                                    </Col>
                                </Row>
                            </>
                        ) : (
                            <>
                                {/* =========== MOBILE VIEW =========== */}
                                <div className="cart-mobile">
                                    {cartItems.map((item) => (
                                        <motion.div
                                            key={item.cartItemId}
                                            className="cart-card"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -50 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Image width={90} src={item.imageUrl} className="cart-card-img" />
                                            <div className="cart-card-info">
                                                <Text strong>{item.name}</Text>
                                                <Text type="secondary" style={{ display: "block" }}>
                                                    {item.size} / {item.color}
                                                </Text>
                                                <Text>{item.price.toLocaleString()} VND</Text>
                                                <div className="cart-card-quantity">
                                                    <Button size="sm" variant="outline-dark" onClick={() => handleQuantityChange(item.productId, -1)}>
                                                        <FaMinus />
                                                    </Button>
                                                    <Text>{item.quantity}</Text>
                                                    <Button size="sm" variant="outline-dark" onClick={() => handleQuantityChange(item.productId, 1)}>
                                                        <FaPlus />
                                                    </Button>
                                                </div>
                                                <div className="cart-card-footer">
                                                    <Text strong>{item.subtotal.toLocaleString()} VND</Text>
                                                    <Button variant="danger" onClick={() => handleRemoveItem(item.productId)}>
                                                        <FaTrashAlt />
                                                    </Button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Footer tổng tiền + mua hàng */}
                                <div className="cart-footer-mobile">
                                    <div className="cart-footer-left">
                                        <Text strong>Tổng tiền:</Text>
                                        <Text style={{ color: "#389e0d", fontWeight: "bold" }}>
                                            {totalPrice.toLocaleString()} VND
                                        </Text>
                                    </div>
                                    <motion.div whileHover={{ scale: 1.05 }}>
                                        {/* <Button className="checkout-btn-mobile">
                                            <FaShoppingBag /> Mua Hàng
                                        </Button> */}

                                        <Button
                                            onClick={() => toast.info("Chuyển sang trang checkout")}
                                            variant="outline-dark"
                                            style={{
                                                display: "flex",
                                                alignItems:"center",
                                                gap: 5,
                                                padding: "10px 24px",
                                                borderRadius: "8px",
                                                border: "2px solid #faad14",
                                                background: "white",
                                                color: "#faad14",
                                                fontWeight: "500",
                                                transition: "all 0.3s ease",
                                            }}
                                            onMouseOver={(e) => {
                                                e.currentTarget.style.background = "#faad14";
                                                e.currentTarget.style.color = "white";
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.style.background = "white";
                                                e.currentTarget.style.color = "#faad14";
                                            }}
                                        >
                                            <FaShoppingBag /> <span>Mua Hàng</span>
                                        </Button>
                                    </motion.div>
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    <Empty description="Giỏ hàng trống" />
                )}
            </Layout>
        </div>
    );
};

export default CartPage;

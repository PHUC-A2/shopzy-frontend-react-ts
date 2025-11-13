import { Empty, Image, Space, Typography, Divider, Row, Col, Layout } from "antd";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { FaShoppingBag, FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "./CartPage.scss";
import { toast } from "react-toastify";
import type { AppDispatch, RootState } from "../../../redux/store";
import { updateQuantity } from "../../../redux/slice/cartSlice";
import { deleteCartItemClient, updateQuantityClient } from "../../../config/Api";
import { fetchCart } from "../../../redux/thunks/cartThunk";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const { Text, Title } = Typography;

const CartPage = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const [isMobile, setIsMobile] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const navigate = useNavigate();

    const handleBuyNow = () => {
        navigate("/checkout");
    }

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    const handleQuantityChange = async (productId: number, delta: number) => {
        // Tìm item hiện tại
        const item = cartItems.find(i => i.productId === productId);
        if (!item) return;

        const newQuantity = item.quantity + delta;
        if (newQuantity < 1) return toast.warn("Số lượng tối thiểu là 1");

        // Update Redux ngay để UI phản hồi nhanh
        dispatch(updateQuantity({ productId, delta }));

        try {
            // Gọi API để update số lượng trên server
            const res = await updateQuantityClient({ productId, quantity: delta });
            if (res?.data?.statusCode === 200) {
                // Đồng bộ lại toàn bộ cart từ server
                dispatch(fetchCart());
            } else {
                toast.error("Cập nhật giỏ hàng thất bại");
                dispatch(fetchCart()); // rollback
            }
        } catch (err) {
            toast.error("Lỗi kết nối server");
            dispatch(fetchCart()); // rollback
        }
    };


    const handleRemoveItem = async (cartItemId: number) => {
        const res = await deleteCartItemClient(cartItemId);
        if (res?.data?.statusCode === 200) {
            dispatch(fetchCart());
        }
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
                                                        onClick={() => handleRemoveItem(item.cartItemId)}
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
                                                onClick={() => handleBuyNow()}
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
                                                    <Button variant="danger"
                                                        onClick={() => handleRemoveItem(item.cartItemId)}
                                                    >
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
                                            onClick={() => handleBuyNow()}
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
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    isAuthenticated ? (
                        <Empty description="Giỏ hàng trống" />
                    ) : (
                        <Empty description="Vui lòng đăng nhập để xem giỏ hàng" />
                    )
                )}
            </Layout>
        </div>
    );
};

export default CartPage;

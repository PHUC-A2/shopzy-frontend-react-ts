import {
    Col,
    Image,
    Layout,
    Row,
    Typography,
    Divider,
    Space,
    Rate,
} from "antd";
import {
    ShoppingCartOutlined,
    ThunderboltOutlined,
    CheckCircleOutlined,
    AppstoreAddOutlined,
    BgColorsOutlined,
    InboxOutlined,
    StarFilled,
} from "@ant-design/icons";
import { Button } from "react-bootstrap";
import { motion } from "framer-motion";
import "./ProductDetails.scss";
import { useOutletContext } from "react-router";
import { Slide, toast } from "react-toastify";

const { Title, Text } = Typography;

interface IProps {
    setCartCount: React.Dispatch<React.SetStateAction<number>>;
}

const ProductPageDetails = () => {

    const { setCartCount } = useOutletContext<IProps>();

    // thêm vào giỏ hàng
    const handleAddToCart = () => {
        setCartCount(pr => pr + 1);
        toast.success("🛒 Đã thêm sản phẩm vào giỏ hàng", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false, // cho hiện progress bar mảnh
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            transition: Slide,       // Slide | Zoom | Flip | Bounce
            style: {
                fontSize: "13px",
                padding: "8px 14px",
                borderRadius: "10px",
                minHeight: "unset",
                lineHeight: "1.3",
                fontWeight: 500,
                color: "#fff",
                boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
                marginTop: "25px",
            },
            progressStyle: {
                background: "rgba(255,255,255,0.8)", // progress bar trắng mảnh
                height: "3px",
                borderRadius: "2px",
            },
        } as any);
    };

    return (
        <>
            <div className="product-details-container">
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <Layout
                        style={{
                            background: "white",
                            padding: "24px",
                            borderRadius: "16px",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                        }}
                    >
                        <Row gutter={[32, 24]}>
                            {/* Cột trái: Ảnh sản phẩm */}
                            <Col xs={24} md={12}>
                                <motion.div whileHover={{ scale: 1.05 }}>
                                    <Image
                                        src="https://picsum.photos/400/300?random=1"
                                        preview={true}
                                        width={"100%"}
                                        style={{
                                            borderRadius: "12px",
                                            objectFit: "cover",
                                            height: 400,
                                        }}
                                    />
                                </motion.div>
                                <Row style={{ marginTop: "12px" }}>
                                    <Text strong>
                                        <CheckCircleOutlined style={{ color: "#389e0d" }} /> Địa chỉ:{" "}
                                    </Text>
                                    <Text style={{ marginLeft: "8px" }}>Hà Nội</Text>
                                </Row>
                            </Col>

                            {/* Cột phải: Thông tin sản phẩm */}
                            <Col xs={24} md={12}>
                                <motion.div
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                    style={{ padding: "0 8px" }}
                                >
                                    <Title
                                        level={3}
                                        style={{ marginBottom: "12px", color: "#001529" }}
                                    >
                                        Áo Hoodie Local Brand
                                    </Title>
                                    <Title
                                        level={4}
                                        style={{ color: "#d4380d", marginBottom: "12px" }}
                                    >
                                        350.000đ
                                    </Title>

                                    {/* Đánh giá sao */}
                                    <Space direction="horizontal" size="middle">
                                        <Rate
                                            defaultValue={4}
                                            character={<StarFilled />}
                                            style={{ color: "#faad14" }}
                                        />
                                        <Text type="secondary">(128 đánh giá)</Text>
                                    </Space>

                                    <Divider />

                                    <Space
                                        direction="vertical"
                                        size="middle"
                                        style={{ width: "100%" }}
                                    >
                                        <Text>
                                            <AppstoreAddOutlined style={{ color: "#faad14" }} />{" "}
                                            <strong>Kích thước:</strong> M, L, XL
                                        </Text>
                                        <Text>
                                            <BgColorsOutlined style={{ color: "#faad14" }} />{" "}
                                            <strong>Màu sắc:</strong> Đen / Trắng
                                        </Text>
                                        <Text>
                                            <CheckCircleOutlined style={{ color: "#389e0d" }} />{" "}
                                            <strong>Tình trạng:</strong> Còn hàng
                                        </Text>
                                        <Text>
                                            <ThunderboltOutlined style={{ color: "#faad14" }} />{" "}
                                            <strong>Trạng thái:</strong> Mới 100%
                                        </Text>
                                        <Text>
                                            <InboxOutlined style={{ color: "#001529" }} />{" "}
                                            <strong>Số lượng tồn kho:</strong> 24
                                        </Text>
                                    </Space>

                                    <Divider />

                                    <Space size="large" wrap>
                                        <motion.div whileHover={{ scale: 1.05 }}>
                                            <Button
                                                onClick={handleAddToCart}
                                                variant="dark"
                                                style={{
                                                    padding: "10px 24px",
                                                    borderRadius: "8px",
                                                    background: "#389e0d",
                                                    border: "none",
                                                    fontWeight: "500",
                                                    color: "white",
                                                    transition: "all 0.3s ease",
                                                }}
                                                onMouseOver={(e) =>
                                                    (e.currentTarget.style.background = "#237804")
                                                }
                                                onMouseOut={(e) =>
                                                    (e.currentTarget.style.background = "#389e0d")
                                                }
                                            >
                                                <ShoppingCartOutlined /> Thêm Vào Giỏ
                                            </Button>
                                        </motion.div>

                                        <motion.div whileHover={{ scale: 1.05 }}>
                                            <Button
                                                onClick={() => toast.info("Chuyển sang trang checkout")}
                                                variant="outline-dark"
                                                style={{
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
                                                <ThunderboltOutlined /> Mua Ngay
                                            </Button>
                                        </motion.div>
                                    </Space>
                                </motion.div>
                            </Col>
                        </Row>

                        {/* Mô tả sản phẩm */}
                        <Divider style={{ margin: "32px 0" }} />
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <Row gutter={[16, 16]}>
                                <Col span={24}>
                                    <Title level={4} style={{ color: "#001529" }}>
                                        Mô tả sản phẩm
                                    </Title>
                                    <Text
                                        type="secondary"
                                        style={{ fontSize: "15px", lineHeight: 1.7 }}
                                    >
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        Ea, id labore. Excepturi libero earum dolores non, nihil
                                        dicta, quia neque natus magnam perspiciatis nemo laboriosam.
                                        Ab totam pariatur, quisquam exercitationem repellendus
                                        libero voluptas modi aperiam quidem.
                                    </Text>
                                </Col>
                            </Row>
                        </motion.div>
                    </Layout>
                </motion.div>
            </div>
        </>
    );
};

export default ProductPageDetails;

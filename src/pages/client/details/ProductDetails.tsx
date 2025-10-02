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
import "./ProductDetails.scss";

const { Title, Text } = Typography;

const ProductPageDetails = () => {
    return (
        <>
            <div className="product-details-container">
                <Layout
                    style={{
                        background: "white",
                        padding: "24px",
                        borderRadius: "16px",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                        transition: "all 0.3s ease",
                    }}
                >
                    <Row gutter={[32, 24]}>
                        {/* Cột trái: Ảnh sản phẩm */}
                        <Col xs={24} md={12}>
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
                            <Row style={{ marginTop: "12px" }}>
                                <Text strong>
                                    <CheckCircleOutlined style={{ color: "#389e0d" }} /> Địa chỉ:{" "}
                                </Text>
                                <Text style={{ marginLeft: "8px" }}>Hà Nội</Text>
                            </Row>
                        </Col>

                        {/* Cột phải: Thông tin sản phẩm */}
                        <Col xs={24} md={12}>
                            <div style={{ padding: "0 8px" }}>
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
                                    <Button
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

                                    <Button
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
                                </Space>
                            </div>
                        </Col>
                    </Row>

                    {/* Mô tả sản phẩm */}
                    <Divider style={{ margin: "32px 0" }} />
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Title level={4} style={{ color: "#001529" }}>
                                Mô tả sản phẩm
                            </Title>
                            <Text type="secondary" style={{ fontSize: "15px", lineHeight: 1.7 }}>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea, id
                                labore. Excepturi libero earum dolores non, nihil dicta, quia
                                neque natus magnam perspiciatis nemo laboriosam. Ab totam
                                pariatur, quisquam exercitationem repellendus libero voluptas
                                modi aperiam quidem.
                            </Text>
                        </Col>
                    </Row>

                    {/* Chat box */}
                    <Divider />
                    {/* <Card
                        title={<span><MessageOutlined /> Chat với Shop</span>}
                        bordered={true}
                        style={{
                            marginTop: "16px",
                            borderRadius: "12px",
                            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                        }}
                    >
                        <Space direction="vertical" style={{ width: "100%" }}>
                            <div style={{ height: "120px", overflowY: "auto", padding: "8px" }}>
                                <Text type="secondary">💬 Shop: Xin chào, bạn cần tư vấn gì không?</Text>
                            </div>
                            <Space.Compact style={{ width: "100%" }}>
                                <Input placeholder="Nhập tin nhắn..." />
                                <AntButton type="primary" icon={<MessageOutlined />}>
                                    Gửi
                                </AntButton>
                            </Space.Compact>
                        </Space>
                    </Card> */}
                </Layout>
            </div>
        </>
    );
};

export default ProductPageDetails;

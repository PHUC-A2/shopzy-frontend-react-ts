import { Layout, Row, Col, Typography, Space } from "antd";

const { Footer: AntFooter } = Layout;
const { Title, Text, Paragraph } = Typography;

const Footer = () => {
    return (
        <AntFooter
            style={{
                backgroundColor: "#001529",
                color: "#fff",
                padding: "40px 60px",
            }}
        >
            <Row gutter={[32, 32]}>
                {/* Cột 1 */}
                <Col xs={24} sm={12} md={6}>
                    <Title level={4} style={{ color: "#fff", marginBottom: 16 }}>
                        Về chúng tôi
                    </Title>
                    <Paragraph style={{ color: "#ccc" }}>
                        Shopzy là một sàn thương mại điện tử, hay còn gọi là chợ trực tuyến,
                        nơi người bán và người mua có thể gặp nhau để trao đổi hàng hóa/dịch vụ.
                        Chúng tôi mang đến trải nghiệm UI hiện đại và dễ dùng.
                    </Paragraph>
                </Col>

                {/* Cột 2 */}
                <Col xs={24} sm={12} md={6}>
                    <Title level={4} style={{ color: "#fff", marginBottom: 16 }}>
                        Liên hệ
                    </Title>
                    <Space direction="vertical" size="small">
                        <Text style={{ color: "#ccc" }}>📍 123 Đường ABC, Sơn La</Text>
                        <Text style={{ color: "#ccc" }}>📞 0123 456 789</Text>
                        <Text style={{ color: "#ccc" }}>✉️ contact@email.com</Text>
                    </Space>
                </Col>

                {/* Cột 3 */}
                <Col xs={24} sm={12} md={6}>
                    <Title level={4} style={{ color: "#fff", marginBottom: 16 }}>
                        Liên kết nhanh
                    </Title>
                    <Space direction="vertical" size="small">
                        <a href="/" style={{ color: "#ccc" }}>Trang chủ</a>
                        <a href="/products" style={{ color: "#ccc" }}>Sản phẩm</a>
                        <a href="/services" style={{ color: "#ccc" }}>Dịch vụ</a>
                        <a href="/contact" style={{ color: "#ccc" }}>Liên hệ</a>
                    </Space>
                </Col>

                {/* Cột 4 */}
                <Col xs={24} sm={12} md={6}>
                    <Title level={4} style={{ color: "#fff", marginBottom: 16 }}>
                        Mạng xã hội
                    </Title>
                    <Space size="middle">
                        <a href="https://web.facebook.com/" style={{ color: "#ccc" }}>Facebook</a>
                        <a href="https://chat.zalo.me/" style={{ color: "#ccc" }}>Zalo</a>
                        <a href="https://www.tiktok.com/vi-VN/" style={{ color: "#ccc" }}>TikTok</a>
                        <a href="https://www.youtube.com/" style={{ color: "#ccc" }}>YouTube</a>
                    </Space>
                </Col>
            </Row>

            <hr style={{ borderColor: "#737373ff", margin: "30px 0" }} />

            <div style={{ textAlign: "center", color: "#999" }}>
                © {new Date().getFullYear()} Van Phuc. All rights reserved.
            </div>
        </AntFooter>
    );
};

export default Footer;

import { Layout, Row, Col, Typography, Space } from "antd";
import { AiFillTikTok, AiFillYoutube } from "react-icons/ai";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { SiZalo } from "react-icons/si";
import { Link } from "react-router";

const { Footer: AntFooter } = Layout;
const { Title, Text, Paragraph } = Typography;

const Footer = () => {
    return (
        <AntFooter
            style={{
                backgroundColor: " #001529",
                color: "#389e0d",
                padding: "40px 60px",
            }}
        >
            <Row gutter={[32, 32]}>
                {/* Cột 1 */}
                <Col xs={24} sm={12} md={6}>
                    <Title level={4} style={{ color: "#389e0d", marginBottom: 16 }}>
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
                    <Title level={4} style={{ color: "#389e0d", marginBottom: 16 }}>
                        Liên hệ
                    </Title>
                    <Space direction="vertical" size="small">
                        <Text style={{ color: "#faad14" }}>📍 123 Đường ABC, Sơn La</Text>
                        <Text style={{ color: "#faad14" }}>📞 0123 456 789</Text>
                        <Text style={{ color: "#faad14" }}>✉️ contact@email.com</Text>
                    </Space>
                </Col>

                {/* Cột 3 */}
                <Col xs={24} sm={12} md={6}>
                    <Title level={4} style={{ color: "#389e0d", marginBottom: 16 }}>
                        Liên kết nhanh
                    </Title>
                    <Space direction="vertical" size="small">
                        <Link to="/" style={{ color: "#ccc" }}>Trang chủ</Link>
                        <Link to="/product" style={{ color: "#ccc" }}>Sản phẩm</Link>
                        <Link to="/service" style={{ color: "#ccc" }}>Dịch vụ</Link>
                        <Link to="/contLinkct" style={{ color: "#ccc" }}>Liên hệ</Link>
                        <Link to="/Linkbout" style={{ color: "#ccc" }}>Giới thiệu</Link>
                    </Space>
                </Col>

                {/* Cột 4 */}
                <Col xs={24} sm={12} md={6}>
                    <Title level={4} style={{ color: "#389e0d", marginBottom: 16 }}>
                        Mạng xã hội
                    </Title>
                    <Space size="middle" style={{ fontSize: 24 }}>
                        <Link to="https://web.facebook.com/" style={{ color: "#faad14" }}> <BiLogoFacebookCircle /></Link>
                        <Link to="https://chat.zalo.me/" style={{ color: "#faad14" }}><SiZalo /> </Link>
                        <Link to="https://www.tiktok.com/vi-VN/" style={{ color: "#faad14" }}><AiFillTikTok /></Link>
                        <Link to="https://www.youtube.com/" style={{ color: "#faad14" }}><AiFillYoutube /></Link>
                    </Space>
                </Col>
            </Row>

            <hr style={{ borderColor: "#737373ff", margin: "30px 0" }} />

            <div style={{ textAlign: "center", color: "#999" }}>
                © <span style={{ color: '#389e0d' }}>{new Date().getFullYear()} Phuc - Linh</span>. <span style={{ color: '#faad14' }}>All rights reserved.</span>
            </div>
        </AntFooter>
    );
};

export default Footer;

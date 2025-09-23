import { Avatar, Card, Typography, Row, Col, Divider, Space } from "antd";
import {
    FacebookOutlined,
    YoutubeOutlined,
} from "@ant-design/icons";
import shopzy from '../../../assets/shopzy.png'
import { SiZalo } from "react-icons/si";
import { FaTiktok } from "react-icons/fa6";
import { RiMessengerLine } from "react-icons/ri";

const { Title, Paragraph, Text } = Typography;

const AboutPage = () => {
    return (
        <div style={{ maxWidth: "90%", margin: "0 auto", padding: "50px" }}>
            <Card
                style={{
                    borderRadius: 12,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    padding: "24px",
                }}
            >
                <Row gutter={[24, 24]} align="middle">
                    <Col xs={24} sm={6} md={6} style={{ textAlign: "center" }}>
                        <Avatar
                            size={120}
                            src={shopzy} // đổi sang logo Shopzy
                            alt="Shopzy"
                        />
                    </Col>
                    <Col xs={24} sm={18} md={18}>
                        <Typography>
                            <Title level={2}>Shopzy</Title>
                            <Text italic style={{ fontSize: 16 }}>
                                Mua sắm dễ dàng – Trải nghiệm tuyệt vời
                            </Text>

                            <Divider />

                            <Paragraph>
                                Chào mừng bạn đến với <b>Shopzy</b> – nền tảng thương mại điện tử
                                mang đến trải nghiệm mua sắm hiện đại, nhanh chóng và tiện lợi.
                                Shopzy cam kết cung cấp các sản phẩm chất lượng, đa dạng từ thời
                                trang, công nghệ, gia dụng đến mỹ phẩm, với giá cả hợp lý và dịch
                                vụ tận tâm.
                            </Paragraph>

                            <Paragraph>
                                Với mục tiêu trở thành <b>người bạn đồng hành mua sắm trực tuyến</b>{" "}
                                của mọi nhà, Shopzy luôn nỗ lực đổi mới để mang lại sự hài lòng
                                cho khách hàng qua:
                                <br />✔ Giao hàng nhanh chóng
                                <br />✔ Hỗ trợ khách hàng 24/7
                                <br />✔ Chính sách đổi trả linh hoạt
                                <br />✔ Chất lượng sản phẩm được đảm bảo
                            </Paragraph>
                        </Typography>
                    </Col>
                </Row>

                <Divider />

                <Typography>
                    <Title level={4}>Tại sao chọn Shopzy?</Title>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12}>
                            <Text>- Sản phẩm chính hãng, nguồn gốc rõ ràng</Text>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Text>- Ưu đãi hấp dẫn, giá cả cạnh tranh</Text>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Text>- Giao hàng toàn quốc</Text>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Text>- Hỗ trợ khách hàng nhanh chóng</Text>
                        </Col>
                    </Row>
                </Typography>

                <Divider />

                <Title level={4}>Kết nối với Shopzy</Title>
                <Space size="large" style={{ fontSize: 24 }}>

                    <a href="https://m.me/shopzy" target="_blank" rel="noopener noreferrer">
                        <RiMessengerLine />
                    </a>
                    <a href="https://zalo.me/your-id" target="_blank" rel="noopener noreferrer">
                        <SiZalo />
                    </a>
                    <a href="https://facebook.com/shopzy" target="_blank" rel="noopener noreferrer">
                        <FacebookOutlined />
                    </a>
                    <a href="https://www.tiktok.com/@shopzy" target="_blank" rel="noopener noreferrer">
                        <FaTiktok />
                    </a>
                    <a href="https://www.youtube.com/@shopzy" target="_blank" rel="noopener noreferrer">
                        <YoutubeOutlined />
                    </a>

                </Space>
            </Card>
        </div>
    );
};

export default AboutPage;

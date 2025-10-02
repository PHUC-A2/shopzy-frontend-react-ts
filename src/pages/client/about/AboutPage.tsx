import { Avatar, Card, Typography, Row, Col, Divider, Space } from "antd";
import {
    FacebookOutlined,
    YoutubeOutlined,
} from "@ant-design/icons";
import shopzy from '../../../assets/shopzy.png'
import { SiZalo } from "react-icons/si";
import { FaTiktok } from "react-icons/fa6";
import { RiMessengerLine } from "react-icons/ri";
import { motion } from "framer-motion"; // thêm framer-motion

const { Title, Paragraph, Text } = Typography;
const socialIcons = [
    {
        icon: <RiMessengerLine style={{ color: "#0084FF" }} />,
        url: "https://m.me/shopzy"
    },
    {
        icon: <SiZalo style={{ color: "#0068FF" }} />,
        url: "https://chat.zalo.me/"
    },
    {
        icon: <FacebookOutlined style={{ color: "#1877F2" }} />,
        url: "https://facebook.com"
    },
    {
        icon: <FaTiktok style={{ color: "#000000" }} />,
        url: "https://www.tiktok.com"
    },
    {
        icon: <YoutubeOutlined style={{ color: "#FF0000" }} />,
        url: "https://www.youtube.com"
    },
];


const AboutPage = () => {
    return (
        <div style={{ maxWidth: "100%", margin: 0, padding: 0 }}>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Card
                    style={{
                        borderRadius: 12,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        padding: "2rem",
                        marginTop: 125,
                        marginLeft: 20,
                        marginRight: 20,
                        marginBottom: 20,
                    }}
                >
                    <Row gutter={[24, 24]} align="middle">
                        <Col xs={24} sm={6} md={6} style={{ textAlign: "center" }}>
                            <motion.div
                                initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
                                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                                transition={{ duration: 0.6 }}
                            >
                                <Avatar
                                    size={120}
                                    src={shopzy}
                                    alt="Shopzy"
                                    style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}
                                />
                            </motion.div>
                        </Col>
                        <Col xs={24} sm={18} md={18}>
                            <motion.div
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                            >
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
                            </motion.div>
                        </Col>
                    </Row>

                    <Divider />

                    <Typography>
                        <Title level={4}>Tại sao chọn Shopzy?</Title>
                        <Row gutter={[16, 16]}>
                            {[
                                "- Sản phẩm chính hãng, nguồn gốc rõ ràng",
                                "- Ưu đãi hấp dẫn, giá cả cạnh tranh",
                                "- Giao hàng toàn quốc",
                                "- Hỗ trợ khách hàng nhanh chóng",
                            ].map((text, index) => (
                                <Col xs={24} sm={12} key={index}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 + index * 0.2, duration: 0.5 }}
                                    >
                                        <Text>{text}</Text>
                                    </motion.div>
                                </Col>
                            ))}
                        </Row>
                    </Typography>

                    <Divider />

                    <Title level={4}>Kết nối với Shopzy</Title>
                    <Space size="large" style={{ fontSize: 28 }}>
                        {socialIcons.map((item, index) => (
                            <motion.a
                                key={index}
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.3, rotate: 8 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                style={{ display: "inline-flex" }}
                            >
                                {item.icon}
                            </motion.a>
                        ))}
                    </Space>
                </Card>
            </motion.div>
        </div>
    );
};

export default AboutPage;

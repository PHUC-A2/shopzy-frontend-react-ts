import { Layout, Row, Col, Carousel, Card, Pagination, Image } from "antd";
import { useState } from "react";

// ảnh local
import background_01 from "../../../assets/background-01.png";
import background_02 from "../../../assets/background-02.png";
import background_03 from "../../../assets/background-03.png";
import shirt_01 from "../../../assets/shirt-01.png";
import asus_zenbook_01 from "../../../assets/asus-zenbook-01.png";
import lenovo_legion_05_01 from "../../../assets/lenovo-legion05-01.png";

const { Content } = Layout;
const { Meta } = Card;

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    status: string;
    productCondition: string;
    imageUrl: string;
    size: string;
    color: string;
}

// ⚡️ Giả lập API response tĩnh
const apiResponse = {
    meta: {
        page: 1,
        pageSize: 2, // backend set pageSize = total → hiển thị hết
        pages: 2,
        total: 4,
    },
    result: [
        {
            id: 1,
            name: "Quần ABC",
            description: "Quần âu đẹp",
            price: 200000,
            stock: 15,
            status: "IN_STOCK",
            productCondition: "NEW",
            imageUrl: asus_zenbook_01,
            size: "S",
            color: "Đỏ",
        },
        {
            id: 2,
            name: "Quần A",
            description: "Quần âu đẹp",
            price: 200000,
            stock: 15,
            status: "IN_STOCK",
            productCondition: "NEW",
            imageUrl: lenovo_legion_05_01,
            size: "S",
            color: "Đỏ",
        },
        {
            id: 3,
            name: "Quần C",
            description: "Quần âu đẹp",
            price: 200000,
            stock: 20,
            status: "IN_STOCK",
            productCondition: "USED",
            imageUrl: "", // thiếu ảnh → fallback
            size: "S",
            color: "Đen",
        },
        {
            id: 4,
            name: "Quần C_D",
            description: "Quần âu đẹp d",
            price: 3000,
            stock: 0,
            status: "OUT_OF_STOCK",
            productCondition: "USED",
            imageUrl: shirt_01,
            size: "M",
            color: "Đen",
        },
        {
            id: 5,
            name: "Quần C_D",
            description: "Quần âu đẹp d",
            price: 3000,
            stock: 0,
            status: "OUT_OF_STOCK",
            productCondition: "USED",
            imageUrl: shirt_01,
            size: "M",
            color: "Đen",
        },
        {
            id: 6,
            name: "Quần C_D",
            description: "Quần âu đẹp d",
            price: 3000,
            stock: 0,
            status: "OUT_OF_STOCK",
            productCondition: "USED",
            imageUrl: shirt_01,
            size: "M",
            color: "Đen",
        },
        {
            id: 7,
            name: "Quần C_D",
            description: "Quần âu đẹp d",
            price: 3000,
            stock: 0,
            status: "OUT_OF_STOCK",
            productCondition: "USED",
            imageUrl: shirt_01,
            size: "M",
            color: "Đen",
        },
    ] as Product[],
};

const HomePage = () => {
    const { meta, result } = apiResponse;
    const [currentPage, setCurrentPage] = useState(meta.page);

    // ✅ backend đã phân trang rồi → chỉ dùng trực tiếp result
    const paginatedProducts = result;

    // ảnh fallback
    const fallbackImage = background_01;

    return (
        <Layout style={{ marginTop: 103 }}>
            <Content style={{ padding: "24px" }}>
                {/* Carousel banner */}
                <Carousel autoplay arrows autoplaySpeed={2000} style={{ marginBottom: 24 }}>
                    <div>
                        <img
                            src={background_01}
                            alt="slide1"
                            style={{ width: "100%", borderRadius: 8 }}
                        />
                    </div>
                    <div>
                        <img
                            src={background_02}
                            alt="slide2"
                            style={{ width: "100%", borderRadius: 8 }}
                        />
                    </div>
                    <div>
                        <img
                            src={background_03}
                            alt="slide3"
                            style={{ width: "100%", borderRadius: 8 }}
                        />
                    </div>
                </Carousel>

                {/* Danh mục sản phẩm */}
                <h3 style={{ marginBottom: 16 }}>DANH MỤC</h3>
                <Row gutter={[16, 16]}>
                    {paginatedProducts.map((product) => (
                        <Col xs={12} sm={8} md={4} lg={6} xl={4} key={product.id}>
                            <Card
                                hoverable
                                style={{ height: "100%" }}
                                cover={
                                    <Image
                                        src={product.imageUrl || fallbackImage}
                                        alt={product.name}
                                        preview
                                        style={{ objectFit: "contain", height: 200 }}
                                    />
                                }
                            >
                                <Meta
                                    title={product.name}
                                    description={`Giá: ${product.price.toLocaleString()} VND`}
                                />
                                <div>
                                    <strong>Còn lại:</strong> {product.stock}
                                </div>
                                <div>
                                    <strong>Trạng thái:</strong> {product.status}
                                </div>
                                <div>
                                    <strong>Tình trạng:</strong> {product.productCondition}
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* Phân trang */}
                <Row justify="center" style={{ marginTop: 24 }}>
                    <Pagination
                        current={currentPage}
                        pageSize={meta.pageSize}
                        total={meta.total}
                        onChange={(page) => setCurrentPage(page)}
                    />
                </Row>
            </Content>
        </Layout>
    );
};

export default HomePage;

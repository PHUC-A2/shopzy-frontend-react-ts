import {
    Layout,
    Row,
    Col,
    Card,
    Image,
    Pagination,
    Checkbox,
    Slider,
} from "antd";
import { useState } from "react";

// ảnh local (dùng ảnh của bạn như trang Home)
import background_01 from "../../../assets/background-01.png";
import shirt_01 from "../../../assets/shirt-01.png";
import asus_zenbook_01 from "../../../assets/asus-zenbook-01.png";
import lenovo_legion_05_01 from "../../../assets/lenovo-legion05-01.png";

const { Content, Sider } = Layout;
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

// ⚡️ Giả lập dữ liệu tĩnh
const products: Product[] = [
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
];

const ProductPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);

    // fallback image nếu thiếu ảnh
    const fallbackImage = background_01;

    return (
        <Layout style={{ marginTop: 115 }}>
            <Layout>
                {/* Sidebar bộ lọc */}
                <Sider
                    width={250}
                    theme="light"
                    style={{
                        padding: "16px",
                        background: "#fff",
                        borderRight: "1px solid #f0f0f0",
                    }}
                >
                    <h3>Bộ lọc sản phẩm</h3>

                    {/* Danh mục */}
                    <div style={{ marginBottom: 16 }}>
                        <h4>Danh mục</h4>
                        <Checkbox.Group
                            style={{ display: "flex", flexDirection: "column", gap: 8 }}
                        >
                            <Checkbox value="shirt">Áo</Checkbox>
                            <Checkbox value="pants">Quần</Checkbox>
                            <Checkbox value="shoes">Giày</Checkbox>
                        </Checkbox.Group>
                    </div>

                    {/* Giá */}
                    <div style={{ marginBottom: 16 }}>
                        <h4>Khoảng giá</h4>
                        <Slider
                            range
                            min={0}
                            max={2000000}
                            step={50000}
                            value={priceRange}
                            onChange={(val) => setPriceRange(val as [number, number])}
                        />
                        <div>
                            {priceRange[0].toLocaleString()} đ -{" "}
                            {priceRange[1].toLocaleString()} đ
                        </div>
                    </div>

                    {/* Tình trạng */}
                    <div>
                        <h4>Tình trạng</h4>
                        <Checkbox.Group
                            style={{ display: "flex", flexDirection: "column", gap: 8 }}
                        >
                            <Checkbox value="new">Mới</Checkbox>
                            <Checkbox value="used">Đã qua sử dụng</Checkbox>
                        </Checkbox.Group>
                    </div>
                </Sider>

                {/* Danh sách sản phẩm */}
                <Content style={{ padding: "24px" }}>
                    <Row gutter={[16, 16]}>
                        {products.map((product) => (
                            <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                                <Card
                                    hoverable
                                    style={{
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                    cover={
                                        <Image
                                            src={product.imageUrl || fallbackImage}
                                            alt={product.name}
                                            preview
                                            style={{
                                                objectFit: "contain",
                                                height: 200,
                                                background: "#fafafa",
                                            }}
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
                            pageSize={4}
                            total={products.length}
                            onChange={(page) => setCurrentPage(page)}
                        />
                    </Row>
                </Content>
            </Layout>
        </Layout>
    );
};

export default ProductPage;

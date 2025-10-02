import { Layout, Row, Col, Carousel, Card, Pagination, Image, Spin, Empty, Space } from "antd";
import { useEffect, useState } from "react";

import background_01 from "../../../assets/background-01.png";
import background_02 from "../../../assets/background-02.png";
import background_03 from "../../../assets/background-03.png";
// import asus_zenbook_01 from "../../../assets/asus-zenbook-01.png";

import type { IProduct } from "../../../types/backend";
import { clientGetAllProducts } from "../../../config/Api";
import { Link } from "react-router";

const { Content } = Layout;
const { Meta } = Card;

const HomePage = () => {
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(12); // mỗi trang 12 sản phẩm
    const [total, setTotal] = useState<number>(0);
    const [listProduct, setListProduct] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchProduct = async (page: number, size: number) => {
        try {
            setLoading(true);
            const res = await clientGetAllProducts(page, size);
            setListProduct(res.data.data.result);
            setPage(res.data.data.meta.page);
            setPageSize(res.data.data.meta.pageSize);
            setTotal(res.data.data.meta.total);
        } catch (error) {
            console.error("Fetch products error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct(page, pageSize);
    }, [page, pageSize]);

    return (
        <Layout style={{ marginTop: 103 }}>
            <Content style={{ padding: "24px" }}>
                {/* Carousel */}
                <Carousel autoplay arrows autoplaySpeed={1500} style={{ marginBottom: 24 }}>
                    <div><img src={background_01} alt="slide1" style={{ width: "100%", borderRadius: 8 }} /></div>
                    <div><img src={background_02} alt="slide2" style={{ width: "100%", borderRadius: 8 }} /></div>
                    <div><img src={background_03} alt="slide3" style={{ width: "100%", borderRadius: 8 }} /></div>
                </Carousel>

                <h3 style={{ marginBottom: 16 }}>DANH MỤC</h3>

                {/*  giữ UI, overlay loading */}
                <Spin spinning={loading}>
                    <Row gutter={[16, 16]}>
                        {listProduct.length > 0 ?
                            listProduct.map((product) => (
                                <Col xs={12} sm={8} md={6} lg={6} xl={4} key={product.id}>
                                    <Card
                                        hoverable
                                        style={{
                                            height: "100%",
                                            border: "1px solid #f0f0f0",
                                            borderRadius: 12,
                                            transition: "all 0.3s ease",
                                        }}
                                        styles={{
                                            body: {
                                                padding: 12
                                            }
                                        }}
                                        cover={
                                            <Image
                                                src={`https://picsum.photos/seed/${product.id}/400/300`}
                                                alt={product.name}
                                                preview
                                                style={{
                                                    objectFit: "contain",
                                                    height: 200,
                                                    padding: 8,
                                                }}
                                            />
                                        }
                                        className="custom-card"
                                    >
                                        <Link to={"product-details"} className="nav-link">
                                            <Meta
                                                title={
                                                    <span className="card-title">{product.name}</span>
                                                }
                                                description={
                                                    <span style={{ color: "#389e0d", fontWeight: 500 }}>
                                                        {`Giá: ${product.price.toLocaleString()} VND`}
                                                    </span>
                                                }
                                            />

                                            <div className="card-info">
                                                <div>
                                                    <strong>Còn lại:</strong> {product.stock}
                                                </div>

                                                <div>
                                                    {product.status === "IN_STOCK" ? (
                                                        <div>
                                                            <strong style={{ color: "#faad14" }}>Trạng thái:</strong>{" "}
                                                            <span style={{ color: "#389e0d" }}>Còn hàng</span>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <strong style={{ color: "#faad14" }}>Trạng thái:</strong>{" "}
                                                            <span style={{ color: "#001529" }}>Hết hàng</span>
                                                        </div>
                                                    )}
                                                </div>

                                                <div>
                                                    {product.productCondition === "NEW" ? (
                                                        <div>
                                                            <strong style={{ color: "#001529" }}>Tình trạng:</strong>{" "}
                                                            <span style={{ color: "#389e0d" }}>Mới</span>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <strong style={{ color: "#001529" }}>Tình trạng:</strong>{" "}
                                                            <span style={{ color: "#faad14" }}>Đã sử dụng</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    </Card>

                                </Col>
                            ))
                            : (
                                <Space
                                    style={{
                                        display: "flex",
                                        alignItems: "center",       // căn giữa dọc
                                        justifyContent: "center",   // căn giữa ngang
                                        height: "100%",             // hoặc 300px, hoặc 'calc(100vh - 200px)' tùy layout
                                        width: "100%"
                                    }}
                                >
                                    <Empty />
                                </Space>
                            )}

                    </Row>
                </Spin>

                {/* Pagination */}
                <Row justify="center" style={{ marginTop: 24 }}>
                    <Pagination
                        current={page}
                        pageSize={pageSize}
                        total={total}
                        showSizeChanger
                        pageSizeOptions={[4, 8, 12, 16]} // cho user chọn số card / trang
                        onChange={(newPage, newSize) => {
                            setPage(newPage);
                            if (newSize !== pageSize) setPageSize(newSize);
                        }}
                    />
                </Row>
            </Content>
        </Layout>
    );
};

export default HomePage;

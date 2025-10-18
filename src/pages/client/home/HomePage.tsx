import { Layout, Row, Col, Carousel, Card, Pagination, Image, Spin, Empty, Space, Rate } from "antd";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";   // ✅ thêm framer-motion

import type { IProduct } from "../../../types/backend";
import { clientGetAllProducts } from "../../../config/Api";
import { Link, useSearchParams } from "react-router";
import { toast } from "react-toastify";
import { buildQuery } from "../../../util/query";

const { Content } = Layout;
const { Meta } = Card;

const HomePage = () => {
    const [searchParams] = useSearchParams();
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(12); // mỗi trang 12 sản phẩm
    const [total, setTotal] = useState<number>(0);
    const [listProduct, setListProduct] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentFilter, setCurrentFilter] = useState<string | undefined>();

    const fetchProduct = async () => {
        try {
            setLoading(true);

            const query = buildQuery({
                page,
                size: pageSize,
                filter: currentFilter,
            });


            const res = await clientGetAllProducts(query);
            setListProduct(res.data.data.result);
            setPage(res.data.data.meta.page);
            setPageSize(res.data.data.meta.pageSize);
            setTotal(res.data.data.meta.total);
        } catch (error: any) {
            console.error("Fetch products error:", error);
            toast.error(
                <div>
                    <div><strong>Có lỗi xảy ra!</strong></div>
                    <div>{error}</div>
                </div>
            )
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const filter = searchParams.get('filter') || undefined;
        if (filter !== currentFilter) {
            setCurrentFilter(filter);
            setPage(1);
        }
    }, [searchParams]);

    useEffect(() => {
        fetchProduct();
    }, [page, pageSize, currentFilter]);

    return (
        <Layout style={{ marginTop: 103 }}>
            <Content style={{ padding: "24px" }}>
                {/* Carousel */}
                {/* Carousel Responsive */}
                <Carousel autoplay arrows autoplaySpeed={2500} style={{ marginBottom: 24 }}>
                    {[1, 2, 3, 5, 6, 7, 8, 9, 10, 1].map((i) => (
                        <div key={i}>
                            <img
                                src={`https://picsum.photos/seed/slide${i}/1200/600`}
                                alt={`slide-${i}`}
                                style={{
                                    width: "100%",
                                    height: "50vh",       // chiều cao theo % màn hình
                                    maxHeight: "400px",   // không quá cao ở PC
                                    minHeight: "200px",   // không quá thấp ở mobile
                                    objectFit: "cover",   // giữ tỉ lệ
                                    borderRadius: 12,
                                }}
                            />
                        </div>
                    ))}
                </Carousel>

                <h3 style={{ marginBottom: 16 }}>DANH MỤC</h3>

                {/*  giữ UI, overlay loading */}
                <Spin spinning={loading}>
                    <Row gutter={[16, 16]}>
                        {listProduct.length > 0 ?
                            listProduct.map((product, index) => (
                                <Col xs={12} sm={8} md={6} lg={6} xl={4} key={product.id}>
                                    {/* thêm motion.div để bọc Card */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05, duration: 0.4 }}
                                    >
                                        <Card
                                            hoverable
                                            style={{
                                                height: "100%",
                                                border: "1px solid #f0f0f0",
                                                borderRadius: 12,
                                                transition: "all 0.3s ease",
                                            }}
                                            styles={{
                                                body: { padding: 12 }
                                            }}
                                            cover={
                                                <Image
                                                    src={product.imageUrl}
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
                                            {/* Chỉ bọc phần tên + giá trong Link */}
                                            <Link to={`/product-details/${product.id}`} className="nav-link">
                                                <Meta
                                                    title={<span className="card-title">{product.name}</span>}
                                                    description={
                                                        <span style={{ color: "#389e0d", fontWeight: 500 }}>
                                                            {`Giá: ${product.price.toLocaleString()} VND`}
                                                        </span>
                                                    }
                                                />
                                            </Link>

                                            {/*  Đánh giá nằm ngoài Link nên có thể click */}
                                            <div style={{ margin: "8px 0" }}>
                                                <Rate defaultValue={
                                                    // product.rating 
                                                    // || 
                                                    4} />
                                            </div>

                                            {/* Thông tin sản phẩm vẫn để trong Link nếu muốn */}
                                            <Link to={`/product-details/${product.id}`} className="nav-link">
                                                <div className="card-info">
                                                    <div><strong>Còn lại:</strong> {product.stock}</div>
                                                    <div>
                                                        {product.status === "IN_STOCK" ? (
                                                            <span style={{ color: "#389e0d" }}>Còn hàng</span>
                                                        ) : (
                                                            <span style={{ color: "#001529" }}>Hết hàng</span>
                                                        )}
                                                    </div>
                                                    <div>
                                                        {product.productCondition === "NEW" ? (
                                                            <span style={{ color: "#389e0d" }}>Mới</span>
                                                        ) : (
                                                            <span style={{ color: "#faad14" }}>Đã sử dụng</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </Link>
                                        </Card>

                                    </motion.div>
                                </Col>
                            ))
                            : (
                                <Space
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: "100%",
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

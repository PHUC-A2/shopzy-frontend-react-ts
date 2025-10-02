import { Layout, Row, Col, Card, Image, Pagination, Spin, Empty, Space, Grid, Drawer, Button, Checkbox, Slider } from "antd";
import { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import type { IProduct } from "../../../types/backend";
import { clientGetAllProducts } from "../../../config/Api";
import { Link } from "react-router";

const { Content, Sider } = Layout;
const { Meta } = Card;
const { useBreakpoint } = Grid;

const ProductPage = () => {
    const screens = useBreakpoint();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(12);
    const [total, setTotal] = useState(0);
    const [listProduct, setListProduct] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const fallbackImage = "https://picsum.photos/400/300?random=1";

    const fetchProducts = async (page: number, size: number) => {
        try {
            setLoading(true);
            const res = await clientGetAllProducts(page, size);
            setListProduct(res.data.data.result);
            setPage(res.data.data.meta.page);
            setPageSize(res.data.data.meta.pageSize);
            setTotal(res.data.data.meta.total);
        } catch (err) {
            console.error("Fetch products error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(page, pageSize);
    }, [page, pageSize]);

    const FilterContent = (
        <div style={{ padding: 16 }}>
            <h3>Bộ lọc sản phẩm</h3>
            <div style={{ marginBottom: 16 }}>
                <h4>Danh mục</h4>
                <Checkbox.Group style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <Checkbox value="shirt">Áo</Checkbox>
                    <Checkbox value="pants">Quần</Checkbox>
                    <Checkbox value="shoes">Giày</Checkbox>
                </Checkbox.Group>
            </div>
            <div style={{ marginBottom: 16 }}>
                <h4>Khoảng giá</h4>
                <Slider range min={0} max={2000000} step={50000} />
            </div>
            <div>
                <h4>Tình trạng</h4>
                <Checkbox.Group style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <Checkbox value="new">Mới</Checkbox>
                    <Checkbox value="used">Đã qua sử dụng</Checkbox>
                </Checkbox.Group>
            </div>
        </div>
    );

    return (
        <Layout style={{ marginTop: 115 }}>
            <Layout>
                {screens.md ? (
                    <Sider width={250} theme="light" style={{ padding: 16, background: "#fff", borderRight: "1px solid #f0f0f0" }}>
                        {FilterContent}
                    </Sider>
                ) : (
                    <>
                        <Button
                            color="cyan"
                            style={{ margin: "10px 16px", borderRadius: 20 }}
                            onClick={() => setOpenDrawer(true)}
                            icon={<IoFilter />}
                        >
                            Bộ lọc
                        </Button>
                        <Drawer title={<span style={{ color: "orange" }}>Bộ lọc sản phẩm</span>} placement="left" open={openDrawer} onClose={() => setOpenDrawer(false)} width={280}>
                            {FilterContent}
                        </Drawer>
                    </>
                )}

                <Content style={{ padding: 16 }}>
                    <Spin spinning={loading}>
                        <Row gutter={[16, 16]}>
                            {listProduct.length > 0 ? (
                                listProduct.map((product) => (
                                    <Col xs={12} sm={8} md={6} lg={6} xl={4} key={product.id}>
                                        <Card
                                            hoverable
                                            style={{ height: "100%", display: "flex", flexDirection: "column" }}
                                            cover={
                                                <Image
                                                    src={fallbackImage}
                                                    alt={product.name}
                                                    preview
                                                    style={{ objectFit: "contain", height: 200, background: "#fafafa" }}
                                                />
                                            }
                                        >
                                            <Link to={"/product-details"} className="nav-link">
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
                            ) : (
                                <Space style={{ width: "100%", height: 300, justifyContent: "center", alignItems: "center" }}>
                                    <Empty />
                                </Space>
                            )}
                        </Row>
                    </Spin>

                    <Row justify="center" style={{ marginTop: 24 }}>
                        <Pagination
                            current={page}
                            pageSize={pageSize}
                            total={total}
                            showSizeChanger
                            pageSizeOptions={["4", "8", "12", "16"]}
                            onChange={(newPage, newSize) => {
                                setPage(newPage);
                                if (newSize !== pageSize) setPageSize(newSize);
                            }}
                        />
                    </Row>
                </Content>
            </Layout>
        </Layout>
    );
};

export default ProductPage;

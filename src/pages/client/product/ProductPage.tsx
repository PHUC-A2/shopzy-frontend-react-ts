
import { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import { motion } from "framer-motion";
import type { IProduct } from "../../../types/backend";
import { clientGetAllProducts } from "../../../config/Api";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router";
import { buildFilterQuery, buildQuery } from "../../../util/query";
import { Button, Card, Checkbox, Col, Drawer, Empty, Grid, Image, Input, Layout, Pagination, Rate, Row, Slider, Space, Spin } from "antd";

const { Content, Sider } = Layout;
const { Meta } = Card;
const { useBreakpoint } = Grid;
const { Search } = Input;

const ProductPage = () => {
    const screens = useBreakpoint();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(12);
    const [total, setTotal] = useState(0);
    const [listProduct, setListProduct] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [currentFilter, setCurrentFilter] = useState<string | undefined>();

    // const fallbackImage = "https://picsum.photos/400/300?random=1";

    //  Dữ liệu filter
    const [filters, setFilters] = useState({
        name: "",
        price: [0, 2000000] as [number, number],
        productCondition: [] as string[],
        size: [] as string[],
        color: [] as string[],
    });

    //  Options động lấy từ danh sách sản phẩm
    const [sizeOptions, setSizeOptions] = useState<string[]>([]);
    const [colorOptions, setColorOptions] = useState<string[]>([]);
    const [conditionOptions, setConditionOptions] = useState<string[]>([]);

    // =====================
    // FETCH DATA
    // =====================
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const query = buildQuery({
                page,
                size: pageSize,
                filter: currentFilter,
            });

            const res = await clientGetAllProducts(query);
            const data = res.data.data;

            setListProduct(data.result);
            setPage(data.meta.page);
            setPageSize(data.meta.pageSize);
            setTotal(data.meta.total);
        } catch (err) {
            console.error("Fetch products error:", err);
        } finally {
            setLoading(false);
        }
    };

    // Lấy filter từ URL (decode)
    useEffect(() => {
        const filter = searchParams.get("filter") || undefined;
        if (filter !== currentFilter) {
            setCurrentFilter(filter);
            setPage(1);
        }
    }, [searchParams]);

    // Fetch mỗi khi page/filter đổi
    useEffect(() => {
        fetchProducts();
    }, [page, pageSize, currentFilter]);

    // Tạo danh sách option động (size, color, condition)
    useEffect(() => {
        if (listProduct.length > 0) {
            setSizeOptions(
                Array.from(new Set(listProduct.map((p) => p.size).filter(Boolean))) as string[]
            );
            setColorOptions(
                Array.from(new Set(listProduct.map((p) => p.color).filter(Boolean))) as string[]
            );
            setConditionOptions(
                Array.from(new Set(listProduct.map((p) => p.productCondition).filter(Boolean))) as string[]
            );
        }
    }, [listProduct]);

    // Cập nhật URL khi filters thay đổi
    useEffect(() => {
        const { name, price, productCondition, size, color } = filters;

        const filterObject: Record<string, any> = {};

        if (name.trim()) {
            filterObject.name = `~ '${name.trim()}'`;
        }

        if (productCondition.length > 0) {
            filterObject.productCondition = productCondition
                .map((c) => `~ '${c}'`)
                .join(" or productCondition ");
        }

        if (size.length > 0) {
            filterObject.size = size.map((s) => `~ '${s}'`).join(" or size ");
        }

        if (color.length > 0) {
            filterObject.color = color.map((c) => `~ '${c}'`).join(" or color ");
        }

        if (price[0] > 0 || price[1] < 2000000) {
            filterObject.price = `>= ${price[0]} and price <= ${price[1]}`;
        }

        const filterPart = buildFilterQuery(filterObject, "and");
        const otherPart = buildQuery({ page: 1, size: pageSize });
        const fullQuery = [filterPart, otherPart].filter(Boolean).join("&");

        navigate(`${location.pathname}?${fullQuery}`);
    }, [filters]);

    // =====================
    //  FILTER CONTENT
    // =====================
    const FilterContent = (
        <div style={{ padding: 16 }}>
            <h3>Bộ lọc sản phẩm</h3>

            {/* 🔍 Tên sản phẩm */}
            <div style={{ marginBottom: 16 }}>
                <h4>Tên sản phẩm</h4>
                <Search
                    placeholder="Nhập tên sản phẩm..."
                    allowClear
                    value={filters.name}
                    onChange={(e) =>
                        setFilters((prev) => ({ ...prev, name: e.target.value }))
                    }
                    onSearch={(value) => setFilters((prev) => ({ ...prev, name: value }))}
                />
            </div>

            {/*  Khoảng giá */}
            <div style={{ marginBottom: 16 }}>
                <h4>Khoảng giá</h4>
                <Slider
                    range
                    min={0}
                    max={2000000}
                    step={50000}
                    value={filters.price}
                    onChange={(value) =>
                        setFilters((prev) => ({ ...prev, price: value as [number, number] }))
                    }
                />
            </div>

            {/*  Tình trạng hàng */}
            <div style={{ marginBottom: 16 }}>
                <h4>Tình trạng hàng</h4>
                <Checkbox.Group
                    value={filters.productCondition}
                    onChange={(values) =>
                        setFilters((prev) => ({
                            ...prev,
                            productCondition: values as string[],
                        }))
                    }
                    style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                    {conditionOptions.length > 0 ? (
                        conditionOptions.map((c) => (
                            <Checkbox key={c} value={c}>
                                {c === "NEW" ? "Mới" : c === "USED" ? "Đã qua sử dụng" : c}
                            </Checkbox>
                        ))
                    ) : (
                        <span style={{ color: "#999" }}>Không có dữ liệu</span>
                    )}
                </Checkbox.Group>
            </div>

            {/*  Size */}
            <div style={{ marginBottom: 16 }}>
                <h4>Size</h4>
                <Checkbox.Group
                    value={filters.size}
                    onChange={(values) =>
                        setFilters((prev) => ({ ...prev, size: values as string[] }))
                    }
                    style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                    {sizeOptions.length > 0 ? (
                        sizeOptions.map((s) => (
                            <Checkbox key={s} value={s}>
                                {s}
                            </Checkbox>
                        ))
                    ) : (
                        <span style={{ color: "#999" }}>Không có size</span>
                    )}
                </Checkbox.Group>
            </div>

            {/*  Màu sắc */}
            <div>
                <h4>Màu sắc</h4>
                <Checkbox.Group
                    value={filters.color}
                    onChange={(values) =>
                        setFilters((prev) => ({ ...prev, color: values as string[] }))
                    }
                    style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                    {colorOptions.length > 0 ? (
                        colorOptions.map((c) => (
                            <Checkbox key={c} value={c}>
                                {c}
                            </Checkbox>
                        ))
                    ) : (
                        <span style={{ color: "#999" }}>Không có màu</span>
                    )}
                </Checkbox.Group>
            </div>
        </div>
    );

    // =====================
    //  UI
    // =====================
    return (
        <Layout style={{ marginTop: 115 }}>
            <Layout>
                {/* Sidebar / Drawer */}
                {screens.md ? (
                    <Sider
                        width={250}
                        theme="light"
                        style={{
                            padding: 16,
                            background: "#fff",
                            borderRight: "1px solid #f0f0f0",
                        }}
                    >
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
                        <Drawer
                            title={<span style={{ color: "orange" }}>Bộ lọc sản phẩm</span>}
                            placement="left"
                            open={openDrawer}
                            onClose={() => setOpenDrawer(false)}
                            width={280}
                        >
                            {FilterContent}
                        </Drawer>
                    </>
                )}

                {/* Danh sách sản phẩm */}
                <Content style={{ padding: 16 }}>
                    <Spin spinning={loading}>
                        <Row gutter={[16, 16]}>
                            {listProduct.length > 0 ? (
                                listProduct.map((product, index) => (
                                    <Col xs={12} sm={8} md={6} lg={6} xl={4} key={product.id}>
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
                            ) : (
                                <Space
                                    style={{
                                        width: "100%",
                                        height: 300,
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Empty description="Không tìm thấy sản phẩm" />
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

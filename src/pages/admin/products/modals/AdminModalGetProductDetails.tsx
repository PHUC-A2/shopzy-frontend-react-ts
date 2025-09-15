import { Drawer } from 'antd';
import type { IProduct } from '../../../../types/backend';
import { Descriptions, Tag } from "antd";
import dayjs from "dayjs";

interface IProps {
    openAdminModalGetProductDetails: boolean;
    setOpenAdminModalGetProductDetails: (v: boolean) => void;
    product: IProduct | null;
}

const AdminModalGetProductDetails = (props: IProps) => {
    const { openAdminModalGetProductDetails, setOpenAdminModalGetProductDetails, product } = props;
    return (
        <>
            <Drawer
                title="Product Details"
                onClose={() => setOpenAdminModalGetProductDetails(false)}
                open={openAdminModalGetProductDetails}
                placement='right'
                closable={false}
            >
                <Descriptions bordered column={1} size="small">
                    <Descriptions.Item label="ID">{product?.id}</Descriptions.Item>
                    <Descriptions.Item label="Name">{product?.name ?? "N/A"}</Descriptions.Item>
                    <Descriptions.Item label="Description">{product?.description ?? "N/A"}</Descriptions.Item>
                    <Descriptions.Item label="Price">
                        {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product?.price ?? 0)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Stock">{product?.stock ?? 0}</Descriptions.Item>
                    <Descriptions.Item label="Status">
                        {product?.status ? (
                            <Tag color={product.status === "IN_STOCK" ? "green" : "red"}>{product.status}</Tag>
                        ) : (
                            "N/A"
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Condition">{product?.productCondition ?? "N/A"}</Descriptions.Item>
                    <Descriptions.Item label="Image">
                        {product?.imageUrl ? (
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                style={{ maxWidth: 100, display: "block" }}
                            />
                        ) : (
                            "N/A"
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Size">{product?.size ?? "N/A"}</Descriptions.Item>
                    <Descriptions.Item label="Color">{product?.color ?? "N/A"}</Descriptions.Item>

                    {/* Metadata */}
                    <Descriptions.Item label="Created At">
                        {product?.createdAt ? dayjs(product.createdAt).format("DD/MM/YYYY HH:mm:ss") : "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Created By">{product?.createdBy ?? "N/A"}</Descriptions.Item>
                    <Descriptions.Item label="Updated At">
                        {product?.updatedAt ? dayjs(product.updatedAt).format("DD/MM/YYYY HH:mm:ss") : "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Updated By">{product?.updatedBy ?? "N/A"}</Descriptions.Item>
                </Descriptions>
            </Drawer>
        </>
    )
}

export default AdminModalGetProductDetails;
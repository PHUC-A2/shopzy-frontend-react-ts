import { Empty, message, type PopconfirmProps } from "antd";
import { Button, Table } from "react-bootstrap";

import { deleteProducts, getAllProducts, getProductDetails } from "../../../config/Api";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import type { IProduct } from "../../../types/backend";
import { IoIosAddCircle } from "react-icons/io";
import AdminModalAddProduct from "./modals/AdminModalAddProduct";
import AdminModalUpdateProduct from "./modals/AdminModalUpdateProduct";
import AdminModalGetProductDetails from "./modals/AdminModalGetProductDetails";
import { Popconfirm, Space, Tag, Image } from "antd";
import { FaRegEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

// import anh_demo from '../../../assets/shirt-01.png';

const AdminProductPage = () => {

    const [listProduct, setListProduct] = useState<IProduct[]>([]);
    const [openAdminModalAddProduct, setOpenAdminModalAddProduct] = useState<boolean>(false);
    const [openAdminModalUpdateProduct, setOpenAdminModalUpdateProduct] = useState<boolean>(false);
    const [productUpdate, setProductUpdate] = useState<IProduct | null>(null);
    const [openAdminModalGetProductDetails, setOpenAdminModalGetProductDetails] = useState<boolean>(false);
    const [product, setProduct] = useState<IProduct | null>(null);
    // const [imageUrl,setImageUrl] = useState<string>('');

    // chi tiết
    const handleGetProductDetails = async (id: number) => {
        try {
            const res = await getProductDetails(id);
            if (res?.data?.statusCode === 200) {
                setProduct(res?.data?.data);
                setOpenAdminModalGetProductDetails(true);
            }
        } catch (error: any) {
            const m = error?.response?.data?.message ?? "unknown";
            toast.error(
                <div>
                    <div><b>Có lỗi xảy ra!</b></div>
                    <div>{m}</div>
                </div>
            )
        }

    }

    // cập nhật
    const handleUpdateProduct = (product: IProduct) => {
        setProductUpdate(product);
        setOpenAdminModalUpdateProduct(true);
    }

    // xóa 

    const handleDeleteProduct = async (id: number) => {
        try {
            const res = await deleteProducts(id);
            if (res?.data?.statusCode === 200) {
                await fetchAllProducts();
                toast.info('Product deleted successfully')
            }
        } catch (error: any) {
            const m = error?.response?.data?.message ?? "unknown";
            toast.error(
                <div>
                    <div><b>Có lỗi xảy ra!</b></div>
                    <div>{m}</div>
                </div>
            )
        }
    }

    const cancel: PopconfirmProps['onCancel'] = () => {
        message.error('Click on No');
    };


    const fetchAllProducts = async () => {
        try {
            const res = await getAllProducts();
            if (res?.data?.statusCode === 200) {
                setListProduct(res?.data?.data?.result);
                // setImageUrl(anh_demo);
            }
        } catch (error: any) {
            const m = error?.response?.data?.message ?? "unknown";
            toast.error(
                <div>
                    <div><b>Có lỗi xảy ra!</b></div>
                    <div>{m}</div>
                </div>
            )
        }

    }

    useEffect(() => {
        fetchAllProducts();
    }, []);

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h2>Table Product</h2>
                <div>
                    <Button className="d-flex align-items-center"
                        onClick={() => setOpenAdminModalAddProduct(true)}
                        variant="outline-primary"
                    >
                        <IoIosAddCircle /> Add a product
                    </Button>
                </div>
            </div>
            <hr />
            <Table striped bordered hover className="text-center align-middle">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Status</th>
                        <th>Condition</th>
                        <th>Image</th>
                        <th>Size</th>
                        <th>Color</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listProduct.length > 0 ? (
                        listProduct.map((item, index) => (
                            <tr key={item.id}>
                                <td>
                                    <a
                                        href="#"
                                        onClick={() => handleGetProductDetails(item.id)}
                                        style={{ textDecoration: "none" }}
                                    >
                                        {index + 1}
                                    </a>
                                </td>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td style={{ maxWidth: 200, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                    {item.description}
                                </td>
                                <td>
                                    {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    }).format(item.price)}
                                </td>
                                <td>{item.stock}</td>

                                {/* Status */}
                                <td>
                                    {item.status === "IN_STOCK" ? (
                                        <Tag color="green">In Stock</Tag>
                                    ) : (
                                        <Tag color="red">{item.status}</Tag>
                                    )}
                                </td>

                                {/* Condition */}
                                <td>
                                    {item.productCondition === "NEW" ? (
                                        <Tag color="blue">New</Tag>
                                    ) : (
                                        <Tag color="orange">{item.productCondition}</Tag>
                                    )}
                                </td>

                                {/* Image preview */}
                                <td>
                                    {item.imageUrl ? (
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.name}
                                            width={60}
                                            height={60}
                                            style={{ objectFit: "cover", borderRadius: 8 }}
                                        />
                                    ) : (
                                        <Tag color="default">No Image</Tag>
                                    )}
                                </td>

                                <td>{item.size}</td>
                                <td>{item.color}</td>

                                {/* Action */}
                                <td>
                                    <Space>
                                        <Button
                                            variant="outline-success"
                                            onClick={() => handleGetProductDetails(item.id)}
                                        >
                                            <FaRegEye />
                                        </Button>
                                        <Button
                                            variant="outline-dark"
                                            onClick={() => handleUpdateProduct(item)}
                                        >
                                            <CiEdit />
                                        </Button>
                                        <Popconfirm
                                            title="Delete the product"
                                            description="Are you sure to delete this product?"
                                            onConfirm={() => handleDeleteProduct(item.id)}
                                            onCancel={cancel}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <Button variant="outline-danger">
                                                <MdDelete />
                                            </Button>
                                        </Popconfirm>
                                    </Space>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={12} style={{ textAlign: "center", fontStyle: "italic" }}>
                                <Empty />
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            {/* add product */}
            <AdminModalAddProduct
                openAdminModalAddProduct={openAdminModalAddProduct}
                setOpenAdminModalAddProduct={setOpenAdminModalAddProduct}
                fetchAllProducts={fetchAllProducts}
            />

            {/* update product */}
            <AdminModalUpdateProduct
                openAdminModalUpdateProduct={openAdminModalUpdateProduct}
                setOpenAdminModalUpdateProduct={setOpenAdminModalUpdateProduct}
                productUpdate={productUpdate}
                fetchAllProducts={fetchAllProducts}
            />

            {/* get details */}
            <AdminModalGetProductDetails
                openAdminModalGetProductDetails={openAdminModalGetProductDetails}
                setOpenAdminModalGetProductDetails={setOpenAdminModalGetProductDetails}
                product={product}
            />
        </>
    )
}

export default AdminProductPage;
import { message, Popconfirm, type PopconfirmProps } from "antd";
import { Button, Table } from "react-bootstrap";
import { CiEdit } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { deleteProducts, getAllProducts } from "../../../service/Api";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import type { IProduct } from "../../../types/intefaces";
import { IoIosAddCircle } from "react-icons/io";
import AdminModalAddProduct from "./modals/AdminModalAddProduct";
import AdminModalUpdateProduct from "./modals/AdminModalUpdateProduct";

const AdminProductPage = () => {

    const [listProduct, setListProduct] = useState<IProduct[]>([]);
    const [openAdminModalAddProduct, setOpenAdminModalAddProduct] = useState<boolean>(false);
    const [openAdminModalUpdateProduct, setOpenAdminModalUpdateProduct] = useState<boolean>(false);
    const [productUpdate, setProductUpdate] = useState<IProduct | null>(null);

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
            const m = error?.response?.data?.message ?? "unknow";
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
            }
        } catch (error: any) {
            const m = error?.response?.data?.message ?? "unknow";
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
            <Table striped bordered hover className="text-center">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Status</th>
                        <th>Product Condition</th>
                        <th>Image Url</th>
                        <th>Size</th>
                        <th>Color</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {listProduct.length > 0 ? "": ""} */}
                    {listProduct.length > 0 ? listProduct.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index}</td>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                            </td>
                            <td>{item.stock}</td>
                            <td>{item.status}</td>
                            <td>{item.productCondition}</td>
                            <td>{item.imageUrl}</td>
                            <td>{item.size}</td>
                            <td>{item.color}</td>

                            <td style={{ display: "flex", gap: 10, justifyContent: "space-between" }}>

                                <Button variant="outline-success" ><FaRegEye /></Button>
                                <Button variant="outline-dark" onClick={() => handleUpdateProduct(item)}><CiEdit /></Button>

                                <Popconfirm
                                    title="Delete the user"
                                    description="Are you sure to delete this user?"
                                    onConfirm={() => handleDeleteProduct(item.id)}
                                    onCancel={cancel}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button variant="outline-danger"><MdDelete /></Button>
                                </Popconfirm>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={12} style={{ textAlign: 'center', fontStyle: 'italic' }}>
                                Không có dữ liệu
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

            {/* upfate product */}
            <AdminModalUpdateProduct
                openAdminModalUpdateProduct={openAdminModalUpdateProduct}
                setOpenAdminModalUpdateProduct={setOpenAdminModalUpdateProduct}
                productUpdate={productUpdate}
                fetchAllProducts={fetchAllProducts}
            />
        </>
    )
}

export default AdminProductPage;
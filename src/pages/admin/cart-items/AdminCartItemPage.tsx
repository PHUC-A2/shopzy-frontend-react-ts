import { Button, Table } from "react-bootstrap";
import { IoIosAddCircle } from "react-icons/io";
import { getAllCartItems } from "../../../service/Api";
import { useEffect, useState } from "react";
import type { ICartItem } from "../../../types/intefaces";
import { Empty, message, Popconfirm, type PopconfirmProps } from "antd";
import { FaRegEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const AdminCartItemPage = () => {

    const [listCartItems, setListCartItems] = useState<ICartItem[]>([]);

    const fetchAllCartItems = async () => {
        try {
            const res = await getAllCartItems();
            if (res.data.statusCode === 200) {
                setListCartItems(res.data.data.result);
            }
        } catch (error: any) {
            const m = error?.response?.data?.message ?? "unknow";
            toast.error(
                <div>
                    <div><strong>Có lỗi xảy ra!</strong></div>
                    <div>{m}</div>
                </div>
            )
        }
    }

    useEffect(() => {
        fetchAllCartItems();
    }, [])

    const cancel: PopconfirmProps['onCancel'] = () => {
        message.error('Click on No');
    };
    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h2>Table Cart Item</h2>
                <div>
                    <Button className="d-flex align-items-center"
                        variant="outline-primary"
                    // onClick={() => setOpenAdminModalAddCart(true)}
                    >
                        <IoIosAddCircle /> Add a cart item
                    </Button>
                </div>
            </div>
            <hr />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>ID</th>
                        <th>Quantity (Số lượng)</th>
                        <th>Product ID</th>
                        <th>Cart ID</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listCartItems.length > 0 ? listCartItems.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.id}</td>
                            <td>{item.quantity}</td>
                            <td>{item.product?.id}</td>
                            <td>{item.cart?.id}</td>
                            <td style={{ display: "flex", gap: 10, justifyContent: "space-between" }}>
                                <Button variant="outline-success"><FaRegEye /></Button>
                                <Button variant="outline-dark"><CiEdit /></Button>
                                <Popconfirm
                                    title="Delete the cart item"
                                    description="Are you sure to delete this cart item?"
                                    // onConfirm={() => handleDeleteProduct(item.id)}
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
                            <td colSpan={7}>
                                <Empty />
                            </td>
                        </tr>
                    )}


                </tbody>
            </Table>
        </>
    )
}
export default AdminCartItemPage;
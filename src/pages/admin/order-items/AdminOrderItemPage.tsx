import { Button, Table } from "react-bootstrap";
import { IoIosAddCircle } from "react-icons/io";
import { deleteOrderItem, getAllOrderItems, getOrderItemById } from "../../../config/Api";
import { useEffect, useState } from "react";
import type { IOrderItem } from "../../../types/backend";
import { Empty, message, Popconfirm, type PopconfirmProps } from "antd";
import { FaRegEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import AdminModalGetOrderItemDetails from "./modals/AdminModalGetOrderItemDetails";
import AdminModalAddOrderItem from "./modals/AdminModalAddOrderCartItem";
import AdminModalUpdateOrderItem from "./modals/AdminModalUpdateOrderItem";

const AdminOrderItemPage = () => {

    const [listOrderItems, setListOrderItems] = useState<IOrderItem[]>([]);
    const [openAdminModalGetOrderItemDetails, setOpenAdminModalGetOrderItemDetails] = useState<boolean>(false);
    const [orderItem, setOrderItem] = useState<IOrderItem | null>(null);
    const [orderItemUpdate, setOrderItemUpdate] = useState<IOrderItem | null>(null);
    const [openAdminModalAddOrderItem, setOpenAdminModalAddOrderItem] = useState<boolean>(false);
    const [openAdminModalUpdateOrderItem, setOpenAdminModalUpdateOrderItem] = useState<boolean>(false);

    const handleUpdateOrderItem = async (data: IOrderItem) => {
        setOrderItemUpdate(data);
        setOpenAdminModalUpdateOrderItem(true);
    }

    const handleDeleteOrderItem = async (id: number) => {
        try {
            const res = await deleteOrderItem(id);
            if (res?.data?.statusCode === 200) {
                await fetchAllOrderItems();
                toast.success('Đã xóa sản phẩm trong đơn hàng thành công')
            }
        } catch (error: any) {
            const m = error?.response?.data?.error ?? "unknown";
            toast.error(
                <div>
                    <div><strong>Có lỗi xảy ra!</strong></div>
                    <div>{m}</div>
                </div>
            )
        }
    }

    const handleGetOrderItemDetails = async (id: number) => {
        try {
            const res = await getOrderItemById(id);
            if (res?.data?.statusCode === 200) {
                setOrderItem(res.data.data);
                setOpenAdminModalGetOrderItemDetails(true);
            }
        } catch (error: any) {
            const m = error?.response?.data?.message ?? "unknown";
            toast.error(
                <div>
                    <div><strong>Có lỗi xảy ra!</strong></div>
                    <div>{m}</div>
                </div>
            )
        }
    }

    const fetchAllOrderItems = async () => {
        try {
            const res = await getAllOrderItems();
            if (res?.data?.statusCode === 200) {
                setListOrderItems(res.data.data.result);
            }
        } catch (error: any) {
            const m = error?.response?.data?.message ?? "unknown";
            toast.error(
                <div>
                    <div><strong>Có lỗi xảy ra!</strong></div>
                    <div>{m}</div>
                </div>
            )
        }
    }

    useEffect(() => {
        fetchAllOrderItems();
    }, [])

    const cancel: PopconfirmProps['onCancel'] = () => {
        message.error('Click on No');
    };
    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h2>Table Order Item</h2>
                <div>
                    <Button className="d-flex align-items-center"
                        variant="outline-primary"
                        onClick={() => setOpenAdminModalAddOrderItem(true)}
                    >
                        <IoIosAddCircle /> Add a order item
                    </Button>
                </div>
            </div>
            <hr />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Order Item ID</th>
                        <th>Quantity (Số lượng)</th>
                        <th>Unit Price</th>
                        <th>Product ID</th>
                        <th>Order ID</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listOrderItems.length > 0 ? listOrderItems.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.id}</td>
                            <td>{item.quantity}</td>
                            <td>{item.unitPrice}</td>
                            <td>{item.product?.id}</td>
                            <td>{item.order?.id}</td>
                            <td style={{ display: "flex", gap: 10, justifyContent: "space-between" }}>
                                <Button variant="outline-success"
                                    onClick={() => handleGetOrderItemDetails(item.id)}
                                ><FaRegEye /></Button>
                                <Button variant="outline-dark"
                                    onClick={() => handleUpdateOrderItem(item)}
                                ><CiEdit /></Button>
                                <Popconfirm
                                    title="Delete the order item"
                                    description="Are you sure to delete this order item?"
                                    onConfirm={() => handleDeleteOrderItem(item.id)}
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

            {/* modal details */}
            <AdminModalGetOrderItemDetails
                setOpenAdminModalGetOrderItemDetails={setOpenAdminModalGetOrderItemDetails}
                openAdminModalGetOrderItemDetails={openAdminModalGetOrderItemDetails}
                orderItem={orderItem}
            />

            {/* modal add */}
            <AdminModalAddOrderItem
                setOpenAdminModalAddOrderItem={setOpenAdminModalAddOrderItem}
                openAdminModalAddOrderItem={openAdminModalAddOrderItem}
                fetchAllOrderItems={fetchAllOrderItems}
            />

            {/* modal update */}
            <AdminModalUpdateOrderItem
                setOpenAdminModalUpdateOrderItem={setOpenAdminModalUpdateOrderItem}
                openAdminModalUpdateOrderItem={openAdminModalUpdateOrderItem}
                orderItemUpdate={orderItemUpdate}
                fetchAllOrderItems={fetchAllOrderItems}
            />

        </>
    )
}
export default AdminOrderItemPage;
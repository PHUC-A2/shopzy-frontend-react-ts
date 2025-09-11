import { useEffect, useState } from "react";
import { deleteOrder, getAllOrders, getOrderById } from "../../../service/Api";
import { Button, Table } from "react-bootstrap";
import { IoIosAddCircle } from "react-icons/io";
import { message, Popconfirm, type PopconfirmProps } from "antd";
import { CiEdit } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import type { IOrder } from "../../../types/intefaces";
import { toast } from "react-toastify";
import AdminModalAddOrder from "./modals/AdminModalAddOrder";
import AdminModalGetOrderDetails from "./modals/AdminModalGetOrderDetails";
import AdminModalUpdateOrder from "./modals/AdminModalUpdateOrder";

const AdminOrderPage = () => {

    const [listOrder, setListOrder] = useState<IOrder[]>([]);
    const [order, setOrder] = useState<IOrder | null>(null);
    const [orderUpdate, setOrderUpdate] = useState<IOrder | null>(null);
    const [openAdminModalAddOrder, setOpenAdminModalAddOrder] = useState<boolean>(false);
    const [openAdminModalUpdateOrder, setOpenAdminModalUpdateOrder] = useState<boolean>(false);
    const [openAdminModalGetOrderDetails, setOpenAdminModalGetOrderDetails] = useState<boolean>(false);

    const handleUpdateOrder = async (order: IOrder) => {
        setOpenAdminModalUpdateOrder(true);
        setOrderUpdate(order);
    }

    const handleGetOrderDetails = async (order: IOrder) => {
        try {
            const res = await getOrderById(order.id);
            if (res.data.statusCode === 200) {
                setOpenAdminModalGetOrderDetails(true);
                setOrder(order);
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

    const handleDeleteOrder = async (id: number) => {
        try {
            const res = await deleteOrder(id);
            if (res.data.statusCode === 200) {
                await fetchAllOrders();
                toast.success("Đã xóa đơn hàng thành công");
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

    const fetchAllOrders = async () => {
        try {
            const res = await getAllOrders();
            if (res.data.statusCode === 200) {
                setListOrder(res?.data?.data?.result);
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
        fetchAllOrders();
    }, [])

    const cancel: PopconfirmProps['onCancel'] = () => {
        message.error('Click on No');
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h2>Table Order</h2>
                <div>
                    <Button className="d-flex align-items-center"
                        variant="outline-primary"
                        onClick={() => setOpenAdminModalAddOrder(true)}
                    >
                        <IoIosAddCircle /> Add a order
                    </Button>
                </div>
            </div>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>ID</th>
                        <th>Status</th>
                        <th>User</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listOrder.length > 0 ? listOrder?.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.id}</td>
                                <td>{item.status}</td>
                                <td>{item.user?.fullName}</td>
                                <td style={{ display: "flex", gap: 10, justifyContent: "space-between" }}>
                                    <Button className="mr" variant="outline-info" onClick={() => handleGetOrderDetails(item)}><FaRegEye /></Button>
                                    <Button variant="outline-dark" onClick={() => handleUpdateOrder(item)}><CiEdit /></Button>
                                    <Popconfirm
                                        title="Delete the user"
                                        description="Are you sure to delete this cart?"
                                        onConfirm={() => handleDeleteOrder(item.id)}
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
                                <td colSpan={5} style={{ textAlign: 'center', fontStyle: 'italic' }}>
                                    Không có dữ liệu
                                </td>
                            </tr>
                        )
                    }

                </tbody>
            </Table>

            {/* modal add order */}
            <AdminModalAddOrder
                openAdminModalAddOrder={openAdminModalAddOrder}
                setOpenAdminModalAddOrder={setOpenAdminModalAddOrder}
                fetchAllOrders={fetchAllOrders}
            />

            {/* modal detail */}
            <AdminModalGetOrderDetails
                setOpenAdminModalGetOrderDetails={setOpenAdminModalGetOrderDetails}
                openAdminModalGetOrderDetails={openAdminModalGetOrderDetails}
                order={order}
            />

            {/* modal update */}
            <AdminModalUpdateOrder
                openAdminModalUpdateOrder={openAdminModalUpdateOrder}
                setOpenAdminModalUpdateOrder={setOpenAdminModalUpdateOrder}
                orderUpdate={orderUpdate}
                fetchAllOrders={fetchAllOrders}
            />
        </>
    )
}
export default AdminOrderPage;
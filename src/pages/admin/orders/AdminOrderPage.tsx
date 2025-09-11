import { useEffect, useState } from "react";
import { getAllOrders } from "../../../service/Api";
import { Button, Table } from "react-bootstrap";
import { IoIosAddCircle } from "react-icons/io";
import { Popconfirm } from "antd";
import { CiEdit } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import type { IOrder } from "../../../types/intefaces";
import { toast } from "react-toastify";
import AdminModalAddOrder from "./modals/AdminModalAddOrder";

const AdminOrderPage = () => {

    const [listOrder, setListOrder] = useState<IOrder[]>([]);
    const [openAdminModalAddOrder, setOpenAdminModalAddOrder] = useState<boolean>(false);

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
                                    <Button className="mr" variant="outline-info"><FaRegEye /></Button>
                                    <Button variant="outline-dark"><CiEdit /></Button>
                                    <Popconfirm
                                        title="Delete the user"
                                        description="Are you sure to delete this cart?"
                                        // onConfirm={() => handleDeleteCart(item.id)}
                                        // onCancel={cancel}
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
        </>
    )
}
export default AdminOrderPage;
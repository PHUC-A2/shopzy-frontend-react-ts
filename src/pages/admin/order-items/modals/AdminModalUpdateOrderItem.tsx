import { Form, InputNumber, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";
import type { IOrderItem, IUpdateOrderItemReq } from "../../../../types/intefaces";
import { updateOrderItem } from "../../../../service/Api";
import { useEffect } from "react";

interface IProps {
    openAdminModalUpdateOrderItem: boolean;
    setOpenAdminModalUpdateOrderItem: (v: boolean) => void;
    orderItemUpdate: IOrderItem | null;
    fetchAllOrderItems: () => void;
}

const AdminModalUpdateOrderItem = (props: IProps) => {

    const { openAdminModalUpdateOrderItem, setOpenAdminModalUpdateOrderItem, orderItemUpdate, fetchAllOrderItems } = props;
    const [form] = useForm();

    const handleUpdateOrderItem = async (data: IUpdateOrderItemReq) => {

        try {
            const res = await updateOrderItem(data);
            if (res.data.statusCode === 200) {
                await fetchAllOrderItems();
                setOpenAdminModalUpdateOrderItem(false)
                toast.success("Cập nhật sản phẩm trong đơn hàng thành công")
                form.resetFields();
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

    useEffect(() => {
        if (openAdminModalUpdateOrderItem && orderItemUpdate) {
            form.setFieldsValue(orderItemUpdate);
        }
    }, [openAdminModalUpdateOrderItem, orderItemUpdate]);

    return (
        <>
            <Modal
                title="Update a Order Item"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={openAdminModalUpdateOrderItem}
                onOk={() => form.submit()}
                okText="Save"
                maskClosable={false}
                onCancel={() => setOpenAdminModalUpdateOrderItem(false)}
                width={500}
            >
                <Form
                    form={form}
                    onFinish={handleUpdateOrderItem}
                    layout='vertical'
                    autoComplete="off"
                >
                    <Form.Item
                        hidden
                        name="id"
                    >
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item
                        label="Quantity"
                        name="quantity"
                        rules={[{ required: true, message: 'Please input your quantity id!' }]}
                    >
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item
                        label="Unit Price"
                        name="unitPrice"
                        rules={[{ required: true, message: 'Please input your unit price!' }]}
                    >
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>


                    <Form.Item
                        label="Product ID"
                        name={['product', 'id']}
                        rules={[{ required: true, message: 'Please input your product id!' }]}
                    >
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item
                        label="Order ID"
                        name={['order', 'id']}
                        rules={[{ required: true, message: 'Please input your order id!' }]}
                    >
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
export default AdminModalUpdateOrderItem;
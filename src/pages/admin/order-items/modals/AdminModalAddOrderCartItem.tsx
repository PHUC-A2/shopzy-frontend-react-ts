import { Form, InputNumber, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";
import type { ICreateOrderItemReq } from "../../../../types/intefaces";
import { createOrderItem } from "../../../../service/Api";

interface IProps {
    openAdminModalAddOrderItem: boolean;
    setOpenAdminModalAddOrderItem: (v: boolean) => void;
    fetchAllOrderItems: () => void;
}

const AdminModalAddOrderItem = (props: IProps) => {

    const { openAdminModalAddOrderItem, setOpenAdminModalAddOrderItem, fetchAllOrderItems } = props;
    const [form] = useForm();

    const handleAddOrderItem = async (data: ICreateOrderItemReq) => {

        try {
            const res = await createOrderItem(data);
            if (res.data.statusCode === 201) {
                await fetchAllOrderItems();
                setOpenAdminModalAddOrderItem(false)
                toast.success("Thêm mới sản phẩm trong đơn hàng thành công")
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

    return (
        <>
            <Modal
                title="Add a order item"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={openAdminModalAddOrderItem}
                onOk={() => form.submit()}
                okText="Save"
                maskClosable={false}
                onCancel={() => setOpenAdminModalAddOrderItem(false)}
                width={500}
            >
                <Form
                    form={form}
                    onFinish={handleAddOrderItem}
                    layout='vertical'
                    autoComplete="off"
                >
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
export default AdminModalAddOrderItem;
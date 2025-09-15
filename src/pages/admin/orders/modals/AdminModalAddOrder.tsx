
import { Flex, Form, Input, InputNumber, Modal, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { toast } from 'react-toastify';
import type { ICreateOrderReq } from '../../../../types/backend';
import { createOrder } from '../../../../config/Api';

interface IProps {
    openAdminModalAddOrder: boolean;
    setOpenAdminModalAddOrder: (v: boolean) => void;
    fetchAllOrders: () => void;
}

const AdminModalAddOrder = (props: IProps) => {
    const { openAdminModalAddOrder, setOpenAdminModalAddOrder, fetchAllOrders } = props;
    const [form] = useForm();

    const handleAddOrder = async (data: ICreateOrderReq) => {
        try {
            const res = await createOrder(data);
            if (res?.data?.statusCode === 201) {
                await fetchAllOrders();
                setOpenAdminModalAddOrder(false);
                toast.success("New order created successfully")
                form.resetFields();
            }
        } catch (error: any) {
            const m = error?.response?.data?.message ?? "unknown";
            toast.error(
                <div>
                    <div><strong>Có lỗi xảy ra!</strong></div>
                    <div>{m}</div>
                </div>
            );
        }

    }

    return (
        <>
            <Modal
                title="Add a Order"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={openAdminModalAddOrder}
                onOk={() => form.submit()}
                okText="Save"
                maskClosable={false}
                onCancel={() => setOpenAdminModalAddOrder(false)}
                width={1000}
            >
                <Form
                    form={form}
                    onFinish={handleAddOrder}
                    layout='vertical'
                    autoComplete="off"
                // style={{ maxWidth: 900, margin: "0 auto" }} // 👈 căn giữa
                >
                    <Flex justify='space-between' gap={20} style={{ width: "100%" }}>
                        <Flex vertical style={{ flex: 1 }} >
                            <Form.Item
                                label="User ID"
                                name={['user', 'id']}
                                rules={[{ required: true, message: 'Please input your user id!' }]}
                            >
                                <InputNumber style={{ width: "100%" }} />
                            </Form.Item>

                            <Form.Item
                                label="Status"
                                name="status"
                                rules={[{ required: true, message: 'Please input your order status!' }]}
                            >
                                <Select placeholder="Select order status">
                                    <Select.Option value="PENDING">PENDING (Đang xử lý)</Select.Option>
                                    <Select.Option value="SHIPPING">SHIPPING (Đang vận chuyển)</Select.Option>
                                    <Select.Option value="COMPLETED">COMPLETED (Đã hoàn thành)</Select.Option>
                                    <Select.Option value="CANCELLED">CANCELLED (Đã hủy)</Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Payment Method"
                                name="paymentMethod"
                                rules={[{ required: true, message: 'Please input your payment method!' }]}
                            >
                                <Select placeholder="Select payment method">
                                    <Select.Option value="COD">COD (Thanh toán khi nhận hàng)</Select.Option>
                                    <Select.Option value="VNPAY">VNPAY (Thanh toán qua ngân hàng)</Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Payment Status"
                                name="paymentStatus"
                                rules={[{ required: true, message: 'Please input your payment status!' }]}
                            >
                                <Select placeholder="Select payment status">
                                    <Select.Option value="UNPAID">UNPAID (Chưa trả tiền)</Select.Option>
                                    <Select.Option value="PAID">PAID (Đã trả tiền)</Select.Option>
                                </Select>
                            </Form.Item>
                        </Flex>
                        <Flex vertical style={{ flex: 1 }} >
                            <Form.Item
                                label="Total"
                                name="total"
                                rules={[{ required: true, message: 'Please input your total!' }]}
                            >
                                <InputNumber style={{ width: "100%" }} />
                            </Form.Item>

                            <Form.Item
                                label="Shipping Address"
                                name="shippingAddress"
                                rules={[{ required: true, message: 'Please input your shipping address!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Shipping Phone"
                                name="shippingPhone"
                                rules={[{ required: true, message: 'Please input your shipping phone!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Flex>
                    </Flex>
                </Form>
            </Modal>
        </>
    )
}

export default AdminModalAddOrder;
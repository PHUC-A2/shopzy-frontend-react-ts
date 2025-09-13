import { Form, InputNumber, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";
import type { ICreateCartReq } from "../../../../types/intefaces";
import { createCart } from "../../../../service/Api";

interface IProps {
    openAdminModalAddCart: boolean;
    setOpenAdminModalAddCart: (v: boolean) => void;
    fetchAllCarts: () => void;
}

const AdminModalAddCart = (props: IProps) => {

    const { openAdminModalAddCart, setOpenAdminModalAddCart, fetchAllCarts } = props;
    const [form] = useForm();

    const handleAddCart = async (data: ICreateCartReq) => {

        try {
            const res = await createCart(data);
            if (res.data.statusCode === 201) {
                await fetchAllCarts();
                setOpenAdminModalAddCart(false)
                toast.success("Thêm mới giỏ hàng thành công")
                form.resetFields();
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

    return (
        <>
            <Modal
                title="Add a Cart"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={openAdminModalAddCart}
                onOk={() => form.submit()}
                okText="Save"
                maskClosable={false}
                onCancel={() => setOpenAdminModalAddCart(false)}
                width={500}
            >
                <Form
                    form={form}
                    onFinish={handleAddCart}
                    layout='vertical'
                    autoComplete="off"
                >
                    <Form.Item
                        label="User ID"
                        name={['user', 'id']}
                        rules={[{ required: true, message: 'Please input your user id!' }]}
                    >
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
export default AdminModalAddCart;
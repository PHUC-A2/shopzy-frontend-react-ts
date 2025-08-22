// import { useState } from 'react';
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import { createUser } from '../../../../service/Api';
import { Form, Input } from 'antd';
import type { IUser } from '../../../../types/intefaces';

interface IProps {
    openModalAddUser: boolean;
    setOpenModalAddUser: (v: boolean) => void;
    handleGetAllUsers: () => void;
}

const AdminModalAddUser = (props: IProps) => {
    const { openModalAddUser, setOpenModalAddUser, handleGetAllUsers } = props;
    const [form] = Form.useForm();


    const handleAddUser = async (values: IUser) => {
        try {
            const res = await createUser(values.name, values.fullName, values.email, values.password, values.phoneNumber);
            if (res.data.statusCode === 201) {
                await handleGetAllUsers();
                setOpenModalAddUser(false);
                toast.success('New user created successfully')
                form.resetFields(); // dùng để xóa các giá trị sau khi đã submit
                form.setFieldsValue({ name: '', fullName: '', email: '', password: '', phoneNumber: '' });
            }
        } catch (error: any) {
            const m = error?.response?.data?.message ?? "unknow";
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
                title="Create a user"
                maskClosable={false}
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={openModalAddUser}
                okText="Save"
                onOk={() => form.submit()}
                onCancel={() => setOpenModalAddUser(false)}
            >
                <div>
                    <hr />
                    <Form
                        form={form}
                        onFinish={handleAddUser}
                        layout='vertical'
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Full Name"
                            name="fullName"
                            rules={[{ required: true, message: 'Please input your full name!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Please input your email!' },
                                { type: "email", message: 'Email is not valid!' }
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            label="Phone Number"
                            name="phoneNumber"
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    )
}
export default AdminModalAddUser;
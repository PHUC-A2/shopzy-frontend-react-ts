// import { useState } from 'react';
import { Modal, Select } from 'antd';
import { toast } from 'react-toastify';
import { updateUser } from '../../../../service/Api';
import { Form, Input } from 'antd';
import type { IUpdateUserReq, IUser } from '../../../../types/intefaces';
import { useEffect } from 'react';

interface IProps {
    openModalUpdateUser: boolean;
    setOpenModalUpdateUser: (v: boolean) => void;
    handleGetAllUsers: () => void;
    userUpdate: IUser | null;
}

const AdminModalUpdateUser = (props: IProps) => {
    const { openModalUpdateUser, setOpenModalUpdateUser, handleGetAllUsers, userUpdate } = props;
    const [form] = Form.useForm();


    const handleUpdateUser = async (data: IUpdateUserReq) => {
        try {
            const res = await updateUser(data);
            if (res.data.statusCode === 200) {
                toast.success('User updated successfully')
                form.resetFields(); // dùng để xóa các giá trị sau khi đã submit
                handleGetAllUsers();
                setOpenModalUpdateUser(false);

            }
        } catch (error: any) {
            const m = error?.response?.data?.message ?? "unknown";
            toast.error(
                <div>
                    <strong>Có lỗi xảy ra!</strong>
                    <div>{m}</div>
                </div>
            );
        }
    }

    useEffect(() => {
        if (openModalUpdateUser && userUpdate) {
            form.setFieldsValue(userUpdate);
        }
    }, [openModalUpdateUser, userUpdate])
    return (
        <>
            <Modal
                title="Update a user"
                maskClosable={false}
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={openModalUpdateUser}
                okText="Save"
                onOk={() => form.submit()}
                onCancel={() => setOpenModalUpdateUser(false)}
            >
                <div>
                    <hr />
                    <Form
                        form={form}
                        onFinish={handleUpdateUser}
                        layout='vertical'
                        autoComplete="off"
                    >
                        <Form.Item name="id" hidden>
                            <Input type="hidden" />
                        </Form.Item>
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
                            label="Phone Number"
                            name="phoneNumber"
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Status"
                            name="status"
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >
                            <Select placeholder="Select status">
                                <Select.Option value="ACTIVE">ACTIVE</Select.Option>
                                <Select.Option value="INACTIVE">INACTIVE</Select.Option>
                                <Select.Option value="PENDING_VERIFICATION">PENDING_VERIFICATION</Select.Option>
                                <Select.Option value="BANNED">BANNED</Select.Option>
                                <Select.Option value="DELETED">DELETED</Select.Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    )
}
export default AdminModalUpdateUser;
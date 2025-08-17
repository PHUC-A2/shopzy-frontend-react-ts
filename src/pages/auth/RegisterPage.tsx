import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router';
import './Register.scss';
import { GrPhone } from 'react-icons/gr';
import type { IUser } from '../../types/intefaces';
import { register } from '../../service/Api';
import { toast } from 'react-toastify';
import { useState } from 'react';


const RegisterPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleRegister = async (values: IUser) => {
        setIsLoading(true);
        const res = await register(values.name, values.fullName, values.email, values.password, values.phoneNumber);
        setIsLoading(false);
        try {
            if (res?.data?.statusCode === 201) {
                toast.success('Đăng ký tài khoản thành công');
                form.resetFields(); // xóa các gái trị form sau khi submit
                form.setFieldsValue({ name: '', fullName: '', email: '', password: '', phoneNumber: '' });
                setTimeout(() => {
                    navigate('/login') // chuyển sang trang log in sau khi đăng ký
                }, 2000)
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

    };

    return (
        <div className='register-container'>
            <Form
                className='register-from'
                form={form}
                style={{ maxWidth: 460 }}
                onFinish={handleRegister}
            >
                <Form.Item>
                    <Flex justify='center'>
                        <h1>Sign up</h1>
                    </Flex>
                </Form.Item>

                <Form.Item
                    name="name"
                    rules={[
                        { required: true, message: 'Please input your name!' }
                    ]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Name" />
                </Form.Item>

                <Form.Item
                    name="fullName"
                    rules={[
                        { required: true, message: 'Please input your fullName!' }
                    ]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Full name" />
                </Form.Item>

                <Form.Item
                    name="email"
                    rules={[
                        { type: "email", message: 'The input is not valid E-mail!' },
                        { required: true, message: 'Please input your Email!' }
                    ]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Email" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input.Password prefix={<LockOutlined />} type="password" placeholder="Password" />
                </Form.Item>

                <Form.Item
                    name="phoneNumber"
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                    <Input prefix={<GrPhone />} placeholder="Phone number" />
                </Form.Item>

                <Form.Item>
                    <Button type='primary' block htmlType="submit" loading={isLoading}>
                        Register
                    </Button>
                    <Flex className='mt-2' justify='space-between' align='center'>
                        <Link to={"/login"}>Sign in now!</Link>
                        <Link to={"#"}>Forgot password</Link>
                    </Flex>
                </Form.Item>
            </Form>
        </div>
    )
}

export default RegisterPage;;
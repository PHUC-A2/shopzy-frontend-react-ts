import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router';
import './Login.scss';
import type { ILogin } from '../../types/intefaces';
import { login } from '../../service/Api';
import { toast } from 'react-toastify';



const LoginPage = () => {

    const [form] = Form.useForm();
    const natigave = useNavigate();

    const handleLogin = async (values: ILogin) => {
        try {
            const res = await login(values.username, values.password);
            if (res?.data?.statusCode === 200) {
                form.resetFields();
                form.setFieldsValue({ username: '', password: '' });
                natigave('/'); // đăng nhập xong chuyển sang trang /
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
        <div className='login-container'>
            <Form
                form={form}
                className='login-from'
                style={{ maxWidth: 460 }}
                onFinish={handleLogin}
            >
                <Form.Item>
                    <Flex justify='center'>
                        <h1>Sign in</h1>
                    </Flex>
                </Form.Item>
                <Form.Item
                    name="username"
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
                <Form.Item>
                    <Button type='primary' block htmlType="submit">
                        Log in
                    </Button>
                    <Flex className='mt-2' justify='space-between' align='center'>
                        <Link to={"/register"}>Register now!</Link>
                        <Link to={"#"}>Forgot password</Link>
                    </Flex>
                </Form.Item>
            </Form>
        </div>
    )
}
export default LoginPage;
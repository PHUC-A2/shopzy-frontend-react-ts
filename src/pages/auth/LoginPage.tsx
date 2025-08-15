import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input } from 'antd';
import { Link } from 'react-router';
import './Login.scss';

const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
};

const LoginPage = () => {
    return (
        <div className='login-container'>
            <Form
                className='login-from'
                style={{ maxWidth: 460 }}
                onFinish={onFinish}
            >
                <Form.Item>
                    <Flex justify='center'>
                        <h1>Sign in</h1>
                    </Flex>
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
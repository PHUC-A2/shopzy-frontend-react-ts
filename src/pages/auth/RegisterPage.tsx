import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input } from 'antd';
import { Link } from 'react-router';
import './Register.scss';
import { GrPhone } from 'react-icons/gr';

const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
};
const RegisterPage = () => {
    return (
        <div className='register-container'>
            <Form
                className='register-from'
                style={{ maxWidth: 460 }}
                onFinish={onFinish}
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
                    <Button type='primary' block htmlType="submit">
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
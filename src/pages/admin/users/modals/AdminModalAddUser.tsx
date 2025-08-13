// import { useState } from 'react';
import { Input, Modal } from 'antd';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { createUser } from '../../../../service/Api';

interface IProps {
    openModalAddUser: boolean;
    setOpenModalAddUser: (v: boolean) => void;
    handleGetAllUsers: () => void;
}

const AdminModalAddUser = (props: IProps) => {
    const { openModalAddUser, setOpenModalAddUser, handleGetAllUsers } = props;
    const [name, setName] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");


    const handleAddUser = async () => {
        setOpenModalAddUser(false);
        try {
            const res = await createUser(name, fullName, email, password, phoneNumber);
            if (res.data.statusCode === 201) {
                setName("")
                setFullName("")
                setEmail("")
                setPassword("")
                setPhoneNumber("")
                handleGetAllUsers();
                toast.success('Create user successfully')
                console.log(res);
                console.log(res.data.data);
            }
        } catch (error: any) {

            const m = error?.response?.data?.message ?? "unknow";
            toast.error(
                <div>
                    <div>Có lỗi xảy ra !</div>
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
                onOk={() => handleAddUser()}
                onCancel={() => setOpenModalAddUser(false)}
            >
                <div>
                    <div className='mb-3'>
                        <strong>Name:</strong>
                        <Input placeholder="Please enter a name"
                            value={name} onChange={(e) => setName(e.target.value)} allowClear />
                    </div>
                    <div className='mb-3'>
                        <strong>Full Name:</strong>
                        <Input placeholder="Please enter a full name"
                            value={fullName} onChange={(e) => setFullName(e.target.value)} allowClear />
                    </div>
                    <div className='mb-3'>
                        <strong>Email:</strong>
                        <Input placeholder="Please enter a email"
                            value={email} onChange={(e) => setEmail(e.target.value)} allowClear />
                    </div>
                    <div className='mb-3'>
                        <strong>Password:</strong>
                        <Input.Password placeholder="Please enter a password"
                            value={password} onChange={(e) => setPassword(e.target.value)} allowClear />
                    </div>
                    <div className='mb-3'>
                        <strong>Phone Number:</strong>
                        <Input placeholder="Please enter a phone number"
                            value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} allowClear />
                    </div>
                </div>
            </Modal>
        </>
    )
}
export default AdminModalAddUser;
import { Space, Table } from 'antd';
import { getAllUsers } from '../../../service/Api';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { IoMdPersonAdd } from 'react-icons/io';
import { AiFillDelete } from 'react-icons/ai';
import { CiEdit } from 'react-icons/ci';
import { FaRegEye } from 'react-icons/fa';

interface IUsers {
    id: string;
    name: string;
    fullName: string;
    email: string;
}

const AdminUsersPage = () => {

    const [listUsers, setListUser] = useState<IUsers[]>([]);

    const fetchAllUsers = async () => {
        const res = await getAllUsers();
        console.log(res.data.data)
        setListUser(res.data.data)
    }

    useEffect(() => {
        fetchAllUsers();
    }, [])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (text: any) => <a>{text}</a>,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            // render: (text) => <a>{text}</a>,
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <Space size="middle">
                    <Button variant="outline-success"><FaRegEye /></Button>
                    <Button variant="outline-primary"><IoMdPersonAdd /></Button>
                    <Button variant="outline-warning"><CiEdit /></Button>
                    <Button variant="outline-danger"><AiFillDelete /></Button>
                </Space>
            ),
        },
    ];



    return (
        <div className='admin-user-container'>

            <Table
                bordered
                columns={columns}
                dataSource={listUsers}
                rowKey={'id'}
            />
        </div>
    )
}
export default AdminUsersPage;
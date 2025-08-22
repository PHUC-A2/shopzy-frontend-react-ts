import {
    AppstoreOutlined,
    DashboardOutlined,
    MailOutlined,
    UserAddOutlined,
} from '@ant-design/icons';
import type { MenuProps, MenuTheme } from 'antd';
import { Menu } from 'antd';
import { AiOutlineProduct } from 'react-icons/ai';
import { Link } from 'react-router';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    { key: '1', icon: <DashboardOutlined />, label: <Link className='nav-link' to={"/admin"}> Dashboard</Link> },
    { key: '2', icon: <UserAddOutlined />, label: <Link className='nav-link' to={"/admin/users"}> Users</Link> },
    { key: '3', icon: <AiOutlineProduct />, label: <Link className='nav-link' to={"/admin/products"}> Products</Link> },
    {
        key: 'sub1',
        label: 'Navigation One',
        icon: <MailOutlined />,
        children: [
            { key: '5', label: 'Option 5' },
            { key: '6', label: 'Option 6' },
            { key: '7', label: 'Option 7' },
            { key: '8', label: 'Option 8' },
        ],
    },
    {
        key: 'sub2',
        label: 'Navigation Two',
        icon: <AppstoreOutlined />,
        children: [
            { key: '9', label: 'Option 9' },
            { key: '10', label: 'Option 10' },
            {
                key: 'sub3',
                label: 'Submenu',
                children: [
                    { key: '11', label: 'Option 11' },
                    { key: '12', label: 'Option 12' },
                ],
            },
        ],
    },
    {
        key: 'sub4',
        label: 'Navigation Two',
        icon: <AppstoreOutlined />,
        children: [
            { key: '13', label: 'Option 9' },
            { key: '14', label: 'Option 10' },
            {
                key: 'sub5',
                label: 'Submenu',
                children: [
                    { key: '15', label: 'Option 11' },
                    { key: '16', label: 'Option 12' },
                ],
            },
        ],
    },
];

interface IProps {
    collapsed: boolean;
    theme: MenuTheme;
}

const AdminSidebar = (props: IProps) => {

    const { collapsed, theme } = props;
    return (
        <div className='admin-sidebar-menu'
            style={{
                width: collapsed ? '80px' : '256px'
            }}
        >
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['1']}
                mode="inline"
                theme={theme}
                inlineCollapsed={collapsed}
                items={items}
            />
        </div>
    )
}
export default AdminSidebar;
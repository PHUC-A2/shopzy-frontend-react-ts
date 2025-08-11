import { useState } from 'react';
import {
    PieChartOutlined,
    ProductOutlined,
} from '@ant-design/icons';
import type { MenuProps, MenuTheme } from 'antd';
import { Button, Menu, Switch } from 'antd';
import './AdminPage.scss'
import { RiCollapseHorizontalLine } from 'react-icons/ri';
import { MdOutlineFeaturedPlayList } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa';
import { FaReact } from 'react-icons/fa6';
type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    { key: 'title', icon: <FaReact className='admin-sidebar-icon-1' />, label: 'Hồ Ka IT' },
    { key: '1', icon: <PieChartOutlined />, label: 'Dashboard' },
    {
        key: 'sub1',
        label: 'Feature (Chức năng) ',
        icon: <MdOutlineFeaturedPlayList />,
        children: [
            { key: '2', icon: <FaUsers />, label: 'Quản lý Users (ND)' },
            { key: '3', icon: <ProductOutlined />, label: 'Quản lý Producte (SP)' },
        ],
    },
];
const AdminPage = () => {
    const [collapsed, setCollapsed] = useState(true);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const [theme, setTheme] = useState<MenuTheme>('dark');
    const changeTheme = (value: boolean) => {
        setTheme(value ? 'dark' : 'light');
    };

    return (
        <div className='admin-container'>
            <div className='admin-sidebar-container'>
                <div className='admin-sidebar-menu'
                    style={{
                        width: collapsed ? '80px' : '256px'
                    }}
                >
                    <Menu
                        defaultSelectedKeys={['title']}
                        defaultOpenKeys={['title']}
                        mode="inline"
                        theme={theme}
                        inlineCollapsed={collapsed}
                        items={items}
                    />

                </div>
            </div>
            <div className='admin-main-container'>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Button type='primary' onClick={toggleCollapsed}>
                        {collapsed ? <RiCollapseHorizontalLine /> : <RiCollapseHorizontalLine />}
                    </Button>

                    <Switch
                        checked={theme === 'dark'}
                        onChange={changeTheme}
                        checkedChildren="Dark"
                        unCheckedChildren="Light"
                    />
                </div>

                <h1>
                    Nội dung bên trái
                </h1>
            </div>
        </div>
    )
}
export default AdminPage;
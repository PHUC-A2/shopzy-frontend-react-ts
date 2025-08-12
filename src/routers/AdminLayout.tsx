import AdminSidebar from '../components/admin/AdminSidebar';
import { Outlet } from 'react-router';
import { Button, Switch, type MenuTheme } from 'antd';
import { RiCollapseHorizontalLine } from 'react-icons/ri';
import { useState } from 'react';

const AdminLayout = () => {

    const [collapsed, setCollapsed] = useState<boolean>(true);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const [theme, setTheme] = useState<MenuTheme>('dark');

    const changeTheme = (value: boolean) => {
        setTheme(value ? 'dark' : 'light');
    };

    return (
        <div className="admin-layout-container">
            <div className="admin-sidebar-container">
                <AdminSidebar
                    collapsed={collapsed}
                    theme={theme}
                />
            </div>
            <div className="admin-main-container">
                <div className='admin-main-action'>
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
                <div className='admin-main-outlet'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
export default AdminLayout;
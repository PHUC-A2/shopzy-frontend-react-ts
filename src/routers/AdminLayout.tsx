import AdminSidebar from '../components/admin/AdminSidebar';
import { Outlet } from 'react-router';
import { Button } from 'antd';
import { RiCollapseHorizontalLine } from 'react-icons/ri';
import { useState } from 'react';

const AdminLayout = () => {

    const [collapsed, setCollapsed] = useState<boolean>(true);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    return (
        <div className="admin-layout-container">
            <div className="admin-sidebar-container">
                <AdminSidebar
                    collapsed={collapsed}
                />
            </div>
            <div className="admin-main-container">
                <div className='admin-main-action'>
                    <Button type='primary' onClick={toggleCollapsed}>
                        {collapsed ? <RiCollapseHorizontalLine /> : <RiCollapseHorizontalLine />}
                    </Button>
                </div>
                <div className='admin-main-outlet'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
export default AdminLayout;
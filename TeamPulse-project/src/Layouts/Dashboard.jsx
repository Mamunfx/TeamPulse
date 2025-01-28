import React, { useContext } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import { AuthContext } from '../AuthProvider';

const Dashboard = () => {
    const { userData } = useContext(AuthContext);
    const location = useLocation();
    const role = userData?.role;

    const getFirstRoute = () => {
        if (role === 'hr') {
            return '/Dashboard/EmployeeList';
        } else if (role === 'admin') {
            return '/Dashboard/allEmployee';
        } else {
            return '/Dashboard/WorkSheet';
        }
    };

    const firstRoute = getFirstRoute();

    return (
        <div className="grid grid-cols-1 md:grid-cols-4">
            <div className="hidden md:block md:col-span-1">
                <Sidebar />
            </div>
            <div className="col-span-1 md:col-span-3">
                {location.pathname === '/Dashboard' && <Navigate to={firstRoute} replace />}
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;

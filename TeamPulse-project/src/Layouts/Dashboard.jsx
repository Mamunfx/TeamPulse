import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';

const Dashboard = () => {
    return (
        <div className='grid grid-cols-4'>
            <div className='col-span-1'>
            <Sidebar></Sidebar>
            </div>
            <Outlet></Outlet>
        </div>
    );
};

export default Dashboard;
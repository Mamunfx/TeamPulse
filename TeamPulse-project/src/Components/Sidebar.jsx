import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div>
            <div className='flex flex-col h-full bg-gray-800 w-64'>
                
                <div className='flex flex-col p-4'>
                    <Link to='/' className='py-2 px-4 bg-gray-900 text-white rounded-lg my-2'>Home</Link>
                    <Link to='/Dashboard/WorkSheet' className='py-2 px-4 bg-gray-900 text-white rounded-lg my-2'>Work Sheet</Link>
                    <Link to='/Dashboard/PayHistory' className='py-2 px-4 bg-gray-900 text-white rounded-lg my-2'>Payment History</Link>
                    <Link to='/Dashboard/EmployeeList' className='py-2 px-4 bg-gray-900 text-white rounded-lg my-2'>Employee List</Link>
                    <Link to='/Dashboard/Progress' className='py-2 px-4 bg-gray-900 text-white rounded-lg my-2'>Progress</Link>
                    <Link to='/Dashboard/allEmployee' className='py-2 px-4 bg-gray-900 text-white rounded-lg my-2'>allEmployee</Link>
                    <Link to='/Dashboard/Payroll' className='py-2 px-4 bg-gray-900 text-white rounded-lg my-2'>Payroll</Link>
                    
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
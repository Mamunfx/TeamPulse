import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './../AuthProvider';
import LoadingState from './LoadingState';

const Sidebar = () => {
    const { userData } = useContext(AuthContext);

    if (!userData) {
        return <LoadingState></LoadingState>;
    }

    return (
        <div>
            <div className="flex flex-col h-full min-h-screen bg-gray-800 w-64">
                <div className="flex flex-col p-4">
                    <Link to="/" className="py-2 px-4 bg-gray-900 text-white rounded-lg my-2">
                        Home
                    </Link>

                    {userData?.role === 'employee' && (
                        <>
                            <Link to="/Dashboard/WorkSheet" className="py-2 px-4 bg-gray-900 text-white rounded-lg my-2">
                                Work Sheet
                            </Link>
                            <Link to="/Dashboard/PayHistory" className="py-2 px-4 bg-gray-900 text-white rounded-lg my-2">
                                Payment History
                            </Link>
                        </>
                    )}

                    {userData?.role === 'hr' && (
                        <>
                            <Link to="/Dashboard/EmployeeList" className="py-2 px-4 bg-gray-900 text-white rounded-lg my-2">
                                Employee List
                            </Link>
                            <Link to="/Dashboard/Progress" className="py-2 px-4 bg-gray-900 text-white rounded-lg my-2">
                                Progress
                            </Link>
                        </>
                    )}

                    {userData?.role === 'admin' && (
                        <>
                            <Link to="/Dashboard/allEmployee" className="py-2 px-4 bg-gray-900 text-white rounded-lg my-2">
                                All Employees
                            </Link>
                            <Link to="/Dashboard/Payroll" className="py-2 px-4 bg-gray-900 text-white rounded-lg my-2">
                                Payroll
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

import React from 'react';
import "daisyui";

const hrTasks = [
    { task: "Monitor employee workflow updates", status: "Ongoing" },
    { task: "Review and approve salary payments", status: "Pending" },
    { task: "Update employee contracts", status: "Completed" },
];

const HRTaskCard = ({ task, status }) => (
    <div className="p-4 shadow-lg rounded-lg m-2 bg-white">
        <p className="text-lg font-bold">{task}</p>
        <p className={`mt-2 ${status === 'Completed' ? 'text-green-500' : status === 'Pending' ? 'text-yellow-500' : 'text-blue-500'}`}>
            Status: {status}
        </p>
    </div>
);

const HRDashboard = () => {
    return (
        <div className="my-8">
            <h2 className="text-3xl font-bold text-center mb-4">HR Management Dashboard</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {hrTasks.map((task, index) => (
                    <HRTaskCard
                        key={index}
                        task={task.task}
                        status={task.status}
                    />
                ))}
            </div>
        </div>
    );
};

export default HRDashboard;

import React from 'react';
import "daisyui";

const workflows = [
    { user: "John Doe", update: "Completed the client report and submitted it to the manager.", timestamp: "2025-01-28 14:00" },
    { user: "Jane Smith", update: "Reviewed the project requirements and started the initial design.", timestamp: "2025-01-28 12:30" },
    { user: "Michael Johnson", update: "Resolved bugs in the user authentication module.", timestamp: "2025-01-28 11:00" },
];

const WorkflowCard = ({ user, update, timestamp }) => (
    <div className="p-4 shadow-lg rounded-lg m-2 bg-white">
        <p className="text-lg font-bold">{user}</p>
        <p className="mt-2">{update}</p>
        <p className="mt-2 text-sm text-gray-500">Updated at: {timestamp}</p>
    </div>
);

const WorkflowUpdates = () => {
    return (
        <div className="my-8">
            <h2 className="text-3xl font-bold text-center mb-4">Employee Workflow Updates</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {workflows.map((workflow, index) => (
                    <WorkflowCard
                        key={index}
                        user={workflow.user}
                        update={workflow.update}
                        timestamp={workflow.timestamp}
                    />
                ))}
            </div>
        </div>
    );
};

export default WorkflowUpdates;

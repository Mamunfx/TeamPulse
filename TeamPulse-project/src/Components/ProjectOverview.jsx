import React from 'react';
import "daisyui";

const features = [
    {
        icon: "💼",
        title: "Employee Workflow Monitoring",
        description: "Keep track of employee workload and task updates in real-time.",
    },
    {
        icon: "💸",
        title: "Salary & Payments Management",
        description: "Easily manage salary disbursement and financial records.",
    },
    {
        icon: "📄",
        title: "Contract Management",
        description: "Efficiently manage employee contracts and related documentation.",
    },
    {
        icon: "📈",
        title: "Productivity Tracking",
        description: "Monitor team productivity with progress indicators.",
    },
    {
        icon: "🔔",
        title: "HR Notifications",
        description: "Stay informed with important updates and notifications from HR.",
    },
];

const FeatureCard = ({ icon, title, description }) => (
    <div className="p-6 shadow-lg rounded-lg m-4 bg-white transform transition-transform hover:scale-105 hover:shadow-xl flex flex-col items-center text-center">
        <div className="text-5xl mb-4">{icon}</div>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p>{description}</p>
        <div className="mt-4 w-16 h-1 bg-blue-500 rounded-full"></div>
    </div>
);

const ProjectOverview = () => {
    return (
        <div className="my-12">
            <h2 className="text-4xl font-bold text-center mb-6">Why Choose Our Solution?</h2>
            <p className="text-center mb-10 text-gray-600">
                Our platform is designed to streamline your company's HR operations and enhance productivity. Here’s what we offer:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <FeatureCard
                        key={index}
                        icon={feature.icon}
                        title={feature.title}
                        description={feature.description}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProjectOverview;

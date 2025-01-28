import React from 'react';
import "daisyui";

const data = [
    {
        title: "Employee Satisfaction",
        value: "85%",
        description: "Employees are satisfied with their work environment and opportunities.",
        icon: "😊",
        color: "bg-green-500",
    },
    {
        title: "Project Completion Rate",
        value: "92%",
        description: "Projects are completed on time and within budget.",
        icon: "📈",
        color: "bg-blue-500",
    },
    {
        title: "Company Growth",
        value: "150%",
        description: "The company has grown significantly over the past year.",
        icon: "📊",
        color: "bg-purple-500",
    },
    {
        title: "Client Retention",
        value: "95%",
        description: "Clients are happy with our services and continue to work with us.",
        icon: "💼",
        color: "bg-yellow-500",
    },
];

const InfoCard = ({ title, value, description, icon, color }) => (
    <div className={`p-6 shadow-lg rounded-lg m-4 text-white flex flex-col items-center text-center transform transition-transform hover:scale-105 hover:shadow-xl ${color}`}>
        <div className="text-5xl mb-4">{icon}</div>
        <h3 className="text-3xl font-bold mb-2">{title}</h3>
        <p className="text-4xl font-semibold">{value}</p>
        <p className="mt-2">{description}</p>
        <div className="mt-4 w-16 h-1 bg-white rounded-full"></div>
    </div>
);

const DynamicInfographic = () => {
    return (
        <div className="my-12">
            <h2 className="text-4xl font-bold text-center mb-6">Key Highlights</h2>
            <p className="text-center mb-10 text-gray-600">
                Discover the key statistics and highlights that define our company's success and commitment to excellence.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {data.map((item, index) => (
                    <InfoCard
                        key={index}
                        title={item.title}
                        value={item.value}
                        description={item.description}
                        icon={item.icon}
                        color={item.color}
                    />
                ))}
            </div>
        </div>
    );
};

export default DynamicInfographic;

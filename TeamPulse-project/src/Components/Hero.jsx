import React from 'react';

const Hero = () => {
    return (
        <div>
            <div className="hero bg-base-200 min-h-screen flex items-center">
                <div className="hero-content flex-col lg:flex-row-reverse w-11/12">
                    <div className="max-w-md">
                        <img 
                            src="https://i.ibb.co/j64RZDf/10314646.jpg" 
                            alt="TeamPulse" 
                            className="w-full rounded-lg shadow-2xl lg:animate-circular-bounce" // Apply animation only on large screens
                        />
                    </div>
                    <div className="text-left lg:mr-10">
                        <h1 className="text-5xl font-bold">Welcome to TeamPulse</h1>
                        <p className="py-6">
                            TeamPulse is your ultimate team collaboration platform, designed to streamline your workflow and enhance productivity. Manage projects, communicate effortlessly, and achieve your goals with TeamPulse.
                        </p>
                        <button className="btn btn-info">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;

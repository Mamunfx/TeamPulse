import React from 'react';
import Hero from './../Components/Hero';
import ProductList from '../Components/ProductList';
import TestimonialSlider from '../Components/TestimonialSlider';
import WorkflowUpdates from '../Components/Workflowupdates';
import HRDashboard from './../Components/HrDashboard';
import ProjectOverview from '../Components/ProjectOverview';
import DynamicInfographic from './../Components/DynamicInfographic';
import FAQSection from '../Components/FAQsection';

const Home = () => {
    return (
        <div className='space-y-16'>
            <Hero></Hero>
            <ProductList></ProductList>
            <h1 className='text-3xl text-center my-8 p-4 rounded-lg shadow-2xl lg:w-1/3 lg:mx-auto bg-base-200'>See what our users says </h1>
            <TestimonialSlider></TestimonialSlider>
            <DynamicInfographic></DynamicInfographic>
            <ProjectOverview></ProjectOverview>
            <FAQSection></FAQSection>
        </div>
    );
};

export default Home;
import React from 'react';
import "daisyui";

const testimonials = [
    { user: "John Doe", comment: "This service is amazing! Highly recommended.", rating: 5 },
    { user: "Jane Smith", comment: "Great experience, will use again.", rating: 4 },
    { user: "Michael Johnson", comment: "Satisfied with the quality and support.", rating: 4 },
    { user: "Emma Brown", comment: "Exceeded my expectations!", rating: 5 },
    { user: "Sarah Lee", comment: "Fantastic product and service.", rating: 5 },
    { user: "David Kim", comment: "Will definitely recommend to others.", rating: 4 },
    { user: "Anna White", comment: "Very happy with the results.", rating: 5 },
    { user: "Mark Wilson", comment: "Professional and reliable.", rating: 4 },
    { user: "Sophia Garcia", comment: "Truly outstanding service.", rating: 5 },
    { user: "Daniel Martinez", comment: "Impressive and efficient.", rating: 4 },
    { user: "Mia Hernandez", comment: "I'm extremely satisfied.", rating: 5 },
    { user: "James Clark", comment: "Exceptional quality.", rating: 4 },
];

const TestimonialCard = ({ user, comment, rating }) => (
    <div className="p-4 shadow-lg rounded-lg m-2 bg-white">
        <p className="text-lg font-bold">{user}</p>
        <p className="mt-2">{comment}</p>
        <p className="mt-2">Rating: {rating} ⭐</p>
    </div>
);

const TestimonialSlider = () => {
    return (
        <div className="carousel w-full ">
             
            <div id="slide1" className="carousel-item relative w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                    {testimonials.slice(0, 3).map((testimonial, index) => (
                        <TestimonialCard
                            key={index}
                            user={testimonial.user}
                            comment={testimonial.comment}
                            rating={testimonial.rating}
                        />
                    ))}
                </div>
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide4" className="btn btn-circle">❮</a>
                    <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                    {testimonials.slice(3, 6).map((testimonial, index) => (
                        <TestimonialCard
                            key={index}
                            user={testimonial.user}
                            comment={testimonial.comment}
                            rating={testimonial.rating}
                        />
                    ))}
                </div>
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide1" className="btn btn-circle">❮</a>
                    <a href="#slide3" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                    {testimonials.slice(6, 9).map((testimonial, index) => (
                        <TestimonialCard
                            key={index}
                            user={testimonial.user}
                            comment={testimonial.comment}
                            rating={testimonial.rating}
                        />
                    ))}
                </div>
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide2" className="btn btn-circle">❮</a>
                    <a href="#slide4" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide4" className="carousel-item relative w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                    {testimonials.slice(9, 12).map((testimonial, index) => (
                        <TestimonialCard
                            key={index}
                            user={testimonial.user}
                            comment={testimonial.comment}
                            rating={testimonial.rating}
                        />
                    ))}
                </div>
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide3" className="btn btn-circle">❮</a>
                    <a href="#slide1" className="btn btn-circle">❯</a>
                </div>
            </div>
        </div>
    );
};

export default TestimonialSlider;

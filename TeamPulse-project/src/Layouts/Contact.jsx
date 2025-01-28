import React from 'react';

const Contact = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-3xl font-semibold mb-4">Our Address</h2>
        <p className='text-2xl'>1234 Elm Street</p>
        <p className='text-2xl'>Dhaka, Bangladesh</p>
        <p className='text-2xl'>Phone: +880 1234 567890</p>
        <p className='text-2xl'> Email: info@company.com</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Your Email"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text">Message</span>
            </label>
            <textarea
              placeholder="Your Message"
              className="textarea textarea-bordered w-full"
              rows="5"
              required
            />
          </div>
          <div className="form-control md:col-span-2">
            <button type="submit" className="btn w-full">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;

import React, { useContext, useState } from "react";
import { AuthContext } from './../AuthProvider';

const Register = () => {
  const { createNewUser, handleGoogleSignIn, notify, notifyError } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    bank_account_no: '',
    salary: '',
    designation: '',
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, photo } = formData;
    if (email && password) {
      createNewUser(email, password, photo)
        .then(() => {
          notify("Registered successfully!");
        })
        .catch((error) => notifyError(error.message));
    }
  };

  return (
    <div>
      <div className="hero bg-blue-50 min-h-fit rounded-lg py-24">
        <div className="hero-content flex-col lg:flex-row-reverse gap-16">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6 lg:w-3/4">
              Join and explore our hundreds of queries about thousands of products! We ensure you the best buying suggestions and make sure you get the right product for your need!
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Bank Account No</span>
                </label>
                <input
                  type="text"
                  placeholder="bank account number"
                  className="input input-bordered"
                  name="bank_account_no"
                  value={formData.bank_account_no}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Salary</span>
                </label>
                <input
                  type="number"
                  placeholder="salary"
                  className="input input-bordered"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Designation</span>
                </label>
                <input
                  type="text"
                  placeholder="Designation"
                  className="input input-bordered"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo</span>
                </label>
                <input
                  type="file"
                  className="input input-bordered"
                  name="photo"
                  accept="image/*"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn bg-blue-300">
                  Sign In
                </button>
              </div>
              <button
                type="button"
                className="submit btn bg-blue-300 w-full"
                onClick={handleGoogleSignIn}
              >
                <div className="flex gap-2 items-center">
                  <p>Google</p>
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

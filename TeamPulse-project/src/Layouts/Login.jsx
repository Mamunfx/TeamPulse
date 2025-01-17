import React from "react";
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div className="hero bg-blue-50 min-h-fit rounded-lg py-24">
        <div className="hero-content flex-col lg:flex-row-reverse gap-16">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign in now!</h1>
            <p className="py-6 lg:w-3/4">
              Join and explore our hundreds of query about thousands of products! We ensure you the best buying suggestion and make sure you get the right product for your need!
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && <p className="error-message">{errors.email.message}</p>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  {...register("password", { required: "Password is required" })}
                />
                {errors.password && <p className="error-message">{errors.password.message}</p>}
                <label className="label">
                  <Link to="/Register">
                    Don't have an account?
                    <span className="text-blue-300 font-semibold"> Sign up</span>
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn bg-blue-300">
                  Sign In
                </button>
              </div>
              <button
                type="button"
                className="submit btn bg-blue-300 w-full"
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

export default Login;

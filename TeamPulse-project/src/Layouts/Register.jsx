import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "./../AuthProvider";
import { uploadImage } from "./../Utilities/utils";
import SocialLogin from "../Components/Social";
import axios from 'axios';

const Register = () => {
  const { notifyError, updateUserProfile, createNewUser, userLogin } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    bank_account_no: '',
    salary: '',
    designation: '',
    photo: null,
    role: 'employee',
    isVerified: 'false',
    isFired: 'false',
    name: '',
  });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, ...formDataWithoutPassword } = formData;
    let newErrors = [];

    if (!formData.name) newErrors.push("Name is required");
    if (!email) newErrors.push("Email is required");
    if (!password) newErrors.push("Password is required");
    if (!formData.bank_account_no) newErrors.push("Bank account number is required");
    if (!formData.salary) newErrors.push("Salary is required");
    if (!formData.designation) newErrors.push("Designation is required");
    if (!formData.photo) newErrors.push("Photo is required");

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      let photoUrl = "";
      if (formData.photo && typeof formData.photo !== 'string') {
        photoUrl = await uploadImage(formData.photo);
        console.log("Photo uploaded:", photoUrl);
      } else {
        photoUrl = formData.photo;
      }

      if (email && password) {
        const userCredential = await createNewUser(email, password);
        if (!userCredential || !userCredential.user) {
          throw new Error("Failed to create user");
        }
        console.log("User created:", userCredential.user);

        await updateUserProfile({
          displayName: formData.name,
          photoURL: photoUrl,
        });
        console.log("User profile updated");

        const dataToSend = {
          ...formDataWithoutPassword,
          email: email, // Ensure email is sent in the data payload
          photo: photoUrl
        };
        console.log("Sending data to backend:", dataToSend);

        const dbResponse = await axios.post(`${import.meta.env.VITE_API_URL}/users/${email}`, dataToSend);
        console.log("User added to database:", dbResponse.data);

        // Log the user in after successful registration and profile update
        await userLogin(email, password);
        console.log("User logged in");

        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      notifyError(error.message);
      newErrors.push(error.message);
      setErrors(newErrors);
      alert("Registration failed: " + error.message);
    }
  };

  return (
    <div className="min-h-fit rounded-lg py-24 bg-blue-50">
      <div className="flex-col gap-16 w-full hero-content">
        <div className="text-center lg:text-left w-full ml-4">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6 lg:w-3/4">
            Join and explore our hundreds of queries about thousands of products! We ensure you the best buying suggestions and make sure you get the right product for your need!
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-4xl shadow-2xl">
          <form className="grid gap-4 card-body grid-cols-1 md:grid-cols-1 lg:grid-cols-2" onSubmit={handleSubmit}>
            <div className="form-control col-span-2 lg:col-span-1">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                className="input input-bordered"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control col-span-2 lg:col-span-1">
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
            <div className="form-control col-span-2 lg:col-span-1">
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
            <div className="form-control col-span-2 lg:col-span-1">
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
            <div className="form-control col-span-2 lg:col-span-1">
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
            <div className="form-control col-span-2 lg:col-span-1">
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
            <div className="form-control col-span-2 lg:col-span-1">
              <label className="label">
                <span className="label-text">Role</span>
              </label>
              <select
                name="role"
                className="input input-bordered"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="employee">Employee</option>
                <option value="hr">HR</option>
              </select>
            </div>
            <div className="form-control col-span-2 lg:col-span-1">
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
            <div className="form-control mt-6 col-span-2 ">
              <button type="submit" className="w-full btn bg-blue-300">
                Register
              </button>
              <SocialLogin />
            </div>
            {errors.length > 0 && (
              <div className="form-control mt-6 col-span-2">
                <div className="shadow-lg alert alert-error">
                  <div>
                    <span>
                      {errors.map((error, index) => (
                        <div key={index}>{error}</div>
                      ))}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "./../AuthProvider";
import { uploadImage } from "./../Utilities/utils";

const Register = () => {
  const { handleGoogleSignIn, notify, notifyError, updateUserProfile,createNewUser} = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    bank_account_no: '',
    salary: '',
    designation: '',
    photo: null,
    role: 'employee', 
    name: '',
  });

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

  const handleGoogleSignInClick = async () => {
    try {
      const result = await handleGoogleSignIn();
      if (result) {
        const { email, displayName, photoURL } = result.user;
        setFormData(prevData => ({
          ...prevData,
          email,
          name: displayName,
          photo: photoURL,
        }));
        notify("Signed in with Google successfully!");
        navigate(from, { replace: true });
      }
    } catch (error) {
      notifyError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, ...formDataWithoutPassword } = formData;
    console.log(formDataWithoutPassword);
    try {
      let photoUrl = "";
      if (formData.photo && typeof formData.photo !== 'string') {
        photoUrl = await uploadImage(formData.photo);
      } else {
        photoUrl = formData.photo;
      }
      if (formData.email && password) {
        await createNewUser(formData.email, password);
        await updateUserProfile({ displayName: formData.name, photoURL: photoUrl, ...formDataWithoutPassword });
        notify("Registered successfully!");
        navigate(from, { replace: true });
      }
    } catch (error) {
      notifyError(error.message);
    }

  };
  
  return (
    <div className="hero bg-blue-50 min-h-fit rounded-lg py-24">
      <div className="hero-content flex-col gap-16 w-full">
        <div className="text-center lg:text-left w-full">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6 lg:w-3/4">
            Join and explore our hundreds of queries about thousands of products! We ensure you the best buying suggestions and make sure you get the right product for your need!
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-4xl shadow-2xl">
          <form className="card-body grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <div className="form-control">
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
            <div className="form-control mt-6 col-span-2">
              <button type="submit" className="btn bg-blue-300 w-full">
                Register
              </button>
            </div>
            <div className="form-control mt-6 col-span-2">
              <button
                type="button"
                className="btn bg-blue-300 w-full"
                onClick={handleGoogleSignInClick}
              >
                <div className="flex gap-2 items-center">
                  <p>Google</p>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

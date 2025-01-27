import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmployeeTable = ({ allemployees = [] }) => {
  const [employees, setEmployees] = useState(allemployees);
  const [showModal, setShowModal] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [salary, setSalary] = useState('');

  const toggleVerification = async (email, currentStatus) => {
    const newStatus = currentStatus === "false" ? "true" : "false";
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/${email}`,
        { isVerified: newStatus },
        { withCredentials: true }
      );
      const updatedEmployees = employees.map(employee =>
        employee.email === email ? { ...employee, isVerified: newStatus } : employee
      );
      setEmployees(updatedEmployees);
    } catch (error) {
      console.error('Error updating verification status:', error.response ? error.response.data.message : error.message);
    }
  };

  const openModal = (employee) => {
    setCurrentEmployee(employee);
    setSalary(employee.salary);
    setMonth('');  
    setYear('');  
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleConfirm = async () => {
    const payReq = {
      name: currentEmployee.name,
      salary,
      month,
      year,
      isPaid: "false",
      email: currentEmployee.email
    };
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/payReq`, payReq, {
        withCredentials: true
      });
      console.log('Pay request successful:', response.data);
      closeModal();
      alert('Pay request submitted successfully!');
    } catch (error) {
      console.error('Error submitting pay request:', error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Designation</th>
              <th>Verify</th>
              <th>Pay</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{employee.name}</td>
                <td>{employee.designation}</td>
                <td>
                  <button
                    className={employee.isVerified === "false" ? 'btn btn-warning' : 'btn btn-success'}
                    onClick={() => toggleVerification(employee.email, employee.isVerified)}
                  >
                    {employee.isVerified === "false" ? 'Unverified' : 'Verified'}
                  </button>
                </td>
                <td>
                  <button
                    className={employee.isVerified === "false" ? 'btn disabled' : 'btn btn-success'}
                    onClick={() => employee.isVerified !== "false" && openModal(employee)}
                    disabled={employee.isVerified === "false"}
                  >
                    Pay Request
                  </button>
                </td>
                <td><Link className='btn ' to={`/Dashboard/details/${employee.email}`}>Details</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50" onClick={closeModal}></div>
          <div className="bg-white rounded-lg p-8 z-50 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Pay Request</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Salary</label>
                <input
                  type="text"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Month</label>
                <input
                  type="text"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Year</label>
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={handleConfirm} className="btn btn-success">Confirm</button>
                <button type="button" onClick={closeModal} className="btn btn-secondary ml-2">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;

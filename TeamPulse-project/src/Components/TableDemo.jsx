import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { MdBlock } from "react-icons/md";
import { FcApproval } from "react-icons/fc";

const TableDemo = ({ allemployees = [] }) => {
  const [employees, setEmployees] = useState(allemployees);
  const [showFireModal, setShowFireModal] = useState(false);
  const [showHRModal, setShowHRModal] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState('');
  const [viewMode, setViewMode] = useState('table');

  const handleFire = async (email) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/users/${email}`, {
        isFired: "true"
      }, {
        withCredentials: true
      });

      if (response.status === 200) {
        setEmployees((prevEmployees) =>
          prevEmployees.map((emp) =>
            emp.email === email ? { ...emp, isFired: "true" } : emp
          )
        );
        alert('Employee has been successfully fired!');
      } else {
        console.error('Failed to fire employee');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleHR = async (email, currentRole) => {
    const newRole = currentRole === 'hr' ? 'employee' : 'hr';
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/users/${email}`, {
        role: newRole
      }, {
        withCredentials: true
      });

      if (response.status === 200) {
        setEmployees((prevEmployees) =>
          prevEmployees.map((emp) =>
            emp.email === email ? { ...emp, role: newRole } : emp
          )
        );
        alert(`Employee role has been successfully changed to ${newRole}!`);
      } else {
        console.error('Failed to update employee role');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const openFireModal = (email) => {
    setSelectedEmail(email);
    setShowFireModal(true);
  };

  const openHRModal = (email) => {
    setSelectedEmail(email);
    setShowHRModal(true);
  };

  const closeFireModal = () => {
    setShowFireModal(false);
    setSelectedEmail('');
  };

  const closeHRModal = () => {
    setShowHRModal(false);
    setSelectedEmail('');
  };

  const confirmFire = () => {
    handleFire(selectedEmail);
    closeFireModal();
  };

  const confirmHR = (currentRole) => {
    handleHR(selectedEmail, currentRole);
    closeHRModal();
  };

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === 'table' ? 'card' : 'table'));
  };

  return (
    <div>
      <div className="flex justify-end items-center mb-4">
        <button onClick={toggleViewMode} className="btn ">
          Toggle View
        </button>
      </div>
      
      {viewMode === 'table' ? (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Designation</th>
                <th>Make HR</th>
                <th>Fire</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{employee.name}</td>
                  <td>{employee.designation}</td>
                  <td>
                    {employee.role === 'admin' ? (
                      <span>Admin</span>
                    ) : (
                      <button
                        onClick={() => openHRModal(employee.email)}
                      >
                        {employee.role === 'hr' ? <FcApproval className='text-3xl'/> : <MdBlock className='text-3xl text-red-600' />}
                      </button>
                    )}
                  </td>
                  <td>
                    {employee.role === 'admin' ? (
                      <span>Admin</span>
                    ) : (
                      <button
                        className={`btn ${employee.isFired === "true" ? 'btn-danger' : 'btn-warning'}`}
                        onClick={() => openFireModal(employee.email)}
                        disabled={employee.isFired === "true"}
                      >
                        {employee.isFired === "true" ? 'Fired' : 'Fire'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {employees.map((employee, index) => (
            <div key={index} className="card bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold">{employee.name}</h2>
              <p className="text-gray-700">{employee.designation}</p>
              <div className="flex justify-between items-center mt-4">
                {employee.role === 'admin' ? (
                  <span>Admin</span>
                ) : (
                  <div>
                    <button
                      
                      onClick={() => openHRModal(employee.email)}
                    >
                      {employee.role === 'hr' ? <FcApproval className='text-3xl'/> : <MdBlock className='text-3xl text-red-600' />}
                    </button>
                    <p className="text-xs text-gray-500 mt-1">Click to toggle HR role</p>
                  </div>
                )}
                {employee.role === 'admin' ? (
                  <span>Admin</span>
                ) : (
                  <div>
                    <button
                      className={`btn ${employee.isFired === "true" ? 'btn-danger' : 'btn-warning'}`}
                      onClick={() => openFireModal(employee.email)}
                      disabled={employee.isFired === "true"}
                    >
                      {employee.isFired === "true" ? 'Fired' : 'Fire'}
                    </button>
                    <p className="text-xs text-gray-500 mt-1">Click to fire employee</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {showFireModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Confirmation</h2>
            <p>Are you sure you want to fire this employee or HR?</p>
            <div className="mt-6 flex justify-end">
              <button
                className="btn btn-info mr-2"
                onClick={closeFireModal}
              >
                No
              </button>
              <button
                className="btn btn-primary"
                onClick={confirmFire}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {showHRModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Confirmation</h2>
            <p>Are you sure you want to change this employee's role?</p>
            <div className="mt-6 flex justify-end">
              <button
                className="btn btn-warning mr-2"
                onClick={closeHRModal}
              >
                No
              </button>
              <button
                className="btn btn-primary"
                onClick={() => confirmHR(employees.find(emp => emp.email === selectedEmail).role)}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

TableDemo.propTypes = {
  allemployees: PropTypes.array.isRequired,
};

export default TableDemo;

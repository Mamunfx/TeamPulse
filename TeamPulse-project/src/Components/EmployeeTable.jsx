import React from 'react';
import PropTypes from 'prop-types';

const EmployeeTable = ({ allemployees = [] }) => {
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
            </tr>
          </thead>
          <tbody>
            {allemployees.map((employee, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{employee.name}</td>
                <td>{employee.designation}</td>
                <td><button className='btn btn-warning'>Unverified</button></td>
                <td><button className='btn btn-warning'>pay requiest</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default EmployeeTable;

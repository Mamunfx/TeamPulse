import React from 'react';
import PropTypes from 'prop-types';

const TableDemo = ({ allemployees = [] }) => {
  return (
    <div>
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
            {allemployees.map((employee, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{employee.name}</td>
                <td>{employee.designation}</td>
                <td>
                <button className='btn btn-warning'>hr</button>
                  </td>
                <td><button className='btn btn-warning'>Fire</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

TableDemo.propTypes = {
  allemployees: PropTypes.array.isRequired,
};

export default TableDemo;

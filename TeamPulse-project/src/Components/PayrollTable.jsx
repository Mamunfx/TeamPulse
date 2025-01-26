import React from 'react';

const PayrollTable = ({ allPayReq = [] }) => {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Amount</th>
              <th>Month</th>
              <th>Year</th>
              <th>Pay</th>
            </tr>
          </thead>
          <tbody>
            {allPayReq.map((PayReq, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{PayReq.name}</td>
                <td>{PayReq.salary}</td>
                <td>{PayReq.month}</td>
                <td>{PayReq.year}</td>

                <td><button className='btn btn-warning'>Pay</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayrollTable;

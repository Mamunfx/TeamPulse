import React from 'react';

const PaymentHistoryTable = ({ payments = [] }) => {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Transaction Id</th>
              <th>Salary</th>
              <th>Month</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{payment.paymentIntentId}</td>
                <td>{payment.salary}</td>
                <td>{payment.month}</td>
                <td>{payment.year}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistoryTable;

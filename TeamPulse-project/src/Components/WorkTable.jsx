import React from 'react';

const WorkTable = ({allWorks}) => {

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Tasks</th>
              <th>Hours</th>
              <th>Date</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {
              allWorks?.map((work, idx) => (
                <tr key={idx}>
                  <th>{idx + 1}</th>
                  <td>{work.selectedWork}</td>
                  <td>{work.hours}</td>
                  <td>{work.date}</td>
                  <td>{work.email}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkTable;

import React from 'react';

const WorkTable = () => {
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
        <th>Update</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr>
        <th>1</th>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td>Blue</td>
        <td><button className='btn btn-sm btn-success'>Update</button></td>
        <td><button className='btn btn-sm btn-warning'>Delete</button></td>
      </tr>
      {/* row 2 */}
      <tr>
        <th>1</th>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td>Blue</td>
        <td><button className='btn btn-sm btn-success'>Update</button></td>
        <td><button className='btn btn-sm btn-warning'>Delete</button></td>
      </tr>
      
      
    </tbody>
  </table>
</div>
    </div>
  );
};

export default WorkTable;
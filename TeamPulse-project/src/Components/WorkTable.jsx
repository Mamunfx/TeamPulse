import React, { useState } from 'react';
import axios from 'axios';
import UpdateModal from './UpdateModal';

const WorkTable = ({ allWorks, fetchWorks }) => {
  const [selectedWork, setSelectedWork] = useState(null);

  const deleteWork = async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/works/${id}`, {
        withCredentials: true,
      });
      //console.log('Deleted:', response.data);
      fetchWorks(); // Fetch updated works list
    } catch (error) {
      console.error('Error deleting work:', error);
    }
  };

  const updateWork = async (id, updatedWork) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/works/${id}`, updatedWork, {
        withCredentials: true,
      });
      //console.log('Updated:', response.data);
      fetchWorks(); // Fetch updated works list
    } catch (error) {
      console.error('Error updating work:', error);
    }
  };

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
            {allWorks?.map((work, idx) => (
              <tr key={idx}>
                <th>{idx + 1}</th>
                <td>{work.selectedWork}</td>
                <td>{work.hours}</td>
                <td>{work.date}</td>
                <td>
                  <button className="btn btn-accent" onClick={() => setSelectedWork(work)}>Update</button>
                </td>
                <td>
                  <button className="btn btn-warning" onClick={() => deleteWork(work._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedWork && (
        <UpdateModal
          work={selectedWork}
          onClose={() => setSelectedWork(null)}
          onUpdate={updateWork}
        />
      )}
    </div>
  );
};

export default WorkTable;

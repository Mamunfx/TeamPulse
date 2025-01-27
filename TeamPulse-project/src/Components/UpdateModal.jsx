import React, { useState } from 'react';
import axios from 'axios';

const UpdateModal = ({ work, onClose, onUpdate }) => {
  const [selectedWork, setSelectedWork] = useState(work.selectedWork);
  const [hours, setHours] = useState(work.hours);
  const [date, setDate] = useState(work.date);

  const handleUpdate = async () => {
    const updatedWork = {
      selectedWork,
      hours,
      date
    };
    await onUpdate(work._id, updatedWork);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-lg w-3/4 max-w-lg mx-auto">
        <h2 className="text-xl mb-4">Update Work</h2>
        <div className="mb-4">
          <label className="block mb-2">Task</label>
          <select value={selectedWork} onChange={(e) => setSelectedWork(e.target.value)} className="border p-2 rounded w-full">
            <option value="Sales">Sales</option>
            <option value="Support">Support</option>
            <option value="Content">Content</option>
            <option value="Paper-work">Paper-work</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Hours</label>
          <input type="number" value={hours} onChange={(e) => setHours(e.target.value)} className="border p-2 rounded w-full" />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border p-2 rounded w-full" />
        </div>
        <div className="flex justify-end space-x-2">
          <button onClick={handleUpdate} className="btn btn-accent">Update</button>
          <button onClick={onClose} className="btn btn-secondary">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;

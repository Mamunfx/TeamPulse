import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "./../hooks/useAxiosSecure";
import WorkTable from "../Components/WorkTable";
import { AuthContext } from "../AuthProvider";
import axios from "axios";

const WorkSheet = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [allWorks, setAllWorks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hours, setHours] = useState("");
  const [date, setDate] = useState("");
  const works = ["Sales", "Support", "Content", "Paper-work"];
  const [selectedWork, setSelectedWork] = useState(works[0]);

  const fetchWorks = async () => {
    if (user?.email) {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/works/${user?.email}`, {
          withCredentials: true,
        });
        setAllWorks(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching works:", error);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchWorks();
  }, [user?.email]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = {
      selectedWork,
      hours,
      date,
      email: user?.email,
    };

    try {
      await axiosSecure.post(`${import.meta.env.VITE_API_URL}/works`, formData);
      fetchWorks(); // Refresh the works list
      alert("Work added");
    } catch (error) {
      console.error("Error adding work:", error);
    }
  };

  return (
    <div className="p-4">
      <form
        className="form-section flex flex-col gap-4 md:flex-row md:justify-between max-w-lg"
        onSubmit={handleSubmit}
      >
        <select
          className="dropdown p-2 border rounded-md"
          value={selectedWork}
          onChange={(e) => setSelectedWork(e.target.value)}
          required
        >
          {works.map((work, index) => (
            <option key={index} value={work}>
              {work}
            </option>
          ))}
        </select>
        <input
          type="number"
          className="number-input p-2 border rounded-md"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          placeholder="Work done in hours"
          required
        />
        <input
          type="date"
          className="date-picker p-2 border rounded-md"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">
          Submit
        </button>
      </form>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <WorkTable allWorks={allWorks} fetchWorks={fetchWorks}></WorkTable>
      )}
    </div>
  );
};

export default WorkSheet;

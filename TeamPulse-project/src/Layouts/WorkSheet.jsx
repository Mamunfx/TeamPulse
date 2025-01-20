import React, { useContext, useState } from 'react';
import TableDemo from './../Components/TableDemo';
import useAxiosSecure from './../hooks/useAxiosSecure';
import WorkTable from '../Components/WorkTable';
import { AuthContext } from '../AuthProvider';

const WorkSheet = () => {
    const {user}=useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [hours, setHours] = useState('');
    const [date, setDate] = useState('');
    const works = ['Sales', 'Support', 'Content', 'Paper-work'];
    const [selectedWork, setSelectedWork] = useState(works[0]); 

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            selectedWork,
            hours,
            date,
            email:user?.email
        };
        axiosSecure.post('/works', formData).then((res) => {
            alert('Work added');
        });
    };

  const handleAllWorks = (e)=>{
    e.preventDefault();
    axiosSecure.get(`/works/${user?.email}`).then((res)=>{
      console.log(res.data);
    });
  }
    

    return (
        <div className="p-4">
            <form className="form-section flex flex-col gap-4 md:flex-row md:justify-between max-w-lg" onSubmit={handleSubmit}>
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
                    placeholder='Work done in hours'
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
            <WorkTable ></WorkTable>

            <button className='btn' onClick={handleAllWorks}>Show</button>
        </div>
    );
};

export default WorkSheet;

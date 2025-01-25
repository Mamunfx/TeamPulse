import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WorkTable from './../Components/WorkTable';

const Progress = () => {
    const [email, setEmail] = useState('');
    const [endDate, setEndDate] = useState('');
    const [allWorks, setAllWorks] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/role`, { withCredentials: true });
                setEmployees(response.data);
            } catch (err) {
                console.error('Error fetching employees:', err);
            }
        };

        const fetchAllWorks = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/works`, { withCredentials: true });
                setAllWorks(response.data);
            } catch (err) {
                console.error('Error fetching all works:', err);
            }
        };

        fetchEmployees();
        fetchAllWorks();
    }, []);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const handleSearch = async () => {
        setIsLoading(true);
        setError(null);
        try {
            let response;
            const selectedEmail = email || 'null';
            const selectedEndDate = endDate || 'null';

            if (selectedEmail !== 'null' || selectedEndDate !== 'null') {
                response = await axios.get(`${import.meta.env.VITE_API_URL}/works/${selectedEmail}/${selectedEndDate}`, {
                    withCredentials: true,
                });
            } else {
                response = await axios.get(`${import.meta.env.VITE_API_URL}/works`, {
                    withCredentials: true,
                });
            }

            console.log('Request params:', { email: selectedEmail, endDate: selectedEndDate });
            console.log('Response data:', response.data);
            setAllWorks(response.data);
        } catch (err) {
            console.error('Error fetching works:', err);
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1>Progress is on</h1>
            <div>
                <label>
                    Select Employee:
                    <select value={email} onChange={handleEmailChange}>
                        <option value="">All</option>
                        {employees.map(employee => (
                            <option key={employee.email} value={employee.email}>
                                {employee.email}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    End Date:
                    <input type="date" value={endDate} onChange={handleEndDateChange} />
                </label>
                <button onClick={handleSearch}>Search</button>
            </div>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error fetching data: {error.message}</p>}
            <WorkTable allWorks={allWorks}></WorkTable>
        </div>
    );
};

export default Progress;

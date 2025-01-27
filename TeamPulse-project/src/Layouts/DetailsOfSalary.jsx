import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Graph from '../Components/Graph';

const DetailsOfSalary = () => {
    const { email } = useParams();
    const [salaryData, setSalaryData] = useState([]);
    const [months, setMonths] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/payments`, { withCredentials: true })
            .then(response => {
                const filteredData = response.data.filter(payment => payment.email === email);
                if (filteredData.length > 0) {
                    // Sort the data based on the month order
                    const sortedData = filteredData.sort((a, b) => new Date(`01 ${a.month} 2021`) - new Date(`01 ${b.month} 2021`));
                    setSalaryData(sortedData.map(payment => payment.salary));
                    setMonths(sortedData.map(payment => payment.month));
                } else {
                    // Provide default months and salary data
                    const defaultMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].reverse();
                    setSalaryData(new Array(defaultMonths.length).fill(0));
                    setMonths(defaultMonths);
                }
            })
            .catch(error => console.error('Error fetching payment data:', error));
    }, [email]);

    return (
        <div>
            <h1>Salary vs Month Chart</h1>
            <Graph data={salaryData} categories={months} />
        </div>
    );
};

export default DetailsOfSalary;

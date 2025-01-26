import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PayrollTable from '../Components/PayrollTable';

const Payroll = () => {
    const [allPayReq, setallPayReq] = useState([]);

    useEffect(() => {
        const fetchPayReq = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/payReq`, {
                    withCredentials: true,
                });
                setallPayReq(response.data);
            } catch (error) {
                console.error('Error fetching pay requests:', error);
            }
        };
        fetchPayReq();
    }, []);

    return (
        <div>
            <h1>Pay list</h1>
            <PayrollTable allPayReq={allPayReq} />
        </div>
    );
};

export default Payroll;

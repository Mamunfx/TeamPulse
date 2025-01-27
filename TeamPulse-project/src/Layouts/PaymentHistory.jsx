import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import PaymentHistoryTable from './../Components/PaymentHistoryTable';
import { AuthContext } from './../AuthProvider';
const PaymentHistory = () => {
    const [paymentData, setPaymentData] = useState([]);
    const {user}=useContext(AuthContext)
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/payments`,{withCredentials:true}).then(response => {
                const employeeEmail = user?.email;
                const filteredData = response.data.filter(payment => payment.email === employeeEmail);
                setPaymentData(filteredData);
            }).catch(error => console.error('Error fetching payment data:', error));
    }, []);

    return (
        <div>
            <h1>This is payment history</h1>
            <PaymentHistoryTable payments={paymentData} />
        </div>
    );
};

export default PaymentHistory;

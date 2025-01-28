import React, { useEffect, useState } from 'react';
import axios from 'axios'
import EmployeeTable from './../Components/EmployeeTable';
const EmployeeList = () => {
    const [allemployees, setemployees] = useState([]);

    useEffect(() => {
        console.log('Fetching employees...'); 
        axios.get(`${import.meta.env.VITE_API_URL}/users/role`, {withCredentials:true}).then((res) => {
                console.log('Fetched employees:', res.data); 
                setemployees(res.data);
            }).catch((err) => {
                console.error('Error fetching data:', err);
            });
    }, [axios]); 

    if (allemployees.length === 0) {
        return <p>Loading...</p>;
    }
    return (
        <div>
            <h1 className='text-3xl mb-8'>Employee list </h1>

            <EmployeeTable allemployees={allemployees} ></EmployeeTable>
        </div>
    );
};

export default EmployeeList;
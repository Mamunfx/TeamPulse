import React, { useEffect, useState } from 'react';
import TableDemo from './../Components/TableDemo';
import axios from 'axios'
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
            <h1>This is employee list </h1>

            <TableDemo allemployees={allemployees} ></TableDemo>
        </div>
    );
};

export default EmployeeList;
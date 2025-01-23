import React, { useState, useEffect } from 'react';
import TableDemo from './../Components/TableDemo';
import useAxiosSecure from './../hooks/useAxiosSecure';
import axios  from 'axios';

const AllEmployee = () => {
    const [allemployees, setemployees] = useState([]);
    const [error, setError] = useState(null);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        console.log('Fetching employees...'); 
        axios.get(`${import.meta.env.VITE_API_URL}/users`, {withCredentials:true}).then((res) => {
                console.log('Fetched employees:', res.data); 
                setemployees(res.data);
            }).catch((err) => {
                console.error('Error fetching data:', err);
                setError(err.message);
            });
    }, [axios]); 

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (allemployees.length === 0) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>All employee list</h1>
            <TableDemo allemployees={allemployees}></TableDemo>
        </div>
    );
};

export default AllEmployee;

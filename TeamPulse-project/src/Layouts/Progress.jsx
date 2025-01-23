import React, { useEffect, useState } from 'react';
import axios, { all } from 'axios';
import WorkTable from './../Components/WorkTable';
const Progress = () => {
    const [allWorks,setallWorks]=useState([]);
     useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_URL}/works`, {withCredentials:true}).then((res)=>{
            setallWorks(res.data)
        }).catch((err)=>{
            console.error('Error fetching data:', err);
        })
     },[axios]);

     if (allWorks.length === 0) {
        return <p>Loading...</p>;
    } 

    return (
        <div>
            <h1>Progress is on</h1>
            <WorkTable allWorks={allWorks}></WorkTable>
        </div>
    );
};

export default Progress;
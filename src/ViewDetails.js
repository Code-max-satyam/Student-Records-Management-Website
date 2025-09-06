import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import './App.css';

export default function ViewDetails() {
    const { studentid } = useParams();
    const [studentData,setStudentData]=useState({});
    useEffect(() => {
        fetch("http://localhost:8000/students/"+studentid)
            .then((res)=>res.json())
            .then((data)=>setStudentData(data))
            .catch((err)=>console.log(err.message)
            )
    }, []);
    return (
        <div className="container">
            <h1>Student Details</h1>
            { studentData && <div className="details">
                <p><strong>ID: </strong>{studentData.id}</p>
                <p><strong>Name: </strong>{studentData.name}</p>
                <p><strong>Email: </strong>{studentData.email}</p>
                <p><strong>Phone: </strong>{studentData.phone}</p>
            </div>}
            <Link to="/" class="btn btn-back">Back</Link>
        </div>
    )
}
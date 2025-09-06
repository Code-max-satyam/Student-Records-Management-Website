import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './App.css';

export default function CreateStudent() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Track which fields have been touched (focused and blurred)
  const [touched, setTouched] = useState({
    id: false,
    name: false,
    email: false,
    phone: false,
  });

  const navigate = useNavigate();

  // Mark a field as touched when user leaves (onBlur event)
  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check all fields filled before submitting
    if (!id || !name || !email || !phone) {
      // Mark all fields as touched to show validation if any field empty
      setTouched({
        id: true,
        name: true,
        email: true,
        phone: true,
      });
      return;  // Don't submit if validation fails
    }

    const studentData = { id, name, email, phone };
    console.log(studentData);

    fetch("http://localhost:8000/students", {
      method: 'POST',
      headers: { "content-type": "application/json" },
      body: JSON.stringify(studentData)
    })
      .then((res) => {
        alert("Student Data saved Successfully");
        navigate("/");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="container">
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit} noValidate>

        <div className="form-group">
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id="id"
            name="id"
            value={id}
            onChange={e => setId(e.target.value)}
            onBlur={() => handleBlur('id')}
          />
          {touched.id && id.trim() === "" && (
            <span className="errorMsg">Please Enter Your ID</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
            onBlur={() => handleBlur('name')}
          />
          {touched.name && name.trim() === "" && (
            <span className="errorMsg">Please Enter Name</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onBlur={() => handleBlur('email')}
          />
          {touched.email && email.trim() === "" && (
            <span className="errorMsg">Please Enter Your Email Id</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            onBlur={() => handleBlur('phone')}
          />
          {touched.phone && phone.trim() === "" && (
            <span className="errorMsg">Please Enter Your Phone number</span>
          )}
        </div>

        <div className="form-buttons">
          <button className="btn btn-save" type="submit">Save</button>
          <Link to="/" className="btn btn-back">Back</Link>
        </div>

      </form>
    </div>
  );
}


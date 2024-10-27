import React, { useState } from 'react'
import Nav from '../Nav/Nav'
import { useNavigate } from 'react-router-dom'
import axios from "axios";

function AddUser() {
    const history = useNavigate();
    const [inputs, setInputs] = useState({
        name: '',
        gmail: '',
        age: '',
        address: ''
    });

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs);
        await sendRequest();
        window.alert("User added successfully!")
        history("/userdetails");
    };

    const sendRequest = async () => {
        await axios.post('http://localhost:5000/users', {
            name: String(inputs.name), 
            gmail: String(inputs.gmail),
            age: Number(inputs.age),
            address: String(inputs.address),
        }).then(res => res.data);
    };

  return (
    <div>
        <Nav />
      <h1>Add User</h1>
      <form onSubmit={handleSubmit}>
        <label>name</label>
        <br></br>
        <input type="text" name="name" onChange={handleChange} value={inputs.name} required></input>
        <br></br>
        <br></br>
        <label>gmail</label>
        <br></br>
        <input type="email" name="gmail" onChange={handleChange} value={inputs.gmail} required></input>
        <br></br>
        <br></br>
        <label>age</label>
        <br></br>
        <input type="number" name="age" onChange={handleChange} value={inputs.age} required></input>
        <br></br>
        <br></br>
        <label>address</label>
        <br></br>
        <input type="text" name="address" onChange={handleChange} value={inputs.address} required></input>
        <br></br>
        <br></br>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default AddUser

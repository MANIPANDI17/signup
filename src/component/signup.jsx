import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5002/signup", form);
      setMsg("Signup successful. Please login.");
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
    
  };

  return (
   <div className="auth-container">
  <h2>Signup</h2>
  <form onSubmit={handleSubmit}>
    <input name="name" placeholder="Name" onChange={handleChange} required />
    <input name="email" placeholder="Email" onChange={handleChange}  required/>
    <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
    <button type="submit">Signup</button>
  </form>
  <p>{msg}</p>
</div>

  );
}

export default Signup;

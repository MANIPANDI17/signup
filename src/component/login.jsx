import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5002/login", form);
      localStorage.setItem("token", res.data.token);
      window.location = "/dashboard";
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="auth-container">
  <h2>Login</h2>
  <form onSubmit={handleSubmit}>
    <input name="email" placeholder="Email" onChange={handleChange} />
    <input type="password" name="password" placeholder="Password" onChange={handleChange} />
    <button type="submit">Login</button>
  </form>
  <p>{msg}</p>
</div>

  );
}

export default Login;

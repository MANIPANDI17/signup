import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:5002/dashboard", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setMsg(res.data.message))
    .catch(() => setMsg("Unauthorized"));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location = "/Signup";
  };

  return (
    <div className="dashboard">
  <h2>Dashboard</h2>
  <p>{msg}</p>
  <button onClick={logout}>Logout</button>
</div>

  );
}

export default Dashboard;

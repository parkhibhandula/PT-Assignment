import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="card p-4 shadow mx-auto" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-3">Register</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input className="form-control mb-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="form-control mb-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="btn btn-success w-100">Register</button>
      </form>
    </div>
  );
}

export default Register;

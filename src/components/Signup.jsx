import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "https://project-management-myjp.onrender.com";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password, role })
    });

    if (res.ok) {
      alert("Signup Success");
      navigate("/");
    }
  };

  return (
    <div style={container}>
      <form onSubmit={handleSignup} style={box}>
        <h2>Signup</h2>

        <input placeholder="Name" onChange={e => setName(e.target.value)} style={input} />
        <input placeholder="Email" onChange={e => setEmail(e.target.value)} style={input} />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} style={input} />

        <select value={role} onChange={e => setRole(e.target.value)} style={input}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button style={btn}>Signup</button>

        <p onClick={() => navigate("/")} style={link}>
          Login
        </p>
      </form>
    </div>
  );
}

const container = { height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "linear-gradient(to right,#667eea,#764ba2)" };
const box = { background: "white", padding: 30, borderRadius: 10, width: 300 };
const input = { width: "100%", padding: 10, margin: "10px 0" };
const btn = { width: "100%", padding: 10, background: "#667eea", color: "white", border: "none" };
const link = { textAlign: "center", marginTop: 10, cursor: "pointer" };

export default Signup;
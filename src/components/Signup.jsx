import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/signup", {
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
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(to right, #667eea, #764ba2)"
    }}>
      <form onSubmit={handleSignup} style={{
        background: "white",
        padding: "30px",
        borderRadius: "10px",
        width: "300px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
      }}>
        <h2 style={{ textAlign: "center" }}>Signup</h2>

        <input placeholder="Name" onChange={(e) => setName(e.target.value)} style={{ width: "100%", margin: "10px 0", padding: "10px" }} />
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", margin: "10px 0", padding: "10px" }} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", margin: "10px 0", padding: "10px" }} />

        <select value={role} onChange={(e) => setRole(e.target.value)} style={{ width: "100%", padding: "10px" }}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button style={{
          width: "100%",
          padding: "10px",
          background: "#667eea",
          color: "white",
          border: "none",
          marginTop: "10px"
        }}>
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
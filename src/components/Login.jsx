import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("user", data.email);
      localStorage.setItem("name", data.name);

      if (data.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={container}>
      <form onSubmit={handleLogin} style={card}>
        <h2>Login</h2>

        <input style={input} placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" style={input} placeholder="Password" onChange={e => setPassword(e.target.value)} />

        <button style={btn}>Login</button>

        <p style={link} onClick={() => navigate("/signup")}>
          Don't have account? Signup
        </p>
      </form>
    </div>
  );
}

export default Login;

/* STYLES */
const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(to right,#667eea,#764ba2)"
};

const card = {
  background: "white",
  padding: 30,
  borderRadius: 10,
  width: 300
};

const input = {
  width: "100%",
  padding: 10,
  margin: "10px 0"
};

const btn = {
  width: "100%",
  padding: 10,
  background: "#667eea",
  color: "white",
  border: "none"
};

const link = {
  textAlign: "center",
  marginTop: 10,
  cursor: "pointer",
  color: "#667eea"
};
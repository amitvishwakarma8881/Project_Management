import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "https://project-management-myjp.onrender.com";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("role", data.role);
      localStorage.setItem("user", data.email);
      localStorage.setItem("name", data.name);

      if (data.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } else {
      alert(data);
    }
  };

  return (
    <div style={container}>
      <form onSubmit={handleLogin} style={box}>
        <h2>Login</h2>

        <input placeholder="Email" onChange={e => setEmail(e.target.value)} style={input} />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} style={input} />

        <button style={btn}>Login</button>

        <p onClick={() => navigate("/signup")} style={link}>
          Signup
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

export default Login;
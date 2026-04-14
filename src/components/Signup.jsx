import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role: "user" })
    });

    if (res.ok) {
      alert("Signup Success");
      navigate("/");
    }
  };

  return (
    <div style={container}>
      <form onSubmit={handleSignup} style={card}>
        <h2>Signup</h2>

        <input style={input} placeholder="Name" onChange={e => setName(e.target.value)} />
        <input style={input} placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" style={input} placeholder="Password" onChange={e => setPassword(e.target.value)} />

        <button style={btn}>Signup</button>

        <p style={link} onClick={() => navigate("/")}>
          Already have account? Login
        </p>
      </form>
    </div>
  );
}

export default Signup;
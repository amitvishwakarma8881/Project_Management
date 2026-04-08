import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (res.ok) {
        alert("Login Successful ✅");
      } else {
        alert("Invalid Credentials ❌");
      }
    } catch (err) {
      alert("Server Error ❌");
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh"
    }}>
      <form
        onSubmit={handleLogin}
        style={{
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          width: "300px",
          display: "flex",
          flexDirection: "column",
          gap: "10px"
        }}
      >
        <h2 style={{ textAlign: "center" }}>Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value.trim())}
          style={{ padding: "8px" }}
        />

        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value.trim())}
          style={{ padding: "8px" }}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            background: "black",
            color: "white",
            border: "none",
            borderRadius: "5px"
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
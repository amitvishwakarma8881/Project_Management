import { useState } from "react";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });

      if (res.ok) {
        alert("Signup Successful ✅");
      } else {
        alert("Signup Failed ❌");
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
        onSubmit={handleSignup}
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
        <h2 style={{ textAlign: "center" }}>Signup</h2>

        <input
          type="text"
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "8px" }}
        />

        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "8px" }}
        />

        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
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
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div style={styles.container}>
      <h2>Login</h2>

      <input type="email" placeholder="Enter Email" style={styles.input} />
      <input type="password" placeholder="Enter Password" style={styles.input} />

      <button style={styles.button}>Login</button>

      <p>
        Don't have an account?{" "}
        <Link to="/signup" style={styles.link}>Sign up</Link>
      </p>
    </div>
  );
}

const styles = {
  container: {
    width: "320px",
    margin: "80px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)"
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    fontSize: "14px"
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer"
  },
  link: {
    color: "blue",
    textDecoration: "none"
  }
};

export default Login;
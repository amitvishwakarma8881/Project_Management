import { useEffect, useState } from "react";

function UserDashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/projects")
      .then(res => res.json())
      .then(data => setProjects(data));
  }, []);

  return (
    <div style={{
      padding: "30px",
      background: "#ecf0f1",
      minHeight: "100vh"
    }}>
      <h2>User Dashboard</h2>

      {projects.map((p, i) => (
        <div key={i} style={{
          background: "white",
          padding: "15px",
          margin: "10px 0",
          borderRadius: "8px"
        }}>
          <h3>{p.title}</h3>
          <p>{p.description}</p>
          <p>Status: {p.status}</p>
        </div>
      ))}
    </div>
  );
}

export default UserDashboard;
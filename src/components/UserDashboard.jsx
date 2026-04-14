import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "https://project-management-myjp.onrender.com";

function UserDashboard() {
  const [projects, setProjects] = useState([]);
  const user = localStorage.getItem("user");
  const name = localStorage.getItem("name");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}/projects/${user}`)
      .then(res => res.json())
      .then(setProjects);
  }, [user]);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const updateStatus = async (id, status) => {
    await fetch(`${API}/update-status/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });

    setProjects(prev =>
      prev.map(p => p._id === id ? { ...p, status } : p)
    );
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>

      <div style={sidebar}>
        <h2>User Panel</h2>
        <button onClick={logout} style={logoutBtn}>Logout</button>
      </div>

      <div style={main}>
        <div style={header}>
          <h2>My Projects</h2>
          <span>Welcome {name || "User"} 👋</span>
        </div>

        <div style={grid}>
          {projects.map(p => (
            <div key={p._id} style={card}>
              <h3>{p.title}</h3>
              <p>{p.description}</p>

              <p>📅 {new Date(p.deadline).toDateString()}</p>

              <select
                style={input}
                value={p.status}
                onChange={e => updateStatus(p._id, e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const sidebar = { width: 220, background: "#2c3e50", color: "white", padding: 20, display: "flex", flexDirection: "column", justifyContent: "space-between" };
const main = { flex: 1, padding: 20, background: "linear-gradient(to right,#eef2f3,#dfe9f3)" };
const header = { background: "white", padding: 15, borderRadius: 10, marginBottom: 20, display: "flex", justifyContent: "space-between" };
const grid = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 15 };
const card = { background: "white", padding: 15, borderRadius: 10, boxShadow: "0 4px 10px rgba(0,0,0,0.1)" };
const input = { width: "100%", padding: 8, marginTop: 10 };
const logoutBtn = { background: "red", color: "white", padding: 10, border: "none", borderRadius: 6 };

export default UserDashboard;
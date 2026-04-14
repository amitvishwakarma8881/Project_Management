import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [tab, setTab] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const name = localStorage.getItem("name");

  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
    deadline: ""
  });

  const [editingProject, setEditingProject] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
    deadline: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    loadProjects();
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(setUsers);
  }, []);

  const loadProjects = async () => {
    const res = await fetch("http://localhost:5000/projects");
    const data = await res.json();
    setProjects(data);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const addProject = async () => {
    await fetch("http://localhost:5000/add-project", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    loadProjects();
    setTab("projects");
  };

  const deleteProject = async (id) => {
    await fetch(`http://localhost:5000/delete-project/${id}`, {
      method: "DELETE"
    });

    loadProjects();
  };

  const editProject = (p) => {
    setEditingProject(p);
    setEditForm({
      title: p.title,
      description: p.description,
      assignedTo: p.assignedTo,
      deadline: p.deadline?.split("T")[0]
    });
  };

  const updateProject = async () => {
    await fetch(`http://localhost:5000/edit-project/${editingProject._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm)
    });

    await loadProjects();
    setEditingProject(null);
  };

  const stats = {
    total: projects.length,
    pending: projects.filter(p => p.status === "pending").length,
    progress: projects.filter(p => p.status === "in-progress").length,
    done: projects.filter(p => p.status === "completed").length
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>

      {/* SIDEBAR */}
      <div style={{
        width: 230,
        background: "linear-gradient(180deg,#2c3e50,#34495e)",
        color: "white",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}>
        <div>
          <h2 style={{ textAlign: "center" }}>Admin Panel</h2>
          

          <button onClick={() => setTab("projects")} style={btnStyle}>Projects</button>
          <button onClick={() => setTab("create")} style={btnStyle}>Create</button>
        </div>

        <button onClick={logout} style={logoutStyle}>Logout</button>
      </div>

      {/* MAIN */}
      <div style={{
        flex: 1,
        padding: 20,
        background: "linear-gradient(to right,#eef2f3,#dfe9f3)"
      }}>

        {/* HEADER */}
        <div style={headerStyle}>
          <h2>Dashboard</h2>
          <span>Welcome {name || "Admin"} 👋 </span>
        </div>

        {/* STATS */}
        {tab === "projects" && (
          <>
            <div style={statsGrid}>
              <div style={statCard}>Total<br /><b>{stats.total}</b></div>
              <div style={statCard}>Pending<br /><b>{stats.pending}</b></div>
              <div style={statCard}>Progress<br /><b>{stats.progress}</b></div>
              <div style={statCard}>Done<br /><b>{stats.done}</b></div>
            </div>

            {/* PROJECT CARDS */}
            <div style={grid}>
              {projects.map(p => (
                <div key={p._id} style={card}
                  onMouseEnter={e => hoverIn(e)}
                  onMouseLeave={e => hoverOut(e)}
                >
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>

                  <p>👤 {p.assignedName || p.assignedTo}</p>
                  <p>📅 {new Date(p.deadline).toDateString()}</p>

                  <span style={statusStyle(p.status)}>{p.status}</span>

                  <div style={{ marginTop: 10 }}>
                    <button style={btnStyle} onClick={() => editProject(p)}>Edit</button>
                    <button style={{ ...btnStyle, background: "#e74c3c" }} onClick={() => deleteProject(p._id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* CREATE */}
        {tab === "create" && (
          <div style={formBox}>
            <h2>Create Project</h2>

            <input style={input} placeholder="Title" onChange={e => setForm({ ...form, title: e.target.value })} />
            <input style={input} placeholder="Description" onChange={e => setForm({ ...form, description: e.target.value })} />

            <select style={input} onChange={e => setForm({ ...form, assignedTo: e.target.value })}>
              <option>Select User</option>
              {users.map(u => <option key={u._id} value={u.email}>{u.name}</option>)}
            </select>

            <input type="date" style={input} onChange={e => setForm({ ...form, deadline: e.target.value })} />

            <button style={btnStyle} onClick={addProject}>Create</button>
          </div>
        )}
      </div>

      {/* EDIT MODAL */}
      {editingProject && (
        <div style={overlay}>
          <div style={modal}>
            <h3>Edit Project</h3>

            <input style={input} value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })} />
            <input style={input} value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })} />

            <select style={input} value={editForm.assignedTo} onChange={e => setEditForm({ ...editForm, assignedTo: e.target.value })}>
              {users.map(u => <option key={u._id} value={u.email}>{u.name}</option>)}
            </select>

            <input type="date" style={input} value={editForm.deadline} onChange={e => setEditForm({ ...editForm, deadline: e.target.value })} />

            <button style={btnStyle} onClick={updateProject}>Save</button>
            <button style={{ ...btnStyle, background: "#aaa" }} onClick={() => setEditingProject(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* STYLES */
const btnStyle = { padding: 8, margin: 5, border: "none", borderRadius: 6, background: "#3498db", color: "white", cursor: "pointer" };
const logoutStyle = { background: "#e74c3c", padding: 10, border: "none", color: "white", borderRadius: 6 };
const headerStyle = { background: "white", padding: 15, borderRadius: 10, marginBottom: 20, display: "flex", justifyContent: "space-between" };
const statsGrid = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 10 };
const statCard = { background: "white", padding: 10, borderRadius: 10, textAlign: "center" };
const grid = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 15 };
const card = { background: "white", padding: 15, borderRadius: 12, boxShadow: "0 4px 10px rgba(0,0,0,0.1)" };
const input = { width: "100%", padding: 10, marginBottom: 10, borderRadius: 6, border: "1px solid #ccc" };
const formBox = { background: "white", padding: 20, borderRadius: 10 };
const overlay = { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" };
const modal = { background: "white", padding: 20, borderRadius: 10, width: 320 };
const hoverIn = e => { e.currentTarget.style.transform = "translateY(-5px)"; };
const hoverOut = e => { e.currentTarget.style.transform = "translateY(0)"; };
const statusStyle = (s) => ({
  padding: "5px 10px",
  borderRadius: 20,
  color: "white",
  background: s === "completed" ? "green" : s === "in-progress" ? "orange" : "red"
});

export default AdminDashboard;
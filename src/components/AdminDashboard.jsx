import { useState } from "react";

function AdminDashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddProject = async () => {
    const role = localStorage.getItem("role");

    const res = await fetch("http://localhost:5000/add-project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, description, role })
    });

    if (res.ok) {
      alert("Project Added");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* Sidebar */}
      <div style={{
        width: "200px",
        background: "#2c3e50",
        color: "white",
        padding: "20px"
      }}>
        <h2>Admin</h2>
        <p>Dashboard</p>
        <p>Add Project</p>
      </div>

      {/* Main */}
      <div style={{
        flex: 1,
        padding: "30px",
        background: "#ecf0f1"
      }}>
        <h2>Add Project</h2>

        <div style={{
          background: "white",
          padding: "20px",
          width: "300px",
          borderRadius: "10px"
        }}>
          <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} style={{ width: "100%", margin: "10px 0", padding: "10px" }} />
          <input placeholder="Description" onChange={(e) => setDescription(e.target.value)} style={{ width: "100%", margin: "10px 0", padding: "10px" }} />

          <button style={{
            width: "100%",
            padding: "10px",
            background: "#2c3e50",
            color: "white"
          }}>
            Add Project
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
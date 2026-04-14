import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/* ================= DB ================= */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

/* ================= MODELS ================= */
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, default: "user" }
});

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  assignedTo: String,
  deadline: Date,
  status: {
    type: String,
    default: "pending"
  }
});

const User = mongoose.model("User", userSchema);
const Project = mongoose.model("Project", projectSchema);

/* ================= USERS ================= */
app.get("/users", async (req, res) => {
  const users = await User.find({ role: "user" });
  res.json(users);
});

/* ================= SIGNUP ================= */
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json({ message: "Signup success" });
});

/* ================= LOGIN ================= */
app.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user || user.password !== req.body.password) {
    return res.status(400).send("Invalid credentials");
  }

  res.json({
    role: user.role,
    email: user.email,
    name: user.name
    });
});

/* ================= ADD PROJECT ================= */
app.post("/add-project", async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.json(project); // IMPORTANT FIX
});

/* ================= GET ALL PROJECTS ================= */
app.get("/projects", async (req, res) => {
  const projects = await Project.find();
  const users = await User.find();

  const updated = projects.map(p => {
    const user = users.find(u => u.email === p.assignedTo);

    return {
      ...p._doc,
      assignedName: user ? user.name : p.assignedTo
    };
  });

  res.json(updated);
});

/* ================= USER PROJECTS ================= */
app.get("/projects/:user", async (req, res) => {
  const projects = await Project.find({ assignedTo: req.params.user });
  res.json(projects);
});

/* ================= STATUS UPDATE ================= */
app.put("/update-status/:id", async (req, res) => {
  await Project.findByIdAndUpdate(req.params.id, {
    status: req.body.status
  });

  res.json({ message: "Updated" });
});

/* ================= EDIT ================= */
const updateProject = async () => {
  await fetch(`http://localhost:5000/edit-project/${editingProject._id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(editForm)
  });

  // 🔥 RE-FETCH ALL PROJECTS (BEST WAY)
  const res = await fetch("http://localhost:5000/projects");
  const updatedProjects = await res.json();

  setProjects(updatedProjects);
  setEditingProject(null);
};

/* ================= DELETE ================= */
app.delete("/delete-project/:id", async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(5000, () => console.log("Server running"));
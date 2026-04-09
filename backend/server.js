import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/* 🔥 MongoDB Connection */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

/* =========================
   🔥 USER SCHEMA
========================= */
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    default: "user"
  }
});

const User = mongoose.model("User", userSchema);

/* =========================
   🔥 PROJECT SCHEMA
========================= */
const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: {
    type: String,
    default: "pending"
  }
});

const Project = mongoose.model("Project", projectSchema);

/* =========================
   🔥 ROUTES
========================= */

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

/* =========================
   🔐 SIGNUP
========================= */
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Duplicate check
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists ❌");
    }

    const user = new User({
      name,
      email,
      password,
      role: role || "user"
    });

    await user.save();

    res.send("Signup Successful ✅");

  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error ❌");
  }
});

/* =========================
   🔑 LOGIN
========================= */
app.post("/login", async (req, res) => {
  try {
    const email = req.body.email?.trim();
    const password = req.body.password?.trim();

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send("User not found ❌");
    }

    if (user.password !== password) {
      return res.status(400).send("Wrong password ❌");
    }

    res.json({
      message: "Login Success ✅",
      role: user.role
    });

  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error ❌");
  }
});

/* =========================
   ➕ ADD PROJECT (ADMIN ONLY)
========================= */
app.post("/add-project", async (req, res) => {
  try {
    const { title, description, role } = req.body;

    if (role !== "admin") {
      return res.status(403).send("Access denied ❌");
    }

    const project = new Project({
      title,
      description
    });

    await project.save();

    res.send("Project Added ✅");

  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error ❌");
  }
});

/* =========================
   📋 GET PROJECTS
========================= */
app.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error ❌");
  }
});

/* =========================
   🚀 SERVER
========================= */
app.listen(5000, () => {
  console.log("Server running on port 5000 🔥");
});
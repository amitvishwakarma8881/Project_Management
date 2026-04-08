import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

app.use(cors());
app.use(express.json());

/* 🔥 MongoDB Connection */
mongoose.connect("mongodb+srv://Amitvish:Amit8881@cluster0.pgfceud.mongodb.net/project_management")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

/* 🔥 User Schema */
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const User = mongoose.model("User", userSchema);

/* 🔥 Routes */

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.post("/login", async (req, res) => {
  console.log("BODY:", req.body);

  const email = req.body.email?.trim();
  const password = req.body.password?.trim();

  console.log("EMAIL:", email);
  console.log("PASSWORD:", password);

  const user = await User.findOne({ email });

  console.log("FOUND USER:", user);

  if (!user) {
    return res.status(400).send("User not found ❌");
  }

  if (user.password !== password) {
    return res.status(400).send("Wrong password ❌");
  }

  res.send("Login Success ✅");
});

// Signup API
app.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send("User saved successfully ✅");
  } catch (err) {
    res.status(500).send(err);
  }
});

/* 🔥 Server */
app.listen(5000, () => {
  console.log("Server running on port 5000 🔥");
});
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

// Login API
app.post("/login", async (req, res) => {
  const email = req.body.email?.trim().toLowerCase();
  const password = req.body.password?.trim();

  const user = await User.findOne({ email });

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
    const data = {
      ...req.body,
      email: req.body.email.toLowerCase()
    };

    const user = new User(data);
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
const router = require("express").Router();
const mongoose = require("mongoose");

// Resume Schema
const resumeSchema = new mongoose.Schema({
  name: String,
  skills: String,
  education: String,
  experience: String,
  job: String
});

const Resume = mongoose.model("Resume", resumeSchema);

// Save Resume
router.post("/save", async (req, res) => {
  try {
    const resume = new Resume(req.body);
    await resume.save();
    res.send("Resume Saved");
  } catch (err) {
    res.status(500).send("Error saving resume");
  }
});

// Get all resumes
router.get("/all", async (req, res) => {
  const data = await Resume.find();
  res.json(data);
});

module.exports = router;
const express = require("express");
const { getSkills, addSkill, deleteSkill } = require("../models/skill");

const router = express.Router();

// Get all skills
router.get("/skills", async (req, res) => {
  try {
    const skills = await getSkills();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new skill
router.post("/skills", async (req, res) => {
  const { name } = req.body;
  try {
    const newSkill = await addSkill(name);
    res.status(201).json(newSkill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a skill by ID
router.delete("/skills/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedSkill = await deleteSkill(id);
    if (!deletedSkill) {
      return res.status(404).json({ message: "Skill not found" });
    }
    res.status(200).json({ message: "Skill deleted", skill: deletedSkill });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

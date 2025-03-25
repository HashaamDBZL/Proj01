const express = require("express");
const {
  addUserSkill,
  getUserSkills,
  getUserWithSkills,
} = require("../models/user");
const { getSkillUsers } = require("../models/user");

const router = express.Router();

router.post("/users/:userId/skills/:skillId", async (req, res) => {
  const { userId, skillId } = req.params;

  try {
    const result = await addUserSkill(userId, skillId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/users/:userId/skills", async (req, res) => {
  try {
    const { userId } = req.params;
    const skills = await getUserSkills(userId);
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/skills/:id/users", async (req, res) => {
  try {
    const users = await getSkillUsers(req.params.id);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/user-with-skills/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await getUserWithSkills(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user with skills:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

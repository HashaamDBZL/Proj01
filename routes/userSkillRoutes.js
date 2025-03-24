const express = require("express");
const { addUserSkill, getUserSkills } = require("../models/User");
const { getSkillUsers } = require("../models/User");

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

module.exports = router;

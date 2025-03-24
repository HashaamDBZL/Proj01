const express = require("express");
const { addUserSkill } = require("../models/User");

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

module.exports = router;

const express = require("express");
const {
  getUsers,
  addUser,
  deleteUser,
  getUsersWithSkills,
} = require("../models/User");
const { searchUsers } = require("../utils/searchUsers");

const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/users/skills", async (req, res) => {
  try {
    const users = await getUsersWithSkills();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/users", async (req, res) => {
  const { firstName, lastName, email, bio, city } = req.body;
  try {
    const newUser = await addUser(firstName, lastName, email, bio, city);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await deleteUser(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted", user: deletedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/search", async (req, res) => {
  const { query, partial } = req.query;
  if (!query) return res.status(400).json({ message: "Query is required" });

  try {
    const users = await searchUsers(query, partial === "true");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

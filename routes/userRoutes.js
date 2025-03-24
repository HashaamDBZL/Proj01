const express = require("express");
const { getUsers, addUser, deleteUser } = require("../models/User");

const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    const users = await getUsers();
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

module.exports = router;

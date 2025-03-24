const sequelize = require("./db");
const User = require("../models/User");
const Skill = require("../models/skill");
const User_Skills = require("../models/userskill");

const setupDatabase = async () => {
  try {
    await sequelize.sync();
    process.exit();
  } catch (error) {
    console.error("Error setting up database:", error);
    process.exit(1);
  }
};

setupDatabase();

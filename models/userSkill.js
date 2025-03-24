const sequelize = require("../config/db");
const User = require("./User");
const Skill = require("./skill");

const User_Skills = sequelize.define("User_Skills", {}, { timestamps: false });

// Establish Many-to-Many Relationship
User.belongsToMany(Skill, { through: User_Skills });
Skill.belongsToMany(User, { through: User_Skills });

module.exports = { User_Skills };

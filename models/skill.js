const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Skill = sequelize.define(
  "skill",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);

const getSkills = async () => {
  return await Skill.findAll();
};

const addSkill = async (name) => {
  return await Skill.create({ name });
};

const deleteSkill = async (id) => {
  const skill = await Skill.findByPk(id);
  if (!skill) return null;
  await skill.destroy();
  return skill;
};

module.exports = { Skill, getSkills, addSkill, deleteSkill };

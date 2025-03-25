const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); //
const { Skill } = require("./skill");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    bio: {
      type: DataTypes.TEXT,
    },
    city: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

User.belongsToMany(Skill, {
  through: "User_Skills",
  foreignKey: "userId",
  timestamps: false,
});
Skill.belongsToMany(User, {
  through: "User_Skills",
  foreignKey: "skillId",
  timestamps: false,
});

const getUsers = async () => {
  return await User.findAll();
};

const addUser = async (firstName, lastName, email, bio, city) => {
  return await User.create({ firstName, lastName, email, bio, city });
};

const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) return null;
  await user.destroy();
  return user;
};

const addUserSkill = async (userId, skillId) => {
  try {
    const user = await User.findByPk(userId);
    const skill = await Skill.findByPk(skillId);

    if (!user || !skill) {
      throw new Error("User or Skill not found");
    }
    await user.addSkill(skill);
    return { message: "Skill assigned to user successfully!" };
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserSkills = async (userId) => {
  try {
    const user = await User.findByPk(userId, {
      include: {
        model: Skill,
        through: { attributes: [] },
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user.skills;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getSkillUsers = async (skillId) => {
  try {
    const skill = await Skill.findByPk(skillId, {
      include: {
        model: User,
        through: { attributes: [] },
      },
    });

    if (!skill) {
      throw new Error("Skill not found");
    }

    return skill.users;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  User,
  getUsers,
  addUser,
  deleteUser,
  addUserSkill,
  getUserSkills,
  getSkillUsers,
};

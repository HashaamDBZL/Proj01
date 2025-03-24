const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "postgres://postgres:admin@localhost:5432/Proj01"
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connection has been established successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
};

testConnection();

module.exports = sequelize;

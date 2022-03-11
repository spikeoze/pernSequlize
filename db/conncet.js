const { Sequelize } = require("sequelize");
require("dotenv").config();

const name = process.env.DATABASE_NAME
const owner = process.env.DATABASE_OWNER
const pass = process.env.OWNER_PASS

const sequelize = new Sequelize(name, owner, pass, {
  host: "localhost",
  dialect: "postgres",
});

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = connect;

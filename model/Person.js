const { Sequelize, DataTypes } = require("sequelize");

require("dotenv").config();

const name = process.env.DATABASE_NAME
const owner = process.env.DATABASE_OWNER
const pass = process.env.OWNER_PASS

const sequelize = new Sequelize(name, owner, pass, {
  host: "localhost",
  dialect: "postgres",
});


// Model
const Person = sequelize.define(
  "person",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },

    student: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Person;

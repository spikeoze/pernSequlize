const Person = require("./model/Person");
const { Sequelize, DataTypes } = require("sequelize");
const data = require ('./data');

require("dotenv").config();

const name = process.env.DATABASE_NAME
const owner = process.env.DATABASE_OWNER
const pass = process.env.OWNER_PASS

const sequelize = new Sequelize(name, owner, pass, {
  host: "localhost",
  dialect: "postgres",
});

const seedDB = async () => {
  await Person.sync();
  await Person.destroy({
    truncate: true,
  });

  const person = await Person.bulkCreate(data);
  await person.save();
};

seedDB().then(() => {
  console.log("DONE");
  sequelize.close();
});

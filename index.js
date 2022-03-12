const express = require("express");
const app = express();
const connect = require("./db/conncet");
const Person = require("./model/Person");
require("dotenv").config();

const { Op } = require("sequelize");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/person", async (req, res) => {
  const { name, fields, order } = req.query;
  console.log(req.query);
  let QueryObject = {};

  if (name) {
    QueryObject = {
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    };
  }

  if (fields) {
    let formatFields = fields.split(",");
    console.log(fields);
    QueryObject = {
      attributes: formatFields,
    };
  }

  if (order) {
    let formatorder = order.split(",");
    QueryObject.order = formatorder;
  }

  let result = Person.findAll(QueryObject);

  const person = await result;
  console.log(QueryObject);
  res.json(person);
});

app.post("/person", async (req, res) => {
  const person = await Person.create(req.body);

  await person.save();

  res.json(person);
});

app.get("/person/:id", async (req, res) => {
  const { id } = req.params;
  const person = await Person.findAll({
    where: {
      id: id,
    },
  });

  res.json(person);
});

app.put("/person/:id", async (req, res) => {
  const { id } = req.params;
  const person = await Person.update(
    { ...req.body },
    {
      where: {
        id: id,
      },
    }
  );

  res.json(person);
});

app.delete("/person/:id", async (req, res) => {
  const { id } = req.params;
  const person = await Person.destroy({
    where: {
      id: id,
    },
  });

  res.json(person);
});

connect();
app.listen(5000, () => {
  console.log("Listening on port 5000");
});

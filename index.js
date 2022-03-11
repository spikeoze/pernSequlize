const express = require("express");
const app = express();
const connect = require("./db/conncet");
const Person = require("./model/Person");
require('dotenv').config();



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/person", async (req, res) => {
  const person = await Person.findAll({ order: ["id"] });
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

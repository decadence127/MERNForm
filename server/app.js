const express = require("express");
require("dotenv").config();
const Employee = require("./entities/entities");
let dbStart = require("./database");
const path = require("path");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "*",
    allowedHeaders: "Content-Type",
    methods: "OPTIONS, POST, GET",
  })
);

app.use(express.json({ extended: true }));

app.use("/api/office", require("./routes/officeRoute"));


const start = async () => {
  try {
    await dbStart();
    app.listen(process.env.PORT, () =>
      console.log(`Server has been started on port ${process.env.PORT}.`)
    );
  } catch (e) {
    console.log(e);
  }
};

start();

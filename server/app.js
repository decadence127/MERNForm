const express = require("express");
require("dotenv").config();
const Employee = require("./entities/entities");
let dbStart = require("./database");
const path = require("path");

const app = express();

app.use(express.json({ extended: true }));

app.use("/api/office", require("./routes/officeRoute"));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

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
